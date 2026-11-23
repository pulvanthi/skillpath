
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models  # noqa: F401
from .config import settings
from .routers import auth, learning

# Temporarily disabled for deployment without PostgreSQL.
# Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkillPath API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        o.strip()
        for o in settings.cors_origins.split(",")
        if o.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(learning.router)


@app.get("/health", tags=["meta"])
def health():
    return {"status": "ok"}
