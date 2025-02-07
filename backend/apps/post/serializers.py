from rest_framework import serializers

from apps.post.models import PostModel


class PostCreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = (
            "id",
            "is_visible",
            "is_active",
            "user_id",
            "title",
            "text",
            "label",
            "profanity_edit_count",
            "created_at",
            "updated_at",
        )
        read_only_fields = ["id", "is_visible", "is_active", "user_id", "profanity_edit_count", "created_at",
                            "updated_at"]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if "label" in self.context:
            attrs["label"] = self.context["label"]
        return attrs


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = (
            "id",
            "title",
            "text",
            "label",
        )
        read_only_fields = ["id"]
        depth = 1

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if "label" in self.context:
            attrs["label"] = self.context["label"]
        return attrs


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = ("image",)
