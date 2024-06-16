import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { EventCard } from "../../components/Tasks/EventCard";
import Sidebar from "../../components/SideBar";
import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import { AdvertisementCard } from "../../components/Tasks/AdvertisementCard";
import { useprotocolRequest } from "../../context/ProtocolContext";
import { ProtocolCard } from "../../components/Tasks/ProtocolCard";
import { LogisticCard } from "../../components/Tasks/LogisticCard";
import { useLogisticRequest } from "../../context/LogisticContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEventRequest } from "../../context/EventsContext";

export function AdminHomePage() {
  const { events, getEvents } = useEventRequest([]);
  const { advertisements, getAdvertisements } = useAdvertisingRequest([]);
  const { protocols, getProtocols } = useprotocolRequest([]);
  const { logistics, getLogistics } = useLogisticRequest([]);
  const { isAdmin } = useAuth([]);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getEvents();
    getAdvertisements();
    getProtocols();
    getLogistics();
  }, []);

  // Convierte la fecha a una fecha local sin zona horaria
  const toLocalDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  // Filtrar eventos basados en la fecha seleccionada
  const filteredEvents = events.filter((event) =>
    event.schedules.some((schedule) => {
      const eventDate = toLocalDate(schedule.date);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    })
  );

  // Estadísticas de los diferentes tipos de datos
  const [statistics, setStatistics] = useState({
    totalEvents: events.length,
    totalProtocols: protocols.length,
    totalLogistics: logistics.length,
    totalAdvertisements: advertisements.length,
  });

  // Manejar cambio de fecha en el calendario
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      <div className="ml-64 mr-4 mt-4 p-4 w-full">
        <motion.h1
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mis Formularios
        </motion.h1>

        {/* Sección de estadísticas generales */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Estadísticas Generales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m0 0a3 3 0 013 3H5a3 3 0 013-3zm0 4a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V10a3 3 0 00-3-3H8zm13 13h-1a2 2 0 01-2-2V9a2 2 0 012-2h1m-6 0h6"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Total de Eventos</h3>
                <p className="text-white">{statistics.totalEvents}</p>
              </div>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0v5m0-5l-7-8h-2l-2 4H7l-5-4m5 4v-4h.01M13 17v-4m0 0h-1m1 0V9m0-4V5m-2 2V5a3 3 0 00-6 0v3a3 3 0 006 0V7zm0 0v3m0 0h1.01M5 12h1.01"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Protocolos</h3>
                <p className="text-white">{statistics.totalProtocols}</p>
              </div>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9v4.588c0 .379-.214.725-.552.895l-4.896 2.449A1 1 0 0110 16V8a1 1 0 01.552-.895l4.896-2.449A1 1 0 0117 5.412V10m4-7h-4M7 7H3M7 3H3m4 4v4M3 17h4m0 4H3m4 0V7m0 4v4m4 0h8a2 2 0 002-2v-2a2 2 0 00-2-2h-1m0 0V7m0 4V5a2 2 0 012-2h1"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Logística</h3>
                <p className="text-white">{statistics.totalLogistics}</p>
              </div>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-3-3v6m9-4a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Piezas Publicitarias</h3>
                <p className="text-white">{statistics.totalAdvertisements}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sección de Calendario */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Calendario de Eventos
          </motion.h2>
          <div className="mb-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const eventDay = events.some((event) =>
                    event.schedules.some((schedule) => {
                      const scheduleDate = new Date(schedule.date);
                      return (
                        date.getFullYear() === scheduleDate.getFullYear() &&
                        date.getMonth() === scheduleDate.getMonth() &&
                        date.getDate() === scheduleDate.getDate()
                      );
                    })
                  );
                  return eventDay ? (
                    <div className="bg-blue-600 rounded-full h-6 w-6"></div>
                  ) : null;
                }
              }}
            />
          </div>
          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Eventos del {selectedDate.toLocaleDateString()}
          </motion.h2>
          {filteredEvents.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="font-bold text-lg text-gray-600">
                No hay eventos para esta fecha.
              </h1>
            </motion.div>
          )}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {filteredEvents.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
