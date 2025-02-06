from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators as v

from apps.post_label.models import PostLabelModel
from core.models import BaseModel

UserModel = get_user_model()

class PostModel(BaseModel):
    class Meta:
        db_table = "posts"

    is_active = models.BooleanField(default=True)
    is_visible = models.BooleanField(default=True)

    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=60, blank=False)
    text = models.TextField(max_length=2000, blank=False, null=False)
    label = models.ForeignKey(PostLabelModel, on_delete=models.SET_NULL, null=True, related_name="posts")
    profanity_edit_count = models.IntegerField(default=0, validators=[v.MinValueValidator(0)])
