from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.models import BaseModel
from apps.region.models import RegionModel


class CityModel(BaseModel):
    class Meta:
        db_table = "cities"

    name = models.CharField(max_length=50)
    value = models.IntegerField(validators=[MaxValueValidator(1000000), MinValueValidator(1)], unique=True)
    region = models.ForeignKey(RegionModel, on_delete=models.SET_NULL, null=True)
