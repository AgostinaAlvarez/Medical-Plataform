import React, { useContext, useEffect, useState } from "react";
import PrincipalCard from "../../PrincipalCard";
import { patient_heath_history_options } from "../../../utils/PatientHisotry";
import TextArea from "antd/es/input/TextArea";
import { AppContext } from "../../../context/AppContext";
import { Checkbox, DatePicker } from "antd";
import { FaCheck } from "react-icons/fa";
import { apiPut } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import { FaTimes } from "react-icons/fa";
import PatientHistoryLoader from "./PatientHistoryLoader";
import { message } from "antd";
import { defaultDayjsDate, transformDate } from "../../../functions/functions";
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";

const FormComponent = ({ item, responses, health_history_item, closeForm }) => {
  const { token, patientData, setPatientData } = useContext(AppContext);
  const [data, setData] = useState(responses);
  const [loading, setLoading] = useState(false);

  const saveChanges = async () => {
    setLoading(true);
    const { data: response, error } = await apiPut(
      `${import.meta.env.VITE_API_BACK_URL}/${health_history_item}/update`,
      data,
      header_private(token)
    );

    if (response) {
      setPatientData({
        ...patientData,
        medical_history: {
          ...patientData.medical_history,
          [health_history_item]: response,
        },
      });
      setTimeout(() => {
        setLoading(false);
        message.success(`${health_history_item} editados correctamente`);
        closeForm();
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
        message.error("Algo salio mal! Intentalo nuevamente");
        closeForm();
      }, 2000);
    }
  };

  return (
    <div className="column" style={{ gap: 15, position: "relative" }}>
      <PatientHistoryLoader loading={loading} />
      {item.form_options.map((form_option) => (
        <>
          {form_option.type === "check" ? (
            <div className="row-space-btw patient-health-history-check patient-card-label-responsive">
              <span>{form_option.label}</span>
              <div className="row patient-health-history-check-container">
                <Checkbox
                  checked={data[form_option.column_name] ? true : null}
                  onChange={(e) => {
                    setData({
                      ...data,
                      [form_option.column_name]:
                        e.target.checked === false ? null : true,
                    });
                  }}
                >
                  <span className="patient-card-label-responsive">Si</span>
                </Checkbox>
                <Checkbox
                  checked={
                    data[form_option.column_name] === false ? true : null
                  }
                  onChange={(e) => {
                    setData({
                      ...data,
                      [form_option.column_name]:
                        e.target.checked === false ? null : false,
                    });
                  }}
                >
                  <span className="patient-card-label-responsive">No</span>
                </Checkbox>
              </div>
            </div>
          ) : (
            <>
              {form_option.type === "text" ? (
                <div className="column patient-card-label-responsive">
                  <span>{form_option.label}</span>
                  <TextArea />
                </div>
              ) : (
                <>
                  {form_option.type === "date" ? (
                    <div className="column patient-card-label-responsive">
                      <span>{form_option.label}</span>
                      <DatePicker
                        format="YYYY-MM-DD"
                        defaultValue={defaultDayjsDate(
                          data[form_option.column_name]
                        )}
                        onChange={(date, dateString) => {
                          setData({
                            ...data,
                            [form_option.column_name]: dateString,
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div className="column patient-card-label-responsive">
                      <span>{form_option.label}</span>
                      <div className="column">
                        {form_option.options.map((item) => (
                          <Checkbox>
                            <span className="patient-card-label-responsive">
                              {item}
                            </span>
                          </Checkbox>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      ))}

      <div className="patient-detail-edit-btn-container">
        <div
          onClick={closeForm}
          className="btn btn-red patient-detail-edit-btn"
        >
          Cancelar
        </div>
        <button className="btn patient-detail-edit-btn" onClick={saveChanges}>
          Guardar Cambos
        </button>
      </div>
    </div>
  );
};

const ResultsComponent = ({ item, responses }) => {
  return (
    <div className="column">
      {item.form_options.map((form_option) => (
        <>
          {responses[form_option.column_name] !== null ? (
            <>
              {form_option.type === "check" ? (
                <div className="row patient-card-label-responsive patient-health-history-option-label-container">
                  {responses[form_option.column_name] ? (
                    <FaCheck style={{ color: "#47d4c6" }} />
                  ) : (
                    <FaTimes style={{ color: "#ff8a8a" }} />
                  )}

                  <span>{form_option.label}</span>
                </div>
              ) : (
                <div className="row patient-card-label-responsive patient-health-history-option-label-container">
                  <GoDotFill />
                  <span className="semi-strong-lbl">{form_option.label}:</span>
                  {form_option.type === "date" ? (
                    <span>
                      {transformDate(responses[form_option.column_name])}
                    </span>
                  ) : (
                    <span>{responses[form_option.column_name]}</span>
                  )}
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ))}
    </div>
  );
};

const PatientHealthHistoryCard = () => {
  const { patientData, setPatientData } = useContext(AppContext);

  const [options, setOptions] = useState(patient_heath_history_options);

  const openForm = (label) => {
    const updateOptions = options.map((item) => {
      if (item.label === label) {
        return { ...item, open_menu: !item.open_menu };
      }
      return { ...item, open_menu: false };
    });

    setOptions(updateOptions);
  };

  const closeForm = () => {
    const updateOptions = options.map((item) => {
      return { ...item, open_menu: false };
    });

    setOptions(updateOptions);
  };

  const renderHeaderComponent = (objt_data) => {
    const { id, patient_id, ...obj } = objt_data;
    for (let key in obj) {
      if (obj[key] !== null) {
        return true; // Si algún valor es diferente de null, devolvemos true
      }
    }
    return false; // Si todos son null, devolvemos false
  };

  return (
    <PrincipalCard title={"ANTECEDENTES"}>
      <div className="column" style={{ gap: 15 }}>
        {options.map((item) => (
          <div className="column patient-health-history-option-container">
            <div
              onClick={() => {
                openForm(item.label);
              }}
              className="row patient-health-history-ttl"
            >
              <div
                className={
                  renderHeaderComponent(
                    patientData.medical_history[item.column_name]
                  ) === true
                    ? "patient-health-history-check-icon-cta "
                    : "patient-health-history-check-icon"
                }
              >
                {item.open_menu ? "-" : "+"}
              </div>
              <span className="patient-health-history-check-icon-lbl">
                {item.label}
              </span>
            </div>
            {/*componente header*/}
            {item.open_menu ? (
              <FormComponent
                item={item}
                responses={patientData.medical_history[item.column_name]}
                health_history_item={item.column_name}
                closeForm={closeForm}
              />
            ) : (
              <ResultsComponent
                item={item}
                responses={patientData.medical_history[item.column_name]}
              />
            )}
          </div>
        ))}
      </div>
    </PrincipalCard>
  );
};

export default PatientHealthHistoryCard;
