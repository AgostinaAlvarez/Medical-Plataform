from app.utils.prisma import prisma
from app.models.user_models import User

async def find_by_id(user_id: str):
    user = await prisma.users.find_unique(where={"id": user_id})
    return user

async def find_by_email(email: str):
    user = await prisma.users.find_first(where={"email": email})
    return user

async def create(data: User):
    user_data = data.dict()
    user = await prisma.users.create(user_data)
    return user

async def findMany(user_id: str ):
    user = await prisma.patient_by_user.find_many(where={"user_id": user_id})
    return user
