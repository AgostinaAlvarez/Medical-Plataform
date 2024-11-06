import React, { useContext, useEffect, useState } from "react";
import PrincipalCard from "../../PrincipalCard";
import SelectComponent from "../../SelectComponent";
import { vaccines_data } from "../../../utils/MedicalInfo";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Input, message } from "antd";
import { defaultDayjsDate, transformDate } from "../../../functions/functions";
import EditVaccineModal from "../../Modals/EditVaccineModal";
import { AppContext } from "../../../context/AppContext";
import { apiDelete, apiPost } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import PatientHistoryLoader from "./PatientHistoryLoader";
import DeleteVaccineModal from "../../Modals/DeleteVaccineModal";
import { IoMdSettings } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";

const VaccinationsForm = ({
  setSelectedVaccination,
  selectedVaccination,
  setOpenForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      application_date: defaultDayjsDate(selectedVaccination?.application_date),
      next_dose: defaultDayjsDate(selectedVaccination?.next_dose),
      batch: selectedVaccination?.batch || null,
      notes: selectedVaccination?.notes || null,
      name: selectedVaccination?.name || null,
    },
  });

  const { patientData, setPatientData, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const saveChanges = async (data) => {
    setLoading(true);
    //DATA
    const formattedData = {
      ...data,
      application_date: data.application_date
        ? data.application_date.format("YYYY-MM-DD")
        : null,
      next_dose: data.next_dose ? data.next_dose.format("YYYY-MM-DD") : null,
    };

    const request_data = {
      ...formattedData,
      patient_id: patientData.patient.id,
    };

    //PETICION
    const { data: response, error } = await apiPost(
      `${import.meta.env.VITE_API_BACK_URL}/vaccine/create`,
      request_data,
      header_private(token)
    );

    if (response) {
      console.log("respuesta del back");
      setPatientData({
        ...patientData,
        vaccines: [...patientData.vaccines, response],
      });
      setTimeout(() => {
        setLoading(false);
        message.success("Vacuna agregada correctamente");
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
    setSelectedVaccination(null);
    setOpenForm(false);
  }

  return (
    <form
      onSubmit={handleSubmit(saveChanges)}
      className="patient-vaccine-card column"
    >
      <PatientHistoryLoader loading={loading} />
      <div className="patient-vaccine-card-card-ttl">
        {selectedVaccination?.name}
      </div>
      {/* Fecha de aplicacion */}
      <div className="column">
        <span>Fecha de aplicacion</span>
        <Controller
          name="application_date"
          rules={{ required: "La fecha de aplicacion es requerida" }}
          control={control}
          render={({ field }) => <DatePicker {...field} format="YYYY-MM-DD" />}
        />
        {errors.application_date && (
          <span className="patient-detail-edit-error-label">
            {errors.application_date.message}
          </span>
        )}
      </div>

      {/* Proxima dosis */}
      <div className="column">
        <span>Proxima dosis</span>
        <Controller
          name="next_dose"
          control={control}
          render={({ field }) => <DatePicker {...field} format="YYYY-MM-DD" />}
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

const VaccinationsCard = ({ vaccine }) => {
  const { token } = useContext(AppContext);
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

  const deleteVaccine = async () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="patient-vaccine-card column">
        <div className="patient-vaccine-card-card-ttl row-space-btw">
          <span>{vaccine.name}</span>
          <div className="row">
            <div className="icon-container" onClick={showModal}>
              <MdEdit />
            </div>
            <div onClick={deleteVaccine} className="icon-container">
              <FaTrashCan />
            </div>
          </div>
        </div>
        <div className="row">
          <GoDotFill />
          <span className="semi-strong-lbl">Fecha de aplicacion</span>
          <span>{transformDate(vaccine?.application_date)}</span>
        </div>
        <div className="row">
          <GoDotFill />
          <span className="semi-strong-lbl">Proxima dosis</span>
          <span>
            {vaccine?.next_dose ? transformDate(vaccine?.next_dose) : null}
          </span>
        </div>
        <div className="row">
          <GoDotFill />
          <span className="semi-strong-lbl">Lote</span>
          <span>{vaccine?.batch}</span>
        </div>
        <div className="row">
          <GoDotFill />
          <span className="semi-strong-lbl">Notas</span>
          <span>{vaccine?.notes}</span>
        </div>
      </div>
      <EditVaccineModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loadingModal={loadingModal}
        setLoadingModal={setLoadingModal}
        setLoading={setLoading}
        modalVaccineData={vaccine}
      />
      <DeleteVaccineModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        loadingModalDelete={loadingModalDelete}
        setLoadingModalDelete={setLoadingModalDelete}
        setLoading={setLoading}
        modalVaccineData={vaccine}
      />
    </>
  );
};

const PatientVaccinesCard = () => {
  const { patientData, setPatientData } = useContext(AppContext);

  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openValuen, setOpenValue] = useState(undefined);

  const HandleChange = (value, record) => {
    setSelectedVaccination(null);
    setOpenForm(false);

    setTimeout(() => {
      setSelectedVaccination(record);
    }, 50);

    setTimeout(() => {
      setOpenForm(true);
    }, 60);
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  function HandleAddNewVaccine() {
    setSelectedVaccination(null);
    setOpenValue(false);
    setOpenForm(false);
    setTimeout(() => {
      setSelectedVaccination({
        value: searchValue,
        label: searchValue,
        application_date: null,
        name: searchValue,
        next_dose: null,
        batch: null,
        notes: null,
      });
    }, 50);
    setTimeout(() => {
      setOpenForm(true);
      setOpenValue(undefined);
    }, 60);
  }

  return (
    <>
      <PrincipalCard title={"VACUNAS"}>
        <div className="column patient-vaccine-principal-card-content">
          <div className="patient-history-select">
            <SelectComponent
              options={vaccines_data}
              placeholder={"Seleccionar vacuna"}
              value={selectedVaccination}
              HandleChange={HandleChange}
              onSearch={onSearch}
              HandleClick={HandleAddNewVaccine}
              openValue={openValuen}
              button_label={"Agregar Vacuna manualmente"}
            />
          </div>

          {openForm ? (
            <VaccinationsForm
              setSelectedVaccination={setSelectedVaccination}
              selectedVaccination={selectedVaccination}
              setOpenForm={setOpenForm}
            />
          ) : (
            <></>
          )}

          {patientData.vaccines.map((vaccine, index) => (
            <VaccinationsCard key={index} vaccine={vaccine} />
          ))}
        </div>
      </PrincipalCard>
      {/*
        <button onClick={showModal}>Editar</button>
        */}
    </>
  );
};

export default PatientVaccinesCard;
