from django.urls import path

from apps.user.views import BlockUserView, UnBlockUserView, UsersListView, UserCreateView, \
    UserRetrieveUpdateDestroyAPIView, GetAuthUserView

urlpatterns = [
    path("", UsersListView.as_view(), name="users_list"),
    path("/me", GetAuthUserView.as_view(), name="get_auth_user"),
    path("/create", UserCreateView.as_view(), name="user_create"),
    path("/<int:pk>", UserRetrieveUpdateDestroyAPIView.as_view(), name="user_by_id"),
    path("/<int:pk>/block", BlockUserView.as_view(), name="user_block"),
    path("/<int:pk>/unblock", UnBlockUserView.as_view(), name="user_unblock"),
]
