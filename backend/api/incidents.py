from fastapi import APIRouter
from typing import List
import json
from models.schemas import Incident
from database import get_db
from services.extractor import extract_incident_data
from services.geo_grounding import resolve_location
from services.clustering import cluster_incidents
from services.risk_scorer import calculate_risk_score

router = APIRouter()

@router.post("/process")
def process_pipeline():
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM reports")
    rows = cursor.fetchall()
    
    processed_reports = []
    for row in rows:
        report_dict = dict(row)
        extracted = extract_incident_data(row["text"])
        report_dict.update(extracted.model_dump())
        
        lat, lng = resolve_location(extracted.location_text)
        report_dict["lat"] = lat
        report_dict["lng"] = lng
        
        cursor.execute("UPDATE reports SET extracted_data = ? WHERE id = ?", (json.dumps(extracted.model_dump()), row["id"]))
        
        processed_reports.append(report_dict)
        
    db.commit()
    
    incidents_data = cluster_incidents(processed_reports)
    
    cursor.execute("DELETE FROM incidents")
    
    final_incidents = []
    for inc_data in incidents_data:
        inc_reports = [r for r in processed_reports if r["id"] in inc_data["reports"]]
        
        risk_score = calculate_risk_score(inc_data, inc_reports)
        inc_data["risk_score"] = risk_score
        
        cursor.execute(
            "INSERT INTO incidents (id, reports, lat, lng, merged_location, confidence_score, risk_score, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (inc_data["id"], json.dumps(inc_data["reports"]), inc_data["lat"], inc_data["lng"], inc_data["merged_location"], inc_data["confidence_score"], inc_data["risk_score"], inc_data.get("status", "open"))
        )
        final_incidents.append(inc_data)
        
    db.commit()
    return {"message": "Pipeline completed", "incidents_created": len(final_incidents)}

@router.get("/", response_model=List[Incident])
def list_incidents():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM incidents")
    rows = cursor.fetchall()
    
    incidents = []
    for row in rows:
        incidents.append(Incident(
            id=row["id"],
            reports=json.loads(row["reports"]),
            merged_location=row["merged_location"],
            lat=row["lat"],
            lng=row["lng"],
            confidence_score=row["confidence_score"],
            risk_score=row["risk_score"],
            status=row["status"]
        ))
    return incidents

@router.patch("/{id}/approve")
def approve_incident(id: str):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE incidents SET status = 'approved' WHERE id = ?", (id,))
    db.commit()
    return {"status": "approved"}

@router.patch("/{id}/reject")
def reject_incident(id: str):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE incidents SET status = 'rejected' WHERE id = ?", (id,))
    db.commit()
    return {"status": "rejected"}
