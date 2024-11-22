import React, { useContext, useState } from "react";
import { vital_signs_options } from "../../utils/VitalSigns";
import { Button, Checkbox, Modal } from "antd";
import { AppContext } from "../../context/AppContext";
import { apiPut } from "../../utils/Api";
import { header_private } from "../../utils/Headers";
import { message } from "antd";
const VitalSignsConfigModal = ({
  isModalOpen,
  setIsModalOpen,
  loadingModal,
  setLoadingModal,
  setLoading,
}) => {
  const { patientData, setPatientData, token } = useContext(AppContext);

  const [data, setData] = useState(patientData.configs);

  const handleOk = async () => {
    setLoading(true);
    setLoadingModal(true);
    for (let key in data) {
      if (key !== "id") {
        if (data[key] === true) {
          data[key] = 1;
        } else if (data[key] === false) {
          data[key] = 0;
        }
      }
    }

    const { data: response, error } = await apiPut(
      `${import.meta.env.VITE_API_BACK_URL}/vital-signs-config/update`,
      data,
      header_private(token)
    );

    if (response) {
      setPatientData({ ...patientData, configs: response });
      setTimeout(() => {
        setLoadingModal(false);
        message.success("Configuración de Formularios actualizada");
        setIsModalOpen(false);
        setLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setLoadingModal(false);
        message.error("Algo salio mal intentalo nuevamente mas tarde");
        setIsModalOpen(false);
        setLoading(false);
      }, 1500);
    }
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Configuración de Formularios"
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loadingModal}
            onClick={handleOk}
          >
            Guardar cambios
          </Button>,
          <Button key="back" onClick={handleCancelModal}>
            Cancelar
          </Button>,
        ]}
      >
        <div className="column">
          {vital_signs_options.map((vital_sign) => (
            <Checkbox
              checked={data[vital_sign.column_name]}
              onChange={(e) => {
                setData({
                  ...data,
                  [vital_sign.column_name]: e.target.checked,
                });
              }}
            >
              {vital_sign.label}
            </Checkbox>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default VitalSignsConfigModal;
