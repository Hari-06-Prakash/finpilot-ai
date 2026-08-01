from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict


# -----------------------------
# Create Expense
# -----------------------------
class ExpenseCreate(BaseModel):
    title: str
    amount: Decimal
    description: Optional[str] = None
    merchant: Optional[str] = None
    payment_method: Optional[str] = None
    category_id: int


# -----------------------------
# Update Expense
# -----------------------------
class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[Decimal] = None
    description: Optional[str] = None
    merchant: Optional[str] = None
    payment_method: Optional[str] = None
    category_id: Optional[int] = None


# -----------------------------
# Response
# -----------------------------
class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: Decimal
    description: Optional[str]
    merchant: Optional[str]
    payment_method: Optional[str]
    category_id: int
    user_id: int
    expense_date: datetime
    is_ai_generated: bool

    model_config = ConfigDict(from_attributes=True)