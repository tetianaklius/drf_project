from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from apps.post.filters import PostsFilter
from apps.post.models import PostModel
from apps.post.serializers import PostCreateListSerializer, PostUpdateSerializer, PostImageSerializer
from apps.post_label.models import PostLabelModel
from core.checkers.profanity_checker import ProfanityChecker
from core.exceptions.profanity_check_exception import ProfanityCheckException
from core.exceptions.property_check_exception import PropertyCheckException
from core.pagination import CustomPagePagination


class PostCreateView(CreateAPIView):
    """
    post:
        create a new post;
    """
    serializer_class = PostCreateListSerializer
    queryset = PostModel.objects.all()
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        context_ = {}
        if "value" in data:
            post_label_obj = get_object_or_404(PostLabelModel, value=data["value"])
            context_["label"] = post_label_obj

        serializer = self.get_serializer(data=data, context=context_)
        serializer.is_valid(raise_exception=True)

        res = ProfanityChecker.check_profanity(self, data=serializer.validated_data)
        if res:
            serializer.save(profanity_edit_count=0, is_active=True, user_id=user)
        else:
            serializer.save(is_active=False, profanity_edit_count=1, user_id=user)
            raise ProfanityCheckException
        return Response(serializer.data, status.HTTP_201_CREATED)


class PostsListView(ListAPIView):
    """
    get:
        get all posts;
    """
    serializer_class = PostCreateListSerializer
    queryset = PostModel.objects.filter(is_active=True)
    filterset_class = PostsFilter
    pagination_class = CustomPagePagination
    permission_classes = (AllowAny,)


class PostRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    get:
        get post by id;
    patch:
        update post by id;
    delete:
        delete post by id;
    """
    queryset = PostModel.objects.all()
    serializer_class = PostUpdateSerializer
    http_method_names = ["get", "patch", "delete"]
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def patch(self, request, *args, **kwargs):
        user = self.request.user
        post = self.get_object()
        data = request.data

        if user.is_authenticated and user.id == post.user_id.id:

            context_ = {}
            if "label" in data:
                label_obj = get_object_or_404(PostLabelModel, value=data["label"])
                context_["label"] = label_obj

            serializer = self.get_serializer(post, data=data, context=context_)
            serializer.is_valid(raise_exception=True)

            res = ProfanityChecker.check_profanity(self, data=serializer.validated_data)
            if not res:
                if post.profanity_edit_count > 4:
                    serializer.save(is_active=False, is_visible=False)
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
    """
    get:
        get all posts by some user id;
    """
    queryset = PostModel.objects.filter(is_active=True)
    serializer_class = PostCreateListSerializer
    permission_classes = (AllowAny,)
    pagination_class = CustomPagePagination

    def get(self, *args, **kwargs):
        posts = self.queryset.filter(user_id=kwargs["pk"])
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class PostAddImageView(UpdateAPIView):
    """
    put:
        add (or replace) image to post by post id;
    """
    serializer_class = PostImageSerializer
    queryset = PostModel.objects.all()
    permission_classes = (IsAuthenticated,)
    http_method_names = ["put"]

    def perform_update(self, serializer):
        post = self.get_object()
        if self.request.user.id == post.user_id.id:
            post = self.get_object()
            post.image.delete()
            super().perform_update(serializer)
        else:
            raise PropertyCheckException
