from pydantic import BaseModel, EmailStr, Field


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    remember: bool = False  # keep the learner signed in for longer on this device


class LoginIn(BaseModel):
    email: EmailStr
    password: str
    remember: bool = False


class ChangePasswordIn(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=128)


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: EmailStr


class ProfileIn(BaseModel):
    firstName: str = Field(min_length=1, max_length=50)
    lastName: str = Field(min_length=1, max_length=50)
    headline: str = Field(default="", max_length=60)
    biography: str = Field(default="", max_length=1000)
    language: str = "English (US)"
    website: str = ""
    facebook: str = ""
    instagram: str = ""
    linkedin: str = ""
    tiktok: str = ""
    x: str = ""
    youtube: str = ""
    photo: str = Field(default="", max_length=3_000_000)


class LessonsIn(BaseModel):
    lessons: list[str]


class ScoreIn(BaseModel):
    score: float = Field(ge=0, le=100)


class DoneIn(BaseModel):
    done: bool


class StepsIn(BaseModel):
    steps: list[int]


class BookmarkIn(BaseModel):
    title: str = Field(min_length=1, max_length=255)


class SettingsIn(BaseModel):
    goal: str = Field(default="", max_length=200)
    dailyMinutes: int = Field(default=30, ge=0, le=1440)


class AttemptIn(BaseModel):
    score: float = Field(ge=0, le=100)
    correct: int = Field(ge=0, le=1000)
    total: int = Field(ge=0, le=1000)
    answers: list[int | None] = Field(default_factory=list, max_length=1000)
    takenAt: str | None = Field(default=None, max_length=40)


class NoteIn(BaseModel):
    text: str = Field(max_length=20000)


class PracticeIn(BaseModel):
    code: str = Field(default="", max_length=50000)
    solved: bool = False


class ActivityIn(BaseModel):
    day: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")
