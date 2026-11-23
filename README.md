# SkillPath

A learning platform for developers. Learners follow learning paths, study lessons, watch
videos, take quizzes, practise code, build projects, and earn a **badge and certificate** for
each path. Progress is saved to the learner's account.

```
Browser (React + Vite, :5173)  --HTTP/JSON + JWT-->  FastAPI (:8000)  --SQLAlchemy-->  PostgreSQL (:5433)
        |
        +--> Judge0 CE (public service) for running Python / Java / C / C++ code
        +--> YouTube embeds for video lessons
```

## 1. Database

| | |
|---|---|
| Engine | **PostgreSQL 18** (this machine listens on port **5433**; see `backend/.env`) |
| Database name | `skillpath` |
| Access | SQLAlchemy 2.0 ORM with the `psycopg2-binary` driver |
| Schema | Created automatically on backend start (`Base.metadata.create_all`) |

Tables (all rows belong to a user and are deleted with the account, `ON DELETE CASCADE`):

| Table | Holds |
|---|---|
| `users` | email, bcrypt password hash, created and password-changed dates |
| `profiles` | profile details (JSON) and photo (data URL) |
| `lesson_progress` | one row per completed lesson: user, course slug, lesson id |
| `quiz_scores` | last score, best score and attempt count per user and quiz |
| `quiz_attempts` | every quiz attempt: score, correct count, chosen answers, date |
| `lesson_notes` | the learner's note for each lesson |
| `practice_progress` | saved code and solved flag per practice challenge |
| `activity_days` | one row per day the learner studied (drives streaks) |
| `project_status` | project done flag and completed milestones |
| `bookmarks` | saved resources |
| `user_settings` | learning goal and daily minutes (JSON) |

## 2. Backend (`backend/`)

| | |
|---|---|
| Framework | **FastAPI 0.115** served by **Uvicorn 0.34** |
| Validation | Pydantic 2 (`pydantic[email]`, `pydantic-settings` reads `.env`) |
| Passwords | `bcrypt` hashes |
| Sessions | **JWT** access tokens (`PyJWT`, HS256, 12 hours by default) sent as `Authorization: Bearer <token>` |
| CORS | Allowed origins come from `CORS_ORIGINS` in `.env` |
| Interactive docs | http://localhost:8000/docs |

Files in `backend/app/`: `main.py` (app, CORS, routers), `config.py` (settings), `database.py`
(engine and session), `models.py` (tables), `schemas.py` (request bodies), `security.py`
(hashing and JWT), `routers/auth.py`, `routers/learning.py`.

### The API (SkillPath FastAPI backend, built by this project)
Every route except `register`, `login` and `health` needs a valid token.

| Area | Endpoints |
|---|---|
| Account | `POST /auth/register`, `POST /auth/login`, `GET` and `DELETE /auth/me`, `POST /auth/change-password` |
| Profile | `GET`, `PUT`, `DELETE /profile` |
| Lessons | `GET /progress`, `PUT /progress/{slug}` |
| Quizzes | `GET /quizzes/scores`, `POST /quizzes/{id}/score`, `DELETE /quizzes/scores`; `GET /quizzes/attempts`, `POST /quizzes/{id}/attempts`, `DELETE /quizzes/attempts` |
| Notes | `GET /notes`, `PUT /notes/{slug}/{lesson_id}` |
| Practice | `GET /practice`, `PUT /practice/{challenge_key}` |
| Streaks | `GET /activity`, `POST /activity` |
| Projects | `GET` and `DELETE /projects/status`, `PUT /projects/{id}/done`, `PUT /projects/{id}/steps` |
| Bookmarks | `GET`, `POST`, `DELETE /bookmarks`, `DELETE /bookmarks/all` |
| Settings | `GET`, `PUT /settings` |
| Other | `DELETE /me/data` (reset all learning data), `GET /health` |

### External services the app uses
| Service | Used for | Notes |
|---|---|---|
| **Judge0 CE** (`ce.judge0.com`) | Running Python, Java, C and C++ in the Practice page | Free public service. The learner's code is sent over the internet. Rate limits apply. |
| **YouTube embeds** (`youtube.com/embed`) | Video lessons (12 videos per path, 216 in all) | Video titles and channels were checked with YouTube oEmbed when the data was prepared. |
| Browser **Web Worker** | Running JavaScript practice code | Runs locally with a 3 second time limit. No external call. |

## 3. Frontend (`src/`)

| | |
|---|---|
| Framework | **React 19** with **Vite 6** |
| Routing | `react-router-dom` 7 |
| Icons | `lucide-react` |
| Styling | Plain CSS: `index.css`, per-page CSS files, and `buttons.css` (the one button system) |

| Folder | Contents |
|---|---|
| `pages/` | Home, LearningPaths, LearningPathDetails, Lessons, Quizzes, QuizTest, QuizHistory, Certificate, MyProgress, Practice, Projects, ProjectDetails, Resources, Bookmarks, Search, Settings, Profile |
| `components/` | Navbar, Sidebar, AuthScreen, LockScreen, NotificationBell, Badge, CongratsModal, QuizReview, LessonNote, VideoLessons, ProjectGuide and others |
| `data/` | Course content (18 paths, 4 modules each, 12 lessons each), videos, quiz bank, projects, resources |
| `utils/` | `api.js` (HTTP client), `sync.js` (localStorage to API sync), `activity.js` (streaks), `achievements.js` (badge rule), `progress.js`, `security.js`, `bookmarks.js` |

