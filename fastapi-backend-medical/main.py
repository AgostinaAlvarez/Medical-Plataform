from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from app.utils.prisma import prisma

from app.routes.user_routes import router as user_router
from app.routes.patients_routes import router as patient_router
from app.routes.medicalhistory.vital_signs import router as vital_signs_router
from app.routes.medicalhistory.health_history import router as health_history_router
from app.routes.medicalhistory.vaccines_routes import router as vaccines_router
from app.routes.medicalhistory.active_medications import router as active_medications_router
from app.routes.consultation_routes import router as consultation_router
from app.routes.lab_results import router as lab_results_router
from app.routes.events_routes import router as events_router

app = FastAPI(
    title="Mi API",
    description="Esta es una API para gestionar pacientes de una plataforma medica y otras funcionalidades.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

app.include_router(user_router)
app.include_router(patient_router)
app.include_router(vital_signs_router)
app.include_router(health_history_router)
app.include_router(vaccines_router)
app.include_router(active_medications_router)
app.include_router(consultation_router)
app.include_router(lab_results_router)
app.include_router(events_router)