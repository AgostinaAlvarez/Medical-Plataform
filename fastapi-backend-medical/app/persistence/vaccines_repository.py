from app.utils.prisma import prisma

async def create(data: dict):
    vaccine = await prisma.vaccines.create(data=data)
    return vaccine

async def findMany(patient_id: str ):
    vaccines = await prisma.vaccines.find_many(where={"patient_id":patient_id})
    return vaccines

async def update(data:dict, id:int):
    vaccine = await prisma.vaccines.update(where={"id":id}, data=data)
    return vaccine

async def delete(id:int):
    await prisma.vaccines.delete(where={"id":id})
    