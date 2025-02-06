from rest_framework import serializers

from apps.post_label.models import PostLabelModel


class PostLabelModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLabelModel
        fields = ("id", "name", "updated_at", "created_at")
        read_only_fields = ("id", "updated_at", "created_at")