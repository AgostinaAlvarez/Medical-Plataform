from uuid import uuid4
from app.persistence.active_medications_repository import create, findMany, update, delete
from app.models.patients.active_medications_models import ActiveMedicationResponse

class ActiveMedicationService:
    async def create_active_medication(self,data):
        active_medication_data = data.dict()

        active_medication = await create(data=active_medication_data)
        
        active_medication =  ActiveMedicationResponse(**active_medication.dict())

        return active_medication

    async def find_many_by_patient_id(self, patient_id: str):
        active_medications = await findMany(patient_id=patient_id)

        active_medications_info = []

        for active_medication_record in active_medications:
            active_medication = ActiveMedicationResponse(**active_medication_record.dict())
            active_medications_info.append(active_medication)
        
        return active_medications_info
    
    async def update_active_medication(self,data):
        active_medication_data = data.dict(exclude={"id"})
        id = data.id
        id = int(id)
        active_medication = await update(data=active_medication_data, id=id)
        active_medication =  ActiveMedicationResponse(**active_medication.dict())
        return active_medication
    
    async def delete_active_medication(self,data):
        id = data.id
        id = int(id)
        await delete(id=id)
        return {"ok":True}




        