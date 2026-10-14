from fastapi import APIRouter
import json
import os
from database import get_db

router = APIRouter()

@router.post("/start")
def start_simulation():
    db = get_db()
    cursor = db.cursor()
    
    filepath = os.path.join(os.path.dirname(__file__), "..", "data", "sample_reports.json")
    with open(filepath, 'r') as f:
        reports = json.load(f)
        
    for r in reports:
        cursor.execute(
            "INSERT OR IGNORE INTO reports (id, text, language, timestamp, source) VALUES (?, ?, ?, ?, ?)",
            (r["id"], r["text"], r["language"], r["timestamp"], r["source"])
        )
    db.commit()
    return {"message": "Simulation started, reports loaded."}

@router.get("/status")
def simulation_status():
    return {"status": "running"}

@router.post("/reset")
def reset_simulation():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM reports")
    cursor.execute("DELETE FROM incidents")
    cursor.execute("DELETE FROM dispatch_plans")
    db.commit()
    return {"message": "System reset."}
