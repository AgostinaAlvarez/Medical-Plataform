
from fastapi.responses import JSONResponse
from fastapi import  HTTPException

async def error_handler(request, exc):
    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"}
    )
