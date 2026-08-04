from sqlalchemy.orm import Session

from app.repositories.category_repository import CategoryRepository
from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
)


class CategoryService:

    @staticmethod
    def create_category(
        db: Session,
        category_data: CategoryCreate,
    ):
        existing = CategoryRepository.get_by_name(
            db,
            category_data.name,
        )

        if existing:
            raise ValueError("Category already exists")

        return CategoryRepository.create(
            db,
            category_data,
        )

    @staticmethod
    def get_categories(
        db: Session,
    ):
        return CategoryRepository.get_all(
            db,
        )

    @staticmethod
    def update_category(
        db: Session,
        category_id: int,
        category_data: CategoryUpdate,
    ):
        category = CategoryRepository.get_by_id(
            db,
            category_id,
        )

        if category is None:
            raise ValueError("Category not found")

        update_data = category_data.model_dump(
            exclude_unset=True
        )

        if (
            "name" in update_data
            and update_data["name"] != category.name
        ):
            existing = CategoryRepository.get_by_name(
                db,
                update_data["name"],
            )

            if existing:
                raise ValueError(
                    "Category already exists"
                )

        for key, value in update_data.items():
            setattr(category, key, value)

        return CategoryRepository.update(
            db,
            category,
        )

    @staticmethod
    def delete_category(
        db: Session,
        category_id: int,
    ):
        category = CategoryRepository.get_by_id(
            db,
            category_id,
        )

        if category is None:
            raise ValueError("Category not found")

        CategoryRepository.delete(
            db,
            category,
        )

        return {
            "message": "Category deleted successfully"
        }