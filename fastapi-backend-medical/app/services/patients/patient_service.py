from app.persistence.patient_repository import find_by_identification_number
from uuid import uuid4
from app.models.patients.patient_models import Patient
from app.utils.exceptions import PatientAlreadyExistsException
from app.services.patients.vital_signs_service import VitalSigns
from app.services.patients.connection_user_patient_service import ConnectionUserPatient
from app.services.patients.medical_history_service import MedicalHisotry
from app.services.patients.configs_service import ConfigsPatient
from app.services.patients.vaccine_service import VaccineService
from app.services.patients.active_medications_service import ActiveMedicationService

from app.persistence.patient_repository import create, findMany, find_by_id, update
from app.persistence.user_repository import find_by_id as find_user_by_id



class PatientService:
    async def create_patient(self,data):
        patient_find = await find_by_identification_number(data.identification_number)
        
        if patient_find:
            raise PatientAlreadyExistsException("El paciente ya existe")
        
        patient_id = f"patient-{uuid4()}"
        patient_data = data.dict(exclude={"user_id"})

        patient = Patient(id=patient_id, **patient_data)
        await create(patient)
        await ConnectionUserPatient().create_connection(patient_id=patient_id, user_id=data.user_id)
        await ConfigsPatient().create_default_value(patient_id=patient_id,user_id=data.user_id)
        await VitalSigns().update(patient_id=patient_id)
        await MedicalHisotry().create_default_values(patient_id=patient_id)

        return patient
    
    async def gel_all_patients(self,payload):
        user_id = payload["id"]
        patients = await findMany(user_id=user_id)

        patients_info = []
        
        for patient_record in patients:
            data = await find_by_id(id = patient_record.patient_id)
            patient = Patient(**data.dict())
            patients_info.append(patient)

        return patients_info

    async def get_patient_by_id(self, patient_id: str):
        patient = await find_by_id(id=patient_id)
        patient = Patient(**patient.dict())
        vital_signs = await VitalSigns().find_by_patient_id(patient_id=patient_id)
        configs = await ConfigsPatient().find_by_patient_id(patient_id=patient_id)
        medical_history = await MedicalHisotry().get_by_patient_id(patient_id=patient_id)
        vaccines = await VaccineService().find_many_by_patient_id(patient_id=patient_id)
        active_medications = await ActiveMedicationService().find_many_by_patient_id(patient_id=patient_id)

        return {
            "patient": patient,
            "vital_signs" : vital_signs,
            "configs": configs,
            "medical_history" : medical_history,
            "vaccines": vaccines,
            "active_medications":active_medications
        }

    async def edit_patient(self, data):
        patient_data = data.dict(exclude={"id"})
        id = data.id
        patient = await update(data=patient_data, patient_id= id)
        patient = Patient(**patient.dict())
        return patient