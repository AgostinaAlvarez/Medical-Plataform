import { Button, DatePicker, Input, Modal, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { defaultDayjsDate } from "../../functions/functions";
import { vaccines_data } from "../../utils/MedicalInfo";
import { header_private } from "../../utils/Headers";
import { apiPut } from "../../utils/Api";
import { AppContext } from "../../context/AppContext";

const EditVaccineModal = ({
  isModalOpen,
  setIsModalOpen,
  loadingModal,
  setLoadingModal,
  setLoading,
  modalVaccineData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      id: modalVaccineData?.id,
      application_date: defaultDayjsDate(modalVaccineData?.application_date),
      next_dose: defaultDayjsDate(modalVaccineData?.next_dose),
      batch: modalVaccineData?.batch || null,
      notes: modalVaccineData?.notes || null,
      name: modalVaccineData?.name || null,
      patient_id: modalVaccineData?.patient_id || "",
    },
  });

  const { token, patientData, setPatientData } = useContext(AppContext);

  const handleOk = async (data) => {
    setLoadingModal(true);
    const formattedData = {
      ...data,
      application_date: data.application_date
        ? data.application_date.format("YYYY-MM-DD")
        : null,
      next_dose: data.next_dose ? data.next_dose.format("YYYY-MM-DD") : null,
    };

    const { data: response, error } = await apiPut(
      `${import.meta.env.VITE_API_BACK_URL}/vaccine/edit`,
      formattedData,
      header_private(token)
    );

    if (response) {
      const updateVaccinesData = patientData.vaccines.map((item) => {
        if (item.id === modalVaccineData.id) {
          return { ...response };
        }
        return item;
      });
      setPatientData({ ...patientData, vaccines: updateVaccinesData });
      setTimeout(() => {
        setLoadingModal(false);
        message.success("Vacuna editada exitosamente");
        setIsModalOpen(false);
      }, 1500);
    } else {
      console.log(error);
      setTimeout(() => {
        setLoadingModal(false);
        message.error("Algo salio mal intentalo nuevamente mas tarde");
        setIsModalOpen(false);
      }, 1500);
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={modalVaccineData?.name || ""}
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
        {modalVaccineData ? (
          <form onSubmit={handleSubmit(handleOk)}>
            <div className="column">
              <span>Fecha de aplicacion</span>
              <Controller
                name="application_date"
                rules={{ required: "La fecha de aplicacion es requerida" }}
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} format="YYYY-MM-DD" />
                )}
              />
              {errors.application_date && (
                <span className="patient-detail-edit-error-label">
                  {errors.application_date.message}
                </span>
              )}
            </div>
            <div className="column">
              <span>Proxima dosis</span>
              <Controller
                name="next_dose"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} format="YYYY-MM-DD" />
                )}
              />
            </div>

            <div className="column">
              <span>Lote</span>
              <Controller
                name="batch"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </div>

            <div className="column">
              <span>Notas</span>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => <Input {...field} />}
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

export default EditVaccineModal;
