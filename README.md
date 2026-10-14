# ResQGraph 🌊🚤
> **AI-Powered Disaster Response Coordination System**  
> *Track: AI for Disaster Response | HORIZON X 2K26*  
> *Simulation Baseline: Bengaluru 2022 Urban Flood*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-00C7B7?style=for-the-badge&logo=render&logoColor=white)](https://resqgraph.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SrinivasaKamathB/ResQGraph)
[![Breeth AI Memory](https://img.shields.io/badge/AI%20Memory-Breeth-8A2BE2?style=for-the-badge&logoColor=white)](https://thebreeth.com)

🌐 **Live Commander Dashboard:** [https://resqgraph.onrender.com/](https://resqgraph.onrender.com/)

---

## 📌 Problem Statement
During severe urban disasters (such as the Bengaluru 2022 floods):
* **Control Room Overload:** Thousands of calls & messages flood emergency helplines in the critical "Golden Hour".
* **Multilingual Ambiguity:** Reports arrive in Kannada, Hindi, English, and regional slang.
* **Redundant Dispatches:** Multiple citizens report the same flooded building or street, disorienting rescue logistics.
* **Vague Landmarks:** Local descriptions (e.g., *"behind govt school near old banyan tree"*) lack GPS telemetry.
* **Resource Scarcity:** Response teams have limited assets (e.g., 4 boats for 50+ reported incidents).
* **Unverified Viral Rumors:** False reports (e.g., *"Silk Board bridge collapsed"*) paralyze rescue routes.

**ResQGraph converts unstructured emergency inputs into a verified, mathematically optimized rescue plan on an interactive GIS map with human-in-the-loop commander verification.**

---

## 🌟 Key Architecture & Capabilities

1. **Multilingual AI Extraction (Gemini API):** Ingests Kannada, Hindi, and English text/voice notes and extracts structured triage parameters (`water_level`, `stranded_count`, `medical_emergency`).
2. **Geo-Grounding Engine:** Resolves informal local landmarks and spatial descriptions into GPS coordinates using OpenStreetMap Nominatim and landmark synonym models.
3. **Incident Fusion (HDBSCAN):** Deduplicates repeated citizen calls within spatial proximity into verified incident clusters with confidence scoring (`LOW`, `MEDIUM`, `HIGH`).
4. **Risk Scoring Engine:** Quantifies disaster urgency using multi-factor evaluation:
   $$\text{Risk Score} = \text{Severity} \times 0.40 + \text{Vulnerability} \times 0.35 + \text{TimeSensitivity} \times 0.25$$
5. **Fleet Dispatch Optimizer (Google OR-Tools):** Formulates and solves a Vehicle Routing Problem (VRP) to compute optimal water and road corridors for limited rescue boats and ambulances.
6. **Value-of-Information (VOI) Engine:** Evaluates unverified social media rumors. If a rumor would break operational routes if true, it dynamically flags the zone and recommends drone reconnaissance.
7. **Commander Tactical Map (Leaflet.js):** Dark tactical GIS interface with real-time hazard beacons, live boat trajectories, and satellite layer switching.
8. **Human-in-the-Loop Safeguards:** Ethical AI architecture where the system proposes optimized routes, but requires explicit Commander approval prior to vehicle dispatch.
9. **Automated Situation Report (SITREP):** Instant generation of standardized executive disaster reports for State Disaster Management Authorities (SDMA).
10. **Breeth Intent-Aware Persistent Memory:** Integrates **Breeth** (`thebreeth.com`) to track repeat callers, detect flood depth escalation over time (e.g. +0.4m rise), and recall critical patient medical histories across intermittent calls.

---

## 🔄 System Pipeline

```
[Citizen Inputs] (Voice Memos, SMS, WhatsApp in Kannada/Hindi/English)
       │
       ▼
[1. Multilingual Extraction] (Google Gemini API Structured JSON)
       │
       ▼
[2. Geo-Grounding Engine] (Landmark Synonym Dictionary + OpenStreetMap)
       │
       ▼
[3. Incident Fusion] (Spatial HDBSCAN Clustering + Confidence Badges)
       │
       ▼
[4. Risk Scoring & VOI Triage] (Priority Weighting + Rumor Analysis)
       │
       ▼
[5. Google OR-Tools Optimizer] (Vehicle Routing Problem Solver)
       │
       ▼
[6. Commander Dashboard] (Leaflet GIS + Human Approval + SITREP Export)
```

---

## 🛠️ Tech Stack

* **Frontend:** React 18, Tailwind CSS, Leaflet.js, Lucide Icons, Vite
* **Backend:** Python 3.13, FastAPI, Uvicorn, Pydantic v2
* **Optimization & AI:** Google Gemini API, Scikit-Learn (HDBSCAN), Google OR-Tools
* **Geospatial:** OpenStreetMap, CartoDB Tactical Vector Tiles, Esri World Imagery

---

## 🚀 Quick Start

### 1. Unified Launcher
Run both frontend and backend concurrently:
```bash
./start.sh
```

### 2. Manual Setup

**Backend (FastAPI):**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend (React + Vite):**
```bash
cd frontend
npm install
npm run dev
```

* **Live Web Dashboard:** [https://resqgraph.onrender.com/](https://resqgraph.onrender.com/)
* **Local Commander Dashboard:** `http://localhost:5173`
* **API Documentation:** `http://localhost:8000/docs`

---

## 📄 License
This project is licensed under the MIT License.
