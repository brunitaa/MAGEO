import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventRequest } from "../context/EventsContext";
import Sidebar from "../components/SideBar";

const CalendarPage = () => {
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const { events, getEvents } = useEventRequest([]);

  // Cambiar la vista del calendario
  const handleCalendarViewChange = (view) => {
    setCalendarView(view);
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    // Log the events to check if they are being fetched correctly
    console.log("Events: ", events);
  }, [events]);

  // Preparar eventos para el FullCalendar
  const formattedEvents = events.flatMap((event) =>
    event.schedules.map((schedule) => ({
      title: event.event_name,
      start: schedule.start_time,
      end: schedule.end_time,
      extendedProps: {
        place: schedule.place,
      },
    }))
  );

  // Log the formatted events to check if they are in the correct format
  console.log("Formatted Events: ", formattedEvents);

  return (
    <div className="flex">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="ml-64 flex-1 p-4">
        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Calendario de Eventos
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleCalendarViewChange("dayGridMonth")}
                className={`px-4 py-2 rounded-md ${
                  calendarView === "dayGridMonth"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600 hover:text-white focus:outline-none transition duration-300`}
              >
                Mes
              </button>
              <button
                onClick={() => handleCalendarViewChange("timeGridWeek")}
                className={`px-4 py-2 rounded-md ${
                  calendarView === "timeGridWeek"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600 hover:text-white focus:outline-none transition duration-300`}
              >
                Semana
              </button>
              <button
                onClick={() => handleCalendarViewChange("timeGridDay")}
                className={`px-4 py-2 rounded-md ${
                  calendarView === "timeGridDay"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600 hover:text-white focus:outline-none transition duration-300`}
              >
                Día
              </button>
            </div>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={calendarView}
            events={formattedEvents}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventContent={renderEventContent}
          />
        </motion.section>
      </div>
    </div>
  );
};

const renderEventContent = (eventInfo) => {
  return (
    <div className="fc-event-title fc-sticky">
      <b>{eventInfo.timeText}</b>
      <br />
      <i>{eventInfo.event.title}</i>
      <br />
      <i>{eventInfo.event.extendedProps.place}</i>{" "}
      {/* Muestra el lugar del evento */}
    </div>
  );
};

export default CalendarPage;
