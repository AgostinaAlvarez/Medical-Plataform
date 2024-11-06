import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePrivate from "../../screens/PrivateScreens/HomePrivate";
import NotFoundScreen from "../../screens/NotFoundScreen";
import PrivateStructure from "../../structures/PrivateStructure";
import PatientsScreen from "../../screens/PrivateScreens/Patients/PatientsScreen";
import CalendarScreen from "../../screens/PrivateScreens/Calendar/CalendarScreen";
import PatientScreenStructure from "../../structures/PatientScreenStructure";
import PatientNew from "../../screens/PrivateScreens/Patients/PatientNew";
import ConsultationsScreen from "../../screens/PrivateScreens/Consultations/ConsultationsScreen";
import LabResultsScreen from "../../screens/PrivateScreens/LabResults/LabResultsScreen";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateStructure>
            <HomePrivate />
          </PrivateStructure>
        }
      />
      <Route
        path="/patients"
        element={
          <PrivateStructure>
            <PatientsScreen />
          </PrivateStructure>
        }
      />
      <Route
        path="/patient/:id/*"
        element={
          <PrivateStructure>
            <PatientScreenStructure />
          </PrivateStructure>
        }
      />
      <Route
        path="/calendar"
        element={
          <PrivateStructure>
            <CalendarScreen />
          </PrivateStructure>
        }
      />
      <Route
        path="/patient-new"
        element={
          <PrivateStructure>
            <PatientNew />
          </PrivateStructure>
        }
      />
      <Route
        path="/consultations"
        element={
          <PrivateStructure>
            <ConsultationsScreen />
          </PrivateStructure>
        }
      />

      <Route
        path="/lab-results"
        element={
          <PrivateStructure>
            <LabResultsScreen />
          </PrivateStructure>
        }
      />

      <Route path="/login" element={<Navigate to="/" />} />

      <Route path="/*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default PrivateRoutes;
