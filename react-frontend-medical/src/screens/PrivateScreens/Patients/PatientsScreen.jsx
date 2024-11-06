import { Button, ConfigProvider, DatePicker, Input, Select, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingLayout from "../../LoadingLayout";
import { apiGet } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import LoadingScreen from "../../LoadingScreen";
import { AppContext } from "../../../context/AppContext";
import {
  transformDate,
  updateAsideOptions,
} from "../../../functions/functions";
import { FaUserCircle } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { MdFilterList, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { colors } from "../../../utils/Colors";
import { identificacion_type_options } from "../../../utils/PatientInfo";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";

const ActionsComponent = ({ record }) => {
  const navigate = useNavigate();

  const action = () => {
    console.log(record);
  };

  const addConsultation = () => {
    navigate(`/patient/${record.id}/consultations/new`);
  };

  const editPatient = () => {
    navigate(`/edit-patient/${record.id}`);
  };

  return (
    <div className="row" style={{ gap: "10px", zIndex: 60 }}>
      {/*
        <MdOutlineRemoveRedEye style={{ fontSize: "17px", color: "#30aadd" }} />
         */}
      <Button onClick={addConsultation} color="primary" variant="filled">
        + Agregar consulta
      </Button>
      <div className="table-action-icon table-action-icon-edit">
        <AiOutlineEdit onClick={editPatient} />
      </div>
      <div className="table-action-icon table-action-icon-delete">
        <BsTrash3 />
      </div>
    </div>
  );
};

const PatientsScreen = () => {
  const { token, asideOptions, setAsideOptions } = useContext(AppContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("patients");
    update_aside();
  }, []);

  const update_aside = () => {
    const array = updateAsideOptions("patients", asideOptions);
    setAsideOptions(array);
  };

  //obtener los pacientes:
  useEffect(() => {
    setError(null);
    getPatients();
  }, []);

  const getPatients = async () => {
    const { data, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/patient/get/all`,
      header_private(token)
    );
    if (data) {
      console.log(data);
      setPatients(data);
    } else {
      console.log(error);
      setError(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleRowClick = (record) => {
    console.log("handle row");
    console.log(record);
    navigate(`/patient/${record.id}`);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>Error! algo salio mal</div>
          ) : (
            <>
              <div className="column section-container">
                <div className="row-space-btw">
                  <div className="row">
                    <div className="section-icon">
                      <FaUsers />
                    </div>
                    <span className="section-ttl">Pacientes</span>
                  </div>
                  <div
                    className="section-btn btn-border row"
                    onClick={() => {
                      navigate("/patient-new");
                    }}
                  >
                    <GoPlusCircle />
                    <span>Nuevo Paciente</span>
                  </div>
                </div>
                <div className="patient-section-filter-container">
                  <FiFilter className="filter-icon" />
                  <div className="column">
                    <span>Nombre del paciente</span>
                    <Input
                      placeholder="Nombre del paciente"
                      //onChange={HandleChangeReason}
                    />
                  </div>
                  <div className="column">
                    <span>Fecha de nacimiento</span>
                    <DatePicker
                      format="YYYY-MM-DD"
                      placeholder="Fecha de nacimiento"
                    />
                  </div>
                  <div className="column">
                    <span>Tipo de Identificación</span>
                    <Select
                      allowClear={true}
                      placeholder={"Tipo de Identificación"}
                      options={identificacion_type_options}
                    />
                  </div>
                  <div className="column">
                    <span>Numero de Identificación</span>
                    <Input
                      placeholder="Numero de Identificación"
                      //onChange={HandleChangeReason}
                    />
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
                        title: "Nombre",
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
                                {record.name.charAt(0)}
                                {record.last_name.charAt(0)}
                              </div>

                              <span>
                                {record.name} {record.last_name}
                              </span>
                            </div>
                          );
                        },
                        onCell: (record) => ({
                          onClick: () => {
                            handleRowClick(record);
                          },
                        }),
                      },

                      {
                        title: "Fecha de nacimiento",
                        dataIndex: "birthday",
                        key: "birthday",
                        width: "180px",
                        render: (text) => transformDate(text),
                        onCell: (record) => ({
                          onClick: () => {
                            handleRowClick(record);
                          },
                        }),
                      },
                      {
                        title: "Identificación",
                        render: (text, record) =>
                          `(${record.identification_type.toUpperCase()}) ${
                            record.identification_number
                          }`,
                        onCell: (record) => ({
                          onClick: () => {
                            handleRowClick(record);
                          },
                        }),
                      },
                      {
                        title: "Sexo",
                        dataIndex: "sex",
                        key: "sex",
                        onCell: (record) => ({
                          onClick: () => {
                            handleRowClick(record);
                          },
                        }),
                      },
                      {
                        title: "Email",
                        dataIndex: "email",
                        key: "email",
                        onCell: (record) => ({
                          onClick: () => {
                            handleRowClick(record);
                          },
                        }),
                      },
                      {
                        title: "Telefono",
                        dataIndex: "phone",
                        key: "phone",
                        onCell: (record) => ({
                          onClick: () => {
                            handleRowClick(record);
                          },
                        }),
                      },
                      {
                        render: (text, record) => (
                          <ActionsComponent record={record} />
                        ),
                      },
                    ]}
                    dataSource={patients}
                    pagination={{
                      pageSize: 5,
                    }}
                  />
                </ConfigProvider>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PatientsScreen;
