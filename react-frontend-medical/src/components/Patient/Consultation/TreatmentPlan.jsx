import { Button, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import { AppContext } from "../../../context/AppContext";

const TreatmentPlan = ({ consultationData, setConsultationData }) => {
  const {
    handleSubmit,
    //formSate: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      id: consultationData?.consultation.id,
      patient_id: consultationData?.consultation.patient_id,
      reason: consultationData?.consultation.reason,
      date: consultationData?.consultation.date,
      notes: consultationData?.consultation.notes,
      medical_instructions: consultationData?.consultation.medical_instructions,
      treatment_plan: consultationData?.consultation.treatment_plan,
    },
  });

  const { token } = useContext(AppContext);

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${import.meta.env.VITE_API_BACK_URL}/consultation/edit-consultation/${
        data.patient_id
      }`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({ ...consultationData, consultation: response });
      setTimeout(() => {
        setLoadingModal(false);
        message.success("Plan de tratamiento editado exitosamente");
        setIsModalOpen(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoadingModal(false);
        message.error("Algo salio mal intentalo nuevamente mas tarde");
        reset();
        setIsModalOpen(false);
      }, 1500);
    }
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="column patient-consultation-detail-card">
        <div className="row semi-strong-lbl patient-consultation-detail-card-header patient-consultation-detail-card-content">
          <span>Plan de tratamiento</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        <div className="patient-consultation-detail-card-content">
          {consultationData?.consultation.treatment_plan
            ? consultationData?.consultation.treatment_plan
            : "No se ha indicado ningun Plan de Tratamiento"}
        </div>
      </div>
      <Modal
        title="Notas de la consulta"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loadingModal}
            onClick={handleSubmit(handleOk)}
          >
            Aceptar
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <form onSubmit={handleSubmit(handleOk)} className="column">
          <span>Notas</span>
          <Controller
            name="treatment_plan"
            control={control}
            render={({ field }) => <TextArea {...field} />}
          />
        </form>
      </Modal>
    </>
  );
};

export default TreatmentPlan;
