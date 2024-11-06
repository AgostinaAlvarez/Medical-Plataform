from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import MedicalProcedureItemResponse

async def create(data: MedicalProcedureItemResponse ):
    medical_procedure_data = data.dict()
    del medical_procedure_data["id"]
    medical_procedure = await prisma.medical_procedure.create(data=medical_procedure_data)
    return medical_procedure



async def findManyByMedicalConsultationId(consultation_id: str):
    medical_procedure = await prisma.medical_procedure.find_many(where={"medical_consultation_id": consultation_id})
    return medical_procedure


async def delete (data: MedicalProcedureItemResponse):
    medical_procedure_data = data.dict()
    id = medical_procedure_data["id"]
    id = int(id)
    await prisma.medical_procedure.delete(where={"id":id})