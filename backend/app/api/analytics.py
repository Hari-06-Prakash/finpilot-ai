from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db

from app.models.user import User

from app.schemas.analytics import (
    MonthlyComparison,
    FinancialInsights,
    PaymentMethodAnalysis,
    WeeklySpendingResponse,
)
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

@router.get(
    "/financial-insights",
    response_model=FinancialInsights,
)
def get_financial_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Returns financial insights for the analytics dashboard.
    """

    return AnalyticsService.get_financial_insights(
        db=db,
        user_id=current_user.id,
    )

@router.get(
    "/payment-method-analysis",
    response_model=PaymentMethodAnalysis,
)
def get_payment_method_analysis(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Returns payment method analysis for the analytics dashboard.
    """

    return AnalyticsService.get_payment_method_analysis(
        db=db,
        user_id=current_user.id,
    )

@router.get(
    "/weekly-spending",
    response_model=WeeklySpendingResponse,
)
def get_weekly_spending(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Returns weekly spending analytics.
    """

    return AnalyticsService.get_weekly_spending(
        db=db,
        user_id=current_user.id,
    )