**How saving works.** Pages read and write `localStorage`. `utils/sync.js` watches those keys and
mirrors each change to the API, and loads the account's data after sign-in. The Settings reset
buttons are the exception: they call the API first and clear the browser only if the server
confirmed.

### Features
- Sign in and Create account screen shown first when nobody is signed in. When a saved login exists, a **Welcome back** start screen shows each time SkillPath is opened in a new tab or window, with Continue, "Sign in with a different account" and "Create a new account". "Keep me signed in on this device" keeps the login for 30 days (otherwise 12 hours, and it ends when the browser closes). The last email is remembered, and creating an account with an email that already exists switches to Sign in. Passwords are never stored in the browser.
- The sign-in page follows the supplied design: a branded left panel (headline, four features, illustration) and the sign-in card on the right. The illustration is `public/auth-hero-crop.png`. To use a cleaner, full-size picture, save it as `public/auth-hero.png` and it is used instead. "Continue with Google" is shown as in the design but is not built yet, so it tells the learner to use email and password.
- Change password, delete account, lock screen
- 18 learning paths with lessons, videos, resources, projects, and a lessons page with **notes**
- **Quizzes**: one per path, one question per lesson (216 questions), shuffled each attempt, pass mark 70%, explanations, score by module, lessons to revise, full attempt history
- **Badge, congratulations and certificate**: earned only when every lesson is complete **and** the quiz is passed
- **Streaks and daily goal**, with reminders in the notification bell
- Code practice with saved code and solved challenges
- Search across courses, lessons, videos, quizzes, projects and resources
- Bookmarks, profile, settings, My Progress with a badge grid
- A **save status notice** so the learner can see whether changes reached the database

## 4. Run it

PostgreSQL must be running and the `skillpath` database must exist.

```powershell
# terminal 1: backend
cd backend
.venv\Scripts\activate
pip install -r requirements.txt     # first time only
uvicorn app.main:app --reload --port 8000

# terminal 2: frontend
cd ..
npm install                          # first time only
npm run dev                          # http://localhost:5173
```

Backend settings live in `backend/.env` (copy `.env.example`): `DATABASE_URL`, `SECRET_KEY`,
`ACCESS_TOKEN_MINUTES` (normal login, default 12 hours), `REMEMBER_TOKEN_MINUTES` (optional, "keep me
signed in", default 30 days), `CORS_ORIGINS`. The frontend finds the API at `http://localhost:8000`, or
at `VITE_API_URL` if set.

## 5. Pending work

**Security (do before any real use)**
- `SECRET_KEY` falls back to a known default in `config.py`. The app should refuse to start without a real one.
- No login rate limiting or lockout, so passwords can be guessed.
- The token is kept in `localStorage`, which an XSS bug could read. An httpOnly cookie is safer.
- No password reset, email verification, or refresh tokens.
- Use HTTPS, a limited database user (not `postgres`), and real `CORS_ORIGINS` when deploying.

**Database and backend**
- No migrations. `create_all` creates missing tables but never alters existing ones, so schema changes need **Alembic**.
- No automated tests in the repository.
- No pagination, request logging or monitoring.
- No admin or content API. Courses, quizzes and videos live in `src/data/` and need a code change to edit.
- Profile photos are stored as text in the database. File storage would be better.
- Badge status is calculated from saved progress and scores rather than stored, so un-ticking a lesson removes a badge. The certificate date is kept in the browser only.

**Content**
- Only the Frontend path has detailed lesson text. The other 17 paths have lesson titles only, so their quiz questions follow the titles and the lesson page shows "notes coming soon".
- Quizzes have one question per lesson. More questions per lesson would give better coverage.
- Quiz answers for 17 paths should be reviewed by someone who knows each subject.

**Frontend**
- Saves are queued in memory. A corner notice shows "Saving...", "All changes saved" or "Could not save" with a Retry button, and the browser warns before the tab is closed with unsaved changes. But if the tab is closed or the computer is switched off while a save has failed, that change is still lost, because failed saves are not kept on disk.
- The daily study minutes setting is stored but not used. Streaks count any one activity per day.
- Practice challenges are not included in Search.
- The bundle is over 500 kB and should be code-split.
- The old per-page button styles are still in the CSS but are overridden by `buttons.css`. They should be removed.
- A stray empty `src/App.js` sits next to `App.jsx`.
- No accessibility audit or full mobile check yet. The UI has been tested in a simulated browser, not by hand on real devices.

**Code practice**
- Python, Java, C and C++ depend on the public Judge0 service, which can be slow, rate-limited or down. Consider running your own Judge0 or proxying it through the backend.

**Deployment**
- No deployment setup (no Dockerfile, CI, environment configuration or hosting plan), and the project is not in git yet.
