from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import PathologicalHistory

async def create(data: PathologicalHistory):
    pathological_history_data = data.dict()

    pathological_history = await prisma.pathological_history.create(pathological_history_data)
    
    return pathological_history


async def find_by_patient_id(patient_id: str):
    pathological_history = await prisma.pathological_history.find_first(where={"patient_id": patient_id})

    return pathological_history

async def update(data: dict, id: str):
    pathological_history = await prisma.pathological_history.update(where={"id" : id}, data=data)
    return pathological_history


