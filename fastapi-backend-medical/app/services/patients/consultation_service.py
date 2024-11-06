from uuid import uuid4

from app.models.patients.medical_consultation_models import MedicalConsultationFullResponse
from datetime import datetime

from app.persistence.patient_repository import findMany as find_all_patients_by_user, find_by_id as find_patient_by_id

#CONSULTA 
from app.persistence.consultation.consultation_repository import create as create_medical_consultation, findMany as find_all_medical_consultations, findById as find_medical_consultation_by_id, update as update_medical_consultation, findMany as find_many_medical_consultation_regisers
from app.models.patients.medical_consultation_models import MedicalConsultationResponseModel, MedicalConsultationItemResponseModel

#KETOSIS
from app.persistence.consultation.ketosis_repository import create as create_ketosis_register, findByMedicalConsultation as find_ketosis_register_by_medical_consultation_id, update as update_ketosis_register
from app.models.patients.medical_consultation_models import KetosisResponse

#TOPOGRAPHIC EXPLOTARION
from app.persistence.consultation.topographic_exploration_repository import create as create_topographic_exploration, findByMedicalConsultation as find_topographic_exploration_register_by_medical_consultation_id, update as update_topographic_exploration
from app.models.patients.medical_consultation_models import TopographicExplorationResponse

#PHSYCAL EXAMINATION
from app.models.patients.medical_consultation_models import PhsycalExaminationResponse
from app.persistence.consultation.phsycal_examination_repository import create as create_phsycal_examination_register, findByMedicalConsultation as find_phsycal_examination_register_by_medical_consultation_id, update as update_phsycal_examination_register

#MEDICAL DIAGNOSIS
from app.models.patients.medical_consultation_models import MedicalDiagnosisItemResponse, MedicalDiagnosisListResponse
from app.persistence.consultation.medical_diagnosis_repository import create as create_medical_diagnosis_register, findManyByMedicalConsultationId as find_medical_diagnosis_by_medical_consultation_id, delete as delete_medical_diagnosis_register

#LAB REQUEST AND IMAGE
from app.models.patients.medical_consultation_models import LabRequestsAndImageItemResponse, LabRequestsAndImageListResponse
from app.persistence.consultation.lab_requests_and_image_repository import create as create_lab_requests_and_image_register, findManyByMedicalConsultationId as find_lab_requests_and_image_by_medical_consultation_id, delete as delete_lab_requests_and_image_registers

#MEDICAL PROCEDURE
from app.models.patients.medical_consultation_models import MedicalProcedureItemResponse,MedicalProcedureListResponse
from app.persistence.consultation.medical_procedure_repository import create as create_medical_procedure_register, findManyByMedicalConsultationId as find_medical_procedure_by_medical_consultation_id, delete as delete_medical_procedure_registers

#=====

#MEDICAL PRESCRIPTION
from app.models.patients.medical_consultation_models import MedicalPrescriptionResponse
from app.persistence.consultation.medical_prescription_repository import create as create_medical_prescription_register, findByMedicalConsultation as find_medical_prescription_register_by_medical_consultation_id, update as update_medical_prescription_register

#MEDICAL PRESCRIPTION DETAIL
from app.models.patients.medical_consultation_models import MedicalPrescriptionDetailResponse, MedicalPrecriptionDetailListResponse
from app.persistence.consultation.medical_prescription_detail_repository import create as create_medical_prescription_detail_register, findManyByMedicalPrescriptionId as find_medical_prescription_detail_by_medical_prescription_id, delete as delete_medical_prescription_registers

#LAB RESULTS 
from app.persistence.lab_results_repository import create as create_lab_result_register, findById as find_lab_result_register
from app.models.patients.lab_results_models import LabResultsResponse

from app.persistence.consultation.lab_results_by_medical_consultation_repository import create as create_lab_results_by_medical_consultation_register, findByMedicalConsultationId as find_lab_results_by_medical_consultation_register

