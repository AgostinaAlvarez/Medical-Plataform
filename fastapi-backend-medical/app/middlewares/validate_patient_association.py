

from fastapi import Request, HTTPException, Depends
import jwt
from jwt.exceptions import PyJWTError
from app.middlewares.auth_middleware import auth_required
from app.persistence.patient_by_user_repository import findConnectionByIds

async def validate_association_required ( request: Request, payload: dict = Depends(auth_required) ):
    patient_id = request.path_params.get("patient_id") or (await request.json()).get("patient_id") or (await request.json()).get("id")
    user_id = payload["id"]
    connection = await findConnectionByIds(patient_id=patient_id, user_id=user_id)
    if not connection:
        raise HTTPException(status_code=401, detail="Unauthorized Resource")

    return payload
    