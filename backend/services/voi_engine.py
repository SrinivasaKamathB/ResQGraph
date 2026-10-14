from typing import List, Dict, Any
from models.schemas import VOIRecommendation
from services.optimizer import optimize_dispatch
import json

def calculate_voi(incidents: List[Dict[str, Any]], reports: List[Dict[str, Any]]) -> VOIRecommendation:
    """Calculates which report to verify next based on plan delta."""
    
    if not incidents or not reports:
        return VOIRecommendation(report_id="", impact_score=0.0, reasoning="No active incidents.")
        
    baseline_plan = optimize_dispatch(incidents)
    baseline_str = json.dumps(baseline_plan.vehicle_assignments)
    
    max_delta = 0.0
    best_report = None
    
    for inc in incidents:
        if inc.get("confidence_score", 1.0) < 0.8:
            mod_incidents = [i for i in incidents if i["id"] != inc["id"]]
            new_plan = optimize_dispatch(mod_incidents)
            
            new_str = json.dumps(new_plan.vehicle_assignments)
            delta = len(set(baseline_str) ^ set(new_str))
            
            if delta > max_delta:
                max_delta = delta
                if inc.get("reports"):
                    best_report = inc["reports"][0]
                    
    if best_report:
        return VOIRecommendation(
            report_id=best_report,
            impact_score=max_delta,
            reasoning="Verifying this report could significantly change the optimal routing plan."
        )
        
    return VOIRecommendation(report_id="N/A", impact_score=0.0, reasoning="All incidents high confidence.")
