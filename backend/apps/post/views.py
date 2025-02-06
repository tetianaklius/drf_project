from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from apps.post.filters import PostsFilter
from apps.post.models import PostModel
from apps.post.serializers import PostCreateListSerializer, PostUpdateSerializer
from core.checkers.profanity_checker import ProfanityChecker
from core.exceptions.profanity_check_exception import ProfanityCheckException
from core.exceptions.property_check_exception import PropertyCheckException
from core.pagination import CustomPagePagination


class PostCreateView(CreateAPIView):
    serializer_class = PostCreateListSerializer
    queryset = PostModel.objects.all()
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=user, is_active=False)

        res = ProfanityChecker.check_profanity(self, data=serializer.validated_data)
        if res:
            serializer.save(profanity_edit_count=0, is_active=True, user_id=user)
        else:
            serializer.save(is_active=False, profanity_edit_count=1, user_id=user)
            raise ProfanityCheckException
        return Response(serializer.data, status.HTTP_201_CREATED)


class PostsListView(ListAPIView):
    serializer_class = PostCreateListSerializer
    queryset = PostModel.objects.filter(is_active=True)
    filterset_class = PostsFilter
    pagination_class = CustomPagePagination
    permission_classes = (AllowAny,)


class PostRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostUpdateSerializer
    http_method_names = ["get", "patch", "delete"]
    permission_classes = (IsAuthenticated,)

    # def get(self, request, *args, **kwargs):
    #     pass

    def update(self, request, *args, **kwargs):
        user = self.request.user
        post = self.get_object()
        if user.is_authenticated and self.request.user.id == post.user_id.id:
            serializer = self.get_serializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            res = ProfanityChecker.check_profanity(self, data=serializer.data)
            if not res:
                if post.profanity_edit_count > 4:
                    serializer.save(is_active=False, is_visible=False)
                    # надсилається лист менеджерові, щоб перевірив допис todo
                    return Response(
                        {
                            "Message": "Because your post contains profanity words, it has been sent to the manager "
                                       "for review. Expect a response within 24 hours",
                        },
                        status.HTTP_202_ACCEPTED)
                else:
                    post.profanity_edit_count += 1
                    serializer.save(is_active=False)
                    raise ProfanityCheckException
            else:
                serializer.save(profanity_edit_count=0, is_active=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise PropertyCheckException

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        post = self.get_object()
        if user.is_authenticated and self.request.user.id == post.user_id.id:
            return self.destroy(request, *args, **kwargs)
        else:
            raise PropertyCheckException


class PostsListByUserIdView(ListAPIView):
    queryset = PostModel.objects.filter(is_active=True)
    serializer_class = PostCreateListSerializer
    permission_classes = (AllowAny,)
    pagination_class = CustomPagePagination

    def get(self, *args, **kwargs):
        posts = self.queryset.filter(user_id=kwargs["pk"])
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
