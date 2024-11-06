import { Button, Modal, Select, message } from "antd";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { LuInfo } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { medical_diagnosis_options } from "../../../utils/MedicalInfo";
import PrincipalCard from "../../PrincipalCard";
import TextArea from "antd/es/input/TextArea";
import { apiPut } from "../../../utils/Api";
import { AppContext } from "../../../context/AppContext";
import { header_private } from "../../../utils/Headers";

const MedicalDiagnosis = ({ consultationData, setConsultationData }) => {
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      medical_consultation_id: consultationData?.consultation.id,
      previus: [],
      new: [],
    },
  });

  /**/

  const restructured_data = (data) => {
    const new_items_array = data.map((item) => {
      const { medical_consultation_id, id, ...data } = item;
      return data;
    });
    return new_items_array;
  };

  const [medicalDiagnosisItems, setMedicalDiagnosisItems] = useState([]);

  const [medicalDiagnosisValue, setMedicalDiagnosisValue] = useState(null);

  const onChangeMedicalDiagnosis = (value, record) => {
    setMedicalDiagnosisValue(record);
    const findValueInArray = medicalDiagnosisItems.find(
      (item) => item.code === record.code
    );
    if (!findValueInArray) {
      const { value, label, ...medicalDiagnosisData } = record;

      const updateData = [...medicalDiagnosisItems, medicalDiagnosisData];

      setMedicalDiagnosisItems(updateData);
      setValue("new", updateData);
    }
    setMedicalDiagnosisValue(null);
  };

  const deleteMedicalDiagnosisItem = (item) => {
    const updateMedicalDiagnosisArray = medicalDiagnosisItems.filter(
      (option) => option.code !== item.code
    );
    setMedicalDiagnosisItems(updateMedicalDiagnosisArray);
    setValue(`new`, updateMedicalDiagnosisArray);
    setMedicalDiagnosisValue(null);
  };

  const { patientData, token } = useContext(AppContext);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/consultation/edit-medical-diagnosis/${patientData.patient.id}`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({
        ...consultationData,
        medical_diagnosis: response.update_arrays,
      });
      setTimeout(() => {
        setLoadingModal(false);
        resetDat(response.update_arrays);
        message.success("Diagnostico actualizado exitosamente");
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
    setMedicalDiagnosisItems(restructured_data(data));
    setMedicalDiagnosisValue(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    resetDat(consultationData?.medical_diagnosis);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="column patient-consultation-detail-card-item">
        <div className="row">
          <span className="semi-strong-lbl">Diagnostico</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        {consultationData?.medical_diagnosis.length === 0 ? (
          <span>No se ha indicado un Diagnostico</span>
        ) : (
          <div
            className="patient-consultation-detail-diagnosis-container column"
            style={{ gap: "25px" }}
          >
            {consultationData?.medical_diagnosis.map((item) => (
              <div className="column">
                <div className="patient-consultation-detail-diagnosis-item">
                  <span className="patient-consultation-detail-diagnosis-code">
                    {item.code}
                  </span>
                  <span>{item.description}</span>
                </div>
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
        title="Diagnostico"
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
            value={medicalDiagnosisValue}
            options={medical_diagnosis_options}
            onChange={onChangeMedicalDiagnosis}
          />
          {medicalDiagnosisItems.map((item) => (
            <PrincipalCard
              header={
                <div className="row-space-btw">
                  <div className="row">
                    <span className="semi-strong-lbl">{item.code}</span>
                    <span>{item.description}</span>
                  </div>
                  <button
                    onClick={() => {
                      deleteMedicalDiagnosisItem(item);
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
                  const updateData = medicalDiagnosisItems.map((objt) => {
                    if (objt.code === item.code) {
                      return {
                        ...objt,
                        notes: e.target.value,
                      };
                    }
                    return objt;
                  });
                  setValue("new", updateData);
                  setMedicalDiagnosisItems(updateData);
                }}
              />
            </PrincipalCard>
          ))}
        </form>
      </Modal>
    </>
  );
};

export default MedicalDiagnosis;
