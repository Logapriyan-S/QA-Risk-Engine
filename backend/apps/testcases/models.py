from django.db import models
from apps.projects.models import Service


class TestCase(models.Model):
    TEST_TYPE_CHOICES = [
    ("UI", "UI"),
    ("UNIT", "UNIT"),
    ("API", "API"),   # add this
    ("INTEGRATION", "INTEGRATION"),
]

    test_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="testcases"
    )
    test_type = models.CharField(
        max_length=20,
        choices=TEST_TYPE_CHOICES
    )
    priority = models.IntegerField(default=3)
    active = models.BooleanField(default=True)
    

    def __str__(self):
        return self.test_id
