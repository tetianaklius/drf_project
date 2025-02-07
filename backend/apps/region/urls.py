from django.urls import path

from apps.region.views import RegionListCreateView

urlpatterns = [
    path("", RegionListCreateView.as_view(), name="region_list_create"),
]