from django.test import TestCase
from types import SimpleNamespace

from apps.reports.services import RiskEngine


class RiskEngineTestCase(TestCase):

    def setUp(self):
        # Mock Service
        self.service = SimpleNamespace(
            criticality="HIGH"
        )

        # Mock Change
        self.change = SimpleNamespace(
            service=self.service,
            change_type="DELETED"
        )

        # Mock TestCases
        self.testcases = [
            SimpleNamespace(test_id="TC_001", priority=1),
            SimpleNamespace(test_id="TC_002", priority=2),
        ]

    def test_high_risk_scenario(self):
        engine = RiskEngine(self.change, self.testcases)
        result = engine.calculate()

        self.assertEqual(result["risk_level"], "HIGH")
        self.assertGreaterEqual(result["risk_score"], 70)
        self.assertIn("high critical service", result["reason"])
        self.assertIn("low test coverage", result["reason"])
        self.assertEqual(
            result["affected_tests"],
            ["TC_001", "TC_002"]
        )
