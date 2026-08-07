from sqlalchemy.orm import Session

from app.models.income import Income


class IncomeRepository:

    def create(self, db: Session, income: Income):
        db.add(income)
        db.commit()
        db.refresh(income)
        return income

    def get_all(self, db: Session, user_id: int):
        return (
            db.query(Income)
            .filter(Income.user_id == user_id)
            .order_by(Income.income_date.desc())
            .all()
        )

    def get_by_id(
        self,
        db: Session,
        income_id: int,
        user_id: int,
    ):
        return (
            db.query(Income)
            .filter(
                Income.id == income_id,
                Income.user_id == user_id,
            )
            .first()
        )

    def update(
        self,
        db: Session,
        income: Income,
    ):
        db.commit()
        db.refresh(income)
        return income

    def delete(
        self,
        db: Session,
        income: Income,
    ):
        db.delete(income)
        db.commit()