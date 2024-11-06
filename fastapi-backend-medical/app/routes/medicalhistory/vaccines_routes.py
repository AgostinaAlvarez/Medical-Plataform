from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required

from app.models.patients.vaccines_models import VaccineRequest, VaccineResponse
from app.controllers.medicalhistory.vaccines_controller import create, edit_vaccine, delete_vaccine

router = APIRouter()

@router.post("/vaccine/create")
async def vaccine_create(vaccine_data: VaccineRequest, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await create(data=vaccine_data)


@router.put("/vaccine/edit")
async def vaccine_edit(vaccine_data: VaccineResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_vaccine(data=vaccine_data)


@router.delete("/vaccine/delete")
async def vaccine_delete(vaccine_data: VaccineResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await delete_vaccine(data=vaccine_data)
