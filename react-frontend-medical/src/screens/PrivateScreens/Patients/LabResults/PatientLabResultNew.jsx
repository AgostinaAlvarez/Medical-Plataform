import React, { useContext, useState } from "react";
import PrincipalCard from "../../../../components/PrincipalCard";
import { lab_results_units } from "../../../../utils/MedicalInfo";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Input, Select, message } from "antd";
import { AppContext } from "../../../../context/AppContext";
import { transform_data_object_number_valur } from "../../../../functions/functions";
import PatientConsultationLoader from "../../../../components/Patient/Consultation/PatientConsultationLoader";
import { apiPost } from "../../../../utils/Api";
import { header_private } from "../../../../utils/Headers";
import { useNavigate } from "react-router-dom";

const PatientLabResultNew = () => {
  const { patientData, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      patient_id: patientData.patient.id,
    },
  });

  const navigate = useNavigate();

  const saveChanges = async (data) => {
    setLoading(true);
    const { date, ...data_objt } = data;
    const restructured_data = transform_data_object_number_valur(data_objt);

    const request_data = {
      date: data.date ? data.date.format("YYYY-MM-DD") : null,
      ...restructured_data,
    };

    const { data: response, error } = await apiPost(
      `${import.meta.env.VITE_API_BACK_URL}/event/create`,
      request_data,
      header_private(token)
    );

    console.log(response);

    if (response) {
      setTimeout(() => {
        message.success("Resultado de laboratorio creado exitosamente");
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        navigate(
          `/patient/${patientData.patient.id}/labresults/detail/${response.id}`
        );
      }, 2100);
    } else {
      setTimeout(() => {
        message.error("Algo salio mal intentalo nuevamente mas tarde");
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div
      className="column"
      style={{
        position: "relative",
        boxSizing: "border-box",
        gap: "10px",
        padding: "10px 20px",
      }}
    >
      <PatientConsultationLoader loading={loading} />
      <div>Nuevo resultado de laboratorio</div>
      <PrincipalCard title={"RESULTADOS DE LABORATORIO"}>
        <form onSubmit={handleSubmit(saveChanges)} className="column">
          <div className="column">
            <span>Fecha del estudio *</span>
            <Controller
              name="date"
              control={control}
              rules={{ required: "La fecha del estudio es obligatoria" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  //placeholder="Selecciona una fecha"
                  style={{ width: "100%" }}
                />
              )}
            />
            {errors.date && (
              <p style={{ color: "red" }}>{errors.date.message}</p>
            )}
          </div>
          <div className="column">
            <span>Motivo del estudio</span>
            <Controller
              name="reason"
              control={control}
              defaultValue={null}
              render={({ field }) => <Input {...field} />}
            />
          </div>
          {lab_results_units.map((objt, index) => (
            <div key={index}>
              <div>{objt.clasificacion}</div>
              {objt.items.map((item) => (
                <div className="row">
                  <span>{item.label}</span>
                  {item.type === "input" ? (
                    <>
                      <Controller
                        name={item.column_name}
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Input
                            style={{ width: "100px" }}
                            type="number"
                            {...field}
                            status={errors[item.column_name] && "error"}
                          />
                        )}
                      />
                    </>
                  ) : (
                    <>
                      <Controller
                        name={item.column_name}
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            style={{ width: "200px" }}
                            {...field}
                            options={item.options}
                          />
                        )}
                      />
                    </>
                  )}
                  <span>{item.unit}</span>
                </div>
              ))}
            </div>
          ))}

          <div className="patient-detail-edit-btn-container">
            <div
              className="btn btn-red patient-detail-edit-btn"
              //onClick={cancelChanges}
            >
              Cancelar
            </div>
            <button className="btn patient-detail-edit-btn" type="submit">
              Guardar Cambos
            </button>
          </div>
        </form>
      </PrincipalCard>
    </div>
  );
};

export default PatientLabResultNew;
