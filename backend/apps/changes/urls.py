from django.urls import path
from .views import (
    ChangeListCreateView,
    ChangeDetailView,
    ProjectChangeListView,
    ServiceChangeListView
)

urlpatterns = [
    path("", ChangeListCreateView.as_view()),
    path("<int:pk>/", ChangeDetailView.as_view()),
    path("project/<int:project_id>/", ProjectChangeListView.as_view()),
    path("service/<int:service_id>/", ServiceChangeListView.as_view()),
]
