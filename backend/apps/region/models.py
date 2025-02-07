from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.models import BaseModel


class RegionModel(BaseModel):
    class Meta:
        db_table = "regions"

    name = models.CharField(max_length=30, unique=True)
    value = models.IntegerField(validators=[MaxValueValidator(1000000), MinValueValidator(1)], unique=True)
