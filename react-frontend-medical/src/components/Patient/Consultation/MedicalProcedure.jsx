import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { LuInfo } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { AppContext } from "../../../context/AppContext";
import { Button, Modal, Select, message } from "antd";
import PrincipalCard from "../../PrincipalCard";
import TextArea from "antd/es/input/TextArea";
import { medical_procedure_options } from "../../../utils/MedicalInfo";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";

const MedicalProcedure = ({ consultationData, setConsultationData }) => {
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      medical_consultation_id: consultationData?.consultation.id,
      previus: [],
      new: [],
    },
  });

  const { patientData, token } = useContext(AppContext);

  const restructured_data = (data) => {
    const new_items_array = data.map((item) => {
      const { medical_consultation_id, id, ...data } = item;
      return data;
    });
    return new_items_array;
  };

  const [medicalProcedureItems, setMedicalProcedureItems] = useState([]);

  const [medicalProcedureValue, setMedicalProcedureValue] = useState(null);

  const onChangeMedicalProcedure = (value, record) => {
    setMedicalProcedureValue(record);

    const findValueInArray = medicalProcedureItems.find(
      (item) => item.name === record.name
    );

    if (!findValueInArray) {
      const { value, label, ...medicalProcedureData } = record;
      const updateData = [...medicalProcedureItems, medicalProcedureData];

      setMedicalProcedureItems(updateData);
      setValue("new", updateData);
    }
    setMedicalProcedureValue(null);
  };

  const deleteMedicalProcedureItem = (item) => {
    const updateData = medicalProcedureItems.filter(
      (option) => option.name !== item.name
    );
    setMedicalProcedureItems(updateData);
    setValue("new", updateData);
    setMedicalProcedureValue(null);
  };

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/consultation/edit-medical-procedure/${patientData.patient.id}`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({
        ...consultationData,
        medical_procedure: response.update_arrays,
      });
      setTimeout(() => {
        setLoadingModal(false);
        resetDat(response.update_arrays);
        message.success("Procedimientos actualizados exitosamente");
        setIsModalOpen(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoadingModal(false);
        message.error("Algo salio mal intentalo nuevamente mas tarde");
        handleCancel();
      }, 1500);
    }
  };

  const resetDat = (data) => {
    setValue("previus", data);
    setValue("new", []);
    setMedicalProcedureItems(restructured_data(data));
    setMedicalProcedureValue(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    resetDat(consultationData?.medical_procedure);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="column patient-consultation-detail-card-item">
        <div className="row">
          <span className="semi-strong-lbl">Procedimientos</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        {consultationData?.medical_procedure.length === 0 ? (
          <span>No se han indicado Procedimientos Medicos</span>
        ) : (
          <div
            className="patient-consultation-detail-diagnosis-container column"
            style={{ gap: "15px" }}
          >
            {consultationData?.medical_procedure.map((item) => (
              <div className="column">
                <span className="patient-consultation-detail-labimage-span">
                  {item.name}
                </span>
                {item.notes ? (
                  <div
                    className="row"
                    style={{
                      gap: "7px",
                      boxSizing: "border-box",
                      paddingLeft: 10,
                      color: "#0076fe",
                      alignItems: "center",
                    }}
                  >
                    <LuInfo style={{ fontSize: "18px" }} />
                    <span style={{ fontSize: "13px", lineHeight: 1.4 }}>
                      Nota: {item.notes}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        title="Solicitudes de Laboratorio e Imagenes"
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
          <Select
            //{...field}
            value={medicalProcedureValue}
            options={medical_procedure_options}
            onChange={onChangeMedicalProcedure}
          />
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              boxSizing: "border-box",
              gap: 15,
            }}
          >
            {medicalProcedureItems.map((item) => (
              <PrincipalCard
                header={
                  <div className="row-space-btw">
                    <span className="semi-strong-lbl">{item.name}</span>
                    <button
                      onClick={() => {
                        deleteMedicalProcedureItem(item);
                      }}
                    >
                      quitar
                    </button>
                  </div>
                }
              >
                <TextArea
                  placeholder="notas"
                  value={item.notes}
                  onChange={(e) => {
                    const updateData = medicalProcedureItems.map((objt) => {
                      if (objt.name === item.name) {
                        return {
                          ...objt,
                          notes: e.target.value,
                        };
                      }
                      return objt;
                    });
                    setValue("new", updateData);
                    setMedicalProcedureItems(updateData);
                  }}
                />
              </PrincipalCard>
            ))}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MedicalProcedure;
