import { useEffect, useState } from "react";
import { useEventRequest } from "../../context/EventsContext";
import { EventCard } from "../../components/Tasks/EventCard";
import Sidebar from "../../components/SideBar";
import { AdvertisementCard } from "../../components/Tasks/AdvertisementCard";
import { ProtocolCard } from "../../components/Tasks/ProtocolCard";
import { LogisticCard } from "../../components/Tasks/LogisticCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import { useprotocolRequest } from "../../context/ProtocolContext";
import { useLogisticRequest } from "../../context/LogisticContext";
import { useAuth } from "../../context/AuthContext";
import EventList from "../../components/Lists/EventList";

export function Formularios() {
  const { events, getEvents } = useEventRequest([]);
  const { advertisements, getAdvertisements } = useAdvertisingRequest([]);
  const { protocols, getProtocols } = useprotocolRequest([]);
  const { logistics, getLogistics } = useLogisticRequest([]);
  const isAdmin = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getEvents();
    getAdvertisements();
    getProtocols();
    getLogistics();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex bg-red-100">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-grow p-5  transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <motion.h1
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mis Formularios
        </motion.h1>

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
            Eventos
          </motion.h2>
          {events.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="font-bold text-lg text-gray-600">
                No hay eventos aún. ¡Añade uno nuevo!
              </h1>
            </motion.div>
          )}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {events.map((event) => (
              <EventList event={event} key={event._id} />
            ))}
          </motion.div>
        </motion.section>

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
            Protocolos
          </motion.h2>
          {protocols.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="font-bold text-lg text-gray-600">
                No hay formularios de protocolo aún. ¡Añade uno nuevo!
              </h1>
            </motion.div>
          )}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {protocols.map((protocol) => (
              <ProtocolCard protocol={protocol} key={protocol._id} />
            ))}
          </motion.div>
        </motion.section>

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
            Logística
          </motion.h2>
          {logistics.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="font-bold text-lg text-gray-600">
                No hay formularios de logística aún. ¡Añade uno nuevo!
              </h1>
            </motion.div>
          )}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {logistics.map((logistic) => (
              <LogisticCard
                logistic={logistic}
                isAdmin={isAdmin}
                key={logistic._id}
              />
            ))}
          </motion.div>
        </motion.section>

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
            Piezas Publicitarias
          </motion.h2>
          {advertisements.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="font-bold text-lg text-gray-600">
                No hay piezas publicitarias aún. ¡Añade una nueva!
              </h1>
            </motion.div>
          )}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {advertisements.map((advertisement) => (
              <AdvertisementCard
                advertisement={advertisement}
                key={advertisement._id}
              />
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
