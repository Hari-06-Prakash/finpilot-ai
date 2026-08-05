from datetime import datetime

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

    @staticmethod
    def get_financial_insights(
        db: Session,
        user_id: int,
    ):
        """
        Returns key financial insights for the analytics dashboard.
        """

        # Highest Spending Category
        highest_category = (
            db.query(
                Category.name.label("category"),
                func.sum(Expense.amount).label("amount"),
            )
            .join(
                Expense,
                Expense.category_id == Category.id,
            )
            .filter(
                Expense.user_id == user_id,
            )
            .group_by(Category.name)
            .order_by(func.sum(Expense.amount).desc())
            .first()
        )

        # Largest Expense
        largest_expense = (
            db.query(Expense)
            .filter(
                Expense.user_id == user_id,
            )
            .order_by(
                Expense.amount.desc()
            )
            .first()
        )

        # Total Expenses
        total_expenses = (
            db.query(func.sum(Expense.amount))
            .filter(
                Expense.user_id == user_id,
            )
            .scalar()
        ) or 0

        # Average Daily Spending (Current Month)
        today = datetime.now()
        current_day = today.day

        average_daily_spending = (
            total_expenses / current_day
            if current_day
            else 0
        )

        # Categories Used
        categories_used = (
            db.query(
                func.count(
                    func.distinct(
                        Expense.category_id
                    )
                )
            )
            .filter(
                Expense.user_id == user_id,
            )
            .scalar()
        ) or 0

        # Total Transactions
        total_transactions = (
            db.query(func.count(Expense.id))
            .filter(
                Expense.user_id == user_id,
            )
            .scalar()
        ) or 1

        # Preferred Payment Method
        preferred_payment_method = (
            db.query(
                Expense.payment_method.label("method"),
                func.count(Expense.id).label("count"),
            )
            .filter(
                Expense.user_id == user_id,
            )
            .group_by(
                Expense.payment_method,
            )
            .order_by(
                func.count(Expense.id).desc(),
            )
            .first()
        )

        return {
            "highest_category":
                highest_category.category
                if highest_category
                else "N/A",

            "highest_category_amount":
                highest_category.amount
                if highest_category
                else 0,

            "largest_expense_title":
                largest_expense.title
                if largest_expense
                else "N/A",

            "largest_expense_amount":
                largest_expense.amount
                if largest_expense
                else 0,

            "average_daily_spending":
                round(
                    average_daily_spending,
                    2,
                ),

            "categories_used":
                categories_used,

            "preferred_payment_method":
                preferred_payment_method.method
                if preferred_payment_method
                else "N/A",

            "preferred_payment_transactions":
                preferred_payment_method.count
                if preferred_payment_method
                else 0,

            "preferred_payment_percentage":
                round(
                    (
                        preferred_payment_method.count
                        / total_transactions
                    ) * 100,
                    2,
                )
                if preferred_payment_method
                else 0,
        }

    @staticmethod
    def get_payment_method_analysis(
        db: Session,
        user_id: int,
    ):
        """
        Returns payment method statistics for analytics.
        """

        # Total Transactions
        total_transactions = (
            db.query(func.count(Expense.id))
            .filter(
                Expense.user_id == user_id,
            )
            .scalar()
        ) or 1

        # Payment Method Statistics
        payment_methods = (
            db.query(
                Expense.payment_method.label("method"),
                func.count(Expense.id).label("count"),
                func.sum(Expense.amount).label("amount"),
            )
            .filter(
                Expense.user_id == user_id,
            )
            .group_by(
                Expense.payment_method,
            )
            .order_by(
                func.count(Expense.id).desc(),
            )
            .all()
        )

        payment_method_data = []

        for item in payment_methods:

            payment_method_data.append(
                {
                    "method": item.method,

                    "count": item.count,

                    "amount": item.amount,

                    "percentage": round(
                        (
                            item.count
                            / total_transactions
                        ) * 100,
                        2,
                    ),
                }
            )

        most_used = (
            payment_method_data[0]["method"]
            if payment_method_data
            else "N/A"
        )

        return {
            "payment_methods": payment_method_data,
            "total_transactions": total_transactions,
            "most_used": most_used,
        }