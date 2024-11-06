import { Button, Modal, Select, Table, message } from "antd";
import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import { phsycal_examination_options } from "../../../utils/MedicalInfo";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../../../context/AppContext";
import PrincipalCard from "../../PrincipalCard";
import TextArea from "antd/es/input/TextArea";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";

const PhsycalExamination = ({ consultationData, setConsultationData }) => {
  const phsycal_examination_array = () => {
    const phsycal_examination = consultationData?.phsycal_examination;
    let data = [];

    phsycal_examination_options.forEach((element) => {
      if (phsycal_examination[element.column_name] !== null) {
        const objt = {
          column_name: element.column_name,
          value: element.value,
          part: element.label,
          description: phsycal_examination[element.column_name],
        };
        data.push(objt);
      }
    });

    return data;
  };

  const { token, patientData } = useContext(AppContext);

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      id: consultationData?.phsycal_examination.id,
      medical_consultation_id:
        consultationData?.phsycal_examination.medical_consultation_id,
      digestive_system: consultationData?.phsycal_examination.digestive_system,
      reproductive_system:
        consultationData?.phsycal_examination.reproductive_system,
      urinary_system: consultationData?.phsycal_examination.urinary_system,
      cardiac_and_vascular:
        consultationData?.phsycal_examination.cardiac_and_vascular,
      dental: consultationData?.phsycal_examination.dental,
      dermatological: consultationData?.phsycal_examination.dermatological,
      neurological: consultationData?.phsycal_examination.neurological,
      osteoarticular: consultationData?.phsycal_examination.osteoarticular,
      otolaryngologist: consultationData?.phsycal_examination.otolaryngologist,
      psychiatric_and_psychological:
        consultationData?.phsycal_examination.psychiatric_and_psychological,
      pulmonary_or_respiratory:
        consultationData?.phsycal_examination.pulmonary_or_respiratory,
      lymphatic_system: consultationData?.phsycal_examination.lymphatic_system,
    },
  });

  const [phsycalExaminationValue, setPhsycalExaminationValue] = useState(null);

  const [phsycalExaminationOptions, setPhsycalExaminationOptions] = useState(
    phsycal_examination_array()
  );

  const onChangePhsycalExamination = (value, record) => {
    setPhsycalExaminationValue(record);
    const findValueInArray = phsycalExaminationOptions.find(
      (item) => item.value === value
    );
    if (!findValueInArray) {
      setPhsycalExaminationOptions([
        ...phsycalExaminationOptions,
        {
          ...record,
          part: record.label,
        },
      ]);
    }
    setPhsycalExaminationValue(null);
  };

  const deletePhsycalExaminationItem = (item) => {
    const updateTopographicExplorationArray = phsycalExaminationOptions.filter(
      (option) => option.value !== item.value
    );
    setPhsycalExaminationOptions(updateTopographicExplorationArray);
    setValue(`${item.column_name}`, null);
    setPhsycalExaminationValue(null);
  };

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/consultation/edit-phsycal-examination/${patientData.patient.id}`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({
        ...consultationData,
        phsycal_examination: response,
      });
      setTimeout(() => {
        setLoadingModal(false);
        message.success("Examen Físico actualizado exitosamente");
        setIsModalOpen(false);
      }, 2000);
    } else {
      setTimeout(() => {
        message.error("Algo salio mal intentalo nuevamente mas tarde");
        handleCancel();
      }, 1500);
    }
  };

  const handleCancel = () => {
    setPhsycalExaminationOptions(phsycal_examination_array());
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
          <span className="semi-strong-lbl">Examen Físico</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        {phsycal_examination_array().length === 0 ? (
          <span>No se ha indicado registro de Examen Físico</span>
        ) : (
          <Table
            rowHoverable={false}
            bordered
            columns={[
              {
                title: "Parte:",
                key: "part",
                dataIndex: "part",
              },
              {
                title: "Descripción:",
                key: "description",
                dataIndex: "description",
              },
            ]}
            dataSource={phsycal_examination_array()}
            pagination={false}
          />
        )}
      </div>
      <Modal
        title="Examen Físico"
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
            value={phsycalExaminationValue}
            options={phsycal_examination_options}
            onChange={onChangePhsycalExamination}
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
            {phsycalExaminationOptions.map((item) => (
              <PrincipalCard
                header={
                  <div className="row-space-btw">
                    <span className="semi-strong-lbl">{item.part}</span>
                    <button
                      onClick={() => {
                        deletePhsycalExaminationItem(item);
                      }}
                    >
                      quitar
                    </button>
                  </div>
                }
              >
                <Controller
                  name={`${item.column_name}`}
                  control={control}
                  render={({ field }) => <TextArea {...field} />}
                />
              </PrincipalCard>
            ))}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PhsycalExamination;
