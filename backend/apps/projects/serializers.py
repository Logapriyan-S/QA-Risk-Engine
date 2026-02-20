from rest_framework import serializers
from .models import Project, Service

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "description", "created_at"]

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                "Project name must be at least 3 characters"
            )
        return value


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "project", "name", "criticality"]

    def validate_name(self, value):
        if "test" in value.lower():
            raise serializers.ValidationError(
                "Service name should not be generic"
            )
        return value
