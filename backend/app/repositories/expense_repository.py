from sqlalchemy.orm import Session

from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate


class ExpenseRepository:

    @staticmethod
    def create(
        db: Session,
        expense_data: ExpenseCreate,
        user_id: int,
    ):
        expense = Expense(
            title=expense_data.title,
            amount=expense_data.amount,
            description=expense_data.description,
            merchant=expense_data.merchant,
            payment_method=expense_data.payment_method,
            category_id=expense_data.category_id,
            user_id=user_id,
        )

        db.add(expense)
        db.commit()
        db.refresh(expense)

        return expense

    @staticmethod
    def get_all_by_user(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(Expense)
            .filter(Expense.user_id == user_id)
            .order_by(Expense.expense_date.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        expense_id: int,
    ):
        return (
            db.query(Expense)
            .filter(Expense.id == expense_id)
            .first()
        )

    @staticmethod
    def get_by_id_and_user(
        db: Session,
        expense_id: int,
        user_id: int,
    ):
        return (
            db.query(Expense)
            .filter(
                Expense.id == expense_id,
                Expense.user_id == user_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        expense: Expense,
    ):
        db.commit()
        db.refresh(expense)
        return expense

    @staticmethod
    def delete(
        db: Session,
        expense: Expense,
    ):
        db.delete(expense)
        db.commit()