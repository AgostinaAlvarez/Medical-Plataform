import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import PrincipalCard from "../../PrincipalCard";
import SelectComponent from "../../SelectComponent";
import {
  administration_route_units,
  dose_measurement_units,
  duration_of_treatment_measurement_units,
  medication_status_options,
  medications_data,
} from "../../../utils/MedicalInfo";
import { Controller, useForm } from "react-hook-form";
import PatientHistoryLoader from "./PatientHistoryLoader";
import { DatePicker, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { transformDate } from "../../../functions/functions";
import EditActiveMedicationModal from "../../Modals/EditActiveMedicationModal";
import DeleteActiveMedicationModal from "../../Modals/DeleteActiveMedicationModal";
import { header_private } from "../../../utils/Headers";
import { apiPost } from "../../../utils/Api";

const ActiveMedicationForm = ({
  setSelectedMedication,
  selectedMedication,
  setOpenForm,
}) => {
  const { patientData, setPatientData, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: selectedMedication?.name || null,
      patient_id: patientData.patient.id,
      medication_status: "Activo",
    },
  });

  const saveChanges = async (data) => {
    setLoading(true);
    const formattedData = {
      ...data,
      start_date: data.start_date ? data.start_date.format("YYYY-MM-DD") : null,
      end_date: data.end_date ? data.end_date.format("YYYY-MM-DD") : null,
      dose: data.dose ? parseInt(data.dose) : null,
      duration_of_treatment: data.duration_of_treatment
        ? parseInt(data.duration_of_treatment)
        : null,
    };

    //console.log(formattedData);
    const request_data = {
      ...formattedData,
      patient_id: patientData.patient.id,
    };

    //PETICION
    const { data: response, error } = await apiPost(
      `${import.meta.env.VITE_API_BACK_URL}/active-medication/create`,
      request_data,
      header_private(token)
    );

    if (response) {
      setPatientData({
        ...patientData,
        active_medications: [...patientData.active_medications, response],
      });
      setTimeout(() => {
        setLoading(false);
        message.success("Medicamento Activo agregado correctamente");
        cancelChanges();
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
        message.error("algo salio mal, intentalo de nuevo mas tarde!");
        cancelChanges();
      }, 2000);
    }
  };

  function cancelChanges() {
    setSelectedMedication(null);
    setOpenForm(false);
  }

  return (
    <form
      onSubmit={handleSubmit(saveChanges)}
      className="patient-vaccine-card column"
    >
      <PatientHistoryLoader loading={loading} />
      <div className="patient-vaccine-card-card-ttl">
        {selectedMedication?.name}
      </div>

      {/*Dosis*/}
      <div className="column">
        <span>Dosis</span>
        <div className="patient-vaccine-card-grid">
          <Controller
            name="dose"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Input type="number" {...field} status={errors.dose && "error"} />
            )}
          />
          <Controller
            name="dose_measurement"
            control={control}
            defaultValue={null}
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
          defaultValue={null}
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
          defaultValue={null}
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
          defaultValue={null}
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
          defaultValue={null}
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
            defaultValue={null}
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
            defaultValue={null}
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
          defaultValue={null}
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
          defaultValue={null}
          render={({ field }) => (
            <TextArea {...field} status={errors.side_effects && "error"} />
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
          defaultValue={null}
          render={({ field }) => (
            <TextArea {...field} status={errors.notes && "error"} />
          )}
        />
      </div>

      <div className="patient-detail-edit-btn-container">
        <div
          className="btn btn-red patient-detail-edit-btn"
          onClick={cancelChanges}
        >
          Cancelar
        </div>
        <button className="btn patient-detail-edit-btn" type="submit">
          Guardar Cambos
        </button>
      </div>
    </form>
  );
};

