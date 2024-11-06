from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PatientRequest(BaseModel):
    user_id: str
    name: str
    last_name: str
    birthday: datetime
    sex: str
    email: Optional[str] = None
    phone: Optional[str] = None
    identification_type: str
    identification_number: str
    adress: Optional[str] = None
    country: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    zip_code: Optional[str] = None
    outer_number: Optional[str] = None
    internal_number: Optional[str] = None

class PatientUpdate(BaseModel):
    id: str
    name: Optional[str] = None
    last_name: Optional[str] = None
    birthday: Optional[datetime] = None
    sex: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    identification_type: str
    identification_number: str
    adress: Optional[str] = None
    country: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    zip_code: Optional[str] = None
    outer_number: Optional[str] = None
    internal_number: Optional[str] = None

class Patient(BaseModel):
    id: str
    name: str
    last_name: str
    birthday: datetime
    sex: str
    email: Optional[str] = None
    phone: Optional[str] = None
    identification_type: str
    identification_number: str
    adress: Optional[str] = None
    country: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    zip_code: Optional[str] = None
    outer_number: Optional[str] = None
    internal_number: Optional[str] = None

class PatientByUser(BaseModel):
    id: str
    user_id: str
    patient_id: str