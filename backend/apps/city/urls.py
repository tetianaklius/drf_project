from django.urls import path

from apps.city.views import CityListCreateView

urlpatterns = [
    path("/region/<int:pk>", CityListCreateView.as_view(), name="city_list_create"),
]