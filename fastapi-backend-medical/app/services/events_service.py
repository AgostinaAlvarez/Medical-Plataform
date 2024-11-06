from uuid import uuid4
from app.persistence.events.events_repository import create as create_event, findMany as find_many_events
from app.persistence.events.event_patient_repository import create as create_connection_event_patient, findConnectionByEventId as find_connection_event_patient_by_event_id
from app.persistence.patient_repository import find_by_id as find_patient_by_id
from app.persistence.events.event_prospective_patient_repository import create as create_prospective_patient, find_by_id as find_prospective_patient_by_id
from app.persistence.events.event_prospective_patient_connection import create as create_event_prospective_patient_connection, findConnectionByEventId as find_event_prospective_patient_connection_by_event_id

from app.models.patients.patient_models import Patient
from app.models.events_models import EventResponseModel, EventProspectivePatientResponse, EventFullResponse

from datetime import time, datetime

class EventsService:

    async def create_new_event(self,data):
        event_id = f"event-{uuid4()}"
        event_data_request = data.event.dict()
        event_data = data.event.dict()
        event_data["id"] = event_id
        combined_datetime = datetime.combine(event_data['date'], event_data['hour'])
        event_data["hour"] = combined_datetime
        
        #evento:
        await create_event(data=event_data)
        event_response = EventResponseModel(**event_data_request,id=event_id )
        
        patient_response = None
        prospective_patient_response = None       

        if event_data["asocciate_patient"] == True:
            patient_id = data.patient.patient_id
            #conexion entre el evento y el paciente
            await create_connection_event_patient(patient_id=patient_id,event_id=event_id)
            patient = await find_patient_by_id(id=patient_id)
            patient = Patient(**patient.dict())
            patient_response = patient
            prospective_patient_response = None

        else:
            print("no hay paciente asociado asique registro uno")
            prospective_patient_data = data.prospective_patient.dict()
            prospective_patient = await create_prospective_patient(data=prospective_patient_data)
            prospective_patient = EventProspectivePatientResponse(**prospective_patient.dict())
            
            prospective_patient_id = int(prospective_patient.id)
            print(prospective_patient_id)

            await create_event_prospective_patient_connection(prospective_patient_id=prospective_patient_id, event_id=event_id)

            patient_response = None
            prospective_patient_response = prospective_patient
        
        response = EventFullResponse(
            event=event_response,
            patient=patient_response,
            prospective_patient=prospective_patient_response
        )

        return response
        
    async def get_all_events(self,payload):
        user_id = payload["id"]

        events = await find_many_events(user_id=user_id)

        events_info = []

        for event_record in events:
            patient_response = None
            prospective_patient_response = None       

            if event_record.asocciate_patient == True:
                print("hay asociado")
                patient_connection = await find_connection_event_patient_by_event_id(event_id=event_record.id)
                print(patient_connection)
                patient = await find_patient_by_id(id=patient_connection.patient_id)
                patient = Patient(**patient.dict())
                patient_response = patient

            else:
                print("no hay asociado")
                prospective_connection = await find_event_prospective_patient_connection_by_event_id(event_id=event_record.id)
                prospective_patient_id = prospective_connection.prospective_patient_id
                prospective_patient_id = int(prospective_patient_id)
                prospective_patient = await find_prospective_patient_by_id(id=prospective_patient_id)

                prospective_patient = EventProspectivePatientResponse(**prospective_patient.dict())
                prospective_patient_response = prospective_patient

            event_response = EventResponseModel(
                id=event_record.id,
                user_id= event_record.user_id,
                hour= event_record.hour.time(),
                date= event_record.date,
                asocciate_patient= event_record.asocciate_patient
            )
            
            response = EventFullResponse(
                event=event_response,
                patient=patient_response,
                prospective_patient=prospective_patient_response
            )
            events_info.append(response)
            
        return events_info

