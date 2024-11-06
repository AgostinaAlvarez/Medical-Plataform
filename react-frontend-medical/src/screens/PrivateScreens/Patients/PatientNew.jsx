import React, { useContext, useState } from "react";
import PrincipalCard from "../../../components/PrincipalCard";
import TextArea from "antd/es/input/TextArea";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Controller, useForm } from "react-hook-form";
import { Input, Select, Switch, message, DatePicker } from "antd";

import { apiPost } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const PatientNew = () => {
  const { token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      birthday: data.birthday ? data.birthday.format("YYYY-MM-DD") : null,
      phone: value ? value : null,
    };

    for (let key in formattedData) {
      if (formattedData[key] === "") {
        formattedData[key] = null;
      }
    }

    console.log(formattedData);

    const request_data = { ...formattedData, user_id: userData.id };
    console.log(request_data);

    const { data: response, error } = await apiPost(
      `${import.meta.env.VITE_API_BACK_URL}/patient/create`,
      request_data,
      header_private(token)
    );

    if (response) {
      message.success("Paciente creado exitosamente");
      navigate(`/patient/${response.id}`);
    } else {
      message.error("algo salio mal, intentalo de nuevo mas tarde!");
    }
  };

  return (
    <div className="private-structure-main-content">
      <div className="patient-new-grid" style={{ paddingBottom: "100px" }}>
        {/*columna izquierda*/}
        <div className="pacient-new-left-col">
          <div className="pacient-new-img">
            <FaUser style={{ fontSize: "70px", color: "white" }} />
          </div>
          <div className="btn-border pacient-new-img-btn">Adjuntar foto</div>
          {/*
            <PrincipalCard title={"Notas internas"}>
              <TextArea rows={4} style={{ height: "250px" }} />
            </PrincipalCard>
            
            */}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="column pacient-new-right-col"
        >
          <span>Informacion General</span>
          <div className="pacient-new-general-info-grid">
            <div className="column">
              <span>Nombre *</span>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "El nombre es obligatorio" }}
                render={({ field }) => (
                  <Input {...field} status={errors.name && "error"} />
                )}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              )}
            </div>

            <div className="column">
              <span>Apellido *</span>
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                rules={{ required: "El apellido es obligatorio" }}
                render={({ field }) => (
                  <Input {...field} status={errors.last_name && "error"} />
                )}
              />
              {errors.last_name && (
                <p style={{ color: "red" }}>{errors.last_name.message}</p>
              )}
            </div>

            <div className="column">
              <span>Fecha de nacimiento *</span>
              <Controller
                name="birthday"
                control={control}
                rules={{ required: "La fecha de nacimiento es obligatoria" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    placeholder="Selecciona una fecha"
                    style={{ width: "100%" }}
                  />
                )}
              />
              {errors.birthday && (
                <p style={{ color: "red" }}>{errors.birthday.message}</p>
              )}
            </div>

            <div className="column">
              <span>Sexo *</span>
              <Controller
                name="sex"
                control={control}
                rules={{ required: "El sexo es obligatorio" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Femenino", label: "Femenino" },
                      { value: "Masculino", label: "Masculino" },
                    ]}
                    placeholder="Selecciona sexo"
                  />
                )}
              />
              {errors.sex && (
                <p style={{ color: "red" }}>{errors.sex.message}</p>
              )}
            </div>

            <div className="column">
              <span>Email</span>
              <Controller
                name="email"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Input {...field} status={errors.email && "error"} />
                )}
              />
            </div>
            <div className="column">
              <span>Telefon movil</span>
              <PhoneInput
                defaultCountry="AR"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="column">
              <span>Tipo de identificacion *</span>
              <Controller
                name="identification_type"
                control={control}
                rules={{ required: "El tipo de identificacion es obligatorio" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "DNI", label: "DNI" },
                      { value: "RUT", label: "RUT" },
                      { value: "RUN", label: "RUN" },
                      { value: "CURP", label: "CURP" },
                      { value: "CPF", label: "CPF" },
                      { value: "NSS", label: "NSS" },
                      { value: "INE", label: "INE" },
                      {
                        value: "Cédula de Identidad",
                        label: "Cédula de Identidad",
                      },
                      { value: "Pasaporte", label: "Pasaporte" },
                      { value: "NIE", label: "NIE" },
                      { value: "CNP", label: "CNP" },
                      { value: "SSN", label: "SSN" },
                      { value: "NIF", label: "NIF" },
                      { value: "RFC", label: "RFC" },
                      {
                        value: "Tarjeta de Residencia",
                        label: "Tarjeta de Residencia",
                      },
                      { value: "CIP", label: "CIP" },
                    ]}
                    placeholder="Selecciona el tipo de identificacion"
                  />
                )}
              />
              {errors.identification_type && (
                <p style={{ color: "red" }}>
                  {errors.identification_type.message}
                </p>
              )}
            </div>
            {/*identification_numero*/}
            <div className="column">
              <span>Numero de identificacion *</span>
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
              {errors.identification_number && (
                <p style={{ color: "red" }}>
                  {errors.identification_number.message}
                </p>
              )}
            </div>
          </div>
          <span>Informacion Demografica</span>
          {/*adress*/}
          <div className="column">
            <span>Direccion</span>
            <Controller
              name="adress"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} status={errors.adress && "error"} />
              )}
            />
          </div>
          <div className="pacient-new-general-info-grid">
            {/*country*/}
            <div className="column">
              <span>Pais</span>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} status={errors.country && "error"} />
                )}
              />
            </div>
            {/*province*/}
            <div className="column">
              <span>Provincia</span>
              <Controller
                name="province"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} status={errors.province && "error"} />
                )}
              />
            </div>
            {/*city*/}
            <div className="column">
              <span>Ciudad</span>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} status={errors.city && "error"} />
                )}
              />
            </div>
            {/*postal_code*/}
            <div className="column">
              <span>Codigo Postal</span>
              <Controller
                name="zip_code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    status={errors.zip_code && "error"}
                  />
                )}
              />
            </div>
            {/*external_code*/}
            <div className="column">
              <span>Numero exterior</span>
              <Controller
                name="outer_number"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    status={errors.outer_number && "error"}
                  />
                )}
              />
            </div>
            {/*internal_code*/}
            <div className="column">
              <span>Numero Interior</span>
              <Controller
                name="internal_number"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    status={errors.internal_number && "error"}
                  />
                )}
              />
            </div>
          </div>

          <div className="row">
            <Switch defaultChecked />
            <span>
              El paciente acepta recibir recordatorios y mensajes por whatsapp
            </span>
          </div>
          <div className="row">
            <Switch defaultChecked />
            <span>Mandar correo de bienvenida por su primera cita</span>
          </div>
          <div className="btn-container">
            <div className="btn btn-red">Cancelar</div>
            <button className="btn" type="submit">
              Guardar Cambos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientNew;
