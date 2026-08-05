from datetime import datetime, timedelta

from sqlalchemy import func, extract
from sqlalchemy.orm import Session

from app.models.expense import Expense
from app.models.category import Category


class AnalyticsRepository:

    @staticmethod
    def get_monthly_comparison(
        db: Session,
        user_id: int,
    ):
        """
        Compare current month's expenses with previous month's expenses.
        """

        today = datetime.now()

        current_month = today.month
        current_year = today.year

        # Previous month calculation
        if current_month == 1:
            previous_month = 12
            previous_year = current_year - 1
        else:
            previous_month = current_month - 1
            previous_year = current_year

        # Current Month Total
        current_total = (
            db.query(func.sum(Expense.amount))
            .filter(
                Expense.user_id == user_id,
                extract("month", Expense.expense_date) == current_month,
                extract("year", Expense.expense_date) == current_year,
            )
            .scalar()
        ) or 0

        # Previous Month Total
        previous_total = (
            db.query(func.sum(Expense.amount))
            .filter(
                Expense.user_id == user_id,
                extract("month", Expense.expense_date) == previous_month,
                extract("year", Expense.expense_date) == previous_year,
            )
            .scalar()
        ) or 0

        difference = current_total - previous_total

        if previous_total == 0:
            percentage_change = 100 if current_total > 0 else 0
        else:
            percentage_change = (
                difference / previous_total
            ) * 100

        if difference > 0:
            status = "increase"
        elif difference < 0:
            status = "decrease"
        else:
            status = "same"

        return {
            "current_month": current_total,
            "previous_month": previous_total,
            "difference": abs(difference),
            "percentage_change": round(
                percentage_change,
                2,
            ),
            "status": status,
        }