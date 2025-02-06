from django.urls import path

from apps.post_label.views import PostLabelListCreateView

urlpatterns = [
    path("", PostLabelListCreateView.as_view(), name="post_label_list_create"),
]