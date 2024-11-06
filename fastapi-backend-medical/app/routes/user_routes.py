from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import auth_required
from app.controllers.user_controller import login_controller, signin_controller
from app.models.user_models import UserRequest

router = APIRouter()


@router.get("/user/auth")
async def auth_user(payload: dict = Depends(auth_required)):
    return payload


@router.post("/user/signin")
async def user_login(data: UserRequest):
    return await signin_controller(data=data)


@router.post("/user/login")
async def user_login(data: UserRequest):
    return await login_controller(data=data)



"""
@router.post("/user/test")
async def post_data(data_model: DataModel, payload: dict = Depends(auth_required)):
    # Imprime los datos recibidos en la consola
    print(f"Received data: {data_model.data}")

    # Devuelve una respuesta confirmando la recepción
    return {"message": "Data received", "data": data_model.data}



@router.post("/user/test2")
async def login(user: User):
    users = await findMany()
    print(users)
    return {'mesage': 'resteando'}



@router.post("/user/tes3")
async def login(user: User):
    await prisma.connect()
    users = await prisma.users.find_many()
    print(users)
    return {'mesage': 'resteando'}

@router.post("/user/login", response_model=dict)
async def login(user: User):
    print(user)
    print(user.email)
    return {'acc':'login'}


@router.get("/user/auth", response_model=dict)
async def auth_route(user=Depends(auth_required)):
    return await auth(user)

@router.post("/user/signin", response_model=dict)
async def signin_route(user: User):
    return await signin(user.email, user.password)

@router.post("/user/login", response_model=dict)
async def login_route(user: User):
    return await login(user.email, user.password)

@router.get("/user/get/{user_id}", response_model=dict)
async def get_user_by_id_route(user_id: str, user=Depends(auth_required)):
    return await get_user_by_id(user_id)
"""