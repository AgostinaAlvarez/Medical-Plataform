from app.utils.prisma import prisma
from app.models.events_models import EventRequestModel

async def create (data: dict):
    event = await prisma.events.create(data=data)
    return event

async def findMany(user_id: str ):
    events = await prisma.events.find_many(where={"user_id":user_id})
    return events
