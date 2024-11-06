import { Button, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { AppContext } from "../../../context/AppContext";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";

const MedicalPrescription = ({ consultationData, setConsultationData }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      id: consultationData?.medical_prescription.id,
      medical_consultation_id: consultationData?.consultation.id,
      medical_instructions:
        consultationData?.medical_prescription.medical_instructions,
    },
  });

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { token, patientData } = useContext(AppContext);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/consultation/edit-medical-prescription/${patientData.patient.id}`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({
        ...consultationData,
        medical_prescription: response,
      });
      setTimeout(() => {
        setLoadingModal(false);
        message.success("Instrucciones medicas actualizada exitosamente");
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
      <div className="column patient-consultation-detail-card-item">
        <div className="row">
          <span className="semi-strong-lbl">Instrucciones medicas</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        <span>
          {consultationData?.medical_prescription.medical_instructions
            ? consultationData?.medical_prescription.medical_instructions
            : "No se ha indicado Prescripcion Medica"}
        </span>
      </div>
      <Modal
        title="Instrucciones medicas"
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
          <Controller
            name="medical_instructions"
            control={control}
            render={({ field }) => <TextArea {...field} />}
          />
        </form>
      </Modal>
    </>
  );
};

export default MedicalPrescription;
