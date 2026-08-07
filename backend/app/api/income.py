from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.schemas.income import (
    IncomeCreate,
    IncomeUpdate,
    IncomeResponse,
)
from app.services.income_service import income_service
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/income",
    tags=["Income"],
)


@router.post(
    "",
    response_model=IncomeResponse,
)
def create_income(
    income: IncomeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return income_service.create_income(
        db=db,
        income_data=income,
        user_id=current_user.id,
    )


@router.get(
    "",
    response_model=list[IncomeResponse],
)
def get_all_income(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return income_service.get_all_income(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/{income_id}",
    response_model=IncomeResponse,
)
def get_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    income = income_service.get_income(
        db=db,
        income_id=income_id,
        user_id=current_user.id,
    )

    if not income:
        raise HTTPException(
            status_code=404,
            detail="Income not found",
        )

    return income


@router.put(
    "/{income_id}",
    response_model=IncomeResponse,
)
def update_income(
    income_id: int,
    income: IncomeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated_income = income_service.update_income(
        db=db,
        income_id=income_id,
        income_data=income,
        user_id=current_user.id,
    )

    if not updated_income:
        raise HTTPException(
            status_code=404,
            detail="Income not found",
        )

    return updated_income


@router.delete("/{income_id}")
def delete_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    success = income_service.delete_income(
        db=db,
        income_id=income_id,
        user_id=current_user.id,
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Income not found",
        )

    return {
        "message": "Income deleted successfully"
    }