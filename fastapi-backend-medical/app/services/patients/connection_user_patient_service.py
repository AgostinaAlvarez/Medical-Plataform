from uuid import uuid4
from app.persistence.patient_by_user_repository import create
from app.models.patients.patient_models import  PatientByUser


class ConnectionUserPatient:
    async def create_connection(self,patient_id,user_id):
        connection_id = f"connection-{uuid4()}"
        data = PatientByUser(id=connection_id, patient_id=patient_id, user_id=user_id)
        connection = await create(data)
        return connection

