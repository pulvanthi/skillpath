from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/skillpath"
    secret_key: str = "dev-only-change-me"
    access_token_minutes: int = 720  # normal login: 12 hours
    remember_token_minutes: int = 43200  # "keep me signed in on this device": 30 days
    cors_origins: str = "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173"


settings = Settings()
