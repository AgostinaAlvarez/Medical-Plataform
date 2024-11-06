from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.models.patients.lab_results_models import LabResultsRequest, LabResultsResponse

class BaseResponseModelStr(BaseModel):
    id: Optional[str] = None

class BaseResponseModelInt(BaseModel):
    id: Optional[int] = None

class BaseResponseModelSecondaryTable(BaseModel):
    id: Optional[int] = None
    medical_consultation_id: Optional[str] = None

class MedicalConsultationRequestModel(BaseModel):
    patient_id: str
    date: datetime
    reason: str
    notes: Optional[str] = None
    medical_instructions: Optional[str] = None
    treatment_plan: Optional[str] = None

class MedicalConsultationResponseModel(BaseModel):
    id: str
    patient_id: str
    reason: Optional[str] = None
    date: datetime
    notes: Optional[str] = None
    medical_instructions: Optional[str] = None
    treatment_plan: Optional[str] = None

class MedicalConsultationItemResponseModel(BaseModel):
    id: str
    reason: Optional[str] = None
    date: datetime
    notes: Optional[str] = None
    medical_instructions: Optional[str] = None
    treatment_plan: Optional[str] = None

    patient_id: str
    patient_name: str
    patient_last_name: str
    patient_birthday: datetime
    patient_identification_type: str
    patient_identification_number: str
    patient_sex: str

"""
"patient_id": patient_data["id"],
                    "patient_name": patient_data["name"],
                    #"patient_last_name": patient_data["last_name"],
                    #"patient_birthday": patient_data["birthday"],
                    #"patient_identification_type": patient_data["identification_type"],
                    #"patient_identification_number": patient_data["identification_number"],
                    #"patient_sex": patient_data["sex"]
"""

class KetosisRequest(BaseModel):
    satiety: Optional[int] = None
    cramps: Optional[int] = None
    diarrhea: Optional[int] = None
    depressed: Optional[int] = None
    tolerance: Optional[int] = None
    constipation: Optional[int] = None
    dizziness: Optional[int] = None
    anxiety: Optional[int] = None
    irritability: Optional[int] = None
    impulse_control: Optional[int] = None
    bad_breath: Optional[int] = None
    hunger: Optional[int] = None
    sleep_problems: Optional[int] = None
    impatience: Optional[int] = None
    need_for_stimulants: Optional[int] = None
    migraine_or_headache: Optional[int] = None
    fatigue: Optional[int] = None
    concentration: Optional[int] = None
    aggressiveness: Optional[int] = None

class KetosisResponse(KetosisRequest, BaseResponseModelSecondaryTable):
    pass

class TopographicExplorationRequest(BaseModel):
    head_front_part: Optional[str] = None
    head_back_part: Optional[str] = None
    neck_front_part: Optional[str] = None
    neck_back_part: Optional[str] = None
    upper_limb_left_front_part: Optional[str] = None
    upper_limb_left_back_part: Optional[str] = None
    upper_limb_right_front_part: Optional[str] = None
    upper_limb_right_back_part: Optional[str] = None
    trunk_front_part: Optional[str] = None
    trunk_back_part: Optional[str] = None
    lower_limb_left_front_part: Optional[str] = None
    lower_limb_left_back_part: Optional[str] = None
    lower_limb_right_front_part: Optional[str] = None
    lower_limb_right_back_part: Optional[str] = None
    pelvic_area_front: Optional[str] = None
    pelvic_area_back: Optional[str] = None

class TopographicExplorationResponse(TopographicExplorationRequest, BaseResponseModelSecondaryTable):
    pass

class PhsycalExaminationRequest(BaseModel):
    digestive_system: Optional[str] = None
    reproductive_system: Optional[str] = None
    urinary_system: Optional[str] = None
    cardiac_and_vascular: Optional[str] = None
    dental: Optional[str] = None
    dermatological: Optional[str] = None
    neurological: Optional[str] = None
    osteoarticular: Optional[str] = None
    otolaryngologist: Optional[str] = None
    psychiatric_and_psychological: Optional[str] = None
    pulmonary_or_respiratory: Optional[str] = None
    lymphatic_system: Optional[str] = None

class PhsycalExaminationResponse(PhsycalExaminationRequest, BaseResponseModelSecondaryTable):
    pass

