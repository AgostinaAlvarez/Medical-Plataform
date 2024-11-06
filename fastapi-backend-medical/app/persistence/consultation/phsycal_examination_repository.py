from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import PhsycalExaminationRequest, PhsycalExaminationResponse

async def create(data: PhsycalExaminationResponse ):
    phsycal_examination_data = data.dict()
    del phsycal_examination_data["id"]
    phsycal_examination = await prisma.phsycal_examination.create(data=phsycal_examination_data)
    return phsycal_examination



async def findByMedicalConsultation(consultation_id: str):
    phsycal_examination = await prisma.phsycal_examination.find_first(where={"medical_consultation_id": consultation_id})
    return phsycal_examination



async def update(data:PhsycalExaminationResponse):
    phsycal_examination_data = data.dict()
    id = phsycal_examination_data["id"]
    phsycal_examination = await prisma.phsycal_examination.update(where={"id" : id}, data=phsycal_examination_data)
    return phsycal_examination