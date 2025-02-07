from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.models import BaseModel


class PostLabelModel(BaseModel):
    class Meta:
        db_table = "post_labels"

    name = models.CharField(max_length=20, unique=True)
    value = models.IntegerField(validators=[MaxValueValidator(200), MinValueValidator(1)], unique=True)
