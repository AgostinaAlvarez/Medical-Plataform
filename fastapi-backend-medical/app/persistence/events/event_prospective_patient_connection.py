from app.utils.prisma import prisma

async def create(prospective_patient_id: int, event_id: str):
    connection_data = {"prospective_patient_id":prospective_patient_id,"event_id": event_id}
    connection = await prisma.event_prospective_patient.create(data=connection_data)
    return connection


async def findConnectionByEventId(event_id:str):
    connection = await prisma.event_prospective_patient.find_first(where={"event_id":event_id})
    return connection