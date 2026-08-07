from sqlalchemy.orm import Session

from app.models.income import Income
from app.repositories.income_repository import IncomeRepository
from app.schemas.income import (
    IncomeCreate,
    IncomeUpdate,
)

repository = IncomeRepository()


class IncomeService:

    def create_income(
        self,
        db: Session,
        income_data: IncomeCreate,
        user_id: int,
    ):
        income = Income(
            user_id=user_id,
            **income_data.model_dump(),
        )

        return repository.create(db, income)

    def get_all_income(
        self,
        db: Session,
        user_id: int,
    ):
        return repository.get_all(db, user_id)

    def get_income(
        self,
        db: Session,
        income_id: int,
        user_id: int,
    ):
        return repository.get_by_id(
            db,
            income_id,
            user_id,
        )

    def update_income(
        self,
        db: Session,
        income_id: int,
        income_data: IncomeUpdate,
        user_id: int,
    ):
        income = repository.get_by_id(
            db,
            income_id,
            user_id,
        )

        if not income:
            return None

        for key, value in income_data.model_dump().items():
            setattr(income, key, value)

        return repository.update(db, income)

    def delete_income(
        self,
        db: Session,
        income_id: int,
        user_id: int,
    ):
        income = repository.get_by_id(
            db,
            income_id,
            user_id,
        )

        if not income:
            return False

        repository.delete(db, income)

        return True


income_service = IncomeService()