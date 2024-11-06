from app.models.user_models import AuthResponse
from app.models.error_models import ErrorResponse

def get_auth_response():
    return {
        200: {
            "description": "Token autorizado",
            "content": {
                "application/json": {
                    "schema": AuthResponse.schema()
                }
            }
        }
    }

def get_error_responses():
    return {
        401: {
            "description": "No se proporcionó un token de autenticación",
            "content": {
                "application/json": {
                    "schema": ErrorResponse.schema()
                }
            }
        },
        403: {
            "description": "El token es inválido o el usuario no tiene permisos suficientes",
            "content": {
                "application/json": {
                    "schema": ErrorResponse.schema()
                }
            }
        }
    }
