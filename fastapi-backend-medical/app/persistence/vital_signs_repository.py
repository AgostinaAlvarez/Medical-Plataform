from app.utils.prisma import prisma
from app.models.patients.vital_signs_models import VitalSignModel

async def create(data: VitalSignModel):
    vital_signs_data = data.dict()
    vital_signs = await prisma.vital_signs.create(vital_signs_data)
    return vital_signs


async def findByPatientId(patient_id: str):
    vital_signs = await prisma.vital_signs.find_first(where={"patient_id": patient_id})
    return vital_signs


async def edit (data: dict, id: str):
    vital_signs = await prisma.vital_signs.update(where={"id": id},data=data)
    return vital_signs