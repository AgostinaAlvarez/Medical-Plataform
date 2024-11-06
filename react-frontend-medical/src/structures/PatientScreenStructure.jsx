import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import { apiGet } from "../utils/Api";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { header_private } from "../utils/Headers";

import { patient_menu_options } from "../enums/PatientDetailMenuOptions";
import PatientHistory from "../screens/PrivateScreens/Patients/PatientHistory";
import PatientMetrics from "../screens/PrivateScreens/Patients/PatientMetrics";
import PatientFiles from "../screens/PrivateScreens/Patients/PatientFiles";
import PatientConsultationRoutes from "../routes/PrivateRoutes/PatientConsultationRoutes";
import PatientLabResultsRoutes from "../routes/PrivateRoutes/PatientLabResultsRoutes";
import { updateAsideOptions } from "../functions/functions";

const PatientScreenStructure = () => {
  const {
    token,
    patientData,
    setPatientData,
    asidePatientMenuOptions,
    setAsidePatientMenuOptions,
  } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //busca la coincidencia si existe el paciente
    getPatient();
  }, []);

  const getPatient = async () => {
    setError(null);
    const id = params.id;
    const { data, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/patient/get/${id}`,
      header_private(token)
    );

    if (data) {
      console.log(data);
      setPatientData(data);
    } else {
      console.log(error);
      setError(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const navigateSection = (route) => {
    navigate(`/patient/${params.id}${route}`);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>Paciente no encontrado!</div>
          ) : (
            <div className="patient-detail-structure">
              <div className="patient-detail-menu-responsive">
                {asidePatientMenuOptions.map((item) => (
                  <>{item.icon}</>
                ))}
              </div>
              <div className="patient-detail-main">
                <Routes>
                  <Route path="/" element={<PatientHistory />} />
                  <Route
                    path="/consultations/*"
                    element={<PatientConsultationRoutes />}
                  />
                  <Route
                    path="/labresults/*"
                    element={<PatientLabResultsRoutes />}
                  />
                  <Route path="/metrics" element={<PatientMetrics />} />
                  <Route path="/files/*" element={<PatientFiles />} />
                </Routes>
              </div>
              <div className="patient-detail-menu">
                {asidePatientMenuOptions.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.selected === true
                        ? "row patient-detail-menu-row patient-detail-menu-row-cta"
                        : "row patient-detail-menu-row"
                    }
                    onClick={() => {
                      const update_array = updateAsideOptions(
                        item.label,
                        patient_menu_options
                      );
                      setAsidePatientMenuOptions(update_array);
                      navigateSection(item.route);
                    }}
                  >
                    <div className="patient-detail-menu-icon">{item.icon}</div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PatientScreenStructure;
