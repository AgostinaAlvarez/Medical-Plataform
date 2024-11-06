from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import PostnatalHistory

async def create(data: PostnatalHistory):
    postnatal_history_data = data.dict()

    postnatal_history = await prisma.postnatal_history.create(postnatal_history_data)
    
    return postnatal_history


async def find_by_patient_id(patient_id: str):
    postnatal_history = await prisma.postnatal_history.find_first(where={"patient_id": patient_id})

    return postnatal_history

async def update(data: dict, id: str):
    postnatal_history = await prisma.postnatal_history.update(where={"id" : id}, data=data)
    return postnatal_history


