import { Button, Modal } from "antd";
import React, { useContext } from "react";
import { message } from "antd";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const DeleteVaccineModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  loadingModalDelete,
  setLoadingModalDelete,
  setLoading,
  modalVaccineData,
}) => {
  const { patientData, setPatientData, token } = useContext(AppContext);

  const handleOk = async () => {
    setLoading(true);
    setLoadingModalDelete(true);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BACK_URL}/vaccine/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Colocas el token de autenticación en el header
            "Content-Type": "application/json", // Asegurarte que el content type sea JSON
          },
          data: modalVaccineData, // El cuerpo de la solicitud DELETE con el JSON que deseas enviar
        }
      );
      const updateVaccines = patientData.vaccines.filter(
        (item) => item.id !== modalVaccineData.id
      );

      setPatientData({ ...patientData, vaccines: updateVaccines });
      setTimeout(() => {
        setLoadingModalDelete(false);
        setIsDeleteModalOpen(false);
        message.success("Vacuna eliminada correctamente");
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        setLoadingModalDelete(false);
        setIsDeleteModalOpen(false);
        message.error("Algo salio mal intentalo nuevamente mas tarde");
      }, 1500);
    }
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
          Estas seguro que deseas eliminar la vacuna {modalVaccineData?.name}
        </div>
      </Modal>
    </>
  );
};

export default DeleteVaccineModal;
