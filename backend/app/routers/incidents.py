from fastapi import APIRouter, Query
from typing import List
from app.models.schemas import IncidentCluster, CitizenReport
from app.services.incident_fusion import incident_fusion
from app.routers.simulation import load_simulated_reports

router = APIRouter(prefix="/api/incidents", tags=["incidents"])

@router.get("/clusters", response_model=List[IncidentCluster])
def get_incident_clusters(report_count: int = Query(default=50, ge=1, le=50)):
    reports = load_simulated_reports()[:report_count]
    return incident_fusion.fuse_reports(reports)
