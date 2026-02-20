from django.urls import path
from .views import (
    RiskReportListView,
    RiskReportDetailView,
    ChangeRiskReportView,
    HighRiskReportView,
    RiskAnalyzeView   # keep your existing analyze view
)

urlpatterns = [
    path("", RiskReportListView.as_view()),
    path("<int:pk>/", RiskReportDetailView.as_view()),
    path("change/<int:change_id>/", ChangeRiskReportView.as_view()),
    path("high/", HighRiskReportView.as_view()),

    # existing
    path("analyze/", RiskAnalyzeView.as_view()),
]
