from datetime import datetime
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.expense import Expense
from app.models.category import Category


class DashboardRepository:

    @staticmethod
    def get_summary(
        db: Session,
        user_id: int,
    ):
        total_expenses = (
            db.query(func.sum(Expense.amount))
            .filter(Expense.user_id == user_id)
            .scalar()
        ) or 0

        total_transactions = (
            db.query(func.count(Expense.id))
            .filter(Expense.user_id == user_id)
            .scalar()
        ) or 0

        current_month = datetime.now().month
        current_year = datetime.now().year

        this_month = (
            db.query(func.sum(Expense.amount))
            .filter(
                Expense.user_id == user_id,
                func.extract("month", Expense.expense_date) == current_month,
                func.extract("year", Expense.expense_date) == current_year,
            )
            .scalar()
        ) or 0

        average_transaction = (
            total_expenses / total_transactions
            if total_transactions
            else 0
        )

        return {
            "total_expenses": total_expenses,
            "this_month": this_month,
            "total_transactions": total_transactions,
            "average_transaction": average_transaction,
        }

    @staticmethod
    def get_category_summary(
        db: Session,
        user_id: int,
    ):
        return (
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
            .all()
        )