import React from "react";
import PatientInfoCard from "../../../components/Patient/History/PatientInfoCard";
import PatientVitalSignsCard from "../../../components/Patient/History/PatientVitalSignsCard";
import PatientHealthHistoryCard from "../../../components/Patient/History/PatientHealthHistoryCard";
import PatientVaccinesCard from "../../../components/Patient/History/PatientVaccinesCard";
import PatientActiveMedicationsCard from "../../../components/Patient/History/PatientActiveMedicationsCard";

const PatientHistory = () => {
  return (
    <>
      <div className="patient-detail-grid">
        {/*Columna izquierda*/}
        <div className="patient-detail-grid-column">
          <PatientInfoCard />
          <PatientVitalSignsCard />
          <div>Archivos</div>
        </div>
        {/*Columna derecha*/}
        <div className="patient-detail-grid-column">
          <PatientHealthHistoryCard />
          <PatientVaccinesCard />
          <PatientActiveMedicationsCard />
          <div>Notas de historia clinica</div>
        </div>
      </div>
    </>
  );
};

export default PatientHistory;
