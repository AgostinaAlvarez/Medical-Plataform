from fastapi import  HTTPException
from app.services.patients.configs_service import ConfigsPatient


async def edit(data):
    try:
        configs_service = ConfigsPatient()
        response = await configs_service.edit_configs(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))