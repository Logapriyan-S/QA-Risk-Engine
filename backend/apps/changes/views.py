from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Change
from .serializers import ChangeSerializer


# =====================================================
# CREATE + LIST
# =====================================================
class ChangeListCreateView(APIView):

    # CREATE
    def post(self, request):
        serializer = ChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        change = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # LIST ALL
    def get(self, request):
        changes = Change.objects.select_related(
            "project", "service"
        ).order_by("-created_at")

        serializer = ChangeSerializer(changes, many=True)
        return Response(serializer.data)


# =====================================================
# DETAIL
# =====================================================
class ChangeDetailView(APIView):

    def get(self, request, pk):
        try:
            change = Change.objects.get(pk=pk)
        except Change.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = ChangeSerializer(change)
        return Response(serializer.data)


# =====================================================
# FILTER BY PROJECT ⭐
# =====================================================
class ProjectChangeListView(APIView):

    def get(self, request, project_id):
        changes = Change.objects.filter(project_id=project_id)
        serializer = ChangeSerializer(changes, many=True)
        return Response(serializer.data)


# =====================================================
# FILTER BY SERVICE ⭐
# =====================================================
class ServiceChangeListView(APIView):

    def get(self, request, service_id):
        changes = Change.objects.filter(service_id=service_id)
        serializer = ChangeSerializer(changes, many=True)
        return Response(serializer.data)
