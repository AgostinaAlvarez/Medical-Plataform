import { DatePicker, Input, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import { apiGet } from "../../../../utils/Api";
import { header_private } from "../../../../utils/Headers";
import LoadingScreen from "../../../LoadingScreen";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const PatientConsultations = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [medicalConsultationData, setMedicalConsultationData] = useState([]);

  const [allRegistersMedicalConsultation, setAllRegistersMedicalConsultation] =
    useState([]);

  const [searchValue, setSearchValue] = useState(null);
  const [datesValue, setDatesValue] = useState(null);
  const [datesValueStr, setDatesValueStr] = useState(null);

  const { patientData, token } = useContext(AppContext);

  useEffect(() => {
    getConsultationsData();
  }, []);

  const transformData = (data) => {
    const update_data = data.map((item) => {
      return {
        ...item,
        date: item.date.slice(0, 10),
      };
    });
    return update_data;
  };

  const getConsultationsData = async () => {
    const { data: response, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/consultation/all/${
        patientData.patient.id
      }`,
      header_private(token)
    );

    if (response) {
      const data = transformData(response);
      setMedicalConsultationData(data);
      //respaldo
      setAllRegistersMedicalConsultation(data);
      setError(false);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const navigateToconsultationDetail = (record) => {
    console.log(record);
    navigate(
      `/patient/${patientData.patient.id}/consultations/detail/${record.id}`
    );
  };

  const filterByDateRange = (data, datesString) => {
    // Convertir las fechas de inicio y fin a objetos Date
    const startDate = new Date(datesString[0]);
    const endDate = new Date(datesString[1]);

    return data.filter((item) => {
      const itemDate = new Date(item.date); // Convertir la fecha de cada objeto
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const filterBySearchValue = (data, searchString) => {
    return data.filter((item) =>
      item.reason.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  const handleRangeChange = (dates, datesString) => {
    setDatesValue(dates);
    setDatesValueStr(datesString);
    if (dates) {
      //existen las dates, voy a ver si hay un search value
      if (searchValue !== null) {
        //existe un search value osea que ya se filtro por search value
        const filteredRecords = filterByDateRange(
          medicalConsultationData,
          datesString
        );
        setMedicalConsultationData(filteredRecords);
      } else {
        const filteredRecords = filterByDateRange(
          allRegistersMedicalConsultation,
          datesString
        );
        setMedicalConsultationData(filteredRecords);
      }
    } else {
      if (searchValue !== null) {
        const filteredRecords = filterBySearchValue(
          allRegistersMedicalConsultation,
          searchValue
        );
        setMedicalConsultationData(filteredRecords);
      } else {
        setMedicalConsultationData(allRegistersMedicalConsultation);
      }
    }
  };

  const handleSearchChange = (e) => {
    if (e.target.value.trim() === "") {
      setSearchValue(null);
      if (datesValue) {
        const filteredRecords = filterByDateRange(
          allRegistersMedicalConsultation,
          datesValueStr
        );
        setMedicalConsultationData(filteredRecords);
      } else {
        setMedicalConsultationData(allRegistersMedicalConsultation);
      }
    } else {
      setSearchValue(e.target.value);
      if (datesValue) {
        const filteredRecords = filterBySearchValue(
          medicalConsultationData,
          e.target.value
        );
        setMedicalConsultationData(filteredRecords);
      } else {
        const filteredRecords = filterBySearchValue(
          allRegistersMedicalConsultation,
          e.target.value
        );
        setMedicalConsultationData(filteredRecords);
      }
    }
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
            <div
              className="column"
              style={{ gap: 20, boxSizing: "border-box", padding: "30px" }}
            >
              <div className="row-space-btw">
                <span>CONSULTAS PASADAS</span>
                <button
                  onClick={() => {
                    navigate(`/patient/${params.id}/consultations/new`);
                  }}
                >
                  Nueva consulta
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 0.5fr 1fr",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <span>Filtrar por:</span>
                <RangePicker onChange={handleRangeChange} format="YYYY-MM-DD" />
                <Input
                  onChange={handleSearchChange}
                  prefix={<SearchOutlined />}
                  placeholder="Motivo de consulta"
                />
              </div>
              <Table
                columns={[
                  {
                    title: "Fecha",
                    key: "date",
                    dataIndex: "date",
                    onCell: (record) => ({
                      onClick: () => {
                        navigateToconsultationDetail(record);
                      },
                    }),
                  },
                  {
                    title: "Motivo de consulta",
                    key: "reason",
                    dataIndex: "reason",
                    onCell: (record) => ({
                      onClick: () => {
                        navigateToconsultationDetail(record);
                      },
                    }),
                  },
                ]}
                dataSource={medicalConsultationData}
              />
            </div>
          )}
        </>
      )}
      {/*
      
      */}
    </>
  );
};

export default PatientConsultations;
