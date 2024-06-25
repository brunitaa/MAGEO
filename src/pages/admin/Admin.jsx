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
import {
  FaCalendarAlt,
  FaClipboardList,
  FaTruck,
  FaBullhorn,
  FaUsers,
  FaMoneyBillAlt,
} from "react-icons/fa";

export function AdminHomePage() {
  const { events, getEvents } = useEventRequest([]);
  const { advertisements, getAdvertisements } = useAdvertisingRequest([]);
  const { protocols, getProtocols } = useprotocolRequest([]);
  const { logistics, getLogistics } = useLogisticRequest([]);
  const { isAdmin } = useAuth([]);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    <div className="flex bg-red-100">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-grow p-10  transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <motion.h1
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Panel de Administración
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
                <FaCalendarAlt className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Total de Eventos</h3>
                <p className="text-white">{statistics.totalEvents}</p>
              </div>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <FaClipboardList className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Protocolos</h3>
                <p className="text-white">{statistics.totalProtocols}</p>
              </div>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <FaTruck className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Logística</h3>
                <p className="text-white">{statistics.totalLogistics}</p>
              </div>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <FaBullhorn className="w-12 h-12 text-white" />
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
                    <div className="bg-univalleColorOne rounded-full h-6 w-6"></div>
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

        {/* Sección de Anuncios */}
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
            Últimos Anuncios
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {advertisements.slice(0, 6).map((ad) => (
              <AdvertisementCard key={ad._id} advertisement={ad} />
            ))}
          </motion.div>
        </motion.section>

        {/* Sección de Protocolos y Logística */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div>
              <motion.h2
                className="text-2xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Últimos Protocolos
              </motion.h2>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {protocols.slice(0, 3).map((protocol) => (
                  <ProtocolCard key={protocol._id} protocol={protocol} />
                ))}
              </motion.div>
            </motion.div>
            <motion.div>
              <motion.h2
                className="text-2xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Última Logística
              </motion.h2>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {logistics.slice(0, 3).map((logistic) => (
                  <LogisticCard key={logistic._id} logistic={logistic} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
