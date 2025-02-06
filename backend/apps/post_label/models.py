from django.db import models

from core.models import BaseModel


class PostLabelModel(BaseModel):
    class Meta:
        db_table = "post_labels"

    name = models.CharField(max_length=20)
