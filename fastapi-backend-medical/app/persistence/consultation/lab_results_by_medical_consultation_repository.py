from app.utils.prisma import prisma

async def findByMedicalConsultationId (medical_consultation_id: str):
    lab_result_by_consultation = await prisma.lab_results_by_medical_consultation.find_first(where={"medical_consultation_id":medical_consultation_id })
    return lab_result_by_consultation


async def findByLabResultId (lab_result_id: int):
    lab_result_by_consultation = await prisma.lab_results_by_medical_consultation.find_first(where={"lab_result_id":lab_result_id })
    return lab_result_by_consultation

async def create (data ):
    lab_result_by_consultation = await prisma.lab_results_by_medical_consultation.create(data=data)
    return lab_result_by_consultation