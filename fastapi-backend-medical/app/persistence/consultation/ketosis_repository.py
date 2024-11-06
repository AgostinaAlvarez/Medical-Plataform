from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import KetosisResponse

async def create(data: KetosisResponse ):
    ketosis_data = data.dict()
    del ketosis_data["id"]
    ketosis = await prisma.ketosis.create(data=ketosis_data)
    return ketosis


async def findByMedicalConsultation(consultation_id: str):
    ketosis = await prisma.ketosis.find_first(where={"medical_consultation_id": consultation_id})
    return ketosis


async def update(data:KetosisResponse):
    ketosis_data = data.dict()
    id = ketosis_data["id"]
    ketosis = await prisma.ketosis.update(where={"id" : id}, data=ketosis_data)
    return ketosis