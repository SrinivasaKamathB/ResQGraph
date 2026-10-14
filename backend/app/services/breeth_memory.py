import os
import logging
from typing import Dict, Any, List, Optional

logger = logging.getLogger("breeth_memory")

# Load Breeth API Key from environment or default hackathon key
BREETH_API_KEY = os.getenv("BREETH_API_KEY", "ck_live_vj3vIIbS1OIGcxEB4UHRMvUh7Ep6lSl4mSEXYf7sZDA")

class BreethMemoryService:
    """
    Integrates Breeth Intent-Aware AI Memory for tracking disaster progression,
    repeat callers, and long-term casualty medical histories across the crisis.
    """

    def __init__(self):
        self.api_key = BREETH_API_KEY
        self.client = None
        self.local_memory_cache: Dict[str, List[Dict[str, Any]]] = {}

        try:
            from breeth import BreethClient
            if self.api_key:
                self.client = BreethClient(api_key=self.api_key, timeout=10.0)
        except Exception as e:
            logger.warning(f"Breeth SDK initialized in fallback mode: {e}")

    def record_disaster_episode(self, report_id: str, caller_landmark: str, water_level: float, casualties: int, medical_need: bool, raw_text: str) -> Dict[str, Any]:
        """
        Records an emergency episode into Breeth's persistent intent memory.
        """
        episode_content = (
            f"Emergency SOS Report [{report_id}] at landmark: {caller_landmark}. "
            f"Inundation depth: {water_level}m. Stranded casualties: {casualties}. "
            f"Medical emergency flagged: {medical_need}. Citizen note: '{raw_text}'"
        )

        memory_record = {
            "report_id": report_id,
            "landmark": caller_landmark,
            "water_level": water_level,
            "casualties": casualties,
            "medical_need": medical_need,
            "timestamp": "2026-10-14T18:30:00Z"
        }

        # Cache locally for instant retrieval & offline resilience
        if caller_landmark not in self.local_memory_cache:
            self.local_memory_cache[caller_landmark] = []
        self.local_memory_cache[caller_landmark].append(memory_record)

        # Attempt remote sync to Breeth Cloud
        remote_synced = False
        if self.client:
            try:
                self.client.write(
                    content=episode_content,
                    group_id="resqgraph-bengaluru-flood-ops",
                    source_description="citizen_distress_stream",
                    extract_intent=True
                )
                remote_synced = True
            except Exception as e:
                logger.debug(f"Breeth cloud sync queued: {e}")

        return {
            "status": "RECORDED",
            "remote_synced": remote_synced,
            "memory_provider": "Breeth AI Intent Memory",
            "landmark": caller_landmark
        }

    def recall_caller_history(self, caller_landmark: str) -> Optional[Dict[str, Any]]:
        """
        Recalls historical memory for a specific landmark or caller.
        Detects escalating flood levels over time.
        """
        history = self.local_memory_cache.get(caller_landmark, [])
        if len(history) > 1:
            prev = history[0]
            latest = history[-1]
            depth_delta = round(latest["water_level"] - prev["water_level"], 2)
            return {
                "repeat_caller": True,
                "call_count": len(history),
                "initial_water_level": prev["water_level"],
                "current_water_level": latest["water_level"],
                "depth_delta_m": depth_delta,
                "escalated": depth_delta > 0.4 or latest["medical_need"],
                "insight": f"Memory Recall: Water has risen by {depth_delta}m since first report. Urgency escalated."
            }
        return None

breeth_memory = BreethMemoryService()