const ActiveMedicationCard = ({ medication }) => {
  /*MODAL DE EDICION*/
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  /*MODAL DE ELIMINAR*/
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingModalDelete, setLoadingModalDelete] = useState(false);

  const deleteActiveMedication = async () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="patient-vaccine-card column">
        <div className="patient-vaccine-card-card-ttl row-space-btw">
          <span style={{ width: "80%" }}>{medication.name}</span>
          <div className="row">
            <div className="icon-container" onClick={showModal}>
              <MdEdit />
            </div>
            <div onClick={deleteActiveMedication} className="icon-container">
              <FaTrashCan />
            </div>
          </div>
        </div>
        <>
          {medication.dose !== null || medication.dose_measurement !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Dosis</span>
              <span>
                {medication.dose} {medication.dose_measurement}
              </span>
            </div>
          ) : (
            <></>
          )}
          {medication.frequency !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Frecuencia</span>
              <span>{medication.frequency}</span>
            </div>
          ) : (
            <></>
          )}
          {medication.administration_route !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Vía de administración</span>
              <span>{medication.administration_route}</span>
            </div>
          ) : (
            <></>
          )}
          {medication.start_date !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Fecha de inicio</span>
              <span>{transformDate(medication.start_date)}</span>
            </div>
          ) : (
            <></>
          )}

          {medication.end_date !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Fecha de finalización</span>
              <span>{transformDate(medication.end_date)}</span>
            </div>
          ) : (
            <></>
          )}

          {medication.duration_of_treatment !== null ||
          medication.duration_of_treatment_measurement !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Duración del tratamiento</span>
              <span>
                {medication.duration_of_treatment}{" "}
                {medication.duration_of_treatment_measurement}
              </span>
            </div>
          ) : (
            <></>
          )}

          {medication.indications !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Indicaciones</span>
              <span>{medication.indications}</span>
            </div>
          ) : (
            <></>
          )}

          {medication.side_effects !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Efectos secundarios</span>
              <span>{medication.side_effects}</span>
            </div>
          ) : (
            <></>
          )}

          {medication.medication_status !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Estado del medicamento</span>
              <span>{medication.medication_status}</span>
            </div>
          ) : (
            <></>
          )}

          {medication.notes !== null ? (
            <div className="row">
              <GoDotFill />
              <span className="semi-strong-lbl">Notas adicionales</span>
              <span>{medication.notes}</span>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
      <EditActiveMedicationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loadingModal={loadingModal}
        setLoadingModal={setLoadingModal}
        setLoading={setLoading}
        modalActiveMedicationData={medication}
      />
      <DeleteActiveMedicationModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        loadingModalDelete={loadingModalDelete}
        setLoadingModalDelete={setLoadingModalDelete}
        setLoading={setLoading}
        modalActiveMedicationData={medication}
      />
    </>
  );
};

const PatientActiveMedicationsCard = () => {
  const { patientData } = useContext(AppContext);

  const [selectedMedication, setSelectedMedication] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openValuen, setOpenValue] = useState(undefined);

  const HandleChange = (value, record) => {
    setSelectedMedication(null);
    setOpenForm(false);
    setTimeout(() => {
      setSelectedMedication(record);
    }, 50);

    setTimeout(() => {
      setOpenForm(true);
    }, 60);
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  function HandleAddNewActiveMedication() {
    setSelectedMedication(null);
    setOpenValue(false);
    setOpenForm(false);
    setTimeout(() => {
      setSelectedMedication({
        value: searchValue,
        label: searchValue,
        name: searchValue,
      });
    }, 50);
    setTimeout(() => {
      setOpenForm(true);
      setOpenValue(undefined);
    }, 60);
  }

  return (
    <>
      <PrincipalCard title={"MEDICAMENTOS ACTIVOS"}>
        <div className="column patient-vaccine-principal-card-content">
          <div className="patient-history-select">
            <SelectComponent
              options={medications_data}
              placeholder={"Seleccionar medicamento"}
              value={selectedMedication}
              HandleChange={HandleChange}
              onSearch={onSearch}
              HandleClick={HandleAddNewActiveMedication}
              openValue={openValuen}
              button_label={"Agregar Medicamento Activo manualmente"}
            />
          </div>
        </div>
        {openForm ? (
          <ActiveMedicationForm
            setSelectedMedication={setSelectedMedication}
            selectedMedication={selectedMedication}
            setOpenForm={setOpenForm}
          />
        ) : (
          <></>
        )}
        {patientData.active_medications.map((active_medication, index) => (
          <ActiveMedicationCard key={index} medication={active_medication} />
        ))}
      </PrincipalCard>
    </>
  );
};

export default PatientActiveMedicationsCard;
