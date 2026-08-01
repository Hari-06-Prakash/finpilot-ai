from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    ForeignKey,
    Numeric,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    amount = Column(Numeric(10, 2), nullable=False)

    description = Column(String(500), nullable=True)

    expense_date = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    merchant = Column(String(255), nullable=True)

    payment_method = Column(String(50), nullable=True)

    receipt_image = Column(String(255), nullable=True)

    is_ai_generated = Column(Boolean, default=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    user = relationship("User", back_populates="expenses")

    category = relationship("Category", back_populates="expenses")