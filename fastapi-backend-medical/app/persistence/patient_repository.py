from app.utils.prisma import prisma
from app.models.patients.patient_models import Patient

async def find_by_identification_number(id: str):
    patient = await prisma.pacientes.find_first(where={"identification_number": id})
    return patient

async def create(data: Patient):
    patient_data = data.dict()
    patient = await prisma.pacientes.create(patient_data)
    return patient


async def update(data: dict, patient_id: str):
    patient = await prisma.pacientes.update(where={"id" : patient_id}, data=data)
    return patient

async def find_by_id(id: str):
    patient = await prisma.pacientes.find_unique(where={"id" : id})
    return patient


async def findMany(user_id: str ):
    user = await prisma.patient_by_user.find_many(where={"user_id": user_id})
    return user

