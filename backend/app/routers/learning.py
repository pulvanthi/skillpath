from datetime import datetime

from fastapi import APIRouter, Depends, status
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    ActivityDay,
    Bookmark,
    LessonNote,
    LessonProgress,
    PracticeProgress,
    Profile,
    ProjectStatus,
    QuizAttempt,
    QuizScore,
    User,
    UserSettings,
)
from ..schemas import (
    ActivityIn,
    AttemptIn,
    BookmarkIn,
    DoneIn,
    LessonsIn,
    NoteIn,
    PracticeIn,
    ProfileIn,
    ScoreIn,
    SettingsIn,
    StepsIn,
)
from ..security import current_user

router = APIRouter(tags=["learning"])


# ---------- profile ----------
@router.get("/profile")
def get_profile(user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = db.get(Profile, user.id)
    if not row:
        return None
    return {**row.data, "photo": row.photo}


@router.put("/profile")
def save_profile(body: ProfileIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    data = body.model_dump()
    photo = data.pop("photo")
    row = db.get(Profile, user.id) or Profile(user_id=user.id)
    row.data, row.photo = data, photo
    db.add(row)
    db.commit()
    return {**data, "photo": photo}


@router.delete("/profile", status_code=status.HTTP_204_NO_CONTENT)
def remove_profile(user: User = Depends(current_user), db: Session = Depends(get_db)):
    db.execute(delete(Profile).where(Profile.user_id == user.id))
    db.commit()


# ---------- lesson progress ----------
@router.get("/progress")
def get_progress(user: User = Depends(current_user), db: Session = Depends(get_db)):
    out: dict[str, list[str]] = {}
    for row in db.scalars(select(LessonProgress).where(LessonProgress.user_id == user.id)):
        out.setdefault(row.course_slug, []).append(row.lesson_id)
    return out


@router.put("/progress/{slug}")
def set_progress(slug: str, body: LessonsIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    ids = list(dict.fromkeys(body.lessons))
    db.execute(delete(LessonProgress).where(LessonProgress.user_id == user.id, LessonProgress.course_slug == slug))
    db.add_all(LessonProgress(user_id=user.id, course_slug=slug, lesson_id=i) for i in ids)
    db.commit()
    return {slug: ids}


# ---------- quiz scores ----------
@router.get("/quizzes/scores")
def get_scores(user: User = Depends(current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(QuizScore).where(QuizScore.user_id == user.id))
    return {r.quiz_id: {"last": r.last, "best": r.best, "attempts": r.attempts} for r in rows}


@router.delete("/quizzes/scores", status_code=status.HTTP_204_NO_CONTENT)
def reset_scores(user: User = Depends(current_user), db: Session = Depends(get_db)):
    db.execute(delete(QuizScore).where(QuizScore.user_id == user.id))
    db.commit()


@router.post("/quizzes/{quiz_id}/score")
def submit_score(quiz_id: str, body: ScoreIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = db.scalar(select(QuizScore).where(QuizScore.user_id == user.id, QuizScore.quiz_id == quiz_id))
    if not row:
        row = QuizScore(user_id=user.id, quiz_id=quiz_id, best=0, attempts=0)
    row.last = body.score
    row.best = max(row.best or 0, body.score)
    row.attempts = (row.attempts or 0) + 1
    db.add(row)
    db.commit()
    return {"last": row.last, "best": row.best, "attempts": row.attempts}


# ---------- quiz attempt history ----------
def _attempt_out(r: QuizAttempt) -> dict:
    return {
        "score": r.score,
        "correct": r.correct,
        "total": r.total,
        "answers": r.answers,
        "takenAt": r.taken_at.isoformat(),
    }


@router.get("/quizzes/attempts")
def list_attempts(user: User = Depends(current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(QuizAttempt).where(QuizAttempt.user_id == user.id).order_by(QuizAttempt.taken_at))
    out: dict[str, list[dict]] = {}
    for r in rows:
        out.setdefault(r.quiz_id, []).append(_attempt_out(r))
    return out


@router.post("/quizzes/{quiz_id}/attempts", status_code=status.HTTP_201_CREATED)
def add_attempt(quiz_id: str, body: AttemptIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = QuizAttempt(
        user_id=user.id,
        quiz_id=quiz_id,
        score=body.score,
        correct=body.correct,
        total=body.total,
        answers=body.answers,
    )
    if body.takenAt:
        try:
            row.taken_at = datetime.fromisoformat(body.takenAt.replace("Z", "+00:00"))
        except ValueError:
            pass
    db.add(row)
    db.commit()
    return _attempt_out(row)


@router.delete("/quizzes/attempts", status_code=status.HTTP_204_NO_CONTENT)
def reset_attempts(user: User = Depends(current_user), db: Session = Depends(get_db)):
    db.execute(delete(QuizAttempt).where(QuizAttempt.user_id == user.id))
    db.commit()


# ---------- lesson notes ----------
@router.get("/notes")
def list_notes(user: User = Depends(current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(LessonNote).where(LessonNote.user_id == user.id))
    return {f"{r.course_slug}::{r.lesson_id}": r.text for r in rows}


@router.put("/notes/{slug}/{lesson_id}")
def save_note(slug: str, lesson_id: str, body: NoteIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = db.scalar(
        select(LessonNote).where(
            LessonNote.user_id == user.id, LessonNote.course_slug == slug, LessonNote.lesson_id == lesson_id
        )
    )
    if not body.text.strip():
        if row:
            db.delete(row)
            db.commit()
        return {"text": ""}
    row = row or LessonNote(user_id=user.id, course_slug=slug, lesson_id=lesson_id)
    row.text = body.text
    db.add(row)
    db.commit()
    return {"text": row.text}


# ---------- practice progress ----------
@router.get("/practice")
def list_practice(user: User = Depends(current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(PracticeProgress).where(PracticeProgress.user_id == user.id))
    return {r.challenge_key: {"code": r.code, "solved": r.solved} for r in rows}


@router.put("/practice/{challenge_key}")
def save_practice(challenge_key: str, body: PracticeIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = db.scalar(
        select(PracticeProgress).where(PracticeProgress.user_id == user.id, PracticeProgress.challenge_key == challenge_key)
    ) or PracticeProgress(user_id=user.id, challenge_key=challenge_key)
    row.code, row.solved = body.code, body.solved
    db.add(row)
    db.commit()
    return {"code": row.code, "solved": row.solved}


# ---------- activity (streaks) ----------
@router.get("/activity")
def list_activity(user: User = Depends(current_user), db: Session = Depends(get_db)):
    return list(db.scalars(select(ActivityDay.day).where(ActivityDay.user_id == user.id).order_by(ActivityDay.day)))


@router.post("/activity", status_code=status.HTTP_201_CREATED)
def add_activity(body: ActivityIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    exists = db.scalar(select(ActivityDay).where(ActivityDay.user_id == user.id, ActivityDay.day == body.day))
    if not exists:
        db.add(ActivityDay(user_id=user.id, day=body.day))
        db.commit()
    return {"day": body.day}


# ---------- projects ----------
def _project(db: Session, user_id: int, project_id: str) -> ProjectStatus:
    row = db.scalar(select(ProjectStatus).where(ProjectStatus.user_id == user_id, ProjectStatus.project_id == project_id))
    return row or ProjectStatus(user_id=user_id, project_id=project_id, done=False, steps=[])


@router.get("/projects/status")
def project_status(user: User = Depends(current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(ProjectStatus).where(ProjectStatus.user_id == user.id))
    return {r.project_id: {"done": r.done, "steps": r.steps} for r in rows}


@router.put("/projects/{project_id}/done")
def set_done(project_id: str, body: DoneIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = _project(db, user.id, project_id)
    row.done = body.done
    db.add(row)
    db.commit()
    return {"done": row.done, "steps": row.steps}


@router.put("/projects/{project_id}/steps")
def set_steps(project_id: str, body: StepsIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = _project(db, user.id, project_id)
    row.steps = sorted(set(body.steps))
    db.add(row)
    db.commit()
    return {"done": row.done, "steps": row.steps}


@router.delete("/projects/status", status_code=status.HTTP_204_NO_CONTENT)
def reset_projects(user: User = Depends(current_user), db: Session = Depends(get_db)):
    """Clears the done flag and milestones of every project (Settings > Reset projects)."""
    db.execute(delete(ProjectStatus).where(ProjectStatus.user_id == user.id))
    db.commit()


# ---------- bookmarks ----------
@router.get("/bookmarks")
def list_bookmarks(user: User = Depends(current_user), db: Session = Depends(get_db)):
    return list(db.scalars(select(Bookmark.title).where(Bookmark.user_id == user.id).order_by(Bookmark.created_at)))


@router.post("/bookmarks", status_code=status.HTTP_201_CREATED)
def add_bookmark(body: BookmarkIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    exists = db.scalar(select(Bookmark).where(Bookmark.user_id == user.id, Bookmark.title == body.title))
    if not exists:
        db.add(Bookmark(user_id=user.id, title=body.title))
        db.commit()
    return {"title": body.title}


@router.delete("/bookmarks", status_code=status.HTTP_204_NO_CONTENT)
def remove_bookmark(title: str, user: User = Depends(current_user), db: Session = Depends(get_db)):
    db.execute(delete(Bookmark).where(Bookmark.user_id == user.id, Bookmark.title == title))
    db.commit()


@router.delete("/bookmarks/all", status_code=status.HTTP_204_NO_CONTENT)
def reset_bookmarks(user: User = Depends(current_user), db: Session = Depends(get_db)):
    """Removes every bookmark (Settings > Reset bookmarks)."""
    db.execute(delete(Bookmark).where(Bookmark.user_id == user.id))
    db.commit()


# ---------- settings ----------
@router.get("/settings")
def get_settings(user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = db.get(UserSettings, user.id)
    return row.data if row else {"goal": "", "dailyMinutes": 30}


@router.put("/settings")
def save_settings(body: SettingsIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    row = db.get(UserSettings, user.id) or UserSettings(user_id=user.id)
    row.data = body.model_dump()
    db.add(row)
    db.commit()
    return row.data


@router.delete("/me/data", status_code=status.HTTP_204_NO_CONTENT)
def reset_learning_data(user: User = Depends(current_user), db: Session = Depends(get_db)):
    """Clears progress, quiz scores, projects and bookmarks but keeps the account."""
    for model in (LessonProgress, QuizScore, QuizAttempt, LessonNote, PracticeProgress, ActivityDay, ProjectStatus, Bookmark):
        db.execute(delete(model).where(model.user_id == user.id))
    db.commit()
