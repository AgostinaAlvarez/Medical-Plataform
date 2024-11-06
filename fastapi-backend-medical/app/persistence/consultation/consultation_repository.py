from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import MedicalConsultationRequestModel, MedicalConsultationResponseModel

async def create(data: MedicalConsultationRequestModel, id: str ):
    consultation_data = data.dict()
    consultation_data["id"] = id
    consultation = await prisma.medical_consultation.create(data=consultation_data)
    return consultation

async def findMany(patient_id: str):
    consultations = await prisma.medical_consultation.find_many(where={"patient_id": patient_id})
    return consultations

async def findById(id: str):
    consultation = await prisma.medical_consultation.find_unique(where={"id":id})
    return consultation

async def findMany ( patient_id: str ):
    consultations = await prisma.medical_consultation.find_many(where={"patient_id": patient_id})
    return consultations

async def update(data:MedicalConsultationResponseModel):
    consultation_data = data.dict()
    id = consultation_data["id"]
    consultation = await prisma.medical_consultation.update(where={"id" : id}, data=consultation_data)
    return consultation