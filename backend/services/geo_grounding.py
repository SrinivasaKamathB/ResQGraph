import json
import os
import math
from typing import Tuple, Optional
from difflib import SequenceMatcher

def load_landmarks():
    filepath = os.path.join(os.path.dirname(__file__), "..", "data", "bengaluru_landmarks.json")
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def similar(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def resolve_location(location_text: str) -> Tuple[Optional[float], Optional[float]]:
    """Resolves a text location to lat/lng using fuzzy matching against landmarks."""
    if not location_text or location_text.lower() == "unknown":
        return None, None
        
    landmarks = load_landmarks()
    best_match = None
    highest_score = 0.0
    
    for landmark in landmarks:
        score = similar(location_text, landmark["name"])
        if score > highest_score:
            highest_score = score
            best_match = landmark
            
        for alias in landmark.get("aliases", []):
            alias_score = similar(location_text, alias)
            if alias_score > highest_score:
                highest_score = alias_score
                best_match = landmark
                
    if highest_score > 0.4 and best_match:
        return best_match["lat"], best_match["lng"]
        
    return None, None
