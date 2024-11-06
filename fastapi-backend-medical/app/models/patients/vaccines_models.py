from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BaseResponseModel(BaseModel):
    id: Optional[int] = None

class VaccineRequest(BaseModel):
    patient_id: str
    application_date: datetime
    next_dose: Optional[datetime] = None
    batch: Optional[str] = None
    notes: Optional[str] = None
    name: str

class VaccineResponse(VaccineRequest, BaseResponseModel):
    pass