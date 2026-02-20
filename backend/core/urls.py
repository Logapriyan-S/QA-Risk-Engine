from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # JWT
    path("api/auth/login/", TokenObtainPairView.as_view()),
    path("api/auth/refresh/", TokenRefreshView.as_view()),

    # YOUR APPS (🔥 REQUIRED)
    path("api/projects/", include("apps.projects.urls")),
    path("api/testcases/", include("apps.testcases.urls")),
    path("api/changes/", include("apps.changes.urls")),
    path("api/risk/", include("apps.reports.urls")),
]
