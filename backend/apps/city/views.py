from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from apps.city.models import CityModel
from apps.city.serializers import CityModelSerializer
from apps.region.models import RegionModel


class CityListCreateView(ListCreateAPIView):
    """
    post:
        create city;
    get:
        get all cities;
    """
    queryset = CityModel.objects.all()
    serializer_class = CityModelSerializer
    permission_classes = (AllowAny,)  # todo

    def get_queryset(self):
        pk = self.kwargs["pk"]
        queryset = CityModel.objects.filter(region_id=pk)
        return queryset

    def post(self, *args, **kwargs):
        data = self.request.data
        pk = self.kwargs["pk"]

        # context_ = {}
        # if "value" in data:
        #     region_obj = get_object_or_404(RegionModel, value=data["value"])
        #     context_["region"] = region_obj

        # serializer = self.get_serializer(data=data, context=context_, many=True)

        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        region_obj = RegionModel.objects.get(pk=pk)
        serializer.save(region=region_obj)

        return Response(serializer.validated_data, status.HTTP_201_CREATED)
