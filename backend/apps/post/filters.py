from django_filters import rest_framework as filters


class PostsFilter(filters.FilterSet):
    label = filters.CharFilter(field_name="label", lookup_expr="exact")
    date_from = filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    order = filters.OrderingFilter(
        fields=(
            "id",
            "updated_at"
        )
    )
