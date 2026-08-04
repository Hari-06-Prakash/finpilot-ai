from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.user import router as user_router
from app.api.expense import router as expense_router
from app.api.dashboard import router as dashboard_router
from app.api.category import router as category_router

app = FastAPI(
    title="AI Student Finance Manager API",
    version="1.0.0",
)

# -----------------------------
# Register Routers
# -----------------------------
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(expense_router)
app.include_router(dashboard_router)
app.include_router(category_router)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def read_root():
    return {
        "message": "🚀 AI Finance Manager Backend is running!"
    }


# -----------------------------
# Health Check
# -----------------------------
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }