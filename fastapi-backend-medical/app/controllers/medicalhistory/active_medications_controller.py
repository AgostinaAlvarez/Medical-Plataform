from fastapi import  HTTPException
from app.services.patients.active_medications_service import ActiveMedicationService

async def create(data):
    try:
        active_medication_service = ActiveMedicationService()
        response = await active_medication_service.create_active_medication(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

 
async def edit_active_medication(data):
    try:
        active_medication_service = ActiveMedicationService()
        response = await active_medication_service.update_active_medication(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
async def delete_active_medication(data):
    try:
        active_medication_service = ActiveMedicationService()
        response = await active_medication_service.delete_active_medication(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))