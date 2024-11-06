import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  Modal,
  TimePicker,
  message,
} from "antd";
import React, { useContext, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import {
  addOneHour,
  cutAfterT,
  defaultDayjsDate,
  transformDate,
} from "../../../functions/functions";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../../../context/AppContext";
import SelectComponent from "../../../components/SelectComponent";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { apiPost } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import dayjs from "dayjs";

const NewEvent = ({
  isNewEvenetModalOpen,
  setIsNewEventModalOpen,
  newEventData,
  patientsList,
  events,
  setEvents,
}) => {
  const { userData, token } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      event: {
        user_id: userData.id,
        date: null,
        hour: null,
        asocciate_patient: true,
      },
      patient: null,
      prospective_patient: null,
    },
  });

  const [loadingModal, setLoadingModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [openValuen, setOpenValue] = useState(undefined);

  const [openContactForm, setOpenContactForm] = useState(false);

  const selectContact = () => {
    setValue("event.asocciate_patient", true);
    setValue("prospective_patient", null);
    setSelectedPatient(null);
    setSearchValue(null);
    setOpenValue(undefined);
    setOpenContactForm(false);
  };

  const addNewContact = () => {
    setValue("event.asocciate_patient", false);
    setValue("patient", null);
    setOpenContactForm(true);
    setOpenValue(undefined);
    setSelectedPatient(null);
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const HandleChange = (value, record) => {
    setValue("event.asocciate_patient", true);
    setValue("prospective_patient", null);
    setOpenValue(false);
    console.log("seleccion de paciente");
    setSelectedPatient(record);
    setOpenContactForm(false);
    const patient_id = record.id;
    setValue("patient.patient_id", patient_id);
    setTimeout(() => {
      setOpenValue(undefined);
    }, 60);
  };

  const HandleAddNewPatient = () => {
    setValue("event.asocciate_patient", false);
    setValue("patient", null);
    setOpenValue(false);
    console.log("abrir nuevo formulario abajo");
    setOpenContactForm(true);
    setSelectedPatient(null);
    setTimeout(() => {
      setOpenValue(undefined);
    }, 60);
  };

  const handleCancelModal = () => {
    reset();
    selectContact();
    setIsNewEventModalOpen(false);
  };

  const transform_object = (element) => {
    let date = cutAfterT(element.event.date);
    let start_string = `${date}${element.event.hour}`;
    let end_string = `${date}${addOneHour(element.event.hour)}`;
    let objt = {
      start: dayjs(start_string).toDate(),
      end: dayjs(end_string).toDate(),
      title: "Consulta",
      detail_event: element,
    };

    return objt;
  };

  const handleOk = async (data) => {
    setLoadingModal(true);

    let request_data;

    if (newEventData?.hour && newEventData?.date !== null) {
      request_data = {
        ...data,
        event: {
          ...data.event,
          hour: newEventData.hour,
          date: newEventData.date,
        },
      };
    } else {
      request_data = {
        ...data,
        event: {
          ...data.event,
          hour: data.event.hour ? data.event.hour.format("HH:mm:ss") : null,
          date: data.event.date ? data.event.date.format("YYYY-MM-DD") : null,
        },
      };
    }

    console.log(request_data);

    const { data: response, error } = await apiPost(
      `${import.meta.env.VITE_API_BACK_URL}/event/create`,
      request_data,
      header_private(token)
    );
    if (response) {
      console.log("respuesta del back");
      console.log(response);

      const new_event_objt = transform_object(response);

      setEvents([...events, new_event_objt]);

      setTimeout(() => {
        setLoadingModal(false);
        selectContact();
        setIsNewEventModalOpen(false);
        message.success("Nuevo evento agregado!");
        setIsNewEventModalOpen(false);
      }, 2000);
    } else {
      console.log(error);

      setTimeout(() => {
        setLoadingModal(false);
        selectContact();
        setIsNewEventModalOpen(false);
        message.error("Error al agregar el nuevo evento");
        setIsNewEventModalOpen(false);
      }, 2000);
    }
  };

  const restructuredData = patientsList.map((item) => {
    return {
      ...item,
      value: item.id,
      label: `${item.name} ${item.last_name}`,
    };
  });

  return (
    <>
      <Modal
        style={{
          top: 30,
        }}
        title="Nueva consulta"
        open={isNewEvenetModalOpen}
        onCancel={handleCancelModal}
        footer={[
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#30aadd",
              },
            }}
          >
            <Button
              key="submit"
              type="primary"
              loading={loadingModal}
              onClick={handleSubmit(handleOk)}
            >
              Aceptar
            </Button>
          </ConfigProvider>,
          <ConfigProvider
            theme={{
              token: {
                colorPrimaryHover: "#30aadd",
              },
            }}
          >
            <Button key="back" onClick={handleCancelModal}>
              Cancelar
            </Button>
          </ConfigProvider>,
        ]}
      >
        {newEventData ? (
          <form
            className="column"
            style={{ gap: 30, paddingBottom: "40px" }}
            onSubmit={handleSubmit(handleOk)}
          >
            <div className="column">
              <span>* Fecha</span>
              {newEventData?.hour && newEventData?.date !== null ? (
                <div className="row">
                  <FaRegClock />
                  <span>{transformDate(newEventData?.date)}</span>
                  <span>-</span>
                  <span>{newEventData?.hour} hs</span>
                </div>
              ) : (
                <div className="row">
                  <FaRegClock />
                  <Controller
                    name="event.date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        format="YYYY-MM-DD"
                        placeholder="Fecha"
                      />
                    )}
                  />
                  <span>-</span>
                  <Controller
                    name="event.hour"
                    control={control}
                    render={({ field }) => (
                      <TimePicker {...field} placeholder="Hora" />
                    )}
                  />
                  <span>hs</span>
                </div>
              )}
            </div>

            <div className="column">
              <div className="calendar-form-btn-container">
                <div
                  className={
                    openContactForm == false
                      ? "row calendar-form-btn calendar-form-btn-cta"
                      : "row calendar-form-btn"
                  }
                  onClick={selectContact}
                >
                  <FaUserCircle />
                  <span>Seleccionar paciente</span>
                </div>
                <div
                  className={
                    openContactForm == true
                      ? "row calendar-form-btn calendar-form-btn-cta"
                      : "row calendar-form-btn"
                  }
                  onClick={addNewContact}
                >
                  <FaUserPlus />
                  <span>Agregar contacto</span>
                </div>
              </div>
            </div>
            {openContactForm === true ? (
              <div className="column" style={{ gap: 10 }}>
                <div className="column">
                  <span>Nombre</span>
                  <Controller
                    name="prospective_patient.name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="column">
                  <span>Apellido</span>
                  <Controller
                    name="prospective_patient.last_name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="column">
                  <span>Telefono de contacto</span>
                  <Controller
                    name="prospective_patient.contact_number"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="column">
                  <span>Email</span>
                  <Controller
                    name="prospective_patient.email"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
              </div>
            ) : (
              <SelectComponent
                options={restructuredData}
                placeholder={"Seleccionar paciente"}
                value={selectedPatient}
                HandleChange={HandleChange}
                onSearch={onSearch}
                openValue={openValuen}
                button_label={"Agregar Un Nuevo Paciente"}
                HandleClick={HandleAddNewPatient}
              />
            )}
          </form>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default NewEvent;
