from fastapi import APIRouter
from models.schemas import SituationReport
from database import get_db
import json
from services.report_generator import generate_situation_report

router = APIRouter()

@router.get("/report", response_model=SituationReport)
def get_situation_report():
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM incidents")
    incidents = [dict(row) for row in cursor.fetchall()]
    
    cursor.execute("SELECT * FROM dispatch_plans ORDER BY timestamp DESC LIMIT 1")
    row = cursor.fetchone()
    
    plan_data = {}
    if row:
        plan_data = json.loads(row["plan_data"])
        
    return generate_situation_report(incidents, plan_data)