class MedicalDiagnosisItemRequest(BaseModel):
    code: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None

class MedicalDiagnosisItemResponse(MedicalDiagnosisItemRequest, BaseResponseModelSecondaryTable):
    pass

class MedicalDiagnosisListRequest(BaseModel):
    medical_consultation_id: Optional[str] = None
    previus: List[MedicalDiagnosisItemResponse] = []
    new: List[MedicalDiagnosisItemRequest] = []

class MedicalDiagnosisListResponse(BaseModel):
    update_arrays: List[MedicalDiagnosisItemResponse] = []

class LabRequestsAndImageItemRequest(BaseModel):
    name: Optional[str] = None
    notes: Optional[str] = None

class LabRequestsAndImageItemResponse(LabRequestsAndImageItemRequest, BaseResponseModelSecondaryTable):
    pass

class LabRequestsAndImageListRequest(BaseModel):
    medical_consultation_id: Optional[str] = None
    previus: List[LabRequestsAndImageItemResponse] = []
    new: List[LabRequestsAndImageItemRequest] = []

class LabRequestsAndImageListResponse(BaseModel):
    update_arrays: List[LabRequestsAndImageItemResponse] = []


class MedicalProcedureItemRequest(BaseModel):
    name: Optional[str] = None
    notes: Optional[str] = None

class MedicalProcedureItemResponse(MedicalProcedureItemRequest, BaseResponseModelSecondaryTable):
    pass

class MedicalProcedureListRequest(BaseModel):
    medical_consultation_id: Optional[str] = None
    previus: List[MedicalProcedureItemResponse] = []
    new: List[MedicalProcedureItemRequest] = []

class MedicalProcedureListResponse(BaseModel):
    update_arrays: List[MedicalProcedureItemResponse] = []

class MedicalPrescriptionRequest(BaseModel):
    medical_instructions: Optional[str] = None

class MedicalPrescriptionResponse(MedicalPrescriptionRequest, BaseResponseModelSecondaryTable):
    pass

class MedicalPrescriptionDetailRequest(BaseModel):
    name: Optional[str] = None
    dose: Optional[str] = None
    frequency: Optional[str] = None
    duration_of_treatment: Optional[str] = None

class MedicalPrescriptionDetailResponse(BaseModel):
    id: Optional[int] = None
    medical_prescription_id: Optional[int] = None
    name: Optional[str] = None
    dose: Optional[str] = None
    frequency: Optional[str] = None
    duration_of_treatment: Optional[str] = None

class MedicalPrecriptionDetailListRequest(BaseModel):
    medical_prescription_id: Optional[int] = None
    previus: List[MedicalPrescriptionDetailResponse] = []
    new: List[MedicalPrescriptionDetailRequest] = []

class MedicalPrecriptionDetailListResponse(BaseModel):
    update_arrays: List[MedicalPrescriptionDetailResponse] = []

class MedicalConsultationFullRequest(BaseModel):
    consultation: MedicalConsultationRequestModel
    ketosis: KetosisRequest
    topographic_exploration: TopographicExplorationRequest
    phsycal_examination: PhsycalExaminationRequest
    medical_diagnosis: List[MedicalDiagnosisItemRequest] = [] 
    lab_requests_and_image: List[LabRequestsAndImageItemRequest] = []
    medical_procedure: List[MedicalProcedureItemRequest] = []
    medical_prescription: MedicalPrescriptionRequest
    medical_prescription_detail: List[MedicalPrescriptionDetailRequest] = []
    lab_result_by_consultation: Optional[bool] = None
    lab_results: LabResultsRequest


class MedicalConsultationFullResponse(BaseModel):
    consultation: MedicalConsultationResponseModel
    ketosis: KetosisResponse
    topographic_exploration: TopographicExplorationResponse
    phsycal_examination: PhsycalExaminationResponse
    medical_diagnosis: List[MedicalDiagnosisItemResponse] = [] 
    lab_requests_and_image: List[LabRequestsAndImageItemResponse] = []
    medical_procedure: List[MedicalProcedureItemResponse] = []
    medical_prescription: MedicalPrescriptionResponse
    medical_prescription_detail: List[MedicalPrescriptionDetailResponse] = []
    lab_results: Optional[LabResultsResponse] = None
    




