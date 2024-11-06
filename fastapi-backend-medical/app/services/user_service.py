from app.persistence.user_repository import find_by_email, create, find_by_id
from app.models.user_models import User, UserResponse
from app.utils.exceptions import UserAlreadyExistsException, InvalidCredentialsException
import bcrypt
import jwt
from uuid import uuid4
import os


class UserService:
    async def signin(self, data):
        user_find = await find_by_email(data.email)
        if user_find:
            raise UserAlreadyExistsException("El email ya existe")

        user_id = f"user-{uuid4()}"
        hashed_pass = self.hash_password(data.password)
        token = self.create_jwt(user_id)
        user = User(email=data.email, password=
        hashed_pass, id=user_id )

        await create(user)

        response = UserResponse(email=data.email, id=user_id, token=token)
        
        return response
    
    async def login(self,data):
        user_find = await find_by_email(data.email)

        if not user_find:
            raise InvalidCredentialsException("El email no existe")
        
        if not self.verify_password(data.password,user_find.
        password):
            raise InvalidCredentialsException("La contrasena es incorrecta")
        
        token = self.create_jwt(user_find.id)

        response = UserResponse(email=data.email, id=user_find.id, token=token)

        return response
    
    async def find_user_by_id(self,data):
        user_find = await find_by_id(data.user_id)
        if not user_find:
            raise Exception("El usuario no existe")
        return user_find
        
    def hash_password(self,password):
        hashed_pass = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        hashed_pass = hashed_pass.decode('utf-8')
        return hashed_pass

    def verify_password(self,plain_password,hashed_password):
        compare_pass = bcrypt.checkpw(plain_password.encode(), hashed_password.encode())
        return compare_pass

    def create_jwt(self,id):
        token = jwt.encode({"id": id}, os.getenv("SECRET_KEY"), algorithm="HS256")
        return token





