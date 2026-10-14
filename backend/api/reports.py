from fastapi import APIRouter, HTTPException
from typing import List
from models.schemas import Report
from database import get_db
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=Report)
def submit_report(report: Report):
    db = get_db()
    cursor = db.cursor()
    
    if not report.id:
        report.id = str(uuid.uuid4())
    if not report.timestamp:
        report.timestamp = datetime.now().isoformat()
        
    cursor.execute(
        "INSERT INTO reports (id, text, language, timestamp, source, audio_url) VALUES (?, ?, ?, ?, ?, ?)",
        (report.id, report.text, report.language, report.timestamp, report.source, report.audio_url)
    )
    db.commit()
    return report

@router.get("/", response_model=List[Report])
def list_reports():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM reports")
    rows = cursor.fetchall()
    
    reports = []
    for row in rows:
        reports.append(Report(
            id=row["id"],
            text=row["text"],
            language=row["language"],
            timestamp=row["timestamp"],
            source=row["source"],
            audio_url=row["audio_url"]
        ))
    return reports
