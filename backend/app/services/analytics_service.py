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

    @staticmethod
    def get_financial_insights(
        db: Session,
        user_id: int,
    ):
        """
        Returns financial insights for the analytics dashboard.
        """

        return AnalyticsRepository.get_financial_insights(
            db=db,
            user_id=user_id,
        )

    @staticmethod
    def get_payment_method_analysis(
        db: Session,
        user_id: int,
    ):
        """
        Returns payment method analytics.
        """

        return AnalyticsRepository.get_payment_method_analysis(
            db=db,
            user_id=user_id,
        )