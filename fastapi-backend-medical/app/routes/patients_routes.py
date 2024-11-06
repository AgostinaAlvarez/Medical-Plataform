
from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required

from app.models.patients.patient_models import PatientRequest, PatientUpdate
from app.controllers.patient_controller import create,getAll,getById,edit


router = APIRouter()

@router.post("/patient/create")
async def patient_create(patient_data: PatientRequest, payload: dict = Depends(auth_required)):
    return await create(data=patient_data)

@router.get("/patient/get/all")
async def get_all_patients(payload: dict = Depends(auth_required)):
    return await getAll(payload=payload)

@router.get("/patient/get/{patient_id}")
async def get_patient(
    patient_id: str, 
    payload: dict = Depends(auth_required),
    patient_association: dict = Depends(validate_association_required)
    ):
    return await getById(patient_id=patient_id)
    
@router.put("/patient/edit")
async def edit_patient(patient_data: PatientUpdate, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit(data=patient_data)
    
