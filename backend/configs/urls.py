from django.conf.urls.static import static
from django.urls import include, path
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from configs import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Mini drf project about posts and users",
        default_version="v1",
        description="This api is about posts and users",
        contact=openapi.Contact(email="tetyanaklyus@gmail.com"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path("api/auth", include("apps.auth.urls")),
    path("api/users", include("apps.user.urls")),
    path("api/posts", include("apps.post.urls")),
    path("api/post_labels", include("apps.post_label.urls")),
    path("api/cities", include("apps.city.urls")),
    path("api/regions", include("apps.region.urls")),
    path("api/doc", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger"),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
