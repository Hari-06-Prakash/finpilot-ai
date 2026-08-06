from pydantic import BaseModel
from datetime import datetime


class BudgetCreate(BaseModel):
    budget_amount: float


class BudgetResponse(BaseModel):
    id: int
    user_id: int
    month: int
    year: int
    budget_amount: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BudgetHistoryItem(BaseModel):
    month: int
    year: int
    budget_amount: float

    class Config:
        from_attributes = True


class BudgetOverviewResponse(BaseModel):
    budget: float
    spent: float
    remaining: float
    usage_percentage: float
    status: str
    month: int
    year: int