from typing import List, Dict, Any
from app.models.schemas import IncidentCluster, VehicleRoute

class ValueOfInformationEngine:
    """Analyzes unverified reports and determines if critical route plans could fail."""
    
    def evaluate_rumors(self, clusters: List[IncidentCluster], routes: List[VehicleRoute]) -> List[Dict[str, Any]]:
        alerts = []
        for cluster in clusters:
            rumor_count = cluster.metrics.get("rumor_count", 0)
            if rumor_count > 0:
                # Check if any route traverses or targets this area
                affected_routes = []
                for route in routes:
                    for wp in route.waypoints:
                        if wp.cluster_id == cluster.cluster_id or cluster.area.lower() in wp.name.lower():
                            affected_routes.append(route.vehicle_id)

                alerts.append({
                    "alert_id": f"voi_{cluster.cluster_id}",
                    "severity": "CRITICAL_WARNING",
                    "title": f"Unverified Rumor Alert: {cluster.title}",
                    "message": (
                        f"Unconfirmed social media reports indicate structural/bridge hazard near {cluster.area}. "
                        f"If true, route execution for {', '.join(affected_routes) or 'South corridor'} will fail. "
                        f"VOI Action: Dispatch inspection drone before committing human rescue teams."
                    ),
                    "action_required": "DRONE_RECON_RECOMMENDED",
                    "contingency_reroute": True,
                    "target_cluster": cluster.cluster_id,
                    "coordinates": cluster.coordinates
                })
        return alerts

voi_engine = ValueOfInformationEngine()
