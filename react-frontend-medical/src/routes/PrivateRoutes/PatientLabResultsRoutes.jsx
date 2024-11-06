import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientLabResults from "../../screens/PrivateScreens/Patients/LabResults/PatientLabResults";
import PatientLabResultNew from "../../screens/PrivateScreens/Patients/LabResults/PatientLabResultNew";
import PatientLabResultDetail from "../../screens/PrivateScreens/Patients/LabResults/PatientLabResultDetail";

const PatientLabResultsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientLabResults />} />
      <Route path="/new" element={<PatientLabResultNew />} />
      <Route
        path="/detail/:lab_result_id"
        element={<PatientLabResultDetail />}
      />
    </Routes>
  );
};

export default PatientLabResultsRoutes;
