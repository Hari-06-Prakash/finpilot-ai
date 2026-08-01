from pydantic import BaseModel, EmailStr, Field
from decimal import Decimal
from typing import Optional


class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    profile_image: Optional[str] = None
    currency: str
    monthly_income: Optional[Decimal] = None
    timezone: str
    is_active: bool

    model_config = {
        "from_attributes": True
    }