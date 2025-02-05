import datetime

from django_filters import rest_framework as filters

from apps.post.models import PostLabelChoicesModel


class PostsFilter(filters.FilterSet):
    label = filters.ChoiceFilter("label", choices=PostLabelChoicesModel.choices)
    date_from = filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    order = filters.OrderingFilter(
        fields=(
            "id",
            "updated_at"
        )
    )
