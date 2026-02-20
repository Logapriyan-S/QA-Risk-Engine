from apps.reports.models import RiskReport


class RiskEngine:
    """
    Weighted Risk Engine
    --------------------
    Calculates risk score and risk level for a given change.
    Pure business logic (no DB writes here).
    """

    def __init__(self, change, testcases):
        """
        change     -> Change model instance
        testcases  -> QuerySet or list of TestCase objects
        """
        self.change = change
        self.testcases = list(testcases)

    def calculate(self):
        service_score = self._service_criticality_score()
        change_score = self._change_type_score()
        coverage_score = self._test_coverage_score()
        priority_score = self._test_priority_score()

        total_score = (
            service_score
            + change_score
            + coverage_score
            + priority_score
        )

        risk_level = self._map_score_to_level(total_score)

        return {
            "risk_score": total_score,
            "risk_level": risk_level,
            "affected_tests": [tc.test_id for tc in self.testcases],
            "reason": self._build_reason(
                service_score,
                change_score,
                coverage_score,
                priority_score,
            ),
        }

    # ---------------- SCORING RULES ---------------- #

    def _service_criticality_score(self):
        criticality = self.change.service.criticality

        if criticality == "HIGH":
            return 40
        if criticality == "MEDIUM":
            return 25
        return 10

    def _change_type_score(self):
        change_type = self.change.change_type

        if change_type == "DELETED":
            return 25
        if change_type == "MODIFIED":
            return 18
        return 10

    def _test_coverage_score(self):
        count = len(self.testcases)

        if count < 3:
            return 20
        if count <= 6:
            return 12
        return 5

    def _test_priority_score(self):
        for tc in self.testcases:
            if tc.priority == 1:
                return 10
        return 5

    # ---------------- HELPERS ---------------- #

    def _map_score_to_level(self, score):
        if score >= 70:
            return "HIGH"
        if score >= 40:
            return "MEDIUM"
        return "LOW"

    def _build_reason(
        self,
        service_score,
        change_score,
        coverage_score,
        priority_score,
    ):
        reasons = []

        if service_score >= 40:
            reasons.append("high critical service")
        if change_score >= 18:
            reasons.append("impactful change")
        if coverage_score >= 20:
            reasons.append("low test coverage")
        if priority_score == 10:
            reasons.append("high priority test impact")

        return ", ".join(reasons)


# ---------------- DB WRITE FUNCTION ---------------- #

def analyze_and_save_risk(change, testcases):
    """
    Runs risk engine and persists RiskReport
    """
    engine = RiskEngine(change, testcases)
    result = engine.calculate()

    report, _ = RiskReport.objects.update_or_create(
        change=change,
        defaults={
            "risk_level": result["risk_level"],
            "affected_tests": result["affected_tests"],
            "reason": result["reason"],
        },
    )

    return report
