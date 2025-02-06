from django.urls import path

from apps.post.views import PostsListView, PostsListByUserIdView, PostRetrieveUpdateDestroyView, PostCreateView, \
    PostAddImageView

urlpatterns = [
    path("", PostsListView.as_view(), name="posts_list"),
    path("/create", PostCreateView.as_view(), name="post_create"),
    path("/<int:pk>", PostRetrieveUpdateDestroyView.as_view(), name="post_by_id"),
    path("/user/<int:pk>", PostsListByUserIdView.as_view(), name="posts_by_user_id"),
    path("/<int:pk>/image", PostAddImageView.as_view(), name="post_add_image"),
]
