from rest_framework import serializers
from .models import TestCase

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = [
            "id",
            "test_id",
            "title",
            "service",
            "test_type",
            "priority",
            "active",
        ]

    def validate_priority(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Priority must be between 1 (highest) and 5 (lowest)"
            )
        return value

    def validate_test_id(self, value):
        if not value.startswith("TC_"):
            raise serializers.ValidationError(
                "Test ID must start with 'TC_'"
            )
        return value
