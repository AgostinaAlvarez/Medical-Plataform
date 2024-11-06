import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../../../LoadingScreen";
import { AppContext } from "../../../../context/AppContext";
import { useParams } from "react-router-dom";
import { apiGet } from "../../../../utils/Api";
import { header_private } from "../../../../utils/Headers";
import { Table } from "antd";
import { calculateAge, transformDate } from "../../../../functions/functions";
import { LuInfo } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import ConsultationNotes from "../../../../components/Patient/Consultation/ConsultationNotes";
import TreatmentPlan from "../../../../components/Patient/Consultation/TreatmentPlan";
import Ketosis from "../../../../components/Patient/Consultation/Ketosis";
import TopographicExploration from "../../../../components/Patient/Consultation/TopographicExploration";
import PhsycalExamination from "../../../../components/Patient/Consultation/PhsycalExamination.JSX";
import MedicalDiagnosis from "../../../../components/Patient/Consultation/MedicalDiagnosis";
import LabRequestsAndImage from "../../../../components/Patient/Consultation/LabRequestsAndImage";
import MedicalProcedure from "../../../../components/Patient/Consultation/MedicalProcedure";
import MedicalPrescription from "../../../../components/Patient/Consultation/MedicalPrescription";
import MedicalPrescriptionDetail from "../../../../components/Patient/Consultation/MedicalPrescriptionDetail";
import LabResultsByMedicalConsultation from "../../../../components/Patient/Consultation/LabResultsByMedicalConsultation";

const PatientConsultationDetail = () => {
  const { patientData, token } = useContext(AppContext);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consultationData, setConsultationData] = useState(null);

  useEffect(() => {
    getConsultationData(patientData.patient.id, params.consultation_id);
  }, []);

  useEffect(() => {
    console.log("informacion del paciente");
    console.log(patientData);
  }, []);

  const getConsultationData = async (patient_id, consultation_id) => {
    const { data: response, error } = await apiGet(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/consultation/get/${patient_id}/${consultation_id}`,
      header_private(token)
    );
    if (response) {
      setConsultationData(response);
      console.log(response);
      setTimeout(() => {
        setError(null);
        setLoading(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setError(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>error!</div>
          ) : (
            <>
              <div
                className="column"
                style={{
                  gap: 20,
                  position: "relative",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                  padding: 20,
                }}
              >
                <span className="semi-strong-lbl">CONSULTA MEDICA</span>
                <div className="row patient-consultation-detail-card-item">
                  <span className="semi-strong-lbl">Fecha</span>
                  <span>
                    {transformDate(consultationData?.consultation.date)}
                  </span>
                </div>
                <div className="row patient-consultation-detail-card-item">
                  <span className="semi-strong-lbl">Motivo de la consulta</span>
                  <span>{consultationData?.consultation.reason}</span>
                </div>
                <div className="row patient-consultation-detail-card-item">
                  <span className="semi-strong-lbl">Paciente</span>
                  <span>
                    {patientData?.patient.name} {patientData?.patient.last_name}
                  </span>
                </div>
                <div className="row patient-consultation-detail-card-item">
                  <span className="semi-strong-lbl">Edad</span>
                  <span>
                    {calculateAge(patientData?.patient.birthday)} años
                  </span>
                </div>

                <LabResultsByMedicalConsultation
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <ConsultationNotes
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <TreatmentPlan
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <Ketosis
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <TopographicExploration
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <PhsycalExamination
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <MedicalDiagnosis
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <LabRequestsAndImage
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <MedicalProcedure
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
                <MedicalPrescriptionDetail
                  consultationData={consultationData}
                  setConsultationData={setConsultationData}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PatientConsultationDetail;

{
  /*INSTRUCCIONES MEDICAS*/
}
{
  /*
                <div className="column patient-consultation-detail-card">
                  <div className="semi-strong-lbl patient-consultation-detail-card-header patient-consultation-detail-card-content">
                    Instrucciones medicas
                  </div>
                  <div className="patient-consultation-detail-card-content">
                    {consultationData?.consultation.medical_instructions}
                  </div>
                </div>
                */
}
