from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# -----------------------------
# Create Category
# -----------------------------
class CategoryCreate(BaseModel):
    name: str
    icon: Optional[str] = None
    color: Optional[str] = None


# -----------------------------
# Update Category
# -----------------------------
class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None


# -----------------------------
# Response
# -----------------------------
class CategoryResponse(BaseModel):
    id: int
    name: str
    icon: Optional[str]
    color: Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)