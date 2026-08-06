from datetime import datetime

from sqlalchemy.orm import Session

from app.models.budget import Budget

from app.models.expense import Expense
from sqlalchemy import func

class BudgetRepository:

    @staticmethod
    def create_or_update_budget(
        db: Session,
        user_id: int,
        budget_amount: float,
    ):
        """
        Creates or updates the current month's budget.
        """

        today = datetime.now()

        month = today.month
        year = today.year

        budget = (
            db.query(Budget)
            .filter(
                Budget.user_id == user_id,
                Budget.month == month,
                Budget.year == year,
            )
            .first()
        )

        if budget:

            budget.budget_amount = budget_amount

            db.commit()

            db.refresh(budget)

            return budget

        budget = Budget(
            user_id=user_id,
            month=month,
            year=year,
            budget_amount=budget_amount,
        )

        db.add(budget)

        db.commit()

        db.refresh(budget)

        return budget

    @staticmethod
    def get_current_budget(
        db: Session,
        user_id: int,
    ):
        """
        Returns the current month's budget.
        """

        today = datetime.now()

        month = today.month
        year = today.year

        budget = (
            db.query(Budget)
            .filter(
                Budget.user_id == user_id,
                Budget.month == month,
                Budget.year == year,
            )
            .first()
        )

        return budget

    @staticmethod
    def get_budget_history(
        db: Session,
        user_id: int,
        limit: int = 12,
    ):
        """
        Returns previous monthly budgets.
        """

        budgets = (
            db.query(Budget)
            .filter(
                Budget.user_id == user_id,
            )
            .order_by(
                Budget.year.desc(),
                Budget.month.desc(),
            )
            .limit(limit)
            .all()
        )

        return budgets

    @staticmethod
    def get_budget_overview(
        db: Session,
        user_id: int,
    ):
        """
        Returns budget overview for the current month.
        """

        today = datetime.now()

        month = today.month
        year = today.year

        budget = (
            db.query(Budget)
            .filter(
                Budget.user_id == user_id,
                Budget.month == month,
                Budget.year == year,
            )
            .first()
        )

        if not budget:
            return None

        total_spent = (
            db.query(
                func.sum(Expense.amount)
            )
            .filter(
                Expense.user_id == user_id,
                func.extract(
                    "month",
                    Expense.expense_date,
                ) == month,
                func.extract(
                    "year",
                    Expense.expense_date,
                ) == year,
            )
            .scalar()
        ) or 0

        remaining = budget.budget_amount - total_spent

        usage_percentage = (
            (total_spent / budget.budget_amount) * 100
            if budget.budget_amount > 0
            else 0
        )

        if usage_percentage >= 100:
            status = "Over Budget"

        elif usage_percentage >= 80:
            status = "Warning"

        else:
            status = "On Track"

        return {
            "budget": float(
                budget.budget_amount
            ),
            "spent": float(
                total_spent
            ),
            "remaining": float(
                remaining
            ),
            "usage_percentage": round(
                usage_percentage,
                2,
            ),
            "status": status,
            "month": budget.month,
            "year": budget.year,
        }