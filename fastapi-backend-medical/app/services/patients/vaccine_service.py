from uuid import uuid4
from app.persistence.vaccines_repository import create, findMany, update, delete
from app.models.patients.vaccines_models import VaccineResponse

class VaccineService:
    async def create_vaccine(self,data):
        vaccine_data = data.dict()

        vaccine = await create(data=vaccine_data)
        
        vaccine =  VaccineResponse(**vaccine.dict())

        return vaccine

    async def find_many_by_patient_id(self, patient_id: str):
        vaccines = await findMany(patient_id=patient_id)

        vaccines_info = []

        for vaccine_record in vaccines:
            vaccine = VaccineResponse(**vaccine_record.dict())
            vaccines_info.append(vaccine)
        
        return vaccines_info
    
    async def update_vaccine(self,data):
        vaccine_data = data.dict(exclude={"id"})
        id = data.id
        id = int(id)
        vaccine = await update(data=vaccine_data, id=id)
        vaccine =  VaccineResponse(**vaccine.dict())
        return vaccine
    
    async def delete_vaccine(self,data):
        id = data.id
        id = int(id)
        await delete(id=id)
        return {"ok":True}




        