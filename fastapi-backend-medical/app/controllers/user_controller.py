#from app.services.user_service import login, create_user
from fastapi import  HTTPException
from app.services.user_service import UserService


async def login_controller(data):
    try:
        user_service = UserService()
        response = await user_service.login(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

async def signin_controller(data):
    try:
        user_service = UserService()
        response = await user_service.signin(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))