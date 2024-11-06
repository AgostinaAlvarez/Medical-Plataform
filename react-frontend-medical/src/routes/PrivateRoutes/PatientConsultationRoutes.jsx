import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientConsultations from "../../screens/PrivateScreens/Patients/Consultations/PatientConsultations";
import PatientConsultationNew from "../../screens/PrivateScreens/Patients/Consultations/PatientConsultationNew";
import PatientConsultationDetail from "../../screens/PrivateScreens/Patients/Consultations/PatientConsultationDetail";

const PatientConsultationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientConsultations />} />
      <Route path="/new" element={<PatientConsultationNew />} />
      <Route
        path="/detail/:consultation_id"
        element={<PatientConsultationDetail />}
      />
    </Routes>
  );
};

export default PatientConsultationRoutes;
