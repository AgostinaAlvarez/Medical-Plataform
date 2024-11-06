from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import MedicalPrescriptionDetailResponse

async def create(data: MedicalPrescriptionDetailResponse ):
    medical_prescription_detail_data = data.dict()
    del medical_prescription_detail_data["id"]
    medical_prescription_detail = await prisma.medical_prescription_detail.create(data=medical_prescription_detail_data)
    return medical_prescription_detail



async def findManyByMedicalPrescriptionId(medical_prescription_id: str):
    medical_prescription_detail = await prisma.medical_prescription_detail.find_many(where={"medical_prescription_id": medical_prescription_id})
    return medical_prescription_detail


async def delete (data: MedicalPrescriptionDetailResponse):
    medical_prescription_detail_data = data.dict()
    id = medical_prescription_detail_data["id"]
    id = int(id)
    await prisma.medical_prescription_detail.delete(where={"id":id})