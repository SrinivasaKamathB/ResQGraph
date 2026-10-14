from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import simulation, incidents, dispatch, sitrep

app = FastAPI(
    title="ResQGraph API",
    description="AI-Powered Disaster Response Coordination System Backend",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite default port 5173, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(simulation.router)
app.include_router(incidents.router)
app.include_router(dispatch.router)
app.include_router(sitrep.router)

@app.get("/")
def health_check():
    return {
        "system": "ResQGraph Disaster Coordination Hub",
        "status": "OPERATIONAL",
        "simulation_city": "Bengaluru (2022 Urban Flood)",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
