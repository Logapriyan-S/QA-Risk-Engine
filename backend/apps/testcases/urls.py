from django.urls import path
from .views import (
    TestCaseListCreateView,
    TestCaseDetailView,
    ServiceTestCaseListView
)

urlpatterns = [
    path("", TestCaseListCreateView.as_view()),
    path("<int:pk>/", TestCaseDetailView.as_view()),
    path("service/<int:service_id>/", ServiceTestCaseListView.as_view()),
]
