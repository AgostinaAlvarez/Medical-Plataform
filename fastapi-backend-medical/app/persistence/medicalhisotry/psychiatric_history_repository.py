from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import PsychiatricHistory

async def create(data: PsychiatricHistory):
    psychiatric_history_data = data.dict()

    psychiatric_history = await prisma.psychiatric_history.create(psychiatric_history_data)
    
    return psychiatric_history


async def find_by_patient_id(patient_id: str):
    psychiatric_history = await prisma.psychiatric_history.find_first(where={"patient_id": patient_id})

    return psychiatric_history

async def update(data: dict, id: str):
    psychiatric_history = await prisma.psychiatric_history.update(where={"id" : id}, data=data)
    return psychiatric_history


