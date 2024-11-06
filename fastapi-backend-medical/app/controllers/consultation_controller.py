from fastapi import  HTTPException
from app.services.patients.consultation_service import ConsultationService

async def create(data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.create_medical_consultation(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

async def getAllByPatientId(patient_id):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.gel_all_consultations_by_patient_id(patient_id=patient_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))



async def getAll(payload):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.get_all_consultations(payload=payload)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))



async def getById(consultation_id):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.get_consultation_by_id(consultation_id=consultation_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
async def updateMedicalConsultation (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_medical_consultation(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

async def updateKetosisRegister (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_ketosis_register(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


async def updateTopographicExplorationRegister (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_topographic_exploration_register(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))



async def updatePhsycalExaminationRegister (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_phsycal_examination_register(data=data)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))



async def updateMedicalDiagnosisRegisters (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_medical_diagnosis_registers(data=data)
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail=str(e))


async def updateLabRequestsAndImageRegisters (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_lab_requests_and_image_registers(data=data)
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail=str(e))
    

async def updateMedicalProcedureRegisters (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_medical_procedure_registers(data=data)
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail=str(e))


async def updateMedicalPrescription (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_medical_prescription(data=data)
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail=str(e))


async def updateMedicalPrescriptionDetail (data):
    try:
        medical_consultation_service = ConsultationService()
        response = await medical_consultation_service.edit_medical_prescription_detail(data=data)
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail=str(e))
