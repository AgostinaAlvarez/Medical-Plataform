import { Modal } from "antd";
import React from "react";
import { transformDate } from "../../../functions/functions";
import { FaRegCalendarCheck } from "react-icons/fa";

const EventDetail = ({
  isDetailEventModalOpen,
  setIsDetailEventModalOpen,
  selectedEvent,
}) => {
  const handleCancelModal = () => {
    setIsDetailEventModalOpen(false);
  };

  return (
    <>
      <Modal
        title={
          <div
            className="row"
            style={{ borderBottom: "1px solid #dbe5ec", padding: "10px" }}
          >
            <FaRegCalendarCheck />
            <span>Detalle del Evento</span>
          </div>
        }
        open={isDetailEventModalOpen}
        onCancel={handleCancelModal}
        footer={null}
      >
        <div className="column">
          {selectedEvent ? (
            <>
              <span>CONSULTA</span>
              <span>
                Fecha: {transformDate(selectedEvent?.detail_event.event.date)}
              </span>
              <span>Hora: {selectedEvent?.detail_event.event.hour}</span>
              {selectedEvent?.detail_event.event.asocciate_patient === false ? (
                <div className="column">
                  <span>Paciente no registrado</span>
                  <span>Datos de contacto:</span>
                  <span>
                    Nombre:
                    {selectedEvent?.detail_event.prospective_patient.name}
                  </span>
                  <span>
                    Apellido:
                    {selectedEvent?.detail_event.prospective_patient.last_name}
                  </span>
                  <span>
                    Email:
                    {selectedEvent?.detail_event.prospective_patient.email}
                  </span>
                  <span>
                    Numero de contacto:
                    {
                      selectedEvent?.detail_event.prospective_patient
                        .contact_number
                    }
                  </span>
                </div>
              ) : (
                <div className="column"></div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </>
  );
};

export default EventDetail;
