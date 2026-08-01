from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.schemas.dashboard import DashboardSummary
from app.services.dashboard_service import DashboardService
from typing import List
from app.schemas.dashboard import (
    DashboardSummary,
    CategorySummary,
    MonthlyTrend,
    RecentExpense,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/summary",
    response_model=DashboardSummary,
)
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_summary(
        db=db,
        user_id=current_user.id,
    )

@router.get(
    "/category-summary",
    response_model=List[CategorySummary],
)
def category_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_category_summary(
        db=db,
        user_id=current_user.id,
    )

@router.get(
    "/monthly-trend",
    response_model=List[MonthlyTrend],
)
def monthly_trend(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_monthly_trend(
        db=db,
        user_id=current_user.id,
    )

@router.get(
    "/recent-expenses",
    response_model=List[RecentExpense],
)
def recent_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_recent_expenses(
        db=db,
        user_id=current_user.id,
    )