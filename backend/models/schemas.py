from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Report(BaseModel):
    id: Optional[str] = None
    text: str
    language: str = "unknown"
    timestamp: Optional[str] = None
    source: str = "web"
    audio_url: Optional[str] = None

class ExtractedReport(BaseModel):
    location_text: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    victim_count: int = 0
    water_level: str = "unknown"
    medical_emergency: bool = False
    severity: int = 1
    confidence: float = 0.0

class Incident(BaseModel):
    id: str
    reports: List[str]  # List of report IDs
    merged_location: str
    lat: float
    lng: float
    confidence_score: float
    risk_score: float
    status: str = "open"

class DispatchPlan(BaseModel):
    id: str
    vehicle_assignments: Dict[str, List[str]] # vehicle_id -> list of incident_ids
    routes: Dict[str, Any]
    estimated_times: Dict[str, float]

class VOIRecommendation(BaseModel):
    report_id: str
    impact_score: float
    reasoning: str

class SituationReport(BaseModel):
    timestamp: str
    active_incidents: int
    teams_dispatched: int
    critical_zones_covered: float
    top_risk_area: str
