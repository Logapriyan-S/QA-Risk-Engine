from django.db import models
from apps.changes.models import Change


class RiskReport(models.Model):
    RISK_LEVEL_CHOICES = [
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
    ]

    change = models.OneToOneField(
        Change,
        on_delete=models.CASCADE,
        related_name="risk_report"
    )
    risk_level = models.CharField(
        max_length=20,
        choices=RISK_LEVEL_CHOICES
    )
    affected_tests = models.JSONField()
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Risk {self.risk_level} for Change {self.change.id}"
