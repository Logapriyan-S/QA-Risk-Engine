from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Project, Service
from .serializers import ProjectSerializer, ServiceSerializer


# =====================================================
# PROJECT APIs
# =====================================================

class ProjectListCreateView(APIView):

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        projects = Project.objects.all().order_by("-created_at")
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


class ProjectDetailView(APIView):

    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = ProjectSerializer(project)
        return Response(serializer.data)


# =====================================================
# SERVICE APIs
# =====================================================

class ServiceListCreateView(APIView):

    # CREATE
    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        service = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # LIST ALL
    def get(self, request):
        services = Service.objects.select_related("project").all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)


class ServiceDetailView(APIView):

    def get(self, request, pk):
        try:
            service = Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = ServiceSerializer(service)
        return Response(serializer.data)


# ⭐ IMPORTANT (filter by project)
class ProjectServiceListView(APIView):

    def get(self, request, project_id):
        services = Service.objects.filter(project_id=project_id)
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
