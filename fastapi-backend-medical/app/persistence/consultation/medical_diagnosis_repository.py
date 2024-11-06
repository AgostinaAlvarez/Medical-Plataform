from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import MedicalDiagnosisItemResponse

async def create(data: MedicalDiagnosisItemResponse ):
    medical_diagnosis_data = data.dict()
    del medical_diagnosis_data["id"]
    medical_diagnosis = await prisma.medical_diagnosis.create(data=medical_diagnosis_data)
    return medical_diagnosis


async def findManyByMedicalConsultationId(consultation_id: str):
    medical_diagnosis = await prisma.medical_diagnosis.find_many(where={"medical_consultation_id": consultation_id})
    return medical_diagnosis

async def delete (data:MedicalDiagnosisItemResponse):
    medical_diagnosis_data = data.dict()
    id = medical_diagnosis_data["id"]
    id = int(id)
    await prisma.medical_diagnosis.delete(where={"id":id})