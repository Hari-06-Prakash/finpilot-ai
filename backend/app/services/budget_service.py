from sqlalchemy.orm import Session

from app.repositories.budget_repository import (
    BudgetRepository,
)


class BudgetService:

    @staticmethod
    def create_or_update_budget(
        db: Session,
        user_id: int,
        budget_amount: float,
    ):
        """
        Creates or updates the current month's budget.
        """

        if budget_amount <= 0:
            raise ValueError(
                "Budget amount must be greater than zero."
            )

        return BudgetRepository.create_or_update_budget(
            db=db,
            user_id=user_id,
            budget_amount=budget_amount,
        )

    @staticmethod
    def get_current_budget(
        db: Session,
        user_id: int,
    ):
        """
        Returns current month's budget.
        """

        return BudgetRepository.get_current_budget(
            db=db,
            user_id=user_id,
        )

    @staticmethod
    def get_budget_history(
        db: Session,
        user_id: int,
    ):
        """
        Returns budget history.
        """

        return BudgetRepository.get_budget_history(
            db=db,
            user_id=user_id,
        )

    @staticmethod
    def get_budget_overview(
        db: Session,
        user_id: int,
    ):
        """
        Returns budget overview.
        """

        return BudgetRepository.get_budget_overview(
            db=db,
            user_id=user_id,
        )