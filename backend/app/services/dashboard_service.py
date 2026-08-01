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

    @staticmethod
    def get_monthly_trend(
        db: Session,
        user_id: int,
    ):
        data = DashboardRepository.get_monthly_trend(
            db,
            user_id,
        )

        month_names = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec",
        }

        return [
            {
                "month": month_names[int(item.month)],
                "amount": item.amount,
            }
            for item in data
        ]

    @staticmethod
    def get_recent_expenses(
        db: Session,
        user_id: int,
    ):
        return DashboardRepository.get_recent_expenses(
            db,
            user_id,
        )