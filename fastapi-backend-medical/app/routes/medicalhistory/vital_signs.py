from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required

from app.models.patients.vital_signs_models import VitalSignModel, VitalSignResponse
from app.models.patients.configs_models import ConfigsModelResponse

from app.controllers.medicalhistory.vital_signs_controller import edit
from app.controllers.medicalhistory.configs_controller import edit as edit_configs
from fastapi import  HTTPException


router = APIRouter()


#edita los signos vitales 
@router.put("/vital-signs/update")
async def edit_patient(vital_sign_data: VitalSignResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit(data=vital_sign_data)


#edita las configuraciones de los signos vitales 
@router.put("/vital-signs-config/update")
async def edit_patient(configs_data: ConfigsModelResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_configs(data=configs_data)