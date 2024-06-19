import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventRequest } from "../context/EventsContext";
import Sidebar from "../components/SideBar";
import "../index.css"; // Importar el archivo CSS personalizado

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

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow p-10 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
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
          </div>
          <FullCalendar
            locale="es" // Añadir configuración de idioma
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={calendarView}
            events={formattedEvents}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventContent={renderEventContent}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              list: "Lista",
            }}
            allDayText="Todo el día"
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: false,
              meridiem: "short",
              hour12: false,
            }}
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
