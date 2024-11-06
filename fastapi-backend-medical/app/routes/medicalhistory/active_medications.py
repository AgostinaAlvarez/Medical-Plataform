from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required

from app.models.patients.active_medications_models import ActiveMedicationRequest, ActiveMedicationResponse

from app.controllers.medicalhistory.active_medications_controller import create, edit_active_medication, delete_active_medication


router = APIRouter()

@router.post("/active-medication/create")
async def active_medication_create(active_medication_data: ActiveMedicationRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await create(data=active_medication_data)


@router.put("/active-medication/edit")
async def active_medication_edit(active_medication_data: ActiveMedicationResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_active_medication(data=active_medication_data)


@router.delete("/active-medication/delete")
async def vactive_medication_delete(active_medication_data: ActiveMedicationResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await delete_active_medication(data=active_medication_data)
