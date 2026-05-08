from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import ContactSubmission
from ..schemas import ContactCreate, ContactResponse
from .auth import get_current_user

router = APIRouter(prefix="/api/contacts", tags=["contacts"])


@router.post("", response_model=ContactResponse)
def create_contact(data: ContactCreate, db: Session = Depends(get_db)):
    submission = ContactSubmission(**data.model_dump())
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.get("", response_model=List[ContactResponse])
def list_contacts(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return db.query(ContactSubmission).order_by(ContactSubmission.created_at.desc()).all()


@router.patch("/{contact_id}/read")
def mark_read(contact_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
    if not contact:
        raise HTTPException(404, "Not found")
    contact.is_read = True
    db.commit()
    return {"ok": True}


@router.delete("/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
    if not contact:
        raise HTTPException(404, "Not found")
    db.delete(contact)
    db.commit()
    return {"ok": True}
