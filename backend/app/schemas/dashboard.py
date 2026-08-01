from decimal import Decimal
from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_expenses: Decimal
    this_month: Decimal
    total_transactions: int
    average_transaction: Decimal

class CategorySummary(BaseModel):
    category: str
    amount: Decimal