import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import {
  ketosis_levels_options,
  ketosis_options,
} from "../../../utils/MedicalInfo";
import { Controller, useForm } from "react-hook-form";
import { Button, Modal, Table, message } from "antd";
import { Radio } from "antd";
import { AppContext } from "../../../context/AppContext";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";

const Ketosis = ({ consultationData, setConsultationData }) => {
  const ketosis_array = () => {
    const ketosis_exploration = consultationData?.ketosis;
    let data = [];

    ketosis_options.forEach((element) => {
      if (ketosis_exploration[element.column_name] !== null) {
        const objt = {
          name: element.name,
          value: ketosis_exploration[element.column_name],
        };
        data.push(objt);
      }
    });

    return data;
  };

  const {
    handleSubmit,
    //formSate: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      id: consultationData?.ketosis.id,
      medical_consultation_id:
        consultationData?.ketosis.medical_consultation_id,
      satiety: consultationData?.ketosis.satiety,
      cramps: consultationData?.ketosis.cramps,
      diarrhea: consultationData?.ketosis.diarrhea,
      depressed: consultationData?.ketosis.depressed,
      tolerance: consultationData?.ketosis.tolerance,
      constipation: consultationData?.ketosis.constipation,
      dizziness: consultationData?.ketosis.dizziness,
      anxiety: consultationData?.ketosis.anxiety,
      irritability: consultationData?.ketosis.irritability,
      impulse_control: consultationData?.ketosis.impulse_control,
      bad_breath: consultationData?.ketosis.bad_breath,
      hunger: consultationData?.ketosis.hunger,
      sleep_problems: consultationData?.ketosis.sleep_problems,
      impatience: consultationData?.ketosis.impatience,
      need_for_stimulants: consultationData?.ketosis.need_for_stimulants,
      migraine_or_headache: consultationData?.ketosis.migraine_or_headache,
      fatigue: consultationData?.ketosis.fatigue,
      concentration: consultationData?.ketosis.concentration,
      aggressiveness: consultationData?.ketosis.aggressiveness,
      /*
       */
    },
  });

  const { token, patientData } = useContext(AppContext);

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${import.meta.env.VITE_API_BACK_URL}/consultation/edit-ketosis/${
        patientData.patient.id
      }`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({ ...consultationData, ketosis: response });
      setTimeout(() => {
        setLoadingModal(false);
        message.success("Registro de Cetosis actualizado exitosamente");
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
          <span className="semi-strong-lbl">Cetosis</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        {ketosis_array().length === 0 ? (
          <span>No se ha indicado registro de Cetosis</span>
        ) : (
          <Table
            bordered
            //style={{ width: "fit-content" }}
            className="patient-consultation-detail-ketosis-table"
            rowHoverable={false}
            columns={[
              {
                title: "",
                key: "name",
                dataIndex: "name",
              },
              {
                title: "VALUE",
                key: "value",
                dataIndex: "value",
                render: (text, record) => (
                  <>
                    <div className="patient-consultation-detail-ketosis-grid">
                      {ketosis_levels_options.map((item, index) => (
                        <div
                          key={index}
                          className="patient-consultation-detail-ketosis-grid-item"
                        >
                          <div
                            className={
                              record.value === item.value
                                ? "patient-consultation-detail-ketosis-grid-item-value patient-consultation-detail-ketosis-grid-item-value-cta"
                                : "patient-consultation-detail-ketosis-grid-item-value"
                            }
                          >
                            <span>{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ),
              },
            ]}
            dataSource={ketosis_array()}
            pagination={false}
          />
        )}
      </div>
      <Modal
        title="Cetosis"
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
          <div className="column">
            {ketosis_options.map((option) => (
              <div className="row">
                <span>{option.name}</span>
                <Controller
                  name={`${option.column_name}`}
                  control={control}
                  render={({ field }) => (
                    <Radio.Group
                      {...field}
                      block
                      options={ketosis_levels_options}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Ketosis;
