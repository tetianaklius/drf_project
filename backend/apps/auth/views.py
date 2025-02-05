from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated

from apps.auth.serializers import EmailSerializer, PasswordSerializer
from apps.user.serializers import UserModelSerializer
from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken, SocketToken


UserModel = get_user_model()


class ActivateUserView(GenericAPIView):
    permission_classes = (AllowAny,)

    def patch(self, *args, **kwargs):
        token = kwargs["token"]
        user = JWTService.verify_token(token, ActivateToken)
        user.is_active = True
        user.save()
        serializer = UserModelSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class RecoveryRequestView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = EmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(UserModel, email=serializer.data["email"])
        EmailService.recovery(user)
        return Response({"details": "The link has been sent to email"}, status.HTTP_200_OK)


class RecoveryPasswordView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = PasswordSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        token = kwargs["token"]
        user = JWTService.verify_token(token, RecoveryToken)
        user.set_password(serializer.data["password"])
        user.save()
        serializer = UserModelSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)
