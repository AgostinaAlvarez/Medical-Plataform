import React, { useContext, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { Input, Select, message } from "antd";
import { AppContext } from "../../../context/AppContext";
import PhoneInput from "react-phone-number-input";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import PatientHistoryLoader from "./PatientHistoryLoader";
import { calculateAge, transformDate } from "../../../functions/functions";
import {
  identificacion_type_options,
  sex_options,
} from "../../../utils/PatientInfo";

const PatientInfoCard = () => {
  const { setPatientData, patientData, token } = useContext(AppContext);

  const formDefaultValues = {
    sex: patientData.patient.sex || "", // Valor inicial desde patientData
    identification_type: patientData.patient.identification_type || "",
    identification_number: patientData.patient.identification_number || "",
    email: patientData.patient.email || "",
    adress: patientData.patient.adress || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: formDefaultValues,
  });

  const [phonevalue, setphoneValue] = useState(patientData.patient.phone);

  const [openPatientInfo, setOpenPatientInfo] = useState(false);
  const [editPatientInfo, setEditPatientInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formattedData = {
      ...data,
      birthday: data.birthday ? data.birthday.format("YYYY-MM-DD") : null,
      phone: phonevalue ? phonevalue : null,
    };
    for (let key in formattedData) {
      if (formattedData[key] === "") {
        formattedData[key] = null;
      }
    }
    const request_data = {
      ...patientData.patient,
      ...formattedData,
      birthday: patientData.patient.birthday,
    };
    console.log(request_data);

    const { data: response, error } = await apiPut(
      `${import.meta.env.VITE_API_BACK_URL}/patient/edit`,
      request_data,
      header_private(token)
    );

    if (response) {
      console.log("paciente editado:");
      console.log(response);
      setPatientData({ ...patientData, patient: response });
      setTimeout(() => {
        setLoading(false);
        message.success("Paciente editado exitosamente");
        setEditPatientInfo(false);
      }, 2000);
    } else {
      console.log("error");
      console.log(error);
      setTimeout(() => {
        setLoading(false);
        message.error("Algo salio mal! Intentalo nuevamente");
        setEditPatientInfo(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    reset(formDefaultValues);
    setEditPatientInfo(false);
  };

  return (
    <div className="card padding-component border-component">
      {/*informacion el paciente*/}
      <div className="row-space-btw">
        <div className="patient-card-img">
          <span>
            {patientData.patient.name.charAt(0)}
            {patientData.patient.last_name.charAt(0)}
          </span>
        </div>
        <div className="column" style={{ width: "calc(100% - 90px)" }}>
          <div className="row-space-btw">
            <span>
              {patientData.patient.name} {patientData.patient.last_name}
            </span>
          </div>
          <span>
            {transformDate(patientData.patient.birthday)} -
            {calculateAge(patientData.patient.birthday)} años
          </span>
        </div>
      </div>
      {/** */}
      <div
        className="card border-component padding-component"
        style={{ position: "relative" }}
      >
        {editPatientInfo === false ? (
          <div
            className="icon-container"
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              cursor: "pointer",
              zIndex: 40,
            }}
            onClick={() => {
              setEditPatientInfo(true);
            }}
          >
            <MdEdit />
          </div>
        ) : (
          <></>
        )}

        {editPatientInfo ? (
          <form
            className="column patient-detail-edit-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PatientHistoryLoader loading={loading} />

            {/*Sex*/}
            <div>
              <div className="patient-detail-container patient-detail-container-form">
                <div className="patient-detail-label patient-detail-label-end patient-detail-label-form">
                  <span>Sexo</span>
                </div>
                <Controller
                  name="sex"
                  control={control}
                  rules={{ required: "El sexo es obligatorio" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={sex_options}
                      placeholder="Selecciona sexo"
                    />
                  )}
                />
              </div>
              {errors.sex && (
                <span className="patient-detail-edit-error-label">
                  {errors.sex.message}
                </span>
              )}
            </div>
            {/*identification_type*/}
            <div>
              <div className="patient-detail-container patient-detail-container-form">
                <div className="patient-detail-label patient-detail-label-end patient-detail-label-form">
                  <span>Tipo de identificacion</span>
                </div>
                <Controller
                  name="identification_type"
                  control={control}
                  rules={{
                    required: "El tipo de identificacion es obligatorio",
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={identificacion_type_options}
                      placeholder="Selecciona el tipo de identificacion"
                    />
                  )}
                />
              </div>
              {errors.identification_type && (
                <span className="patient-detail-edit-error-label">
                  {errors.identification_type.message}
                </span>
              )}
            </div>
            {/*identification_number*/}
            <div>
              <div className="patient-detail-container patient-detail-container-form">
                <div className="patient-detail-label patient-detail-label-end patient-detail-label-form">
                  <span>Numero de identificacion</span>
                </div>
                <Controller
                  name="identification_number"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "El numero de identificacion es obligatorio",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      status={errors.identification_number && "error"}
                    />
                  )}
                />
              </div>
              {errors.identification_number && (
                <span className="patient-detail-edit-error-label">
                  {errors.identification_number.message}
                </span>
              )}
            </div>
            {/*email */}
            <div className="patient-detail-container patient-detail-container-form">
              <div className="patient-detail-label patient-detail-label-end patient-detail-label-form">
                <span>Email</span>
              </div>
              <Controller
                name="email"
                control={control}
                defaultValue="" // Valor por defecto vacío
                render={({ field }) => (
                  <Input {...field} status={errors.email && "error"} />
                )}
              />
            </div>
            {/*phone*/}
            <div className="patient-detail-container patient-detail-container-form">
              <div className="patient-detail-label patient-detail-label-end patient-detail-label-form">
                <span>Telefon movil</span>
              </div>
              <PhoneInput
                //placeholder="Enter phone number"
                defaultCountry="AR"
                value={phonevalue}
                onChange={setphoneValue}
              />
            </div>

            {/*adress*/}
            <div className="patient-detail-container patient-detail-container-form">
              <div className="patient-detail-label patient-detail-label-end patient-detail-label-form">
                <span>Direccion</span>
              </div>
              <Controller
                name="adress"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} status={errors.adress && "error"} />
                )}
              />
            </div>

            <div className="patient-detail-edit-btn-container">
              <div
                onClick={handleCancel}
                className="btn btn-red patient-detail-edit-btn"
              >
                Cancelar
              </div>
              <button className="btn patient-detail-edit-btn" type="submit">
                Guardar Cambos
              </button>
            </div>
          </form>
        ) : (
          <div className="patient-detail-container">
            {/*sex*/}
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-end">
              Sexo
            </div>
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-start">
              {patientData.patient["sex"]}
            </div>
            {/*identification */}
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-end">
              {patientData.patient["identification_type"]}
            </div>
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-start">
              {patientData.patient["identification_number"]}
            </div>
            {/*email */}
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-end">
              Correo
            </div>
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-start">
              {patientData.patient["email"]}
            </div>
            {/*phone*/}
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-end">
              Teléfono
            </div>
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-start">
              {patientData.patient["phone"]}
            </div>
            {/*adress*/}
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-end">
              Dirección
            </div>
            <div className="patient-detail-label patient-detail-label-responsive patient-detail-label-start">
              {patientData.patient["adress"]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientInfoCard;
