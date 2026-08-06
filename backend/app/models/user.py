from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric
from sqlalchemy.sql import func

from app.db.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(120), unique=True, nullable=False, index=True)

    password = Column(String(255), nullable=False)

    profile_image = Column(String(255), nullable=True)

    currency = Column(String(10), default="INR")

    monthly_income = Column(Numeric(10, 2), nullable=True)

    timezone = Column(String(50), default="Asia/Kolkata")

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    expenses = relationship(
        "Expense",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    budgets = relationship(
        "Budget",
        back_populates="user",
        cascade="all, delete-orphan",
    )