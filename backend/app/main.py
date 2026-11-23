from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models  # noqa: F401  (registers tables)
from .config import settings
from .database import Base, engine
from .routers import auth, learning

# Creates missing tables on startup. For schema changes later, switch to Alembic migrations.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkillPath API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(learning.router)


@app.get("/health", tags=["meta"])
def health():
    return {"status": "ok"}
