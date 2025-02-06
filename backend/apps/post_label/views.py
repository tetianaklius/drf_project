from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.post_label.models import PostLabelModel
from apps.post_label.serializers import PostLabelModelSerializer


class PostLabelListCreateView(ListCreateAPIView):
    queryset = PostLabelModel.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = PostLabelModelSerializer
    http_method_names = ["post", "get"]

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = PostLabelModelSerializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.validated_data, status.HTTP_201_CREATED)
