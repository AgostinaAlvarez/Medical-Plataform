from app.utils.prisma import prisma

async def create(patient_id: str, event_id: str):
    connection_data = {"patient_id":patient_id,"event_id": event_id}
    connection = await prisma.event_patient.create(data=connection_data)
    return connection

async def findConnectionByEventId(event_id:str):
    connection = await prisma.event_patient.find_first(where={"event_id":event_id})
    return connection