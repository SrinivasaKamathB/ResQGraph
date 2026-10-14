from typing import Dict, Any, List

def calculate_risk_score(incident: Dict[str, Any], extracted_reports: List[Dict[str, Any]]) -> float:
    """Calculates risk score based on severity, vulnerability, and time sensitivity."""
    
    max_severity = 1
    total_victims = 0
    medical_flag = False
    water_rising = False
    
    for r in extracted_reports:
        max_severity = max(max_severity, r.get("severity", 1))
        total_victims += r.get("victim_count", 0)
        if r.get("medical_emergency"):
            medical_flag = True
        
        wl = r.get("water_level", "").lower()
        if "high" in wl or "rising" in wl or "waist" in wl:
            water_rising = True
            
    sev_score = max_severity * 2
    vuln_score = min(10, (total_victims * 2) + (5 if medical_flag else 0))
    time_score = 8 if water_rising else 3
    
    risk_score = (sev_score * 0.4) + (vuln_score * 0.3) + (time_score * 0.3)
    
    return round(risk_score, 2)
