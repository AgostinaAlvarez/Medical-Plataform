from app.models.patients.lab_results_models import LabResultsResponse,LabResultItem, LabResultAllRegistersItemResponse, LabReusltResponseDetail

from app.persistence.patient_repository import findMany as find_all_patients_by_user, find_by_id as find_patient_by_id


from app.persistence.lab_results_repository import create as create_lab_result_register, findMany as find_many_lab_results, findById as find_lab_result_by_id
from app.persistence.consultation.lab_results_by_medical_consultation_repository import findByLabResultId

class LabResultsService:
    async def create_lab_result (self,data):
        lab_result_data = data.dict()
        lab_result = await create_lab_result_register(data=lab_result_data)
        lab_result = LabResultsResponse(**lab_result.dict())

        return lab_result
    
    async def get_all_by_patient_id(self, patient_id: str):
        lab_results = await find_many_lab_results(patient_id=patient_id)

        lab_results_info = []

        for lab_result_record in lab_results:
            lab_result_record = lab_result_record
            lab_result_id = lab_result_record.id
            lab_result_id = int(lab_result_id)

            consultation_conection = await findByLabResultId(lab_result_id=lab_result_id)
            medical_consultation_id = None

            if consultation_conection is not None:
                medical_consultation_id = consultation_conection.medical_consultation_id

            lab_result_item = LabResultItem(id=lab_result_record.id,patient_id=lab_result_record.patient_id , medical_consultation_id=medical_consultation_id, reason=lab_result_record.reason, date=lab_result_record.date)
            lab_results_info.append(lab_result_item)

        
        return lab_results_info
    
    async def get_lab_result_by_id(self, lab_result_id: str):
        lab_result_id = int(lab_result_id)
        lab_result = await find_lab_result_by_id(id=lab_result_id)

        
        #find conection width the consultation
        if lab_result is not None:
            #lab_result = LabResultsResponse(**lab_result.dict())
            consultation_conection = await findByLabResultId(lab_result_id=lab_result_id)
            
            medical_consultation_id = None  
            

            if consultation_conection is not None:
                print("hay una conexion con una consulta")
                medical_consultation_id = consultation_conection.medical_consultation_id
            
            lab_result = LabReusltResponseDetail(**lab_result.dict(), medical_consultation_id=medical_consultation_id)


        return lab_result
    
    async def get_all_lab_results(self, payload):
        user_id = payload["id"]
        patients_by_user = await find_all_patients_by_user(user_id=user_id)

        response_array = []

        for patient_record in patients_by_user:
            
            patient_id = patient_record.patient_id
            print(patient_id)
        
            #data del paciente
            patient_data = await find_patient_by_id(id = patient_id)

            lab_result_data = await find_many_lab_results(patient_id=patient_id)

            for lab_result_record in lab_result_data:
                
                lab_result_id = int(lab_result_record.id)

                consultation_conection = await findByLabResultId(lab_result_id=lab_result_id)
                medical_consultation_id = None

                if consultation_conection is not None:
                    medical_consultation_id = consultation_conection.medical_consultation_id

                response = LabResultAllRegistersItemResponse(
                    id=lab_result_record.id,
                    patient_id=patient_id,
                    medical_consultation_id=medical_consultation_id,
                    date=lab_result_record.date,
                    reason=lab_result_record.reason,
                    patient_name=patient_data.name,
                    patient_last_name = patient_data.last_name,
                    patient_birthday = patient_data.birthday,
                    patient_identification_type= patient_data.identification_type,
                    patient_identification_number= patient_data.identification_number,
                    patient_sex= patient_data.sex
                )

                response_array.append(response)


        sorted_consultations = sorted(
            response_array,
            key=lambda x: x.date,
            reverse=True
        )

        return sorted_consultations