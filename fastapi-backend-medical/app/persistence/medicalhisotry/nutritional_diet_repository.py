from app.utils.prisma import prisma
from app.models.patients.medical_hisotry_models import NutritionalDiet

async def create(data: NutritionalDiet):
    nutritional_diet_data = data.dict()

    nutritional_diet = await prisma.nutritional_diet.create(nutritional_diet_data)
    
    return nutritional_diet


async def find_by_patient_id(patient_id: str):
    nutritional_diet = await prisma.nutritional_diet.find_first(where={"patient_id": patient_id})

    return nutritional_diet

async def update(data: dict, id: str):
    nutritional_diet = await prisma.nutritional_diet.update(where={"id" : id}, data=data)
    return nutritional_diet


