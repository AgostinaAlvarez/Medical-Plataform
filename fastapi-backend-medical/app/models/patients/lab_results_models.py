from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BaseResponseModel(BaseModel):
    id: Optional[int] = None

class MedicalConsultationId(BaseModel):
    medical_consultation_id: Optional[str] = None

class LabResultsRequest(BaseModel):
    patient_id: str
    erythrocytes: Optional[float] = None
    hematocrit: Optional[float] = None
    hemoglobin: Optional[float] = None
    leukocytes: Optional[float] = None
    platelets: Optional[float] = None
    reticulocytes: Optional[float] = None
    blood_urea_nitrogen: Optional[float] = None
    co2: Optional[float] = None
    serum_chloride: Optional[float] = None
    serum_potassium: Optional[float] = None
    serum_sodium: Optional[float] = None
    creatinine: Optional[float] = None
    calcium: Optional[float] = None
    blood_glucose: Optional[float] = None
    glucose_result_origin: Optional[str] = None
    strips_for_diabetes_detection_in_healthy_pregnant_women: Optional[str] = None
    total_cholesterol: Optional[float] = None
    vldl_cholesterol: Optional[float] = None
    ldl_cholesterol: Optional[float] = None
    hdl_cholesterol: Optional[float] = None
    triglycerides: Optional[float] = None
    glycated_hemoglobin: Optional[float] = None
    hiv_gen3: Optional[str] = None
    hiv_gen4: Optional[str] = None
    hepaA_IgG_IgM: Optional[str] = None
    hepB_AS: Optional[str] = None
    hepB_CoreAB: Optional[str] = None
    syphilis_Ab: Optional[str] = None
    h_pylori_b: Optional[str] = None
    gonorrhea_Ab: Optional[str] = None
    chlamydia_Ab: Optional[str] = None
    elisa_gen3: Optional[str] = None
    elisa_gen4: Optional[str] = None
    hiv_viral_load: Optional[float] = None
    tb_detection: Optional[str] = None
    tb_rif_resistance: Optional[str] = None
    hepB_viral_load: Optional[float] = None
    hepC_viral_load: Optional[float] = None
    hpv_pcr: Optional[str] = None
    covid_19_test: Optional[str] = None
    influenza_test: Optional[str] = None
    prostate_specific_antigen: Optional[str] = None
    ekg_kardias: Optional[str] = None
    urine_leukocytes: Optional[str] = None
    nitrites: Optional[str] = None
    urobilinogen: Optional[str] = None
    proteins: Optional[str] = None
    ph: Optional[str] = None
    blood: Optional[str] = None
    specific_gravity: Optional[str] = None
    ketones: Optional[str] = None
    bilirubin: Optional[str] = None
    glucose: Optional[str] = None
    laboratory: Optional[str] = None
    date: Optional[datetime] = None
    vdrl_quantity: Optional[float] = None
    vdrl_test_result: Optional[str] = None
    fasting_glucose_measurement: Optional[str] = None
    reason: Optional[str] = None


class LabResultsResponse(LabResultsRequest, BaseResponseModel):
    pass

class LabReusltResponseDetail(LabResultsRequest,BaseResponseModel,MedicalConsultationId):
    pass

class LabResultItem(BaseModel):
    id: int
    patient_id: str
    medical_consultation_id: Optional[str] = None
    date: Optional[datetime] = None
    reason: Optional[str] = None


class LabResultAllRegistersItem(BaseModel):
    patient_name: str
    patient_last_name: str
    patient_birthday: datetime
    patient_identification_type: str
    patient_identification_number: str
    patient_sex: str


class LabResultAllRegistersItemResponse(LabResultItem, LabResultAllRegistersItem):
    pass