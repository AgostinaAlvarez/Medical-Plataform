import React from "react";
import { MdEdit } from "react-icons/md";
import { lab_results_units } from "../../../utils/MedicalInfo";
import { transformDate } from "../../../functions/functions";

const LabResultsByMedicalConsultation = ({
  consultationData,
  setConsultationData,
}) => {
  return (
    <>
      <div className="column patient-consultation-detail-card">
        <div className="row semi-strong-lbl patient-consultation-detail-card-header patient-consultation-detail-card-content">
          <span>Resultados de laboratorio</span>
          <div
            className="icon-container"
            //onClick={handleOpenModal}
          >
            <MdEdit />
          </div>
        </div>
        <div className="patient-consultation-detail-card-content">
          {consultationData?.lab_results === null ? (
            <span>
              No hay resultados de laboratorio asociados a la consulta
            </span>
          ) : (
            <div className="column" style={{ gap: 20 }}>
              <div className="row">
                <span>Fecha del estudio</span>
                <span>{transformDate(consultationData?.lab_results.date)}</span>
              </div>
              {lab_results_units.map((category) => {
                // Filtrar los items que tienen un valor no nulo en data.results
                const filteredItems = category.items.filter(
                  (item) =>
                    consultationData?.lab_results[item.column_name] !== null
                );

                // Si no hay elementos con valores no nulos, no se renderiza la categoría
                if (filteredItems.length === 0) {
                  return null;
                }

                return (
                  <div>
                    {/* Renderizar la clasificación */}
                    <div className="patient-lab-reult-clasification">
                      {category.clasificacion}
                    </div>
                    {/* Renderizar los items filtrados */}
                    {filteredItems.map((item) => (
                      <div className="row-space-btw">
                        <div>{item.label}</div>
                        <div>
                          <div className="row">
                            <span>
                              {consultationData?.lab_results[item.column_name]}
                            </span>
                            <span>{item.unit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LabResultsByMedicalConsultation;
