import math
from typing import List, Dict, Any
from app.models.schemas import CitizenReport, IncidentCluster
from app.services.geo_grounder import geo_grounder
from app.services.risk_scorer import risk_scorer

class IncidentFusionEngine:
    def __init__(self):
        pass

    def haversine_distance_km(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculates geographic distance in km between two coordinate points."""
        R = 6371.0
        d_lat = math.radians(lat2 - lat1)
        d_lon = math.radians(lon2 - lon1)
        a = (math.sin(d_lat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(d_lon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def fuse_reports(self, reports: List[CitizenReport]) -> List[IncidentCluster]:
        """Clusters duplicate reports by geographic proximity and landmark identity."""
        clusters_map: Dict[str, Dict[str, Any]] = {}

        for rep in reports:
            # 1. Geo-ground the report
            geo = geo_grounder.resolve(rep.extracted_landmark or rep.raw_text)
            matched_key = geo["matched_key"]

            if matched_key not in clusters_map:
                clusters_map[matched_key] = {
                    "cluster_id": f"cluster_{matched_key.replace(' ', '_')}",
                    "title": f"{matched_key.title()} Crisis Cluster",
                    "area": geo["area"],
                    "lat": geo["lat"],
                    "lng": geo["lng"],
                    "reports": [],
                    "water_levels": [],
                    "total_casualties": 0,
                    "has_elderly_infant": False,
                    "medical_emergency": False,
                    "rumor_count": 0
                }

            c = clusters_map[matched_key]
            c["reports"].append(rep.id)
            c["water_levels"].append(rep.est_water_level)
            c["total_casualties"] += rep.casualties
            if rep.elderly_or_infant:
                c["has_elderly_infant"] = True
            if rep.medical_emergency:
                c["medical_emergency"] = True
            if rep.is_rumor_voi:
                c["rumor_count"] += 1

        incident_clusters: List[IncidentCluster] = []
        for key, data in clusters_map.items():
            report_count = len(data["reports"])
            avg_water = sum(data["water_levels"]) / max(1, len(data["water_levels"]))
            max_water = max(data["water_levels"]) if data["water_levels"] else 0.0

            # Confidence based on report count
            if report_count >= 5:
                confidence = "HIGH"
            elif report_count >= 2:
                confidence = "MEDIUM"
            else:
                confidence = "LOW"

            # Compute risk
            risk_score, priority = risk_scorer.calculate(
                water_level=max_water,
                stranded_count=data["total_casualties"],
                elderly_or_infant=data["has_elderly_infant"],
                medical_emergency=data["medical_emergency"]
            )

            # Determine needed resources
            resources = []
            if max_water >= 1.3:
                resources.append("INFLATABLE_BOAT")
            else:
                resources.append("HIGH_AXLE_TRUCK")

            if data["medical_emergency"]:
                resources.append("PARAMEDIC_KIT")
                resources.append("AMBULANCE_STAGING")

            if data["total_casualties"] > 10:
                resources.append("DRONE_SUPPLY_DROP")

            incident_clusters.append(IncidentCluster(
                cluster_id=data["cluster_id"],
                title=data["title"],
                area=data["area"],
                coordinates=[data["lat"], data["lng"]],
                report_count=report_count,
                confidence=confidence,
                priority=priority,
                risk_score=risk_score,
                metrics={
                    "avg_water_level_m": round(avg_water, 2),
                    "max_water_level_m": round(max_water, 2),
                    "total_stranded": data["total_casualties"],
                    "has_elderly_infant": data["has_elderly_infant"],
                    "medical_emergency": data["medical_emergency"],
                    "rumor_count": data["rumor_count"]
                },
                required_resources=resources,
                status="PENDING",
                reports=data["reports"]
            ))

        # Sort clusters by priority and risk score descending
        incident_clusters.sort(key=lambda x: x.risk_score, reverse=True)
        return incident_clusters

incident_fusion = IncidentFusionEngine()
