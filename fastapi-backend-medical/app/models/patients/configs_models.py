from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ConfigsModel(BaseModel):
    user_id: str
    patient_id: str
    stature: Optional[int] = 1
    show_weight: Optional[int] = 1
    show_body_mass: Optional[int] = 1
    show_temperature: Optional[int] = 1
    show_respiratory_rate: Optional[int] = 1
    show_systolic: Optional[int] = 1
    show_diastolic: Optional[int] = 1
    show_heart_rate: Optional[int] = 1
    show_body_fat_percentage: Optional[int] = 1
    show_muscle_mass: Optional[int] = 1
    show_head_circumference: Optional[int] = 1
    show_oxygen_saturation: Optional[int] = 1
    show_water_percentage: Optional[int] = 0
    show_visceral_fat_percentage: Optional[int] = 0
    show_bones: Optional[int] = 0
    show_metabolism: Optional[int] = 0
    show_protein_percentage: Optional[int] = 0
    show_body_age: Optional[int] = 0
    show_abdominal_perimeter: Optional[int] = 0

class ConfigsModelResponse(ConfigsModel):
    id: Optional[int] = None