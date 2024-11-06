from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import NonPathologicalHistory

async def create(data: NonPathologicalHistory):
    non_pathological_history_data = data.dict()

    non_pathological_history = await prisma.non_pathological_history.create(non_pathological_history_data)
    
    return non_pathological_history


async def find_by_patient_id(patient_id: str):
    non_pathological_history = await prisma.non_pathological_history.find_first(where={"patient_id": patient_id})

    return non_pathological_history

async def update(data: dict, id: str):
    non_pathological_history = await prisma.non_pathological_history.update(where={"id" : id}, data=data)
    return non_pathological_history


