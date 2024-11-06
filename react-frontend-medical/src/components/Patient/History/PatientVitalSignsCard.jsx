import React, { useContext, useEffect, useState } from "react";
import PrincipalCard from "../../PrincipalCard";
import { vital_signs_options } from "../../../utils/VitalSigns";
import { AppContext } from "../../../context/AppContext";
import { useForm } from "react-hook-form";
import { formated_data } from "../../../functions/functions";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import { Button, Modal, message } from "antd";
import PatientHistoryLoader from "./PatientHistoryLoader";
import VitalSignsConfigModal from "../../Modals/VitalSignsConfigModal";
import { MdEdit } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const PatientVitalSignsCard = () => {
  const { patientData, setPatientData, token } = useContext(AppContext);
  const [editVitalSigns, setEditVitalSigns] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: patientData.vital_signs,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const formatedData = formated_data(data);
    for (let key in formatedData) {
      let number = Number(formatedData[key]);
      if (isNaN(number)) {
        formatedData[key] = formatedData[key];
      } else {
        if (number === 0) {
          formatedData[key] = null;
        } else {
          formatedData[key] = number;
        }
      }
    }

    const { data: response, error } = await apiPut(
      `${import.meta.env.VITE_API_BACK_URL}/vital-signs/update`,
      formatedData,
      header_private(token)
    );
    if (response) {
      console.log("editado!");
      console.log(response);
      setPatientData({ ...patientData, vital_signs: response });
      setTimeout(() => {
        setLoading(false);
        message.success("Signos vitales editados correctamente");
        setEditVitalSigns(false);
      }, 2000);
    } else {
      console.log("ERROR");
      console.log(error);

      setTimeout(() => {
        setLoading(false);
        message.error("Algo salio mal! Intentalo nuevamente");
        setEditVitalSigns(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    reset(patientData.vital_signs);
    setEditVitalSigns(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const showModal = () => {
    setEditVitalSigns(false);
    setIsModalOpen(true);
  };
  return (
    <>
      <PrincipalCard
        header={
          <div className="row-space-btw">
            <span>SIGNOS VITALES</span>
            <div className="row">
              <div className="icon-container" onClick={showModal}>
                <IoMdSettings />
              </div>
              <div
                className="icon-container"
                onClick={() => {
                  setEditVitalSigns(true);
                }}
              >
                <MdEdit />
              </div>
            </div>
          </div>
        }
      >
        <PatientHistoryLoader loading={loading} />
        {editVitalSigns ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="column patient-vital-signs-container"
          >
            {vital_signs_options.map((vital_sign) => (
              <>
                {patientData.configs[vital_sign.column_name] === 1 ? (
                  <div className="row-space-btw patient-card-label-responsive">
                    <div className="row">
                      {vital_sign.icon}
                      <span>{vital_sign.label}</span>
                    </div>
                    <div className=" row patient-vital-signs-value-container">
                      <input
                        className="patient-vital-signs-input"
                        id={vital_sign.value}
                        type="number"
                        step="0.01"
                        {...register(vital_sign.value)} // No añadimos reglas de validación
                      />
                      <span>{vital_sign.unit}</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
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
          <div className="column patient-vital-signs-container">
            {vital_signs_options.map((vital_sign) => (
              <>
                {patientData.configs[vital_sign.column_name] === 1 ? (
                  <div className="row-space-btw patient-card-label-responsive">
                    <div className="row ">
                      {vital_sign.icon}
                      <span>{vital_sign.label}</span>
                    </div>
                    <div className=" row patient-vital-signs-value-container">
                      <span>{patientData.vital_signs[vital_sign.value]}</span>
                      <span>{vital_sign.unit}</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
            <span className="patient-history-last-update-span">
              Última actualización: 03-06-2024
            </span>
          </div>
        )}
      </PrincipalCard>
      <VitalSignsConfigModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loadingModal={loadingModal}
        setLoadingModal={setLoadingModal}
        setLoading={setLoading}
      />
    </>
  );
};

export default PatientVitalSignsCard;
