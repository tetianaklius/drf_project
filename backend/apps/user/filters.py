from django_filters import rest_framework as filters


class UsersFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="profile__name", lookup_expr="icontains")
    age = filters.RangeFilter(field_name="profile__age")  # age_min=27&age_max=28
    region = filters.CharFilter(field_name="profile__city__region", lookup_expr="exact")
    city = filters.CharFilter(field_name="profile__city", lookup_expr="exact")
    profession = filters.CharFilter(field_name="profile__profession", lookup_expr="icontains")
    order = filters.OrderingFilter(
        fields=(
            "id",
            "age",
        )
    )
