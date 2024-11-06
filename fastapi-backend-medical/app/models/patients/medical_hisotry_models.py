from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Clase base que contiene el campo id
class BaseResponseModel(BaseModel):
    id: Optional[int] = None

class PathologicalHistory (BaseModel):
    patient_id: str
    previous_hospitalization: Optional[bool] = None
    previous_surgeries: Optional[bool] = None
    diabetes: Optional[bool] = None
    thyroid_diseases: Optional[bool] = None
    arterial_hypertension: Optional[bool] = None
    cardiopary: Optional[bool] = None
    trauma: Optional[bool] = None
    cancer: Optional[bool] = None
    tuberculosis: Optional[bool] = None
    transfusions: Optional[bool] = None
    respiratory_pathologies: Optional[bool] = None
    gastrointestinal_pathologies: Optional[bool] = None
    sexually_transmitted_diseases: Optional[bool] = None
    chronic_kidney_disease: Optional[bool] = None
    others: Optional[bool] = None

class PathologicalHistoryResponse(PathologicalHistory, BaseResponseModel):
    pass

class NonPathologicalHistory (BaseModel):
    patient_id: str
    physical_activity: Optional[bool] = None
    smoking: Optional[bool] = None
    alcoholism: Optional[bool] = None
    recent_vaccine_or_immunization: Optional[bool] = None
    drugs: Optional[bool] = None
    others: Optional[bool] = None

class NonPathologicalHistoryResponse(NonPathologicalHistory, BaseResponseModel):
    pass

class HereditaryFamilyHistory (BaseModel):
    patient_id: str
    diabetes: Optional[bool] = None
    heart_disease: Optional[bool] = None
    arterial_hypertension: Optional[bool] = None
    thyroid_diseases: Optional[bool] = None
    chronic_kidney_disease: Optional[bool] = None
    others: Optional[bool] = None

class HereditaryFamilyHistoryResponse(HereditaryFamilyHistory, BaseResponseModel):
    pass


class ObstetricGynecologicalHistory (BaseModel):
    patient_id: str
    first_menstruation: Optional[datetime] = None
    last_menstruation: Optional[datetime] = None
    menstruation_characteristics: Optional[str] = None
    pregnancies: Optional[bool] = None
    cervical_cancer: Optional[bool] = None
    uterine_cancer: Optional[bool] = None
    breast_cancer: Optional[bool] = None
    patients_sexual_activity: Optional[bool] = None
    hormone_replacement_therapy: Optional[bool] = None
    family_planning_method: Optional[str] = None
    last_pap_smear: Optional[datetime] = None
    last_mammography: Optional[datetime] = None
    others: Optional[bool] = None

class ObstetricGynecologicalHistoryResponse(ObstetricGynecologicalHistory, BaseResponseModel):
    pass


class PerinatalHistory (BaseModel):
    patient_id: str
    last_menstrual_cycle: Optional[datetime] = None
    cycle_duration: Optional[int] = None
    last_contraceptive_method_used: Optional[str] = None
    assisted_conception: Optional[bool] = None
    estimated_due_date_based_on_LMP: Optional[datetime] = None
    EDD: Optional[str] = None
    pregnancy_notes: Optional[str] = None

class PerinatalHistoryResponse(PerinatalHistory, BaseResponseModel):
    pass


class PostnatalHistory (BaseModel):
    patient_id: str
    birth_details: Optional[str] = None
    babys_name: Optional[str] = None
    birth_weight: Optional[float] = None
    baby_health: Optional[str] = None
    baby_feeding: Optional[str] = None
    emotional_state: Optional[str] = None

class PostnatalHistoryResponse(PostnatalHistory, BaseResponseModel):
    pass


class PsychiatricHistory (BaseModel):
    patient_id: str
    family_history: Optional[str] = None
    disease_awareness: Optional[bool] = None
    areas_affected_by_the_disease: Optional[str] = None
    past_and_current_treatments: Optional[str] = None
    support_from_the_family_or_social_group: Optional[bool] = None
    patients_family_group: Optional[str] = None
    aspects_of_social_life: Optional[str] = None
    aspects_of_working_life: Optional[str] = None
    relationship_with_authority: Optional[str] = None
    impulse_control: Optional[bool] = None
    managing_frustration: Optional[bool] = None

class PsychiatricHistoryResponse(PsychiatricHistory, BaseResponseModel):
    pass


class NutritionalDiet (BaseModel):
    patient_id: str
    breakfast: Optional[bool] = None
    snack_in_the_morning: Optional[bool] = None
    meal: Optional[bool] = None
    afternoon_snack: Optional[bool] = None
    dinner: Optional[bool] = None
    food_prepared_at_home: Optional[bool] = None
    hunger_satiety: Optional[bool] = None
    food_preference: Optional[str] = None
    food_discomfort: Optional[bool] = None
    medications_supplements: Optional[bool] = None
    other_diets_carried_out: Optional[bool] = None
    ideal_weight: Optional[int] = None
    current_weight_related_condition: Optional[bool] = None
    history_related_to_weight: Optional[bool] = None
    liquid_consumption: Optional[bool] = None
    nutrition_education: Optional[bool] = None
    appetite_level: Optional[str] = None
    water_glasses: Optional[str] = None
    others: Optional[bool] = None

class NutritionalDietResponse(NutritionalDiet, BaseResponseModel):
    pass
