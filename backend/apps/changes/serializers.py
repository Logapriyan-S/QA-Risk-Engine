from rest_framework import serializers
from .models import Change

class ChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Change
        fields = [
            "id",
            "project",
            "service",
            "change_type",
            "description",
            "created_at",
        ]

    def validate(self, data):
        project = data.get("project")
        service = data.get("service")

        if service.project != project:
            raise serializers.ValidationError(
                "Service does not belong to the given project"
            )

        return data
