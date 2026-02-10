# Math Learning Platform - Backend API

FastAPI backend for the Math Learning Platform, providing REST API endpoints for curriculum, lessons, exercises, user management, and progress tracking.

## Features

- **FastAPI** - Modern, fast web framework for building APIs
- **PostgreSQL** - Robust relational database for data persistence
- **SQLAlchemy** - ORM for database interactions
- **Alembic** - Database migrations
- **JWT Authentication** - Secure user authentication
- **Pydantic** - Data validation and serialization
- **Docker** - Containerized deployment

## Project Structure

```
backend/
├── app/
│   ├── api/v1/          # API endpoints
│   ├── models/          # SQLAlchemy ORM models
│   ├── schemas/         # Pydantic schemas
│   ├── services/        # Business logic
│   ├── middleware/      # Auth, CORS, etc.
│   ├── utils/           # Helper functions
│   ├── config.py        # Configuration
│   ├── database.py      # Database setup
│   └── main.py          # FastAPI app
├── alembic/             # Database migrations
├── scripts/             # Utility scripts
├── tests/               # Test suite
├── requirements.txt     # Python dependencies
├── Dockerfile           # Container image
└── .env.example         # Environment template
```

## Setup

### Prerequisites

- Python 3.11+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Local Development

1. **Create virtual environment:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Setup environment variables:**
```bash
cp .env.example .env
# Edit .env with your database credentials and secret key
```

4. **Run database migrations:**
```bash
alembic upgrade head
```

5. **Start the server:**
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Docker Development

1. **Start all services:**
```bash
# From project root
docker-compose up -d
```

2. **Run migrations:**
```bash
docker-compose exec backend alembic upgrade head
```

3. **View logs:**
```bash
docker-compose logs -f backend
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

### Curriculum
- `GET /api/v1/curriculum` - Get all domains and topics
- `GET /api/v1/curriculum/domains/{slug}` - Get specific domain

### Lessons
- `GET /api/v1/lessons/{slug}?locale=en` - Get lesson content
- `GET /api/v1/lessons/{slug}/exercises` - Get lesson exercises

### Exercises
- `POST /api/v1/exercises/{id}/submit` - Submit exercise answer

### Progress
- `GET /api/v1/progress/overview` - Get user progress
- `POST /api/v1/progress/lessons/{id}` - Update lesson progress
- `GET /api/v1/progress/recommendations` - Get AI recommendations

### Translations
- `GET /api/v1/translations/{locale}` - Get all translations
- `GET /api/v1/translations/{locale}/{namespace}` - Get namespace translations

### Admin (requires admin role)
- `POST /api/v1/admin/lessons` - Create lesson
- `PUT /api/v1/admin/lessons/{id}` - Update lesson
- `DELETE /api/v1/admin/lessons/{id}` - Delete lesson
- `GET /api/v1/admin/analytics` - Get platform analytics

## Database Migrations

### Create a new migration:
```bash
alembic revision --autogenerate -m "Description of changes"
```

### Apply migrations:
```bash
alembic upgrade head
```

### Rollback migration:
```bash
alembic downgrade -1
```

## Testing

Run tests with pytest:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=app tests/
```

## Environment Variables

Key environment variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret key (generate with `openssl rand -hex 32`)
- `ALGORITHM` - JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time
- `CORS_ORIGINS` - Allowed CORS origins
- `ENVIRONMENT` - development/production

## Production Deployment

1. Set strong `SECRET_KEY` in production
2. Use production-grade PostgreSQL instance
3. Set `ENVIRONMENT=production`
4. Configure CORS origins appropriately
5. Use HTTPS
6. Set up proper logging and monitoring
7. Use gunicorn/uvicorn with workers:
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

## License

Apache-2.0 (code), CC BY-SA 4.0 (content)
