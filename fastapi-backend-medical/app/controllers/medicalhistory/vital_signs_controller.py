from fastapi import  HTTPException
from app.services.patients.vital_signs_service import VitalSigns


async def edit(data):
    try:
        vital_signs_service = VitalSigns()
        response = await vital_signs_service.edit_vital_sign(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))