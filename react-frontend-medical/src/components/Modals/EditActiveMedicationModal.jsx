import { Button, DatePicker, Input, Modal, Select } from "antd";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import { defaultDayjsDate } from "../../functions/functions";
import {
  administration_route_units,
  dose_measurement_units,
  duration_of_treatment_measurement_units,
  medication_status_options,
} from "../../utils/MedicalInfo";
import TextArea from "antd/es/input/TextArea";

const EditActiveMedicationModal = ({
  isModalOpen,
  setIsModalOpen,
  loadingModal,
  setLoadingModal,
  setLoading,
  modalActiveMedicationData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      id: modalActiveMedicationData?.id,
      patient_id: modalActiveMedicationData?.patient_id || "",
      name: modalActiveMedicationData?.name || null,
      dose: modalActiveMedicationData?.dose || null,
      dose_measurement: modalActiveMedicationData?.dose_measurement || null,
      frequency: modalActiveMedicationData?.frequency || null,
      administration_route:
        modalActiveMedicationData?.administration_route || null,
      start_date: defaultDayjsDate(modalActiveMedicationData?.start_date),
      end_date: defaultDayjsDate(modalActiveMedicationData?.end_date),
      duration_of_treatment:
        modalActiveMedicationData?.duration_of_treatment || null,
      duration_of_treatment_measurement:
        modalActiveMedicationData?.duration_of_treatment_measurement || null,
      indications: modalActiveMedicationData?.indications || null,
      side_effects: modalActiveMedicationData?.side_effects || null,
      medication_status: modalActiveMedicationData?.medication_status || null,
      notes: modalActiveMedicationData?.notes || null,
    },
  });

  const { token, patientData, setPatientData } = useContext(AppContext);

  const handleOk = async (data) => {
    console.log(data);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={modalActiveMedicationData?.name || ""}
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loadingModal}
            onClick={handleSubmit(handleOk)}
          >
            Guardar cambios
          </Button>,
          <Button key="back" onClick={handleCancelModal}>
            Cancelar
          </Button>,
        ]}
      >
        {modalActiveMedicationData ? (
          <form onSubmit={handleSubmit(handleOk)}>
            {/*Dosis*/}
            <div className="column">
              <span>Dosis</span>
              <div className="patient-vaccine-card-grid">
                <Controller
                  name="dose"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      status={errors.dose && "error"}
                    />
                  )}
                />
                <Controller
                  name="dose_measurement"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={dose_measurement_units}
                      placeholder="Ej: mg(miligramos)"
                    />
                  )}
                />
              </div>
            </div>
            {/*Fecuencia*/}
            <div className="column">
              <span>Frecuencia</span>
              <Controller
                name="frequency"
                control={control}
                render={({ field }) => (
                  <Input {...field} status={errors.frequency && "error"} />
                )}
              />
            </div>
            {/*Vía de administración*/}
            <div className="column">
              <span>Vía de administración</span>
              <Controller
                name="administration_route"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={administration_route_units}
                    placeholder="Ej: Vía oral"
                  />
                )}
              />
            </div>
            {/*Fecha de inicio*/}
            <div className="column">
              <span>Fecha de inicio</span>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    placeholder="Fecha de inicio"
                  />
                )}
              />
            </div>
            {/*Fecha de finalización*/}
            <div className="column">
              <span>Fecha de finalización</span>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    placeholder="Fecha de finalización"
                  />
                )}
              />
            </div>
            {/*Duración del tratamiento*/}
            <div className="column">
              <span>Duración del tratamiento</span>
              <div className="patient-vaccine-card-grid">
                <Controller
                  name="duration_of_treatment"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      status={errors.duration_of_treatment && "error"}
                    />
                  )}
                />
                <Controller
                  name="duration_of_treatment_measurement"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={duration_of_treatment_measurement_units}
                      placeholder="Ej: Días"
                    />
                  )}
                />
              </div>
            </div>
            {/*Indicaciones*/}
            <div className="column">
              <span>Indicaciones</span>
              <Controller
                name="indications"
                control={control}
                render={({ field }) => (
                  <TextArea {...field} status={errors.indications && "error"} />
                )}
              />
            </div>
            {/*Efectos secundarios*/}
            <div className="column">
              <span>Efectos secundarios</span>
              <Controller
                name="side_effects"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    status={errors.side_effects && "error"}
                  />
                )}
              />
            </div>
            {/*Estado del medicamento*/}
            <div className="column">
              <span>Estado del medicamento</span>
              <Controller
                name="medication_status"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={medication_status_options} />
                )}
              />
            </div>
            {/*Notas adicionales*/}
            <div className="column">
              <span>Notas adicionales</span>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextArea {...field} status={errors.notes && "error"} />
                )}
              />
            </div>
          </form>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default EditActiveMedicationModal;
