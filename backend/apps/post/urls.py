from django.urls import path

from apps.post.views import PostsListView, PostsListByUserIdView, PostRetrieveUpdateDestroyView, PostCreateView

urlpatterns = [
    path("", PostsListView.as_view()),
    path("/create", PostCreateView.as_view()),
    path("/<int:pk>", PostRetrieveUpdateDestroyView.as_view()),
    path("/user/<int:pk>", PostsListByUserIdView.as_view()),
]