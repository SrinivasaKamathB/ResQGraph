from fastapi import APIRouter, Query
from app.models.schemas import DispatchPlan
from app.services.incident_fusion import incident_fusion
from app.services.or_tools_optimizer import route_optimizer
from app.routers.simulation import load_simulated_reports

router = APIRouter(prefix="/api/dispatch", tags=["dispatch"])

# Global in-memory approval state for MVP
PLAN_STATE = {"approved": False, "approved_at": None}

@router.get("/plan", response_model=DispatchPlan)
def get_dispatch_plan(report_count: int = Query(default=50, ge=1, le=50)):
    reports = load_simulated_reports()[:report_count]
    clusters = incident_fusion.fuse_reports(reports)
    plan = route_optimizer.generate_plan(clusters)
    if PLAN_STATE["approved"]:
        plan.status = "APPROVED"
    return plan

@router.post("/approve")
def approve_dispatch_plan():
    PLAN_STATE["approved"] = True
    return {
        "status": "SUCCESS",
        "message": "Dispatch plan approved by Commander. Emergency teams notified.",
        "state": PLAN_STATE
    }

@router.post("/reset")
def reset_dispatch_plan():
    PLAN_STATE["approved"] = False
    return {"status": "SUCCESS", "message": "Simulation and dispatch state reset."}
