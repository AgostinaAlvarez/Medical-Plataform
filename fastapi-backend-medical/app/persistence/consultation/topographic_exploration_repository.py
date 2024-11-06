from app.utils.prisma import prisma
from app.models.patients.medical_consultation_models import  TopographicExplorationResponse

async def create(data: TopographicExplorationResponse):
    topographic_exploration_data = data.dict()
    del topographic_exploration_data["id"]
    topographic_exploration = await prisma.topographic_exploration.create(data=topographic_exploration_data)
    return topographic_exploration


async def findByMedicalConsultation(consultation_id: str):
    topographic_exploration = await prisma.topographic_exploration.find_first(where={"medical_consultation_id": consultation_id})
    return topographic_exploration


async def update(data:TopographicExplorationResponse):
    topographic_exploration_data = data.dict()
    id = topographic_exploration_data["id"]
    topographic_exploration = await prisma.topographic_exploration.update(where={"id" : id}, data=topographic_exploration_data)
    return topographic_exploration