class ConsultationService:
    async def create_medical_consultation(self,data):
        #CREO EL REGISTRO DE LA CONSULTA
        consultation_data = data.consultation #object
        medical_constultation_id = f"consultation-{uuid4()}"
        consultation = await create_medical_consultation(data=consultation_data, id=medical_constultation_id)
        consultation = MedicalConsultationResponseModel(**consultation.dict())
        
        #KETOSIS
        ketosis_data = KetosisResponse(**data.ketosis.dict(), medical_consultation_id=medical_constultation_id)
        
        ketosis = await create_ketosis_register(ketosis_data)
        ketosis = KetosisResponse(**ketosis.dict())

        #TOPOGRAPHIC EXPLORATION
        topographic_exploration_data = TopographicExplorationResponse(**data.topographic_exploration.dict() , medical_consultation_id=medical_constultation_id)

        topographic_exploration = await create_topographic_exploration(data=topographic_exploration_data)
        topographic_exploration = TopographicExplorationResponse(**topographic_exploration.dict())

       #PHSYCAL EXAMINATION
        phsycal_examination_data = PhsycalExaminationResponse(**data.phsycal_examination.dict(), medical_consultation_id=medical_constultation_id)

        phsycal_examination = await create_phsycal_examination_register(data=phsycal_examination_data)
        phsycal_examination = PhsycalExaminationResponse(**phsycal_examination.dict())

        #MEDICAL DIAGNOSIS (ARRAY)
        medical_diagnosis_array = []

        for diagnosis in data.medical_diagnosis:
            #print(f"Code: {diagnosis.code}, Description: {diagnosis.description}")
            medical_diagnosis_data = MedicalDiagnosisItemResponse(**diagnosis.dict(), medical_consultation_id=medical_constultation_id)
            medical_diagnosis = await create_medical_diagnosis_register(data=medical_diagnosis_data)
            medical_diagnosis = MedicalDiagnosisItemResponse(**medical_diagnosis.dict())
            medical_diagnosis_array.append(medical_diagnosis)
        
        #LAB REQUEST AND IMAGE (ARRAY)
        lab_requests_and_image_array = []

        for labequests in data.lab_requests_and_image:
            #print(f"Code: {diagnosis.code}, Description: {diagnosis.description}")
            lab_requests_and_images_data = LabRequestsAndImageItemResponse(**labequests.dict(), medical_consultation_id=medical_constultation_id)
            lab_requests_and_images = await create_lab_requests_and_image_register(data=lab_requests_and_images_data)
            lab_requests_and_images = LabRequestsAndImageItemResponse(**lab_requests_and_images.dict())
            lab_requests_and_image_array.append(lab_requests_and_images)
        
        #MEDICAL PROCEDUTE (ARRAY)
        medical_procedure_array = []

        for procedure in data.medical_procedure:
            #print(f"Code: {diagnosis.code}, Description: {diagnosis.description}")
            medical_procedure_data = MedicalProcedureItemResponse(**procedure.dict(), medical_consultation_id=medical_constultation_id)
            medical_procedure = await create_medical_procedure_register(data=medical_procedure_data)
            medical_procedure = MedicalProcedureItemResponse(**medical_procedure.dict())
            medical_procedure_array.append(medical_procedure)
        
        #MEDICAL PRESCRIPTION
        medical_prescriptions_data = MedicalPrescriptionResponse(**data.medical_prescription.dict(), medical_consultation_id=medical_constultation_id)
        
        medical_prescription = await create_medical_prescription_register(medical_prescriptions_data)
        medical_prescription = MedicalPrescriptionResponse(**medical_prescription.dict())

        #MEDICAL PRESCRIPTION DETAIL
        medical_prescription_detail_array = []

        for prescription in data.medical_prescription_detail:
            medical_prescription_detail_data = MedicalPrescriptionDetailResponse(**prescription.dict(), medical_prescription_id= medical_prescription.id)
            medical_prescription_detail = await create_medical_prescription_detail_register(data=medical_prescription_detail_data)
            medical_prescription_detail = MedicalPrescriptionDetailResponse(**medical_prescription_detail.dict())
            medical_prescription_detail_array.append(medical_prescription_detail)

        #LAB RESULTS
        #lab_result = None
        lab_result_created = None
        lab_result_by_consultation = data.lab_result_by_consultation
        

        if lab_result_by_consultation == True:
            lab_result_data = data.lab_results
            lab_result_data = lab_result_data.dict()
            lab_result = await create_lab_result_register(data=lab_result_data)
            lab_result = LabResultsResponse(**lab_result.dict())
            lab_result_created = lab_result

            lab_result_by_consultation_data = {"lab_result_id":lab_result.id, "medical_consultation_id":medical_constultation_id }
            lab_result_by_consultation = await create_lab_results_by_medical_consultation_register(data=lab_result_by_consultation_data)
            print("lab result by consultation created")
            print(lab_result_by_consultation)

            


        response_data = MedicalConsultationFullResponse(
            consultation=consultation,
            ketosis=ketosis,
            topographic_exploration=topographic_exploration,
            phsycal_examination=phsycal_examination,
            medical_diagnosis=medical_diagnosis_array,
            lab_requests_and_image=lab_requests_and_image_array,
            medical_procedure=medical_procedure_array,
            medical_prescription=medical_prescription,
            medical_prescription_detail=medical_prescription_detail_array,
            lab_results= lab_result_created 
        )

        return response_data
    
    async def gel_all_consultations_by_patient_id(self,patient_id: str):
        consultations = await find_all_medical_consultations(patient_id=patient_id)
        
        consultations_info = []

        for consultation_record in consultations:
            consultation = MedicalConsultationResponseModel(**consultation_record.dict())
            consultations_info.append(consultation)

        return consultations_info


    async def get_all_consultations(self,payload):
        user_id = payload["id"]

        patients_by_user = await find_all_patients_by_user(user_id=user_id)

        response_array = []

        for patient_record in patients_by_user:
            patient_record = patient_record.dict()
            id = patient_record["patient_id"]
            
            patient_data = await find_patient_by_id(id = id)
            patient_data = patient_data.dict()

            medical_consultation_data = await find_many_medical_consultation_regisers(patient_id=id)

            for medical_consultation_record in medical_consultation_data:
                medical_consultation_record = medical_consultation_record.dict()

                response = MedicalConsultationItemResponseModel(
                    patient_id=patient_data["id"],
                    patient_name=patient_data["name"],
                    patient_last_name=patient_data["last_name"],
                    patient_birthday=patient_data["birthday"],
                    patient_identification_type=patient_data["identification_type"],
                    patient_identification_number=patient_data["identification_number"],
                    patient_sex=patient_data["sex"],
                    id=medical_consultation_record["id"],
                    reason=medical_consultation_record["reason"],
                    date=medical_consultation_record["date"],
                    notes=medical_consultation_record["notes"],
                    medical_instructions=medical_consultation_record["medical_instructions"],
                    treatment_plan=medical_consultation_record["treatment_plan"]
                )
                response_array.append(response)

        sorted_consultations = sorted(
            response_array,
            key=lambda x: x.date,
            reverse=True
        )

        return sorted_consultations


    async def get_consultation_by_id(self, consultation_id: str):
        consultation = await find_medical_consultation_by_id(id=consultation_id)
        consultation = MedicalConsultationResponseModel(**consultation.dict())

        ketosis = await find_ketosis_register_by_medical_consultation_id(consultation_id=consultation_id)
        ketosis = KetosisResponse(**ketosis.dict())

        topographic_exploration = await find_topographic_exploration_register_by_medical_consultation_id(consultation_id=consultation_id)
        topographic_exploration = TopographicExplorationResponse(**topographic_exploration.dict())

        phsycal_examination = await find_phsycal_examination_register_by_medical_consultation_id(consultation_id=consultation_id)
        phsycal_examination = PhsycalExaminationResponse(**phsycal_examination.dict())

        medical_diagnosis_data = await find_medical_diagnosis_by_medical_consultation_id(consultation_id=consultation_id)
        medical_diagnosis_array = []

        for diagnosis in medical_diagnosis_data:
            medical_diagnosis = MedicalDiagnosisItemResponse(**diagnosis.dict()) 
            medical_diagnosis_array.append(medical_diagnosis)

        #lab
        lab_requests_and_image_data = await find_lab_requests_and_image_by_medical_consultation_id(consultation_id=consultation_id)
        lab_requests_and_image_array = []

        for labreq in lab_requests_and_image_data:
            lab_requests_and_image = LabRequestsAndImageItemResponse(**labreq.dict()) 
            lab_requests_and_image_array.append(lab_requests_and_image)

        #procedure
        medical_procedure_data = await find_medical_procedure_by_medical_consultation_id(consultation_id=consultation_id)
        medical_procedure_array = []

        for procedure in medical_procedure_data:
            medical_procedure = MedicalProcedureItemResponse(**procedure.dict()) 
            medical_procedure_array.append(medical_procedure)

        #procedure

        medical_prescription = await find_medical_prescription_register_by_medical_consultation_id(consultation_id=consultation_id)
        medical_prescription = MedicalPrescriptionResponse(**medical_prescription.dict())

        #medical_prescription_detail

        medical_prescription_detail = await find_medical_prescription_detail_by_medical_prescription_id(medical_prescription_id=medical_prescription.id)
        medical_prescription_detail_array = []

        for prescription in medical_prescription_detail:
            prescription_detai = MedicalPrescriptionDetailResponse(**prescription.dict()) 
            medical_prescription_detail_array.append(prescription_detai)

        
        #lab results
        
        lab_result_by_consultation = await find_lab_results_by_medical_consultation_register(medical_consultation_id=consultation_id)
        
        lab_result = None

        if lab_result_by_consultation is not None:   
            lab_result_by_consultation = lab_result_by_consultation.dict() 
            lab_result_id = lab_result_by_consultation["lab_result_id"]
            lab_result_id = int(lab_result_id)
            lab_result_data = await find_lab_result_register(id=lab_result_id)            
            lab_result = LabResultsResponse(**lab_result_data.dict())
        

        response_data = MedicalConsultationFullResponse(
            consultation=consultation,
            ketosis=ketosis,
            topographic_exploration=topographic_exploration,
            phsycal_examination=phsycal_examination,
            medical_diagnosis=medical_diagnosis_array,
            lab_requests_and_image=lab_requests_and_image_array,
            medical_procedure=medical_procedure_array,
            medical_prescription=medical_prescription,
            medical_prescription_detail=medical_prescription_detail_array,
            lab_results=lab_result            
        )

        return response_data

    async def edit_medical_consultation (self,data):
        medical_consultation = await update_medical_consultation(data=data)
        medical_consultation = MedicalConsultationResponseModel(**medical_consultation.dict())
        return medical_consultation

    async def edit_ketosis_register (self,data):
        ketosis = await update_ketosis_register(data=data)
        ketosis = KetosisResponse(**ketosis.dict())
        return ketosis

    async def edit_topographic_exploration_register (self,data):
        topographic_exploration = await update_topographic_exploration(data=data)
        topographic_exploration = TopographicExplorationResponse(**topographic_exploration.dict())
        return topographic_exploration

    async def edit_phsycal_examination_register (self,data):
        phsycal_examination = await update_phsycal_examination_register(data=data)
        phsycal_examination = PhsycalExaminationResponse(**phsycal_examination.dict())
        return phsycal_examination

    async def edit_medical_diagnosis_registers (self,data):
        
        medical_consultation_id = data.medical_consultation_id

        for previus_register in data.previus:
            medical_diagnosis_register = MedicalDiagnosisItemResponse(**previus_register.dict())
            await delete_medical_diagnosis_register(data=medical_diagnosis_register)

        medical_diagnosis_array = []

        for diagnosis in data.new:
            medical_diagnosis_data = MedicalDiagnosisItemResponse(**diagnosis.dict(), medical_consultation_id=medical_consultation_id)
            medical_diagnosis = await create_medical_diagnosis_register(data=medical_diagnosis_data)
            medical_diagnosis = MedicalDiagnosisItemResponse(**medical_diagnosis.dict())
            medical_diagnosis_array.append(medical_diagnosis)

        response_data = MedicalDiagnosisListResponse(
            update_arrays=medical_diagnosis_array
        )
        return response_data

    async def edit_lab_requests_and_image_registers (self,data):
        
        medical_consultation_id = data.medical_consultation_id

        for previus_register in data.previus:
            lab_requests_and_image_register = LabRequestsAndImageItemResponse(**previus_register.dict())
            await delete_lab_requests_and_image_registers(data=lab_requests_and_image_register)

        lab_requests_and_image_array = []

        for labequests in data.new:
            lab_requests_and_image_data = LabRequestsAndImageItemResponse(**labequests.dict(), medical_consultation_id=medical_consultation_id)
            lab_requests_and_image = await create_lab_requests_and_image_register(data=lab_requests_and_image_data)
            lab_requests_and_image = LabRequestsAndImageItemResponse(**lab_requests_and_image.dict())
            lab_requests_and_image_array.append(lab_requests_and_image)

        response_data = LabRequestsAndImageListResponse(
            update_arrays=lab_requests_and_image_array
        )
        return response_data
    
    async def edit_medical_procedure_registers (self,data):
        
        medical_consultation_id = data.medical_consultation_id

        for previus_register in data.previus:
            medical_procedure_register = MedicalProcedureItemResponse(**previus_register.dict())
            await delete_medical_procedure_registers(data=medical_procedure_register)

        medical_procedure_array = []

        for procedure in data.new:
            medical_procedure_data = MedicalProcedureItemResponse(**procedure.dict(), medical_consultation_id=medical_consultation_id)
            medical_procedure = await create_medical_procedure_register(data=medical_procedure_data)
            medical_procedure = MedicalProcedureItemResponse(**medical_procedure.dict())
            medical_procedure_array.append(medical_procedure)

        response_data = MedicalProcedureListResponse(
            update_arrays=medical_procedure_array
        )
        return response_data
    
    async def edit_medical_prescription (self,data):
        medical_prescription = await update_medical_prescription_register(data=data)
        medical_prescription = MedicalPrescriptionResponse(**medical_prescription.dict())
        return medical_prescription
    
    async def edit_medical_prescription_detail (self,data):
        medical_prescription_id = data.medical_prescription_id

        for previus_register in data.previus:
            register = MedicalPrescriptionDetailResponse(**previus_register.dict())
            await delete_medical_prescription_registers(data=register)

        medical_prescription_array = []

        for prescription in data.new:
            medical_prescription_data = MedicalPrescriptionDetailResponse(**prescription.dict(), medical_prescription_id=medical_prescription_id)
            medical_prescription = await create_medical_prescription_detail_register(data=medical_prescription_data)
            medical_prescription = MedicalPrescriptionDetailResponse(**medical_prescription.dict())
            medical_prescription_array.append(medical_prescription)

        response_data = MedicalPrecriptionDetailListResponse(
            update_arrays=medical_prescription_array
        )
        return response_data