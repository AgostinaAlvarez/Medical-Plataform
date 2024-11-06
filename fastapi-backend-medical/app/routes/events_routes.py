from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.middlewares.validate_patient_association import validate_association_required

from app.models.events_models import EventFullRequest
from app.controllers.events_controller import create, getAll

router = APIRouter()


@router.get("/event/get_all")
async def event_get_all(payload: dict = Depends(auth_required)):
    return await getAll(payload=payload)

@router.post("/event/create")
async def event_create(event_data: EventFullRequest, payload: dict = Depends(auth_required)):
    return await create(data=event_data)

