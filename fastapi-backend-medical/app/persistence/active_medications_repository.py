from app.utils.prisma import prisma

async def create(data: dict):
    active_medication = await prisma.active_medications.create(data=data)
    return active_medication

async def findMany(patient_id: str ):
    active_medication = await prisma.active_medications.find_many(where={"patient_id":patient_id})
    return active_medication

async def update(data:dict, id:int):
    active_medication = await prisma.active_medications.update(where={"id":id}, data=data)
    return active_medication

async def delete(id:int):
    await prisma.active_medications.delete(where={"id":id})
    