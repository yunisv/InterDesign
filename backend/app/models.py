from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON
from datetime import datetime
from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_admin = Column(Boolean, default=True)


class PortfolioItem(Base):
    __tablename__ = "portfolio_items"
    id = Column(Integer, primary_key=True, index=True)
    title_ru = Column(String, default="")
    title_en = Column(String, default="")
    title_az = Column(String, default="")
    desc_ru = Column(Text, default="")
    desc_en = Column(Text, default="")
    desc_az = Column(Text, default="")
    category = Column(String, default="")   # Kitchen | Bedroom | Living | Bathroom
    images = Column(JSON, default=list)     # [filename, ...]
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String, nullable=True)
    project_type = Column(String)
    message = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class SiteSetting(Base):
    __tablename__ = "site_settings"
    key = Column(String, primary_key=True)
    value = Column(Text, default="")
