from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import SiteSetting
from ..schemas import SettingsUpdate, SettingsResponse
from .auth import get_current_user

router = APIRouter(prefix="/api/settings", tags=["settings"])

DEFAULT_SETTINGS = {
    "phone": "+1 (234) 567-890",
    "email": "hello@interior.design",
    "address": "123 Design Street, NYC 10001",
    "hours_weekday": "9:00 – 18:00",
    "hours_saturday": "10:00 – 16:00",
    "company_name": "Interior Design Studio",
    "telegram": "",
    "instagram": "",
}


@router.get("", response_model=SettingsResponse)
def get_settings(db: Session = Depends(get_db)):
    rows = db.query(SiteSetting).all()
    settings = dict(DEFAULT_SETTINGS)
    for row in rows:
        settings[row.key] = row.value
    return SettingsResponse(settings=settings)


@router.put("", response_model=SettingsResponse)
def update_settings(data: SettingsUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    for key, value in data.settings.items():
        row = db.query(SiteSetting).filter(SiteSetting.key == key).first()
        if row:
            row.value = value
        else:
            db.add(SiteSetting(key=key, value=value))
    db.commit()
    return get_settings(db)
