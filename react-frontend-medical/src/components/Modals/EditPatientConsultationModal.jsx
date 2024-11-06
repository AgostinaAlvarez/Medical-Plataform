import { Button, Modal } from "antd";
import React from "react";

const EditPatientConsultationModal = ({
  children,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loadingModal}
          onClick={handleOk}
        >
          Aceptar
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default EditPatientConsultationModal;
