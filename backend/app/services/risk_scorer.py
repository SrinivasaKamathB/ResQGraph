from typing import Tuple

class RiskScorer:
    @staticmethod
    def calculate(water_level: float, stranded_count: int, elderly_or_infant: bool, medical_emergency: bool) -> Tuple[float, str]:
        """Calculates risk score (0-100) and priority class (P1-P4)."""
        severity = min(100.0, (water_level / 2.5) * 100.0)
        vulnerability = min(100.0, (stranded_count * 5.0) + (30.0 if elderly_or_infant else 0.0))
        time_sensitivity = 100.0 if medical_emergency else 25.0

        risk_score = round((severity * 0.40) + (vulnerability * 0.35) + (time_sensitivity * 0.25), 1)

        if risk_score >= 70.0:
            priority = "P1"
        elif risk_score >= 50.0:
            priority = "P2"
        elif risk_score >= 30.0:
            priority = "P3"
        else:
            priority = "P4"

        return risk_score, priority

risk_scorer = RiskScorer()
