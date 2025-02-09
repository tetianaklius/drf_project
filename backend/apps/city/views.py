from rest_framework import status
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny
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

        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        region_obj = RegionModel.objects.get(pk=pk)
        serializer.save(region=region_obj)

        return Response(serializer.validated_data, status.HTTP_201_CREATED)


class CitiesListView(ListAPIView):
    queryset = CityModel.objects.all().order_by("name")
    serializer_class = CityModelSerializer
    permission_classes = (AllowAny,)
