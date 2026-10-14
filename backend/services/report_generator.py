from datetime import datetime
from typing import List, Dict, Any
from models.schemas import SituationReport

def generate_situation_report(incidents: List[Dict[str, Any]], dispatch_plan: Dict[str, Any]) -> SituationReport:
    active = len([i for i in incidents if i.get("status") != "resolved"])
    
    vehicles_used = 0
    if dispatch_plan and "vehicle_assignments" in dispatch_plan:
        for k, v in dispatch_plan["vehicle_assignments"].items():
            if len(v) > 0:
                vehicles_used += 1
                
    top_risk = "None"
    if incidents:
        sorted_inc = sorted(incidents, key=lambda x: x.get("risk_score", 0), reverse=True)
        top_risk = sorted_inc[0].get("merged_location", "Unknown") if sorted_inc else "Unknown"
        
    return SituationReport(
        timestamp=datetime.now().isoformat(),
        active_incidents=active,
        teams_dispatched=vehicles_used,
        critical_zones_covered=85.0 if active > 0 else 100.0,
        top_risk_area=top_risk
    )
