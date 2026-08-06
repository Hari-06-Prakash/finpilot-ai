from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.budget import (
    BudgetCreate,
    BudgetResponse,
    BudgetOverviewResponse,
    BudgetHistoryItem,
)

from app.services.budget_service import BudgetService

from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/budget",
    tags=["Budget"],
)

@router.post(
    "",
    response_model=BudgetResponse,
)
def create_or_update_budget(
    budget: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:

        return BudgetService.create_or_update_budget(
            db=db,
            user_id=current_user.id,
            budget_amount=budget.budget_amount,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.get(
    "/current",
    response_model=BudgetResponse,
)
def get_current_budget(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    budget = BudgetService.get_current_budget(
        db=db,
        user_id=current_user.id,
    )

    if not budget:

        raise HTTPException(
            status_code=404,
            detail="Budget not found.",
        )

    return budget

from typing import List


@router.get(
    "/history",
    response_model=List[BudgetHistoryItem],
)
def get_budget_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return BudgetService.get_budget_history(
        db=db,
        user_id=current_user.id,
    )

@router.get(
    "/overview",
    response_model=BudgetOverviewResponse,
)
def get_budget_overview(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    overview = BudgetService.get_budget_overview(
        db=db,
        user_id=current_user.id,
    )

    if not overview:

        raise HTTPException(
            status_code=404,
            detail="Budget not found.",
        )

    return overview