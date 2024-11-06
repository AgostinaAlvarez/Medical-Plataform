from app.persistence.medicalhisotry.pathological_history_repository import create as create_pathological_history, find_by_patient_id as find_pathological_history_by_patient_id
from app.persistence.medicalhisotry.non_pathological_history_respository import create as create_non_pathological_history, find_by_patient_id as find_non_pathological_history_by_patient_id
from app.persistence.medicalhisotry.hereditary_family_history_respository import create as create_hereditary_family_history, find_by_patient_id as find_hereditary_family_history_by_patient_id 
from app.persistence.medicalhisotry.obstetric_gynecological_history_repository import create as create_obstetric_gynecological_history, find_by_patient_id as find_obstetric_gynecological_history_by_patient_id
from app.persistence.medicalhisotry.perinatal_history_repository import create as create_perinatal_history, find_by_patient_id as find_perinatal_history_by_patient_id
from app.persistence.medicalhisotry.postnatal_history_repository import create as create_postnatal_history, find_by_patient_id as find_postnatal_history_by_patient_id 
from app.persistence.medicalhisotry.psychiatric_history_repository import create as create_psychiatric_history, find_by_patient_id as find_psychiatric_history_by_patient_id
from app.persistence.medicalhisotry.nutritional_diet_repository import create as create_nutritional_diet, find_by_patient_id as find_nutritional_diet_by_patient_id

from app.models.patients.medical_hisotry_models import PathologicalHistory, PathologicalHistoryResponse
from app.models.patients.medical_hisotry_models import NonPathologicalHistory, NonPathologicalHistoryResponse
from app.models.patients.medical_hisotry_models import HereditaryFamilyHistory, HereditaryFamilyHistoryResponse
from app.models.patients.medical_hisotry_models import ObstetricGynecologicalHistory, ObstetricGynecologicalHistoryResponse
from app.models.patients.medical_hisotry_models import PerinatalHistory, PerinatalHistoryResponse
from app.models.patients.medical_hisotry_models import PostnatalHistory, PostnatalHistoryResponse
from app.models.patients.medical_hisotry_models import PsychiatricHistory, PsychiatricHistoryResponse
from app.models.patients.medical_hisotry_models import NutritionalDiet, NutritionalDietResponse

class MedicalHisotry:
    async def create_default_values(self,patient_id: str):
        pathological_history = await create_pathological_history(PathologicalHistory(patient_id=patient_id))
        non_pathological_history = await create_non_pathological_history(NonPathologicalHistory(patient_id=patient_id))
        hereditary_family_history = await create_hereditary_family_history(HereditaryFamilyHistory(patient_id=patient_id))
        obstetric_gynecological_history = await create_obstetric_gynecological_history(ObstetricGynecologicalHistory(patient_id=patient_id))
        perinatal_history = await create_perinatal_history(PerinatalHistory(patient_id=patient_id))
        postnatal_history = await create_postnatal_history(PostnatalHistory(patient_id=patient_id))
        psychiatric_history = await create_psychiatric_history(PsychiatricHistory(patient_id=patient_id))
        nutritional_diet = await create_nutritional_diet(NutritionalDiet(patient_id=patient_id))
        return {
            "pathological_history":pathological_history,
            "non_pathological_history":non_pathological_history,
            "hereditary_family_history": hereditary_family_history,
            "obstetric_gynecological_history":obstetric_gynecological_history,
            "perinatal_history" :perinatal_history,
            "postnatal_history" : postnatal_history,
            "psychiatric_history": psychiatric_history,
            "nutritional_diet" :nutritional_diet
            }

    async def get_by_patient_id(seld, patient_id: str):
        pathological_history = await find_pathological_history_by_patient_id(patient_id= patient_id)
        pathological_history = PathologicalHistoryResponse(**pathological_history.dict())

        non_pathological_history = await find_non_pathological_history_by_patient_id(patient_id=patient_id)
        non_pathological_history = NonPathologicalHistoryResponse(**non_pathological_history.dict())

        hereditary_family_history = await find_hereditary_family_history_by_patient_id(patient_id=patient_id)
        hereditary_family_history = HereditaryFamilyHistoryResponse(**hereditary_family_history.dict())

        obstetric_gynecological_history = await find_obstetric_gynecological_history_by_patient_id(patient_id= patient_id)
        obstetric_gynecological_history = ObstetricGynecologicalHistoryResponse(**obstetric_gynecological_history.dict())

        perinatal_history = await find_perinatal_history_by_patient_id(patient_id=patient_id)
        perinatal_history = PerinatalHistoryResponse(**perinatal_history.dict())

        postnatal_history = await find_postnatal_history_by_patient_id(patient_id=patient_id)
        postnatal_history = PostnatalHistoryResponse(**postnatal_history.dict())
        
        psychiatric_history = await find_psychiatric_history_by_patient_id(patient_id=patient_id)
        psychiatric_history = PsychiatricHistoryResponse(**psychiatric_history.dict())


        nutritional_diet = await find_nutritional_diet_by_patient_id(patient_id=patient_id)
        nutritional_diet = NutritionalDietResponse(**nutritional_diet.dict())

        return {
            "pathological_history" : pathological_history,
            "non_pathological_history" : non_pathological_history,
            "hereditary_family_history": hereditary_family_history,
            "obstetric_gynecological_history": obstetric_gynecological_history,
            "perinatal_history": perinatal_history,
            "postnatal_history" : postnatal_history,
            "psychiatric_history" : psychiatric_history,
            "nutritional_diet" : nutritional_diet
        }

