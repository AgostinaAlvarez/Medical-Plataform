from pydantic import BaseModel

class User(BaseModel):
    id:str
    email: str
    password: str

class UserRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id:str
    email: str
    token: str

class AuthResponse(BaseModel):
    id: str
    iat: str