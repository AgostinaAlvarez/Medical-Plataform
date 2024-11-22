from app.persistence.medicalhisotry.pathological_history_repository import update as edit_pathological_history
from app.models.patients.medical_hisotry_models import PathologicalHistoryResponse

from app.persistence.medicalhisotry.non_pathological_history_respository import update as edit_non_pathological_history
from app.models.patients.medical_hisotry_models import NonPathologicalHistoryResponse

from app.persistence.medicalhisotry.hereditary_family_history_respository import update as edit_hereditary_family_history
from app.models.patients.medical_hisotry_models import HereditaryFamilyHistoryResponse

from app.persistence.medicalhisotry.obstetric_gynecological_history_repository import update as edit_obstetric_gynecological_history
from app.models.patients.medical_hisotry_models import ObstetricGynecologicalHistoryResponse


from app.persistence.medicalhisotry.perinatal_history_repository import update as edit_perinatal_history
from app.models.patients.medical_hisotry_models import PerinatalHistoryResponse


from app.persistence.medicalhisotry.postnatal_history_repository import update as edit_postnatal_history
from app.models.patients.medical_hisotry_models import PostnatalHistoryResponse

from app.persistence.medicalhisotry.psychiatric_history_repository import update as edit_psychiatric_history
from app.models.patients.medical_hisotry_models import PsychiatricHistoryResponse

from app.persistence.medicalhisotry.nutritional_diet_repository import update as edit_nutritional_diet
from app.models.patients.medical_hisotry_models import NutritionalDietResponse


class HealthHistory:

    async def update_pathological_history(self, data):
        pathological_history_data = data.dict(exclude={"id"})
        id = data.id

        pathological_history = await edit_pathological_history(data=pathological_history_data, id=id)
        pathological_history = PathologicalHistoryResponse(**pathological_history.dict())
        return pathological_history

    async def update_non_pathological_history(self, data):
        non_pathological_history_data = data.dict(exclude={"id"})
        id = data.id

        non_pathological_history = await edit_non_pathological_history(data=non_pathological_history_data, id=id)
        non_pathological_history = NonPathologicalHistoryResponse(**non_pathological_history.dict())
        return non_pathological_history

    async def update_hereditary_family_history(self, data):
        hereditary_family_history_data = data.dict(exclude={"id"})
        id = data.id

        hereditary_family_history = await edit_hereditary_family_history(data=hereditary_family_history_data, id=id)
        hereditary_family_history = HereditaryFamilyHistoryResponse(**hereditary_family_history.dict())
        return hereditary_family_history
    
    async def update_obstetric_gynecological_history(self, data):
        obstetric_gynecological_history_data = data.dict(exclude={"id"})
        id = data.id

        obstetric_gynecological_history = await edit_obstetric_gynecological_history(data=obstetric_gynecological_history_data, id=id)
        obstetric_gynecological_history = ObstetricGynecologicalHistoryResponse(**obstetric_gynecological_history.dict())
        return obstetric_gynecological_history
    
    async def update_perinatal_history(self, data):
        perinatal_history_data = data.dict(exclude={"id"})
        id = data.id

        perinatal_history = await edit_perinatal_history(data=perinatal_history_data, id=id)
        perinatal_history = PerinatalHistoryResponse(**perinatal_history.dict())
        return perinatal_history

    async def update_postnatal_history(self, data):
        postnatal_history_data = data.dict(exclude={"id"})
        id = data.id

        postnatal_history = await edit_postnatal_history(data=postnatal_history_data, id=id)
        postnatal_history = PostnatalHistoryResponse(**postnatal_history.dict())
        return postnatal_history

    async def update_psychiatric_history(self, data):
        psychiatric_history_data = data.dict(exclude={"id"})
        id = data.id

        psychiatric_history = await edit_psychiatric_history(data=psychiatric_history_data, id=id)
        psychiatric_history = PsychiatricHistoryResponse(**psychiatric_history.dict())
        return psychiatric_history
    
    async def update_nutritional_diet(self, data):
        nutritional_diet_data = data.dict(exclude={"id"})
        id = data.id

        nutritional_diet = await edit_nutritional_diet(data=nutritional_diet_data, id=id)
        nutritional_diet = NutritionalDietResponse(**nutritional_diet.dict())
        return nutritional_diet

