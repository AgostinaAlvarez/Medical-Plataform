from app.utils.prisma import prisma

async def create(data: dict):
    prospective_patient = await prisma.prospective_patients.create(data=data)
    return prospective_patient


async def find_by_id(id: int):
    prospective_patient = await prisma.prospective_patients.find_unique(where={"id" : id})
    return prospective_patient
