from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.schemas.analytics import MonthlyComparison
from app.services.analytics_service import AnalyticsService

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get(
    "/monthly-comparison",
    response_model=MonthlyComparison,
)
def get_monthly_comparison(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Compare the current month's expenses
    with the previous month's expenses.
    """

    return AnalyticsService.get_monthly_comparison(
        db=db,
        user_id=current_user.id,
    )