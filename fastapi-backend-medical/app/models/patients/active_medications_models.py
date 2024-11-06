from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BaseResponseModel(BaseModel):
    id: Optional[int] = None

class ActiveMedicationRequest(BaseModel):
    patient_id: str
    name: str
    dose: Optional[int] = None
    dose_measurement: Optional[str] = None
    frequency: Optional[str] = None
    administration_route: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    duration_of_treatment: Optional[int] = None
    duration_of_treatment_measurement: Optional[str] = None
    indications: Optional[str] = None
    side_effects: Optional[str] = None
    medication_status: Optional[str] = None
    notes: Optional[str] = None

"""
{
    "patient_id":"patient-9d336a18-1faa-440c-a98d-718f541a8108",
    "name": "un medicamento",
    "dose": null,
    "dose_measurement":null,
    "frequency": null,
    "administration_route":null,
    "start_date":"2024-10-10",
    "end_date" :null,
    "duration_of_treatment": null,
    "duration_of_treatment_measurement":null,
    "indications" : null,
    "side_effects": null,
    "medication_status": null,
    "notes":null,
    
}
"""


class ActiveMedicationResponse(ActiveMedicationRequest, BaseResponseModel):
    pass