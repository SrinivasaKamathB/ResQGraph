import numpy as np
import hdbscan
from typing import List, Dict, Any

def cluster_incidents(reports: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Clusters reports based on geographic proximity."""
    if not reports:
        return []
        
    coords = []
    valid_reports = []
    
    for r in reports:
        lat = r.get("lat")
        lng = r.get("lng")
        if lat is not None and lng is not None:
            coords.append([lat, lng])
            valid_reports.append(r)
            
    if len(coords) < 2:
        incidents = []
        for i, r in enumerate(valid_reports):
            incidents.append({
                "id": f"INC_{i}",
                "reports": [r["id"]],
                "merged_location": r.get("location_text", "unknown"),
                "lat": r["lat"],
                "lng": r["lng"],
                "confidence_score": r.get("confidence", 0.5),
                "risk_score": 0.0
            })
        return incidents
        
    clusterer = hdbscan.HDBSCAN(min_cluster_size=2, metric='euclidean')
    labels = clusterer.fit_predict(np.array(coords))
    
    incidents = []
    clusters = {}
    
    for i, label in enumerate(labels):
        if label == -1:
            cluster_id = f"noise_{i}"
        else:
            cluster_id = str(label)
            
        if cluster_id not in clusters:
            clusters[cluster_id] = []
        clusters[cluster_id].append(valid_reports[i])
        
    for cid, items in clusters.items():
        avg_lat = sum(item["lat"] for item in items) / len(items)
        avg_lng = sum(item["lng"] for item in items) / len(items)
        
        confidence = min(0.95, 0.5 + (len(items) * 0.1))
        
        incidents.append({
            "id": f"INC_C{cid}",
            "reports": [item["id"] for item in items],
            "merged_location": items[0].get("location_text", "unknown"),
            "lat": avg_lat,
            "lng": avg_lng,
            "confidence_score": confidence,
            "risk_score": 0.0
        })
        
    return incidents
