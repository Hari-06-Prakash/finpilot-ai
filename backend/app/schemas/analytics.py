from decimal import Decimal
from pydantic import BaseModel


class MonthlyComparison(BaseModel):
    current_month: Decimal
    previous_month: Decimal
    difference: Decimal
    percentage_change: float
    status: str


class FinancialInsights(BaseModel):
    highest_category: str
    highest_category_amount: Decimal

    largest_expense_title: str
    largest_expense_amount: Decimal

    average_daily_spending: Decimal

    categories_used: int

    preferred_payment_method: str
    preferred_payment_transactions: int
    preferred_payment_percentage: float

class PaymentMethodItem(BaseModel):
    method: str
    count: int
    amount: Decimal
    percentage: float

class PaymentMethodAnalysis(BaseModel):
    payment_methods: list[PaymentMethodItem]
    total_transactions: int
    most_used: str

class WeeklySpendingItem(BaseModel):
    day: str
    amount: float


class WeeklySpendingResponse(BaseModel):
    weekly_spending: list[WeeklySpendingItem]
    total_spending: float
    average_spending: float
    highest_day: str
    highest_amount: float
    lowest_day: str
    lowest_amount: float