from rest_framework import serializers
from .models import RiskReport


class RiskReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskReport
        fields = [
            "id",
            "change",
            "risk_level",
            "affected_tests",
            "reason",
            "created_at",
        ]
        read_only_fields = ("id", "created_at")
