from fastapi import  HTTPException
from app.services.events_service import EventsService

async def create (data):
    try:
        event_service = EventsService()
        response = await event_service.create_new_event(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

async def getAll(payload):
    try:
        event_service = EventsService()
        response = await event_service.get_all_events(payload=payload)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
