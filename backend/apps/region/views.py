from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from apps.region.models import RegionModel
from apps.region.serializers import RegionModelSerializer


class RegionListCreateView(ListCreateAPIView):
    """
    post:
        create region;
    get:
        get all regions;
    """
    queryset = RegionModel.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegionModelSerializer

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.validated_data, status.HTTP_201_CREATED)
