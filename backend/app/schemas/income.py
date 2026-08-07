from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel


class IncomeBase(BaseModel):
    title: str
    amount: Decimal
    source: str
    description: str | None = None
    payment_method: str
    income_date: date


class IncomeCreate(IncomeBase):
    pass


class IncomeUpdate(IncomeBase):
    pass


class IncomeResponse(IncomeBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True