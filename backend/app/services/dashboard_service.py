from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    @staticmethod
    def get_summary(
        db: Session,
        user_id: int,
    ):
        return DashboardRepository.get_summary(
            db,
            user_id,
        )

    @staticmethod
    def get_category_summary(
        db: Session,
        user_id: int,
    ):
        return DashboardRepository.get_category_summary(
            db,
            user_id,
        )