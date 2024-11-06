import React, { useContext, useState } from "react";
import { topographic_exploration_options } from "../../../utils/MedicalInfo";
import { Button, Modal, Select, Table, message } from "antd";
import { MdEdit } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import PrincipalCard from "../../PrincipalCard";
import TextArea from "antd/es/input/TextArea";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import { AppContext } from "../../../context/AppContext";

const TopographicExploration = ({ consultationData, setConsultationData }) => {
  const topographic_exploration_array = () => {
    const topographic_exploration = consultationData?.topographic_exploration;
    let data = [];

    topographic_exploration_options.forEach((element) => {
      if (topographic_exploration[element.column_name] !== null) {
        const objt = {
          column_name: element.column_name,
          value: element.value,
          part: element.label,
          description: topographic_exploration[element.column_name],
        };
        data.push(objt);
      }
    });

    return data;
  };

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      id: consultationData?.topographic_exploration.id,
      medical_consultation_id:
        consultationData?.topographic_exploration.medical_consultation_id,
      head_front_part:
        consultationData?.topographic_exploration.head_front_part,
      head_back_part: consultationData?.topographic_exploration.head_back_part,
      neck_front_part:
        consultationData?.topographic_exploration.neck_front_part,
      neck_back_part: consultationData?.topographic_exploration.neck_back_part,
      upper_limb_left_front_part:
        consultationData?.topographic_exploration.upper_limb_left_front_part,
      upper_limb_left_back_part:
        consultationData?.topographic_exploration.upper_limb_left_back_part,
      upper_limb_right_front_part:
        consultationData?.topographic_exploration.upper_limb_right_front_part,
      upper_limb_right_back_part:
        consultationData?.topographic_exploration.upper_limb_right_back_part,
      trunk_front_part:
        consultationData?.topographic_exploration.trunk_front_part,
      trunk_back_part:
        consultationData?.topographic_exploration.trunk_back_part,
      lower_limb_left_front_part:
        consultationData?.topographic_exploration.lower_limb_left_front_part,
      lower_limb_left_back_part:
        consultationData?.topographic_exploration.lower_limb_left_back_part,
      lower_limb_right_front_part:
        consultationData?.topographic_exploration.lower_limb_right_front_part,
      lower_limb_right_back_part:
        consultationData?.topographic_exploration.lower_limb_right_back_part,
      pelvic_area_front:
        consultationData?.topographic_exploration.pelvic_area_front,
      pelvic_area_back:
        consultationData?.topographic_exploration.pelvic_area_back,
    },
  });

  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [topographicExplorationValue, setTopographicExplorationValue] =
    useState(null);

  const [topographicExplorationOptions, setTopographicExplorationOptions] =
    useState(topographic_exploration_array());

  const onChangeTopographicExploration = (value, record) => {
    setTopographicExplorationValue(record);
    const findValueInArray = topographicExplorationOptions.find(
      (item) => item.value === value
    );
    if (!findValueInArray) {
      setTopographicExplorationOptions([
        ...topographicExplorationOptions,
        {
          ...record,
          part: record.label,
        },
      ]);
    }
    setTopographicExplorationValue(null);
  };

  const deleteChangeTopographicExplorationItem = (item) => {
    const updateTopographicExplorationArray =
      topographicExplorationOptions.filter(
        (option) => option.value !== item.value
      );
    setTopographicExplorationOptions(updateTopographicExplorationArray);
    setValue(`${item.column_name}`, null);
    setTopographicExplorationValue(null);
  };

  const { token, patientData } = useContext(AppContext);

  const handleOk = async (data) => {
    ///consultation/edit-topographic-exploration/
    setLoadingModal(true);
    const { data: response, error } = await apiPut(
      `${
        import.meta.env.VITE_API_BACK_URL
      }/consultation/edit-topographic-exploration/${patientData.patient.id}`,
      data,
      header_private(token)
    );
    if (response) {
      setConsultationData({
        ...consultationData,
        topographic_exploration: response,
      });
      setTimeout(() => {
        setLoadingModal(false);
        message.success("Exploración Topográfica actualizada exitosamente");
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
    setTopographicExplorationOptions(topographic_exploration_array());
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
          <span className="semi-strong-lbl">Exploración Topográfica</span>
          <div className="icon-container" onClick={handleOpenModal}>
            <MdEdit />
          </div>
        </div>
        {topographic_exploration_array().length === 0 ? (
          <span>No se ha indicado registro de Exploración Topográfica</span>
        ) : (
          <Table
            bordered
            rowHoverable={false}
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
            dataSource={topographic_exploration_array()}
            pagination={false}
          />
        )}
      </div>
      <Modal
        title="Exploración Topográfica"
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
            //value={topographicExplorationValue}
            options={topographic_exploration_options}
            value={topographicExplorationValue}
            onChange={onChangeTopographicExploration}
            //onChange={onChangeTopographicExploration}
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
            {topographicExplorationOptions.map((item) => (
              <PrincipalCard
                header={
                  <div className="row-space-btw">
                    <span className="semi-strong-lbl">{item.part}</span>
                    <button
                      onClick={() => {
                        deleteChangeTopographicExplorationItem(item);
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

export default TopographicExploration;
