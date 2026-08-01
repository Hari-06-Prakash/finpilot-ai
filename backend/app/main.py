from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router

app = FastAPI(title="AI Student Finance Manager API", version="1.0.0")

app.include_router(auth_router)

# CORS allows your React frontend (localhost:5173) to talk to FastAPI (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "🚀 AI Finance Manager Backend is running!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}