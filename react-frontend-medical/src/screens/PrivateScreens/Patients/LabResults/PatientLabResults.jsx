import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../../LoadingScreen";
import { apiGet } from "../../../../utils/Api";
import { header_private } from "../../../../utils/Headers";
import { AppContext } from "../../../../context/AppContext";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import {
  transformDate,
  transform_date_in_array,
} from "../../../../functions/functions";

const PatientLabResults = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { patientData, token } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [labResultsData, setLabResultsData] = useState([]);

  useEffect(() => {
    getLabResultsData();
  }, []);

  const getLabResultsData = async () => {
    const { data: response, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/lab-results/all/${
        patientData.patient.id
      }`,
      header_private(token)
    );

    if (response) {
      const data = transform_date_in_array(response);
      setLabResultsData(data);
      //setAllRegistersMedicalConsultation(data);
      setError(false);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const viewLabResult = (record) => {
    navigate(
      `/patient/${patientData.patient.id}/labresults/detail/${record.id}`
    );
  };

  const viewMedicalConsultation = (record) => {
    navigate(
      `/patient/${patientData.patient.id}/consultations/detail/${record.medical_consultation_id}`
    );
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>error</div>
          ) : (
            <>
              <div>Lista de resultados de laboratio</div>
              <button
                onClick={() => {
                  navigate(`/patient/${params.id}/labresults/new`);
                }}
              >
                Nuevo resultado
              </button>
              <Table
                columns={[
                  {
                    title: "Fecha",
                    key: "date",
                    dataIndex: "date",
                    render: (text, record) => transformDate(text),
                    onCell: (record) => ({
                      onClick: () => {
                        viewLabResult(record);
                      },
                    }),
                  },
                  {
                    title: "Motivo",
                    key: "reason",
                    dataIndex: "reason",
                    onCell: (record) => ({
                      onClick: () => {
                        viewLabResult(record);
                      },
                    }),
                  },
                  {
                    title: "Asociado a consulta",
                    render: (text, record) =>
                      record.medical_consultation_id !== null ? (
                        <div className="row">
                          <CiCircleCheck
                            style={{ fontSize: "20px", color: "green" }}
                          />
                          <Button
                            color="primary"
                            variant="filled"
                            onClick={() => {
                              viewMedicalConsultation(record);
                            }}
                          >
                            Ver consulta
                          </Button>
                        </div>
                      ) : (
                        <div className="row">
                          <CiCircleRemove
                            style={{ fontSize: "20px", color: "red" }}
                          />
                        </div>
                      ),
                  },
                ]}
                dataSource={labResultsData}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PatientLabResults;
