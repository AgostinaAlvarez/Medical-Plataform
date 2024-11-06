from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import PerinatalHistory

async def create(data: PerinatalHistory):
    perinatal_history_data = data.dict()

    perinatal_history = await prisma.perinatal_history.create(perinatal_history_data)
    
    return perinatal_history


async def find_by_patient_id(patient_id: str):
    perinatal_history = await prisma.perinatal_history.find_first(where={"patient_id": patient_id})

    return perinatal_history

async def update(data: dict, id: str):
    perinatal_history = await prisma.perinatal_history.update(where={"id" : id}, data=data)
    return perinatal_history


