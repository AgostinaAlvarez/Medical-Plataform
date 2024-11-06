from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required
from app.models.patients.medical_hisotry_models import PathologicalHistoryResponse, NonPathologicalHistoryResponse, HereditaryFamilyHistoryResponse, ObstetricGynecologicalHistoryResponse, PerinatalHistoryResponse, PostnatalHistoryResponse, PsychiatricHistoryResponse, NutritionalDietResponse

from app.controllers.medicalhistory.health_history_controller import edit_pathological_history, edit_non_pathological_history, edit_hereditary_family_history, edit_obstetric_gynecological_history, edit_perinatal_history, edit_postnatal_history, edit_psychiatric_history, edit_nutritional_diet

router = APIRouter()


@router.put("/pathological_history/update")
async def edit_patient(pathological_history_data: PathologicalHistoryResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_pathological_history(data=pathological_history_data)



@router.put("/non_pathological_history/update")
async def edit_patient(non_pathological_history_data: NonPathologicalHistoryResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_non_pathological_history(data=non_pathological_history_data)



@router.put("/hereditary_family_history/update")
async def edit_patient(hereditary_family_history_data: HereditaryFamilyHistoryResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_hereditary_family_history(data=hereditary_family_history_data)


@router.put("/obstetric_gynecological_history/update")
async def edit_patient(obstetric_gynecological_history_data: ObstetricGynecologicalHistoryResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_obstetric_gynecological_history(data=obstetric_gynecological_history_data)

@router.put("/perinatal_history/update")
async def edit_patient(perinatal_history_data: PerinatalHistoryResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_perinatal_history(data=perinatal_history_data)

@router.put("/postnatal_history/update")
async def edit_patient(postnatal_history_data: PostnatalHistoryResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_postnatal_history(data=postnatal_history_data)

@router.put("/psychiatric_history/update")
async def edit_patient(psychiatric_history_data: PsychiatricHistoryResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_psychiatric_history(data=psychiatric_history_data)


@router.put("/nutritional_diet/update")
async def edit_patient(nutritional_diet_data: NutritionalDietResponse, payload: dict = Depends(auth_required), patient_association: dict = Depends(validate_association_required)):
    return await edit_nutritional_diet(data=nutritional_diet_data)
