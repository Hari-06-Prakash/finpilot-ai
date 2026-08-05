from decimal import Decimal
from pydantic import BaseModel


class MonthlyComparison(BaseModel):
    current_month: Decimal
    previous_month: Decimal
    difference: Decimal
    percentage_change: float
    status: str