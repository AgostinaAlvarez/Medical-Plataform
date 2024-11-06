import { Button, Modal } from "antd";
import React, { useState } from "react";
import SelectComponent from "../SelectComponent";
import { useNavigate } from "react-router-dom";

const NewConsultation = ({
  isModalOpen,
  setIsModalOpen,
  loadingModal,
  setLoadingModal,
  patientsList,
  //setLoading,
}) => {
  const navigate = useNavigate();

  const handleOk = async () => {
    setLoadingModal(true);
    console.log("crear una consulta con el paciente");
    console.log(selectedPatient);
    setIsModalOpen(false);
    setTimeout(() => {
      navigate(`/patient/${selectedPatient.id}/consultations/new`);
    }, 100);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const restructuredData = patientsList.map((item) => {
    return {
      ...item,
      value: item.id,
      label: `${item.name} ${item.last_name}`,
    };
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [openValuen, setOpenValue] = useState(undefined);

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const HandleChange = (value, record) => {
    setSelectedPatient(record);
  };

  const HandleAddNewPatient = () => {
    setLoadingModal(true);
    setIsModalOpen(false);
    navigate(`/patient-new`);
  };

  return (
    <>
      <Modal
        title="Nueva Consulta"
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
        <div className="column">
          <span>Seleccionar paciente</span>

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
        </div>
      </Modal>
    </>
  );
};

export default NewConsultation;
