from django.urls import path
from .views import (
    ProjectListCreateView,
    ProjectDetailView,
    ServiceListCreateView,
    ServiceDetailView,
    ProjectServiceListView
)

urlpatterns = [
    # Projects
    path("", ProjectListCreateView.as_view()),
    path("<int:pk>/", ProjectDetailView.as_view()),

    # Services
    path("services/", ServiceListCreateView.as_view()),
    path("services/<int:pk>/", ServiceDetailView.as_view()),

    # Services by project
    path("<int:project_id>/services/", ProjectServiceListView.as_view()),
]
