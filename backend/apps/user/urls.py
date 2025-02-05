from django.urls import path

from apps.user.views import BlockUserView, UnBlockUserView, UsersListView, UserCreateView, \
    UserRetrieveUpdateDestroyAPIView

urlpatterns = [
    path("", UsersListView.as_view(), name="users_list"),
    path("/create", UserCreateView.as_view(), name="user_create"),
    path("/<int:pk>", UserRetrieveUpdateDestroyAPIView.as_view(), name="user_by_id"),
    path("/<int:pk>/block", BlockUserView.as_view(), name="user_block"),
    path("/<int:pk>/unblock", UnBlockUserView.as_view(), name="user_unblock"),
]
