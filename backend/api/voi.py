from fastapi import APIRouter
from models.schemas import VOIRecommendation
from database import get_db
import json
from services.voi_engine import calculate_voi

router = APIRouter()

@router.get("/recommendation", response_model=VOIRecommendation)
def get_voi():
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM incidents")
    incidents = [dict(row) for row in cursor.fetchall()]
    
    for inc in incidents:
        inc["reports"] = json.loads(inc["reports"]) if isinstance(inc["reports"], str) else inc["reports"]
        
    cursor.execute("SELECT * FROM reports")
    reports = [dict(row) for row in cursor.fetchall()]
    
    return calculate_voi(incidents, reports)
