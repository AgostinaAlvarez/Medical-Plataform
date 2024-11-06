import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../../LoadingScreen";
import { apiGet } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Table,
  Checkbox,
  Modal,
  ConfigProvider,
} from "antd";
import {
  transformDate,
  transform_date_in_array,
  updateAsideOptions,
} from "../../../functions/functions";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { AppContext } from "../../../context/AppContext";
import { identificacion_type_options } from "../../../utils/PatientInfo";
import { MdFilterList, MdOutlineRemoveRedEye } from "react-icons/md";
import { Radio } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { GiChemicalDrop } from "react-icons/gi";
import { FiFilter } from "react-icons/fi";

const { RangePicker } = DatePicker;

const ActionsComponent = ({ record }) => {
  const navigate = useNavigate();
  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    console.log("accion");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const viewConsultation = () => {
    console.log(record);
    //navigate(`/patient/${record.patient_id}/consultations/detail/${record.id}`);
  };

  const deleteConsultation = () => {
    //ver
  };

  return (
    <>
      <div
        className="row"
        style={{ gap: "15px", zIndex: 60, fontSize: "19px" }}
      >
        <MdOutlineRemoveRedEye onClick={viewConsultation} />
        <AiOutlineEdit onClick={viewConsultation} />
        <BsTrash3 onClick={handleOpenModal} />
      </div>
      <Modal
        title="Eliminar"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loadingModal}
            onClick={handleOk}
          >
            Aceptar
          </Button>,
          <Button key="back" onClick={handleCancelModal}>
            Cancelar
          </Button>,
        ]}
      >
        <div>
          Estas seguro que deseas eliminar este resultado de laboratorio? Esta
          accion es irreversible
        </div>
      </Modal>
    </>
  );
};

