from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import MedicalPrescriptionResponse

async def create(data: MedicalPrescriptionResponse ):
    medical_prescription_data = data.dict()
    del medical_prescription_data["id"]
    medical_prescription = await prisma.medical_prescription.create(data=medical_prescription_data)
    return medical_prescription



async def findByMedicalConsultation(consultation_id: str):
    medical_prescription = await prisma.medical_prescription.find_first(where={"medical_consultation_id": consultation_id})
    return medical_prescription



async def update(data: MedicalPrescriptionResponse):
    medical_prescription_data = data.dict()
    id = medical_prescription_data["id"]
    medical_prescription = await prisma.medical_prescription.update(where={"id" : id}, data=medical_prescription_data)
    return medical_prescription

