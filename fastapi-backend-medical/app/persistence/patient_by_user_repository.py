from app.utils.prisma import prisma
from app.models.patients.patient_models import PatientByUser

async def create(data: PatientByUser):
    connection_data = data.dict()
    connection = await prisma.patient_by_user.create(connection_data)
    return connection

async def findConnectionByIds(patient_id: str, user_id: str):
    connection = await prisma.patient_by_user.find_first(where={"patient_id":patient_id, "user_id": user_id})
    return connection