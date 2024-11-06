from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import LabRequestsAndImageItemResponse

async def create(data: LabRequestsAndImageItemResponse ):
    lab_requests_and_image_data = data.dict()
    del lab_requests_and_image_data["id"]
    lab_requests_and_image = await prisma.lab_requests_and_image.create(data=lab_requests_and_image_data)
    return lab_requests_and_image


async def findManyByMedicalConsultationId(consultation_id: str):
    lab_requests_and_image = await prisma.lab_requests_and_image.find_many(where={"medical_consultation_id": consultation_id})
    return lab_requests_and_image



async def delete (data:LabRequestsAndImageItemResponse):
    lab_requests_and_image_data = data.dict()
    id = lab_requests_and_image_data["id"]
    id = int(id)
    await prisma.lab_requests_and_image.delete(where={"id":id})