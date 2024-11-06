from app.utils.prisma import prisma
from app.models.patients.configs_models import ConfigsModel

async def create(data: ConfigsModel):
    configs_data = data.dict()
    configs = await prisma.configs.create(configs_data)
    return configs


async def edit (data: dict, id: str):
    configs = await prisma.configs.update(where={"id": id},data=data)
    return configs


async def findByPatientId(patient_id: str):
    configs = await prisma.configs.find_first(where={"patient_id": patient_id})
    return configs