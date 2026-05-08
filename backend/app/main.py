import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import Base, engine, SessionLocal
from .models import User
from .utils.auth import hash_password
from .routers import auth, portfolio, contacts, settings

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="InterDesign API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.include_router(auth.router)
app.include_router(portfolio.router)
app.include_router(contacts.router)
app.include_router(settings.router)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if not db.query(User).first():
            admin_username = os.getenv("ADMIN_USERNAME", "admin")
            admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
            db.add(User(
                username=admin_username,
                password_hash=hash_password(admin_password),
                is_admin=True,
            ))
            db.commit()
            print(f"[startup] Created admin user: {admin_username}")
    finally:
        db.close()


@app.get("/api/health")
def health():
    return {"status": "ok"}
