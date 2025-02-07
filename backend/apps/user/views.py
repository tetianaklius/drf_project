from django.contrib.auth import get_user_model
from redis.commands.search.querystring import querystring
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.user.filters import UsersFilter
from apps.user.models import ProfileModel
from apps.user.serializers import UserModelSerializer, ProfileModelSerializer
from core.pagination import CustomPagePagination

UserModel = get_user_model()


class UsersListView(ListAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = CustomPagePagination
    permission_classes = (IsAuthenticated,)
    filterset_class = UsersFilter


class UserCreateView(CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = (AllowAny,)


class UserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = UserModel.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        if self.kwargs["pk"]:
            searched_id = self.kwargs["pk"]
            user = UserModel.objects.filter(id=searched_id).first()
            if user:
                return Response(UserModelSerializer(user).data, status=status.HTTP_200_OK)
            else:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)
        if self.kwargs["email"]:
            searched_email = self.kwargs["email"]
            user = UserModel.objects.filter(email=searched_email).first()
            if user:
                return Response(UserModelSerializer(user).data, status=status.HTTP_200_OK)
            else:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("To search user you should write user id or user email.",
                            status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        user = self.request.user
        user_to_update = self.get_object()
        profile = ProfileModel.objects.get(user=user_to_update)

        if user.is_authenticated and user.id == user_to_update.id:
            serializer = ProfileModelSerializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {
                    "Message": "You can edit only your personal account.",
                },
                status.HTTP_403_FORBIDDEN
            )

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user_to_delete = self.get_object()
        if user.is_authenticated and user.id == user_to_delete.id:
            user_to_delete.destroy()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {
                "Message": "You can delete only your personal account.",
            },
            status.HTTP_403_FORBIDDEN
        )


class BlockUserView(GenericAPIView):
    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_active:
            user.is_active = False
            user.save()
        serializer = UserModelSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UnBlockUserView(GenericAPIView):

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserModelSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
