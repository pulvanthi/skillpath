# SkillPath API (FastAPI + PostgreSQL)

## 1. Create the database
Install PostgreSQL, then:

    psql -U postgres -c "CREATE DATABASE skillpath;"

## 2. Configure
    copy .env.example .env      (then edit DATABASE_URL and SECRET_KEY)

## 3. Run
    python -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    uvicorn app.main:app --reload --port 8000

Tables are created automatically on first start. Interactive docs: http://localhost:8000/docs

## Endpoints (all except register/login need `Authorization: Bearer <token>`)
- POST /auth/register, POST /auth/login, GET/DELETE /auth/me, POST /auth/change-password
- GET/PUT/DELETE /profile
- GET /progress, PUT /progress/{slug}
- GET/DELETE /quizzes/scores, POST /quizzes/{quiz_id}/score
- GET/DELETE /quizzes/attempts, POST /quizzes/{quiz_id}/attempts
- GET /notes, PUT /notes/{slug}/{lesson_id}
- GET /practice, PUT /practice/{challenge_key}
- GET/POST /activity
- GET/DELETE /projects/status, PUT /projects/{id}/done, PUT /projects/{id}/steps
- GET/POST/DELETE /bookmarks, DELETE /bookmarks/all
- GET/PUT /settings
- DELETE /me/data (reset progress, quizzes, notes, practice, activity, projects, bookmarks)

Full overview of the database, API, frontend and pending work: see `../README.md`.
Note: PostgreSQL on this machine listens on port 5433, so `DATABASE_URL` uses `:5433`.
