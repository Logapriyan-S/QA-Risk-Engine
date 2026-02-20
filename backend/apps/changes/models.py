from django.db import models
from apps.projects.models import Project, Service


class Change(models.Model):
    CHANGE_TYPE_CHOICES = [
        ("CREATED", "Created"),
        ("MODIFIED", "Modified"),
        ("DELETED", "Deleted"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    change_type = models.CharField(
        max_length=20,
        choices=CHANGE_TYPE_CHOICES
    )
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service.name} - {self.change_type}"
