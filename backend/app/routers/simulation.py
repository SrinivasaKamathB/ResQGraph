import os
import json
from fastapi import APIRouter
from typing import List, Dict, Any
from app.models.schemas import CitizenReport

router = APIRouter(prefix="/api/simulation", tags=["simulation"])

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "bengaluru_flood_50.json")

def load_simulated_reports() -> List[CitizenReport]:
    if os.path.exists(DATA_PATH):
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return [CitizenReport(**item) for item in data]
    return []

@router.get("/reports", response_model=List[CitizenReport])
def get_all_reports():
    return load_simulated_reports()

@router.get("/feed/{count}", response_model=List[CitizenReport])
def get_progressive_reports(count: int = 50):
    reports = load_simulated_reports()
    return reports[:max(1, min(len(reports), count))]
