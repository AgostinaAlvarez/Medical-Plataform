from fastapi import  HTTPException
from app.services.patients.lab_results_service import LabResultsService

async def create(data):
    try:
        lab_result_service = LabResultsService()
        response = await lab_result_service.create_lab_result(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

async def getById(lab_result_id: str):
    try:
        lab_result_service = LabResultsService()
        response = await lab_result_service.get_lab_result_by_id(lab_result_id=lab_result_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

async def getAllByPatientId(patient_id: str):
    try:
        lab_result_service = LabResultsService()
        response = await lab_result_service.get_all_by_patient_id(patient_id=patient_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    


async def getAll(payload):
    try:
        lab_result_service = LabResultsService()
        response = await lab_result_service.get_all_lab_results(payload=payload)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
