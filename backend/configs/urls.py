from django.conf.urls.static import static
from django.urls import include, path

from configs import settings

urlpatterns = [
    path("api/auth", include("apps.auth.urls")),
    path("api/users", include("apps.user.urls")),
    path("api/posts", include("apps.post.urls")),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
