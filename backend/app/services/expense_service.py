from sqlalchemy.orm import Session

from app.repositories.expense_repository import ExpenseRepository
from app.schemas.expense import ExpenseCreate, ExpenseUpdate


class ExpenseService:

    @staticmethod
    def create_expense(
        db: Session,
        expense_data: ExpenseCreate,
        user_id: int,
    ):
        return ExpenseRepository.create(
            db,
            expense_data,
            user_id,
        )

    @staticmethod
    def get_user_expenses(
        db: Session,
        user_id: int,
    ):
        return ExpenseRepository.get_all_by_user(
            db,
            user_id,
        )

    @staticmethod
    def update_expense(
        db: Session,
        expense_id: int,
        expense_data: ExpenseUpdate,
        user_id: int,
    ):
        expense = ExpenseRepository.get_by_id_and_user(
            db,
            expense_id,
            user_id,
        )

        if expense is None:
            raise ValueError("Expense not found")

        update_data = expense_data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(expense, key, value)

        return ExpenseRepository.update(
            db,
            expense,
        )

    @staticmethod
    def delete_expense(
        db: Session,
        expense_id: int,
        user_id: int,
    ):
        expense = ExpenseRepository.get_by_id_and_user(
            db,
            expense_id,
            user_id,
        )

        if expense is None:
            raise ValueError("Expense not found")

        ExpenseRepository.delete(
            db,
            expense,
        )

        return {
            "message": "Expense deleted successfully"
        }