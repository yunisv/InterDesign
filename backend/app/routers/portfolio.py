import os
import uuid
import shutil
from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import PortfolioItem
from ..schemas import PortfolioItemCreate, PortfolioItemUpdate, PortfolioItemResponse
from .auth import get_current_user

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("", response_model=List[PortfolioItemResponse])
def list_items(db: Session = Depends(get_db)):
    return db.query(PortfolioItem).order_by(PortfolioItem.order, PortfolioItem.id).all()


@router.get("/{item_id}", response_model=PortfolioItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not item:
        raise HTTPException(404, "Not found")
    return item


@router.post("", response_model=PortfolioItemResponse)
def create_item(data: PortfolioItemCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    item = PortfolioItem(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=PortfolioItemResponse)
def update_item(item_id: int, data: PortfolioItemUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not item:
        raise HTTPException(404, "Not found")
    for key, val in data.model_dump(exclude_none=True).items():
        setattr(item, key, val)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not item:
        raise HTTPException(404, "Not found")
    db.delete(item)
    db.commit()
    return {"ok": True}


@router.post("/upload")
def upload_image(file: UploadFile = File(...), _=Depends(get_current_user)):
    ext = (file.filename or "").rsplit(".", 1)[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, "Only jpg/jpeg/png/webp allowed")
    filename = f"{uuid.uuid4()}.{ext}"
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as f:
        shutil.copyfileobj(file.file, f)
    return {"filename": filename}


@router.delete("/image/{filename}")
def delete_image(filename: str, _=Depends(get_current_user)):
    path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(path):
        os.remove(path)
    return {"ok": True}
