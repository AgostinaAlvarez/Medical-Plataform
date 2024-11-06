from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class VitalSignModel(BaseModel):
    patient_id: str
    stature: Optional[float] = None
    weight: Optional[float] = None
    body_mass: Optional[float] = None
    temperature: Optional[float] = None
    respiratory_rate: Optional[float] = None
    systolic: Optional[float] = None
    diastolic: Optional[float] = None
    heart_rate: Optional[float] = None
    body_fat_percentage: Optional[float] = None
    muscle_mass: Optional[float] = None
    head_circumference: Optional[float] = None
    oxygen_saturation: Optional[float] = None
    water_percentage: Optional[float] = None
    visceral_fat_percentage: Optional[float] = None
    bones: Optional[float] = None
    metabolism: Optional[float] = None
    protein_percentage: Optional[float] = None
    body_age: Optional[float] = None
    abdominal_perimeter: Optional[float] = None

class VitalSignResponse(VitalSignModel):
    id: Optional[int] = None