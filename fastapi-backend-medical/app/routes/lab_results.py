from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required

from app.models.patients.lab_results_models import LabResultsRequest

from app.controllers.lab_results_controller import create, getById, getAllByPatientId, getAll

router = APIRouter()

@router.post("/lab-results/create")
async def lab_results_create(lab_result_data: LabResultsRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await create(data=lab_result_data)



@router.get("/lab-results/get/{patient_id}/{lab_result_id}")
async def lab_result_get_by_id(lab_result_id:str, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await getById(lab_result_id=lab_result_id)

@router.get("/lab-results/all/{patient_id}")
async def lab_result_get_all_by_patient_id(patient_id:str, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await getAllByPatientId(patient_id=patient_id)

#obtener todos los resultados de laboratorio
@router.get("/lab-results/get_all")
async def lab_result_get_all(payload: dict = Depends(auth_required)):
    return await getAll(payload=payload)
