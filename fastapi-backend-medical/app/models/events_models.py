

from pydantic import BaseModel
from datetime import datetime, time
from typing import Optional
from app.models.patients.patient_models import Patient

class BaseResponseModelStr(BaseModel):
    id: Optional[str] = None

class BaseResponseModelInt(BaseModel):
    id: Optional[int] = None


class EventRequestModel (BaseModel):
    user_id: str
    date: datetime
    hour: time
    asocciate_patient: bool
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            time: lambda v: v.strftime("%H:%M:%S")
        }


class EventResponseModel(EventRequestModel, BaseResponseModelStr):
    pass

class EventPatientRequest (BaseModel):
    patient_id: str

class EventProspectivePatientRequest (BaseModel):
    name: str
    last_name: Optional[str] = None
    contact_number: Optional[str] = None
    email: Optional[str] = None

class EventProspectivePatientResponse (EventProspectivePatientRequest,BaseResponseModelInt):
    pass

class EventFullRequest (BaseModel):
    event: EventRequestModel
    patient: Optional[EventPatientRequest] = None
    prospective_patient: Optional[EventProspectivePatientRequest] = None


class EventFullResponse (BaseModel): 
    event: EventResponseModel
    patient: Optional[Patient] = None
    prospective_patient: Optional[EventProspectivePatientResponse] = None

