from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required

from app.models.patients.medical_consultation_models import MedicalConsultationFullRequest, MedicalConsultationResponseModel, KetosisResponse, TopographicExplorationResponse, PhsycalExaminationResponse, MedicalDiagnosisListRequest, LabRequestsAndImageListRequest, MedicalProcedureListRequest,MedicalPrecriptionDetailListRequest, MedicalPrescriptionResponse
from app.controllers.consultation_controller import create, getAll, getAllByPatientId, getById, updateMedicalConsultation, updateKetosisRegister, updateTopographicExplorationRegister, updatePhsycalExaminationRegister, updateMedicalDiagnosisRegisters, updateLabRequestsAndImageRegisters, updateMedicalProcedureRegisters,updateMedicalPrescription, updateMedicalPrescriptionDetail

router = APIRouter()

@router.post("/consultation/create/{patient_id}")
async def consultation_create(consultation_data: MedicalConsultationFullRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await create(data=consultation_data)
    

@router.get("/consultation/get/{patient_id}/{consultation_id}")
async def consultation_get_by_id(consultation_id:str, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await getById(consultation_id=consultation_id)
    
@router.get("/consultation/all/{patient_id}")
async def consultation_get_all(patient_id:str, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await getAllByPatientId(patient_id=patient_id)


@router.get("/consultation/get_all")
async def consultation_get_all(payload: dict = Depends(auth_required)):
    return await getAll(payload=payload)

@router.put("/consultation/edit-consultation/{patient_id}")
async def consultation_edit(medical_consultation_data: MedicalConsultationResponseModel, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateMedicalConsultation(data=medical_consultation_data)


@router.put("/consultation/edit-ketosis/{patient_id}")
async def ketosis_edit(ketosis_data: KetosisResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateKetosisRegister(data=ketosis_data)


@router.put("/consultation/edit-topographic-exploration/{patient_id}")
async def topographic_exploration_edit(topographic_exploration: TopographicExplorationResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateTopographicExplorationRegister(data=topographic_exploration)



@router.put("/consultation/edit-phsycal-examination/{patient_id}")
async def phsycal_examination_edit(phsycal_examination_data: PhsycalExaminationResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updatePhsycalExaminationRegister(data=phsycal_examination_data)


@router.put("/consultation/edit-medical-diagnosis/{patient_id}")
async def medical_diagnosis_edit(medical_diagnosis_data: MedicalDiagnosisListRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateMedicalDiagnosisRegisters(data=medical_diagnosis_data)


@router.put("/consultation/edit-lab-requests-and-image/{patient_id}")
async def lab_requests_and_images_edit(lab_requests_and_images_data: LabRequestsAndImageListRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateLabRequestsAndImageRegisters(data=lab_requests_and_images_data)



@router.put("/consultation/edit-medical-procedure/{patient_id}")
async def medical_procedure_edit(lmedical_procedure_data: MedicalProcedureListRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateMedicalProcedureRegisters(data=lmedical_procedure_data)

@router.put("/consultation/edit-medical-prescription/{patient_id}")
async def medical_prescription_edit(medical_procedure_data: MedicalPrescriptionResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateMedicalPrescription(data=medical_procedure_data)


@router.put("/consultation/edit-medical-procedure-detail/{patient_id}")
async def medical_prescription_detail_edit(medical_procedure_detail_data: MedicalPrecriptionDetailListRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await updateMedicalPrescriptionDetail(data=medical_procedure_detail_data)