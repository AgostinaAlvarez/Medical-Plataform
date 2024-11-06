

from fastapi import Request, HTTPException, Depends
import jwt
from jwt.exceptions import PyJWTError
from app.persistence.user_repository import find_by_id as find_user_by_id


SECRET_KEY = "secret_key"

async def auth_required(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = auth_header.replace("Bearer ", "")
    try:
        token_decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = await find_user_by_id(token_decoded["id"])
        payload = {"id":token_decoded["id"],"email": user.email }
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized User")
        
        return payload
    except PyJWTError:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    