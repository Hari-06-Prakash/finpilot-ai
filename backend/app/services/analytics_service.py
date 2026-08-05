from sqlalchemy.orm import Session

from app.repositories.analytics_repository import AnalyticsRepository


class AnalyticsService:

    @staticmethod
    def get_monthly_comparison(
        db: Session,
        user_id: int,
    ):
        """
        Returns comparison between the current month
        and previous month's expenses.
        """

        return AnalyticsRepository.get_monthly_comparison(
            db=db,
            user_id=user_id,
        )