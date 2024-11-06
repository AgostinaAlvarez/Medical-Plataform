from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import ObstetricGynecologicalHistory

async def create(data: ObstetricGynecologicalHistory):
    obstetric_gynecological_history_data = data.dict()

    obstetric_gynecological_history = await prisma.obstetric_gynecological_history.create(obstetric_gynecological_history_data)
    
    return obstetric_gynecological_history


async def find_by_patient_id(patient_id: str):
    obstetric_gynecological_history = await prisma.obstetric_gynecological_history.find_first(where={"patient_id": patient_id})

    return obstetric_gynecological_history

async def update(data: dict, id: str):
    obstetric_gynecological_history = await prisma.obstetric_gynecological_history.update(where={"id" : id}, data=data)
    return obstetric_gynecological_history


