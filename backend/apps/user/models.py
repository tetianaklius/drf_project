from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core import validators as v
from django.db import models

from apps.city.models import CityModel
from apps.user.managers import UserManager
from core.models import BaseModel


class UserModel(AbstractBaseUser, PermissionsMixin, BaseModel):
    class Meta:
        db_table = "auth_user"
        ordering = ["-id"]

    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    objects = UserManager()


class ProfileModel(BaseModel):
    class Meta:
        db_table = "profile"
        ordering = ["-id"]

    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name="profile")

    name = models.CharField(max_length=30, validators=[v.MinLengthValidator(1)])
    surname = models.CharField(max_length=30, validators=[v.MinLengthValidator(1)])
    age = models.IntegerField(validators=[v.MaxValueValidator(130), v.MinValueValidator(14)])
    phone = models.CharField(max_length=20, blank=True)  # todo
    city = models.ForeignKey(CityModel, on_delete=models.SET_NULL, related_name="profiles", blank=True, null=True)
    profession = models.CharField(max_length=60, blank=True)
    interests = models.CharField(max_length=150, blank=True)

    # objects = models.Manager()
