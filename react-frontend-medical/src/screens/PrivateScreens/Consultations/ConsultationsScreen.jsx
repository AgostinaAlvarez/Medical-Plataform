import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  Modal,
  Select,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdFilterList, MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import LoadingScreen from "../../LoadingScreen";
import NewConsultation from "../../../components/Modals/NewConsultation";
import {
  transformDate,
  updateAsideOptions,
} from "../../../functions/functions";
import { identificacion_type_options } from "../../../utils/PatientInfo";
import {
  filterByDateRange,
  filterBySearchValue,
  filterBySelectValue,
} from "../../../functions/filters";
import { FaUsers } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { RiFileCopy2Fill } from "react-icons/ri";
import { GoPlusCircle } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import { colors } from "../../../utils/Colors";

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
    navigate(`/patient/${record.patient_id}/consultations/detail/${record.id}`);
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
          Estas seguro que deseas eliminar la consulta medica, esta accion es
          irreversible
        </div>
      </Modal>
    </>
  );
};

const ConsultationsScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [medicalConsultationData, setMedicalConsultationData] = useState([]);
  const [allRegistersMedicalConsultation, setAllRegistersMedicalConsultation] =
    useState([]);

  const { token, asideOptions, setAsideOptions } = useContext(AppContext);

  useEffect(() => {
    console.log("consultations");
    update_aside();
  }, []);

  const update_aside = () => {
    const array = updateAsideOptions("consultations", asideOptions);
    setAsideOptions(array);
  };

  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    getConsultationsData();
    getPatients();
  }, []);

  const getPatients = async () => {
    const { data, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/patient/get/all`,
      header_private(token)
    );
    if (data) {
      setPatientsList(data);
    } else {
      console.log(error);
    }
  };

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
      `${import.meta.env.VITE_API_BACK_URL}/consultation/get_all`,
      header_private(token)
    );

    if (response) {
      const data = transformData(response);
      console.log("data de la consultation");
      console.log(data);
      setMedicalConsultationData(data);
      setAllRegistersMedicalConsultation(data);
      setError(false);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const navigateToconsultationDetail = (record) => {
    navigate(`/patient/${record.patient_id}/consultations/detail/${record.id}`);
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
    /*
    {
      name: "consultation_connection",
      apply: false,
      value: null,
    },
    */
  ];

  const [appliedFilters, setAppliedFilters] = useState(filters_objt);

  //FUNCTIONES PARA FILTRAR

  const evaluateFilter = (filter_name) => {
    let register_array = [];

    const filterData = appliedFilters.filter(
      (item) => item.name !== filter_name
    );

    const filtersApply = filterData.some((item) => item.apply === true);

    if (filtersApply === true) {
      let filtered_data = allRegistersMedicalConsultation;

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
      register_array = allRegistersMedicalConsultation;
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

    setMedicalConsultationData(register_array);
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

    setMedicalConsultationData(register_array);
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

    setMedicalConsultationData(register_array);
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
    setMedicalConsultationData(register_array);
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

    setMedicalConsultationData(register_array);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>Error algo salio mal</div>
          ) : (
            <>
              <div className="column section-container">
                <div className="row-space-btw">
                  <div className="row">
                    <div className="section-icon">
                      <RiFileCopy2Fill />
                    </div>
                    <span className="section-ttl">Consultas Medicas</span>
                  </div>
                  <div
                    className="section-btn btn-border row"
                    onClick={handleOpenModal}
                  >
                    <GoPlusCircle />
                    <span>Nueva consulta</span>
                  </div>
                </div>
                <div className="consultation-section-filter-container section-filter-container">
                  <FiFilter className="filter-icon" />
                  <div
                    style={{
                      display: "grid",
                      width: "100%",
                      //backgroundColor: "red",
                      gridTemplateColumns: "0.4fr 0.4fr 1fr",
                      gap: "10px",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div className="column">
                      <span>Fecha de consulta</span>
                      <RangePicker
                        format="YYYY-MM-DD"
                        onChange={HandleChangeRangePicker}
                      />
                    </div>
                    <div className="column">
                      <span>Motivo de la consulta</span>
                      <Input
                        placeholder="Motivo de la consulta"
                        onChange={HandleChangeReason}
                      />
                    </div>
                    <div className="column">
                      <span>Datos del paciente</span>
                      <div
                        style={{
                          display: "grid",
                          width: "100%",
                          //backgroundColor: "red",
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
                            //backgroundColor: "red",
                            gridTemplateColumns: "0.4fr 1fr",
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
                            navigateToconsultationDetail(record);
                          },
                        }),
                        render: (text, record) => transformDate(text),
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
                      {
                        title: "Paciente",
                        key: "full_name",
                        render: (text, record, index) => {
                          // Seleccionar un color del array de colores usando el índice y el operador módulo
                          const color = colors[index % colors.length];

                          return (
                            <div className="patient-table-name-container row">
                              <div
                                className="icon-container"
                                style={{
                                  backgroundColor: color,
                                  height: "30px",
                                  width: "30px",
                                  fontSize: "11px",
                                }}
                              >
                                {record.patient_name.charAt(0)}
                                {record.patient_last_name.charAt(0)}
                              </div>
                              {/*
                              <FaUserCircle style={{ fontSize: "28px", color }} />
                              */}
                              <span>
                                {record.patient_name} {record.patient_last_name}
                              </span>
                            </div>
                          );
                        },
                        onCell: (record) => ({
                          onClick: () => {
                            //handleRowClick(record);
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
                            //handleRowClick(record);
                          },
                        }),
                      },
                      {
                        title: "Sexo",
                        dataIndex: "patient_sex",
                        key: "patient_sex",
                        onCell: (record) => ({
                          onClick: () => {
                            //handleRowClick(record);
                          },
                        }),
                      },
                      {
                        render: (text, record) => (
                          <ActionsComponent record={record} />
                        ),
                      },
                    ]}
                    dataSource={medicalConsultationData}
                    pagination={{
                      pageSize: 5,
                    }}
                  />
                </ConfigProvider>
              </div>
              <NewConsultation
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadingModal={loadingModal}
                setLoadingModal={setLoadingModal}
                patientsList={patientsList}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ConsultationsScreen;
