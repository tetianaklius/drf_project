from rest_framework import serializers

from apps.city.models import CityModel


class CityModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityModel
        fields = ("id", "name", "region", "value", "updated_at", "created_at")
        read_only_fields = ("id", "updated_at", "created_at")

    # def validate(self, attrs):
    #     attrs = super().validate(attrs)
    #     if "region" in self.context:
    #         attrs["region"] = self.context["region"]
    #     return attrs
