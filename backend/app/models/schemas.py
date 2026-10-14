from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class CitizenReport(BaseModel):
    id: str
    timestamp: str
    channel: str  # "VOICE" | "SMS" | "WHATSAPP"
    language: str
    raw_text: str
    audio_url: Optional[str] = None
    extracted_landmark: Optional[str] = None
    est_water_level: float = 0.0
    casualties: int = 0
    elderly_or_infant: bool = False
    medical_emergency: bool = False
    is_rumor_voi: bool = False

class RawExtractedReport(BaseModel):
    report_id: str
    landmark: str
    lat: float
    lng: float
    water_level: float
    stranded_count: int
    has_elderly_infant: bool
    medical_need: bool
    urgency_tag: str

class IncidentCluster(BaseModel):
    cluster_id: str
    title: str
    area: str
    coordinates: List[float]  # [lat, lng]
    report_count: int
    confidence: str  # "LOW" | "MEDIUM" | "HIGH"
    priority: str  # "P1" | "P2" | "P3" | "P4"
    risk_score: float
    metrics: Dict[str, Any]
    required_resources: List[str]
    status: str = "PENDING"  # "PENDING" | "DISPATCHED" | "RESOLVED"
    reports: List[str] = []

class Waypoint(BaseModel):
    lat: float
    lng: float
    name: str
    cluster_id: Optional[str] = None

class VehicleRoute(BaseModel):
    vehicle_id: str
    vehicle_type: str  # "INFLATABLE_BOAT" | "AMBULANCE"
    driver_name: str
    capacity: int
    waypoints: List[Waypoint]
    eta_minutes: int
    assigned_incidents: List[str]

class DispatchPlan(BaseModel):
    plan_id: str
    generated_at: str
    status: str = "PENDING_APPROVAL"  # "PENDING_APPROVAL" | "APPROVED" | "REJECTED"
    metrics: Dict[str, Any]
    routes: List[VehicleRoute]
    voi_alerts: List[Dict[str, Any]] = []

class SituationReport(BaseModel):
    title: str
    timestamp: str
    incidents_total: int
    teams_dispatched: int
    critical_coverage_pct: float
    total_victims_assisted: int
    executive_summary: str
    recommendations: List[str]
