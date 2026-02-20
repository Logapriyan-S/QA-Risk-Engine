from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import RiskReport
from .serializers import RiskReportSerializer

from apps.changes.models import Change
from apps.testcases.models import TestCase
from .services import analyze_and_save_risk


# =====================================================
# 🔥 RISK ANALYZE (VERY IMPORTANT)
# =====================================================
class RiskAnalyzeView(APIView):

    def post(self, request):
        change_id = request.data.get("change_id")

        if not change_id:
            return Response(
                {"error": "change_id required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            change = Change.objects.get(pk=change_id)
        except Change.DoesNotExist:
            return Response(
                {"error": "Change not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        testcases = TestCase.objects.filter(service=change.service)

        report = analyze_and_save_risk(change, testcases)

        return Response(
            RiskReportSerializer(report).data,
            status=status.HTTP_201_CREATED
        )


# =====================================================
# LIST ALL REPORTS
# =====================================================
class RiskReportListView(APIView):

    def get(self, request):
        reports = RiskReport.objects.select_related("change").order_by("-created_at")
        serializer = RiskReportSerializer(reports, many=True)
        return Response(serializer.data)


# =====================================================
# DETAIL
# =====================================================
class RiskReportDetailView(APIView):

    def get(self, request, pk):
        try:
            report = RiskReport.objects.get(pk=pk)
        except RiskReport.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = RiskReportSerializer(report)
        return Response(serializer.data)


# =====================================================
# FILTER BY CHANGE
# =====================================================
class ChangeRiskReportView(APIView):

    def get(self, request, change_id):
        reports = RiskReport.objects.filter(change_id=change_id)
        serializer = RiskReportSerializer(reports, many=True)
        return Response(serializer.data)


# =====================================================
# HIGH RISK ONLY
# =====================================================
class HighRiskReportView(APIView):

    def get(self, request):
        reports = RiskReport.objects.filter(risk_level="HIGH")
        serializer = RiskReportSerializer(reports, many=True)
        return Response(serializer.data)
