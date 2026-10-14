from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from api import reports, incidents, dispatch, simulation, voi, situation

app = FastAPI(title="ResQGraph API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(reports.router, prefix="/api/reports", tags=["reports"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["incidents"])
app.include_router(dispatch.router, prefix="/api/dispatch", tags=["dispatch"])
app.include_router(simulation.router, prefix="/api/simulation", tags=["simulation"])
app.include_router(voi.router, prefix="/api/voi", tags=["voi"])
app.include_router(situation.router, prefix="/api/situation", tags=["situation"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}
