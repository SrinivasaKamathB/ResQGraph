import json
import os
from typing import Tuple, Dict, Any, Optional

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "landmarks_bengaluru.json")

class GeoGrounder:
    def __init__(self):
        self.landmarks = {}
        if os.path.exists(DATA_PATH):
            with open(DATA_PATH, "r", encoding="utf-8") as f:
                self.landmarks = json.load(f)

    def resolve(self, landmark_text: str) -> Dict[str, Any]:
        """Resolves raw landmark text to coordinates and area."""
        query = (landmark_text or "").lower().strip()
        
        # 1. Exact match on landmark key
        for key, data in self.landmarks.items():
            if key in query:
                return {"lat": data["lat"], "lng": data["lng"], "area": data["area"], "matched_key": key}

        # 2. Match on aliases
        for key, data in self.landmarks.items():
            for alias in data.get("aliases", []):
                if alias.lower() in query or query in alias.lower():
                    return {"lat": data["lat"], "lng": data["lng"], "area": data["area"], "matched_key": key}

        # 3. Default fallback to central coordinates
        return {
            "lat": 12.9250,
            "lng": 77.6600,
            "area": "Bengaluru Central Flood Zone",
            "matched_key": "default"
        }

geo_grounder = GeoGrounder()
