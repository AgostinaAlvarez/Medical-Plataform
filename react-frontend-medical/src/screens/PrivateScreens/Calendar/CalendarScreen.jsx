import React, { useContext, useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Button, Modal } from "antd";
import NewEvent from "./NewEvent";
import EventDetail from "./EventDetail";
import { GoPlusCircle } from "react-icons/go";
import { FaRegClock, FaUserCircle } from "react-icons/fa";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { apiGet } from "../../../utils/Api";
import { header_private } from "../../../utils/Headers";
import { AppContext } from "../../../context/AppContext";
import {
  addOneHour,
  cutAfterT,
  updateAsideOptions,
} from "../../../functions/functions";
import LoadingScreen from "../../LoadingScreen";
import moment from "moment";
const localizer = dayjsLocalizer(dayjs);

const transformDateCutString = (dateString) => {
  const formattedDate = dateString.split("T")[0];
  return formattedDate;
};

const CalendarScreen = () => {
  const { token, userData, asideOptions, setAsideOptions } =
    useContext(AppContext);

  useEffect(() => {
    console.log("calendar");
    update_aside();
  }, []);

  const update_aside = () => {
    const array = updateAsideOptions("calendar", asideOptions);
    setAsideOptions(array);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [events, setEvents] = useState([]);
  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    getEventsData();
    getPatients();
  }, []);

  const tranform_data = (array) => {
    let data = [];
    array.forEach((element) => {
      let date = cutAfterT(element.event.date);
      let start_string = `${date}${element.event.hour}`;
      let end_string = `${date}${addOneHour(element.event.hour)}`;
      let objt = {
        start: dayjs(start_string).toDate(),
        end: dayjs(end_string).toDate(),
        title: "Consulta",
        detail_event: element,
      };
      data.push(objt);
    });
    return data;
  };

  const getEventsData = async () => {
    const { data: response, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/event/get_all`,
      header_private(token)
    );
    if (response) {
      //console.log(response);
      const events_data = tranform_data(response);
      //console.log(events_data);
      setEvents(events_data);
      console.log(events_data);
      setTimeout(() => {
        setError(null);
        setLoading(false);
      }, 2000);
    } else {
      console.log(error);
    }
  };

  const getPatients = async () => {
    const { data, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/patient/get/all`,
      header_private(token)
    );
    if (data) {
      setPatientsList(data);
    } else {
      console.log(error);
    }
  };

  const messages = {
    //allDay: "Todo el día",
    previous: <IoIosArrowBack style={{ fontSize: "20px" }} />,
    next: <IoIosArrowForward style={{ fontSize: "20px" }} />,
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Dia",
  };

  /*MODAL*/
  const [isDetailEventModalOpen, setIsDetailEventModalOpen] = useState(false);
  const [isNewEvenetModalOpen, setIsNewEventModalOpen] = useState(false);

  /*CALENDARIO FUNCTIONS*/
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [newEventData, setNewEventData] = useState(null);

  const handleSelectSlot = ({ start }) => {
    //console.log(start);
    const string = transformDateCutString(start.toISOString());
    //const datestring = string.replace(/-/g, "/");
    const horaFormateada = moment(start).format("HH:mm:ss");

    const objt = {
      hour: horaFormateada,
      date: string,
    };

    //console.log(objt);
    setNewEventData(objt);
    setIsNewEventModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    console.log("Detalles del evento:", event);
    setSelectedEvent(event);
    setIsDetailEventModalOpen(true);
  };

  const handleSelectEventInList = (item) => {
    setSelectedEvent(item);
    setIsDetailEventModalOpen(true);
  };

  const handleAddNewEevet = () => {
    const objt = {
      hour: null,
      date: null,
    };
    setNewEventData(objt);
    setIsNewEventModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <div>Error!</div>
          ) : (
            <>
              <div className="calendar-screen-bg">
                <div
                  className="calendar-container"
                  style={{
                    backgroundColor: "white",
                    boxSizing: "border-box",
                    //padding: "0px 20px",
                  }}
                >
                  <Calendar
                    localizer={localizer}
                    defaultView="week"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    views={["month", "week", "day"]}
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    messages={messages}
                    min={new Date(2000, 0, 1, 6, 0)} // Cualquier fecha, pero con hora 6:00 AM
                    max={new Date(2000, 0, 1, 20, 0)}
                  />

                  <NewEvent
                    isNewEvenetModalOpen={isNewEvenetModalOpen}
                    setIsNewEventModalOpen={setIsNewEventModalOpen}
                    newEventData={newEventData}
                    patientsList={patientsList}
                    events={events}
                    setEvents={setEvents}
                  />

                  <EventDetail
                    isDetailEventModalOpen={isDetailEventModalOpen}
                    setIsDetailEventModalOpen={setIsDetailEventModalOpen}
                    selectedEvent={selectedEvent}
                  />
                </div>
                <div className="calendar-aside">
                  <div className="calendar-aside-conteiner">
                    <div
                      className="calendar-aside-btn btn-border row"
                      onClick={handleAddNewEevet}
                    >
                      <GoPlusCircle />
                      <span>Nuevo Evento</span>
                    </div>
                    <div className="column calendar-aside-consultation-list-container">
                      <span>Proximos Eventos</span>
                      <div className="calendar-aside-consultation-list">
                        {events.map((item, index) => (
                          <div
                            key={index}
                            className="calendar-aside-consultation-list-item-container column"
                            onClick={() => {
                              handleSelectEventInList(item);
                            }}
                          >
                            <div className="row-space-btw">
                              <FaUserCircle
                                style={{ fontSize: 30, color: "#3FA2F6" }}
                              />
                              <span style={{ fontSize: 12 }}>Nov 20, 2024</span>
                            </div>
                            <span style={{ color: "black" }}>
                              {item.detail_event.event.asocciate_patient ===
                              false
                                ? `${item.detail_event.prospective_patient.name} ${item.detail_event.prospective_patient.last_name}`
                                : `Nombre del paciente`}
                            </span>
                            <span style={{ fontSize: 12 }}>18:30 hs</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="calendar-asise-responsive">Hola</div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CalendarScreen;
