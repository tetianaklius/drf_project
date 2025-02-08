from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators as v

from apps.post_label.models import PostLabelModel
from core.models import BaseModel
from core.services.file_service import upload_post_image

UserModel = get_user_model()

class PostModel(BaseModel):
    class Meta:
        db_table = "posts"
        ordering = ["-id"]

    is_active = models.BooleanField(default=True)
    is_visible = models.BooleanField(default=True)

    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=60, validators=[v.MinLengthValidator(2)], blank=False)
    text = models.TextField(validators=[v.MaxLengthValidator(2000), v.MinLengthValidator(2)], blank=False, null=False)
    label = models.ForeignKey(PostLabelModel, on_delete=models.SET("WITHOUT_LABEL"), related_name="posts")
    image = models.ImageField(upload_to=upload_post_image, blank=True)
    profanity_edit_count = models.IntegerField(default=0, validators=[v.MinValueValidator(0)])
