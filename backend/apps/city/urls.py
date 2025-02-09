from django.urls import path

from apps.city.views import CityListCreateView, CitiesListView

urlpatterns = [
    path("/region/<int:pk>", CityListCreateView.as_view(), name="city_list_create"),
    path('', CitiesListView.as_view(),name="cities_list"),
]