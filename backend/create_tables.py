from app.db.database import Base, engine

# Import all models so SQLAlchemy knows about them
import app.models.user
import app.models.category
import app.models.expense
import app.models.budget
import app.models.income

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Done!")