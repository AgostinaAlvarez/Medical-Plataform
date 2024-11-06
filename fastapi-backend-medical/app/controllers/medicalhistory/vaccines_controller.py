from fastapi import  HTTPException
from app.services.patients.vaccine_service import VaccineService

async def create(data):
    try:
        vaccine_service = VaccineService()
        response = await vaccine_service.create_vaccine(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
async def edit_vaccine(data):
    try:
        vaccine_service = VaccineService()
        response = await vaccine_service.update_vaccine(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
async def delete_vaccine(data):
    try:
        vaccine_service = VaccineService()
        response = await vaccine_service.delete_vaccine(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))