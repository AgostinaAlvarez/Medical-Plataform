from app.utils.prisma import prisma

async def create (data: dict):
    lab_results = await prisma.lab_results.create(data=data)
    return lab_results


async def findMany(patient_id: str ):
    lab_results = await prisma.lab_results.find_many(where={"patient_id":patient_id})
    return lab_results

async def update(data:dict, id:int):
    lab_results = await prisma.lab_results.update(where={"id":id}, data=data)
    return lab_results

async def delete(id:int):
    await prisma.lab_results.delete(where={"id":id})

async def findById(id: int):
    lab_results = await prisma.lab_results.find_unique(where={"id":id})
    return lab_results