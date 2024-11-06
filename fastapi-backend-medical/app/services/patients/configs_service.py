from app.persistence.configs_repository import create,findByPatientId
from app.models.patients.configs_models import ConfigsModel, ConfigsModelResponse
from app.persistence.configs_repository import edit

class ConfigsPatient:
    async def create_default_value(self,patient_id: str, user_id: str):
        data = ConfigsModel( patient_id=patient_id, user_id=user_id)
        configs = await create(data)
        return configs

    async def edit_configs(self,data):
        configs_data = data.dict(exclude={"id"})
        id = data.id
        configs = await edit(data=configs_data, id=id)
        configs = ConfigsModelResponse(**configs.dict())
        return configs
    
    async def find_by_patient_id(self, patient_id: str):
        data = await findByPatientId(patient_id=patient_id)
        configs = ConfigsModelResponse(**data.dict())
        return configs