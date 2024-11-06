import { Button, Modal, Select, Table, message } from "antd";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import MedicalPrescription from "./MedicalPrescription";
import { AppContext } from "../../../context/AppContext";
import PrincipalCard from "../../PrincipalCard";
import {
  consultation_medication_dose,
  consultation_medication_duration_of_treatment,
  consultation_medication_frequency,
  medications_data_consultation,
} from "../../../utils/MedicalInfo";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";

const MedicalPrescriptionDetail = ({
  consultationData,
  setConsultationData,
}) => {
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      medical_prescription_id: consultationData?.medical_prescription.id,
      previus: [],
      new: [],
    },
  });
  const { token, patientData } = useContext(AppContext);

  //////////////////////////////

  const restructured_data = (data) => {
    const new_items_array = data.map((item) => {
      const { medical_consultation_id, id, ...data } = item;
      return data;
    });
    return new_items_array;
  };

  const [medicalPrescriptionDetailItems, setMedicalPrescriptionDetailItems] =
    useState([]);

  const [medicalPrescriptionDetailValue, setMedicalPrescriptionDetailValue] =
    useState(null);

  const onChangeMedicalPrescriptionDetail = (value, record) => {
    setMedicalPrescriptionDetailValue(record);

    const findValueInArray = medicalPrescriptionDetailItems.find(
      (item) => item.name === record.name
    );

    if (!findValueInArray) {
      const { value, label, ...medicalPrescriptionDetailData } = record;

      const updateData = [
        ...medicalPrescriptionDetailItems,
        medicalPrescriptionDetailData,
      ];

      setMedicalPrescriptionDetailItems(updateData);
      setValue("new", updateData);
    }
    setMedicalPrescriptionDetailValue(null);
  };

  const deleteMedicalPrescriptionItem = (item) => {
    const updateData = medicalPrescriptionDetailItems.filter(
      (option) => option.name !== item.name
    );
    setMedicalPrescriptionDetailItems(updateData);
    setValue("new", updateData);
    setMedicalPrescriptionDetailValue(null);
  };

  const findValue = (labelValue, array) => {
    const findedValue = array.find((item) => item.label === labelValue);
    return findedValue;
  };

  /////////////////

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/consultation/edit-medical-procedure-detail/${patientData.patient.id}`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({
        ...consultationData,
        medical_prescription_detail: response.update_arrays,
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
    setMedicalPrescriptionDetailItems(restructured_data(data));
    setMedicalPrescriptionDetailValue(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    resetDat(consultationData?.medical_prescription_detail);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="column patient-consultation-detail-card patient-consultation-detail-card-medical-prescription">
        <div className="row semi-strong-lbl patient-consultation-detail-card-header patient-consultation-detail-card-content">
          <span>Receta de medicamentos</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        <div className="patient-consultation-detail-card-content">
          <div className="column patient-consultation-detail-card-medical-prescription-content">
            {consultationData?.medical_prescription_detail.length === 0 ? (
              <></>
            ) : (
              <Table
                rowHoverable={false}
                columns={[
                  {
                    title: "Medicacion",
                    key: "name",
                    dataIndex: "name",
                  },
                  {
                    title: "Dosis",
                    key: "dose",
                    dataIndex: "dose",
                  },
                  {
                    title: "Frecuencia",
                    key: "frequency",
                    dataIndex: "frequency",
                  },
                  {
                    title: "Duracion del tratamiento",
                    key: "duration_of_treatment",
                    dataIndex: "duration_of_treatment",
                  },
                ]}
                bordered
                pagination={false}
                dataSource={consultationData?.medical_prescription_detail}
              />
            )}
            <MedicalPrescription
              consultationData={consultationData}
              setConsultationData={setConsultationData}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Receta de medicamentos"
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
            value={medicalPrescriptionDetailValue}
            options={medications_data_consultation}
            onChange={onChangeMedicalPrescriptionDetail}
          />
          {/*lista de medicamentos*/}
          {medicalPrescriptionDetailItems.map((item) => (
            <PrincipalCard
              header={
                <div className="row-space-btw">
                  <div className="row">
                    <span className="semi-strong-lbl">{item.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      deleteMedicalPrescriptionItem(item);
                    }}
                  >
                    quitar
                  </button>
                </div>
              }
            >
              <div className="column">
                <span>Dosis</span>
                <Select
                  options={consultation_medication_dose}
                  value={findValue(item.dose, consultation_medication_dose)}
                  onChange={(value, record) => {
                    const updateData = medicalPrescriptionDetailItems.map(
                      (objt) => {
                        if (objt.name === item.name) {
                          return { ...item, dose: record.label };
                        }

                        return objt;
                      }
                    );
                    setMedicalPrescriptionDetailItems(updateData);
                    setValue("new", updateData);
                  }}
                />
              </div>
              <div className="column">
                <span>Frecuencia</span>
                <Select
                  options={consultation_medication_frequency}
                  value={findValue(
                    item.frequency,
                    consultation_medication_frequency
                  )}
                  onChange={(value, record) => {
                    const updateData = medicalPrescriptionDetailItems.map(
                      (objt) => {
                        if (objt.name === item.name) {
                          return { ...item, frequency: record.label };
                        }

                        return objt;
                      }
                    );
                    setMedicalPrescriptionDetailItems(updateData);
                    setValue("new", updateData);
                  }}
                />
              </div>
              <div className="column">
                <span>Duracion del tratamiento</span>
                <Select
                  options={consultation_medication_duration_of_treatment}
                  value={findValue(
                    item.duration_of_treatment,
                    consultation_medication_duration_of_treatment
                  )}
                  onChange={(value, record) => {
                    const updateData = medicalPrescriptionDetailItems.map(
                      (objt) => {
                        if (objt.name === item.name) {
                          return {
                            ...item,
                            duration_of_treatment: record.label,
                          };
                        }

                        return objt;
                      }
                    );
                    setMedicalPrescriptionDetailItems(updateData);
                    setValue("new", updateData);
                  }}
                />
              </div>
            </PrincipalCard>
          ))}
        </form>
      </Modal>
    </>
  );
};

export default MedicalPrescriptionDetail;
