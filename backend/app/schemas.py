from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ── Auth ──────────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    username: str
    is_admin: bool

    class Config:
        from_attributes = True


# ── Portfolio ─────────────────────────────────────────────────────────
class PortfolioItemCreate(BaseModel):
    title_ru: str = ""
    title_en: str = ""
    title_az: str = ""
    desc_ru: str = ""
    desc_en: str = ""
    desc_az: str = ""
    category: str = ""
    images: List[str] = []
    order: int = 0


class PortfolioItemUpdate(BaseModel):
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    title_az: Optional[str] = None
    desc_ru: Optional[str] = None
    desc_en: Optional[str] = None
    desc_az: Optional[str] = None
    category: Optional[str] = None
    images: Optional[List[str]] = None
    order: Optional[int] = None


class PortfolioItemResponse(BaseModel):
    id: int
    title_ru: str
    title_en: str
    title_az: str
    desc_ru: str
    desc_en: str
    desc_az: str
    category: str
    images: List[str]
    order: int
    created_at: datetime

    class Config:
        from_attributes = True


# ── Contacts ──────────────────────────────────────────────────────────
class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    project_type: str
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    project_type: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Settings ──────────────────────────────────────────────────────────
class SettingsUpdate(BaseModel):
    settings: dict


class SettingsResponse(BaseModel):
    settings: dict
