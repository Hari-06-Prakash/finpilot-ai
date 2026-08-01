from decimal import Decimal
from pydantic import BaseModel
from datetime import datetime


class DashboardSummary(BaseModel):
    total_expenses: Decimal
    this_month: Decimal
    total_transactions: int
    average_transaction: Decimal

class CategorySummary(BaseModel):
    category: str
    amount: Decimal

class MonthlyTrend(BaseModel):
    month: str
    amount: Decimal

class RecentExpense(BaseModel):
    id: int
    title: str
    amount: Decimal
    expense_date: datetime