const LabResultsScreen = () => {
  const { token, asideOptions, setAsideOptions } = useContext(AppContext);

  useEffect(() => {
    console.log("lab results");
    update_aside();
  }, []);

  const update_aside = () => {
    const array = updateAsideOptions("lab results", asideOptions);
    setAsideOptions(array);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [labResultsAllData, setLabResultsAllData] = useState([]);
  const [labResultsData, setLabResultsData] = useState([]);

  useEffect(() => {
    getLabResultsData();
  }, []);

  const getLabResultsData = async () => {
    const { data: response, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/lab-results/get_all`,
      header_private(token)
    );
    if (response) {
      const data = transform_date_in_array(response);

      console.log(data);
      setLabResultsData(data);
      setLabResultsAllData(data);
      setError(false);
      setLoading(false);
    } else {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const viewLabResult = (record) => {
    navigate(`/patient/${record.patient_id}/labresults/detail/${record.id}`);
  };

  const viewMedicalConsultation = (record) => {
    navigate(
      `/patient/${record.patient_id}/consultations/detail/${record.medical_consultation_id}`
    );
  };

  const filters_objt = [
    {
      name: "dates",
      apply: false,
      value: null,
    },
    {
      name: "reason",
      apply: false,
      value: null,
    },
    {
      name: "patient_name",
      apply: false,
      value: null,
    },
    {
      name: "patient_identification_type",
      apply: false,
      value: null,
    },
    {
      name: "patient_identification_number",
      apply: false,
      value: null,
    },
    {
      name: "consultation_connection",
      apply: false,
      value: null,
    },
  ];

  const [appliedFilters, setAppliedFilters] = useState(filters_objt);

  //FUNCIONES PARA FILTRAR
  const evaluateFilter = (filter_name) => {
    let register_array = [];

    const filterData = appliedFilters.filter(
      (item) => item.name !== filter_name
    );

    const filtersApply = filterData.some((item) => item.apply === true);

    if (filtersApply === true) {
      let filtered_data = labResultsAllData;

      const filters = filterData.filter((item) => item.apply === true);

      filters.forEach((element) => {
        if (element.name === "dates") {
          let new_data = filterByDateRange(filtered_data, element.value);
          filtered_data = new_data;
        } else if (element.name === "patient_identification_type") {
          let new_data = filterBySelectValue(
            filtered_data,
            element.value,
            element.name
          );
          filtered_data = new_data;
        } else if (element.name === "consultation_connection") {
          let new_data = filterByConsultationConection(
            filtered_data,
            "medical_consultation_id",
            element.value
          );
          filtered_data = new_data;
        } else {
          let new_data = filterBySearchValue(
            filtered_data,
            element.value,
            element.name
          );
          filtered_data = new_data;
        }
      });
      register_array = filtered_data;
    } else {
      register_array = labResultsAllData;
    }

    return register_array;
  };

  const updateAppliedFilter = (name, bool, value) => {
    const array = appliedFilters.map((item) => {
      if (item.name === name) {
        return { ...item, apply: bool, value: value };
      }
      return item;
    });
    return array;
  };

  //FILTROS
  //filtrar por fechas
  const filterByDateRange = (data, datesString) => {
    // Convertir las fechas de inicio y fin a objetos Date
    const startDate = new Date(datesString[0]);
    const endDate = new Date(datesString[1]);

    return data.filter((item) => {
      const itemDate = new Date(item.date); // Convertir la fecha de cada objeto
      return itemDate >= startDate && itemDate <= endDate;
    });
  };
  //filtrar por termino de busqueda
  const filterBySearchValue = (data, searchString, property) => {
    return data.filter((item) =>
      item[property]?.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  //filtrar por select
  const filterBySelectValue = (data, searchValue, property) => {
    return data.filter((item) => item[property] === searchValue);
  };

  //filtrar por id de conexion
  const filterByConsultationConection = (data, property, value) => {
    let filteredRecords;

    if (value === true) {
      filteredRecords = data.filter((item) => item[property] !== null);
    } else if (value === false) {
      filteredRecords = data.filter((item) => item[property] === null);
    }

    return filteredRecords;
  };

  //HANDLE CHANGES
  const HandleChangeRangePicker = (dates, dateStrings) => {
    let register_array = evaluateFilter("dates");

    if (dates) {
      const filteredRecords = filterByDateRange(register_array, dateStrings);
      register_array = filteredRecords;
      setAppliedFilters(updateAppliedFilter("dates", true, dateStrings));
    } else {
      setAppliedFilters(updateAppliedFilter("dates", false, null));
    }

    setLabResultsData(register_array);
  };

  const HandleChangeReason = (e) => {
    let register_array = evaluateFilter("reason");

    if (e.target.value.trim() === "") {
      setAppliedFilters(updateAppliedFilter("reason", false, null));
    } else {
      const filteredRecords = filterBySearchValue(
        register_array,
        e.target.value,
        "reason"
      );
      register_array = filteredRecords;
      setAppliedFilters(updateAppliedFilter("reason", true, e.target.value));
    }

    setLabResultsData(register_array);
  };

  const HandleChangePatientName = (e) => {
    let register_array = evaluateFilter("patient_name");

    if (e.target.value.trim() === "") {
      setAppliedFilters(updateAppliedFilter("patient_name", false, null));
    } else {
      const filteredRecords = filterBySearchValue(
        register_array,
        e.target.value,
        "patient_name"
      );
      register_array = filteredRecords;
      setAppliedFilters(
        updateAppliedFilter("patient_name", true, e.target.value)
      );
    }

    setLabResultsData(register_array);
  };

  const HandleChangePatientIdentificationType = (value, record) => {
    let register_array = evaluateFilter("patient_identification_type");
    if (value) {
      const filteredRecords = filterBySelectValue(
        register_array,
        value,
        "patient_identification_type"
      );
      register_array = filteredRecords;
      setAppliedFilters(
        updateAppliedFilter("patient_identification_type", true, value)
      );
    } else {
      setAppliedFilters(
        updateAppliedFilter("patient_identification_type", false, null)
      );
    }
    setLabResultsData(register_array);
  };

  const HandleChangePatientIdentificationNumber = (e) => {
    let register_array = evaluateFilter("patient_identification_number");

    if (e.target.value.trim() === "") {
      setAppliedFilters(
        updateAppliedFilter("patient_identification_number", false, null)
      );
    } else {
      const filteredRecords = filterBySearchValue(
        register_array,
        e.target.value,
        "patient_identification_number"
      );
      register_array = filteredRecords;
      setAppliedFilters(
        updateAppliedFilter(
          "patient_identification_number",
          true,
          e.target.value
        )
      );
    }

    setLabResultsData(register_array);
  };

  const HandleCahngeConsultationConnection = (e) => {
    let register_array = evaluateFilter("consultation_connection");

    if (e.target.value === null) {
      setAppliedFilters(
        updateAppliedFilter("consultation_connection", false, null)
      );
    } else {
      const filteredRecords = filterByConsultationConection(
        register_array,
        "medical_consultation_id",
        e.target.value
      );
      register_array = filteredRecords;
      setAppliedFilters(
        updateAppliedFilter("consultation_connection", true, e.target.value)
      );
    }
    setLabResultsData(register_array);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>Error! </div>
          ) : (
            <div className="column section-container">
              <div className="row-space-btw">
                <div className="row">
                  <div className="section-icon">
                    <GiChemicalDrop />
                  </div>
                  <span className="section-ttl">Resultados de laboratorio</span>
                </div>
                <div
                  className="section-btn btn-border row"
                  onClick={() => {
                    //navigate("/patient-new");
                  }}
                >
                  <GoPlusCircle />
                  <span>Nuevo Resultado</span>
                </div>
              </div>

              <div className="section-filter-container lab-results-section-filter-container">
                <FiFilter className="filter-icon" />
                <div
                  style={{
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "0.4fr 0.4fr 1fr auto",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "13px",
                  }}
                >
                  <div className="column">
                    <span>Fecha de estudio</span>
                    <RangePicker
                      format="YYYY-MM-DD"
                      onChange={HandleChangeRangePicker}
                    />
                  </div>
                  <div className="column">
                    <span>Motivo del estudio</span>
                    <Input
                      placeholder="Motivo del estudio"
                      onChange={HandleChangeReason}
                    />
                  </div>
                  <div className="column">
                    <span>Datos del paciente</span>
                    <div
                      style={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: "0.5fr 1fr",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Input
                        placeholder="Nombre del paciente"
                        onChange={HandleChangePatientName}
                      />
                      <div
                        className="row"
                        style={{
                          display: "grid",
                          width: "100%",
                          gridTemplateColumns: "0.3fr 1fr",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <Select
                          allowClear={true}
                          placeholder="Tipo de identificacion"
                          options={identificacion_type_options}
                          onChange={HandleChangePatientIdentificationType}
                        />
                        <Input
                          placeholder="Numero de identificacion"
                          onChange={HandleChangePatientIdentificationNumber}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <span>Relacionado a consulta</span>
                    <Radio.Group
                      onChange={HandleCahngeConsultationConnection}
                      //onChange={onChange}
                      //value={consultaFilter}
                    >
                      <Radio value={true}>Asociado</Radio>
                      <Radio value={false}>No Asociado</Radio>
                      <Radio value={null}>Todos</Radio>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    fontSize: 13,
                    colorText: "#474e56",
                  },
                  components: {
                    Table: {
                      borderColor: "transparent",
                      headerBg: "#30AADD",
                      headerColor: "#ffffff",
                    },
                  },
                }}
              >
                <Table
                  columns={[
                    {
                      title: "Fecha",
                      key: "date",
                      dataIndex: "date",
                      onCell: (record) => ({
                        onClick: () => {
                          viewLabResult(record);
                        },
                      }),
                      render: (text, record) => transformDate(text),
                    },
                    {
                      title: "Motivo del Estudio",
                      key: "reason",
                      dataIndex: "reason",
                      onCell: (record) => ({
                        onClick: () => {
                          viewLabResult(record);
                        },
                      }),
                    },
                    {
                      title: "Paciente",
                      key: "full_name",
                      render: (text, record) =>
                        `${record.patient_name} ${record.patient_last_name}`,
                      onCell: (record) => ({
                        onClick: () => {
                          viewLabResult(record);
                        },
                      }),
                    },
                    {
                      title: "ID del Paciente",
                      render: (text, record) =>
                        `(${record.patient_identification_type.toUpperCase()}) ${
                          record.patient_identification_number
                        }`,
                      onCell: (record) => ({
                        onClick: () => {
                          viewLabResult(record);
                        },
                      }),
                    },
                    {
                      title: "Sexo",
                      dataIndex: "patient_sex",
                      key: "patient_sex",
                      onCell: (record) => ({
                        onClick: () => {
                          viewLabResult(record);
                        },
                      }),
                    },
                    {
                      title: "Resultado Asociado a Consulta",
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
                    {
                      render: (text, record) => (
                        <ActionsComponent record={record} />
                      ),
                    },
                  ]}
                  dataSource={labResultsData}
                />
              </ConfigProvider>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LabResultsScreen;
