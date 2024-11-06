from fastapi import  HTTPException
from app.services.patients.vital_signs_service import VitalSigns
from app.services.patients.health_history_service import HealthHistory

async def edit_pathological_history(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_pathological_history(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    

async def edit_non_pathological_history(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_non_pathological_history(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    

async def edit_hereditary_family_history(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_hereditary_family_history(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    


async def edit_obstetric_gynecological_history(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_obstetric_gynecological_history(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    

async def edit_perinatal_history(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_perinatal_history(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    

async def edit_postnatal_history(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_postnatal_history(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    

async def edit_psychiatric_history(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_psychiatric_history(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    

async def edit_nutritional_diet(data):
    try:
        health_history_service = HealthHistory()
        response = await health_history_service.update_nutritional_diet(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
