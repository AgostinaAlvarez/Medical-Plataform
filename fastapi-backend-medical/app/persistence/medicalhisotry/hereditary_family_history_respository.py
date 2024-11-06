from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import HereditaryFamilyHistory

async def create(data: HereditaryFamilyHistory):
    hereditary_family_history_data = data.dict()
    hereditary_family_history = await prisma.hereditary_family_history.create(hereditary_family_history_data)
    return hereditary_family_history


async def find_by_patient_id(patient_id: str):
    hereditary_family_history = await prisma.hereditary_family_history.find_first(where={"patient_id": patient_id})
    return hereditary_family_history

async def update(data: dict, id: str):
    hereditary_family_history = await prisma.hereditary_family_history.update(where={"id" : id}, data=data)
    return hereditary_family_history
