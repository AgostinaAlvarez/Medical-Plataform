import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Button, Modal } from "antd";
import { message } from "antd";
import axios from "axios";

const DeleteActiveMedicationModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  loadingModalDelete,
  setLoadingModalDelete,
  setLoading,
  modalActiveMedicationData,
}) => {
  const { patientData, setPatientData, token } = useContext(AppContext);

  const handleOk = async () => {
    //acciones
  };

  const handleCancelModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Eliminar"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loadingModalDelete}
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
          Estas seguro que deseas eliminar la medicacion activa{" "}
          {modalActiveMedicationData?.name}
        </div>
      </Modal>
    </>
  );
};

export default DeleteActiveMedicationModal;
