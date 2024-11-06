from fastapi import  HTTPException
from app.services.patients.patient_service import PatientService

async def create(data):
    try:
        patient_service = PatientService()
        response = await patient_service.create_patient(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

async def getAll(payload):
    try:
        patient_service = PatientService()
        response = await patient_service.gel_all_patients(payload=payload)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    

async def getById(patient_id: str):
    try:
        patient_service = PatientService()
        response = await patient_service.get_patient_by_id(patient_id=patient_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
async def edit(data):
    try:
        patient_service = PatientService()
        response = await patient_service.edit_patient(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))