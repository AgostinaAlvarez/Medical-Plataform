import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../../LoadingScreen";
import { AppContext } from "../../../../context/AppContext";
import { apiGet } from "../../../../utils/Api";
import { header_private } from "../../../../utils/Headers";
import { calculateAge } from "../../../../functions/functions";
import PrincipalCard from "../../../../components/PrincipalCard";
import { lab_results_units } from "../../../../utils/MedicalInfo";
import { Button } from "antd";

const PatientLabResultDetail = () => {
  const { patientData, token } = useContext(AppContext);
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [labResultData, setLabResultData] = useState(null);

  useEffect(() => {
    getLabResultData(patientData.patient.id, params.lab_result_id);
  }, []);

  const getLabResultData = async (patient_id, lab_result_id) => {
    setError(null);
    console.log(patient_id);
    console.log(lab_result_id);
    const { data: response, error } = await apiGet(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/lab-results/get/${patient_id}/${lab_result_id}`,
      header_private(token)
    );
    console.log(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/lab-results/get/${patient_id}/${lab_result_id}`
    );
    if (response) {
      console.log(response);
      setLabResultData(response);
      setTimeout(() => {
        setError(null);
        setLoading(false);
      }, 2000);
    } else {
      console.log(error);
      if (error === null) {
        setTimeout(() => {
          setError({ message: "Registro no encontrado" });
          setLoading(false);
        }, 2000);
        return;
      }
      setTimeout(() => {
        setError({ message: "Error del servidor" });
        setLoading(false);
      }, 2000);
    }
  };

  const viewMedicalConsultation = () => {
    navigate(
      `/patient/${labResultData.patient_id}/consultations/detail/${labResultData.medical_consultation_id}`
    );
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>{error?.message}</div>
          ) : (
            <div className="patient-lab-result-grid">
              <PrincipalCard title={"RESULTADOS DE LABORATORIO"}>
                <div>
                  {lab_results_units.map((category) => {
                    // Filtrar los items que tienen un valor no nulo en data.results
                    const filteredItems = category.items.filter(
                      (item) => labResultData[item.column_name] !== null
                    );

                    // Si no hay elementos con valores no nulos, no se renderiza la categoría
                    if (filteredItems.length === 0) {
                      return null;
                    }

                    return (
                      <div>
                        {/* Renderizar la clasificación */}
                        <div className="patient-lab-reult-clasification">
                          {category.clasificacion}
                        </div>
                        {/* Renderizar los items filtrados */}
                        {filteredItems.map((item) => (
                          <div className="row-space-btw">
                            <div>{item.label}</div>
                            <div>
                              <div className="row">
                                <span>{labResultData[item.column_name]}</span>
                                <span>{item.unit}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </PrincipalCard>
              <div className="patient-lab-result-detail-box">
                <PrincipalCard title={"DETALLES"}>
                  <div className="column">
                    <div className="row patient-consultation-detail-card-item">
                      <span className="semi-strong-lbl">Paciente</span>
                      <span>
                        {patientData?.patient.name}{" "}
                        {patientData?.patient.last_name}
                      </span>
                    </div>
                    <div className="row patient-consultation-detail-card-item">
                      <span className="semi-strong-lbl">Edad</span>
                      <span>
                        {calculateAge(patientData?.patient.birthday)} años
                      </span>
                    </div>
                    <div className="row patient-consultation-detail-card-item">
                      <span className="semi-strong-lbl">
                        Motivo del estudio
                      </span>
                      <span>{labResultData?.reason}</span>
                    </div>
                    {labResultData?.medical_consultation_id !== null ? (
                      <Button onClick={viewMedicalConsultation}>
                        Ver consulta asociada
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </PrincipalCard>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PatientLabResultDetail;
