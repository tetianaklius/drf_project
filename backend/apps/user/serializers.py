from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.db.transaction import atomic

from apps.user.models import ProfileModel
from core.services.email_service import EmailService

UserModel = get_user_model()


class ProfileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = (
            "id",
            "name",
            "surname",
            "age",
            "phone",
            "city",
            "profession",
            "interests",
            "created_at",
            "updated_at"
        )
        read_only_fields = ("id", "created_at", "updated_at")


class UserModelSerializer(serializers.ModelSerializer):
    profile = ProfileModelSerializer()

    class Meta:
        model = UserModel
        fields = (
            "id",
            "email",
            "password",
            "is_active",
            "is_staff",
            "is_superuser",
            "last_login",
            "created_at",
            "updated_at",
            "profile"
        )

        read_only_fields = (
            "id", "is_active", "is_staff", "is_superuser", "last_login", "created_at", "updated_at")
        extra_kwargs = {
            "password": {
                "write_only": True,
            }
        }

    @atomic
    def create(self, validated_data: dict):
        profile = validated_data.pop("profile")
        user = UserModel.objects.create_user(**validated_data)
        ProfileModel.objects.create(**profile, user=user)
        EmailService.registration(user)
        return user



class AuthUserSerializer(serializers.ModelSerializer):
    profile = ProfileModelSerializer()
    class Meta:
        model = UserModel
        fields =  (
            "id", "profile",
        )
        read_only_fields = (
            "id",
        )
        depth = 1
