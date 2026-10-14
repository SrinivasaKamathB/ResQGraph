from fastapi import APIRouter
import json
from models.schemas import DispatchPlan
from database import get_db
from services.optimizer import optimize_dispatch, generate_naive_baseline

router = APIRouter()

def get_active_incidents():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM incidents WHERE status != 'rejected'")
    rows = cursor.fetchall()
    return [dict(row) for row in rows]

@router.post("/optimize", response_model=DispatchPlan)
def run_optimization():
    incidents = get_active_incidents()
    plan = optimize_dispatch(incidents)
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT OR REPLACE INTO dispatch_plans (id, plan_data, timestamp) VALUES (?, ?, datetime('now'))", 
                  (plan.id, json.dumps(plan.model_dump())))
    db.commit()
    
    return plan

@router.get("/plan", response_model=DispatchPlan)
def get_current_plan():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM dispatch_plans ORDER BY timestamp DESC LIMIT 1")
    row = cursor.fetchone()
    if row:
        return DispatchPlan(**json.loads(row["plan_data"]))
    return DispatchPlan(id="none", vehicle_assignments={}, routes={}, estimated_times={})

@router.get("/baseline", response_model=DispatchPlan)
def get_baseline():
    incidents = get_active_incidents()
    return generate_naive_baseline(incidents)

@router.post("/approve")
def approve_dispatch():
    return {"status": "Dispatched!"}
