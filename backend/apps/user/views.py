from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, \
    get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.city.models import CityModel
from apps.user.filters import UsersFilter
from apps.user.models import ProfileModel
from apps.user.serializers import UserModelSerializer, ProfileModelSerializer, AuthUserSerializer
from core.pagination import CustomPagePagination

UserModel = get_user_model()


class UsersListView(ListAPIView):
    """
    get:
        get all users;
    """
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = CustomPagePagination
    permission_classes = (IsAuthenticated,)

    filterset_class = UsersFilter

    def get(self, request, *args, **kwargs):
        if request.query_params.get("pk"):
            searched_id = request.query_params.get("pk")
            if searched_id.isdigit():
                user = UserModel.objects.filter(id=searched_id).first()
                if user:
                    return Response(UserModelSerializer(user).data, status=status.HTTP_200_OK)
                else:
                    return Response("User not found", status=status.HTTP_404_NOT_FOUND)
            else:
                return Response("ID must be a number", status=status.HTTP_400_BAD_REQUEST)

        if request.query_params.get("email"):
            searched_email = request.query_params.get("email")
            user = UserModel.objects.filter(email=searched_email).first()
            if user:
                return Response(UserModelSerializer(user).data, status=status.HTTP_200_OK)
            else:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        return super().get(request, *args, **kwargs)


class UserCreateView(GenericAPIView):
    """
    post:
        create new user;
    """
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = (AllowAny,)

    def post(self, *args, **kwargs):
        data = self.request.data
        context_ = {}

        if "city" in data["profile"]:
            city_obj = get_object_or_404(CityModel, value=data["profile"]["city"])
            context_["city"] = city_obj

        serializer = UserModelSerializer(data=data, context=context_)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status.HTTP_201_CREATED)


class UserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    get:
        get user by id;
    patch:
        partial update user profile by id;
    delete:
        delete user by id;
    """
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ["get", "patch", "delete"]

    def patch(self, *args, **kwargs):
        user = self.request.user
        data = self.request.data
        user_to_update = self.get_object()

        if user.is_authenticated and user.id == user_to_update.id:
            try:
                profile = ProfileModel.objects.get(user=user_to_update)
            except ProfileModel.DoesNotExist:
                return Response({"details": "Not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = ProfileModelSerializer(profile, data=data, partial=True)
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
            user_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {
                "Message": "You can delete only your personal account.",
            },
            status.HTTP_403_FORBIDDEN
        )


class GetAuthUserView(GenericAPIView):
    """
    get:
        get own user profile;
    """
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        user = UserModel.objects.get(id=self.request.user.id)
        serializer = AuthUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlockUserView(GenericAPIView):
    """
    patch:
        block user by id; user become inactive (is_active=False);
    """

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
    """
    patch:
        unblock user by id; user become active (is_active=True);
    """

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserModelSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
