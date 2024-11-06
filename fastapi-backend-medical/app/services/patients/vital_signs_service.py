from app.persistence.vital_signs_repository import create, findByPatientId, edit
from app.models.patients.vital_signs_models import  VitalSignModel, VitalSignResponse


class VitalSigns:
    async def update(self, patient_id:str):
        data = VitalSignModel( patient_id=patient_id)
        vital_sign = await create(data)
        return vital_sign

    async def edit_vital_sign(self, data):
        vital_signs_data = data.dict(exclude={"id"})
        id = data.id
        vital_sign = await edit(data=vital_signs_data, id=id)
        vital_sign = VitalSignResponse(**vital_sign.dict())
        return vital_sign


    async def find_by_patient_id(self,patient_id: str):
        data = await findByPatientId(patient_id=patient_id)
        vital_signs = VitalSignResponse(**data.dict())
        return vital_signs