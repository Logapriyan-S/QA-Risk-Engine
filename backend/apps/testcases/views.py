from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import TestCase
from .serializers import TestCaseSerializer


# =========================================
# CREATE + LIST
# =========================================
class TestCaseListCreateView(APIView):

    # CREATE
    def post(self, request):
        serializer = TestCaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        testcase = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # LIST
    def get(self, request):
        tests = TestCase.objects.filter(active=True)
        serializer = TestCaseSerializer(tests, many=True)
        return Response(serializer.data)


# =========================================
# DETAIL
# =========================================
class TestCaseDetailView(APIView):

    def get(self, request, pk):
        try:
            testcase = TestCase.objects.get(pk=pk)
        except TestCase.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = TestCaseSerializer(testcase)
        return Response(serializer.data)


# ⭐ FILTER BY SERVICE (important)
class ServiceTestCaseListView(APIView):

    def get(self, request, service_id):
        tests = TestCase.objects.filter(service_id=service_id, active=True)
        serializer = TestCaseSerializer(tests, many=True)
        return Response(serializer.data)
