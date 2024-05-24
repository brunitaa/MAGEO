import { useEffect } from "react";
import { useEventRequest } from "../context/EventsContext";
import { EventCard } from "../components/Tasks/EventCard";
import Sidebar from "../components/SideBar";
import { useAdvertisingRequest } from "../context/AdvertisementContext";
import { AdvertisementCard } from "../components/Tasks/AdvertisementCard";
import Protocol from "./Protocol";
import { useprotocolRequest } from "../context/ProtocolContext";
import { ProtocolCard } from "../components/Tasks/ProtocolCard";
import { LogisticCard } from "../components/Tasks/LogisticCard";
import { useLogisticRequest } from "../context/LogisticContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function HomePage2() {
  const { events, getMyEvents } = useEventRequest([]);

  const { advertisements, getMyAdvertisements } = useAdvertisingRequest([]);
  const { protocols, getMyProtocols } = useprotocolRequest([]);
  const { logistics, getMyLogistics } = useLogisticRequest([]);
  const isAdmin = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMyEvents();
    getMyAdvertisements();
    getMyProtocols();
    getMyLogistics();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-4">
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mis Formularios
        </motion.h1>
        <section className="mt-8">
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Eventos
          </motion.h2>
          {events.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <h1 className="font-bold text-xl">
                  No hay eventos aún, por favor añade uno nuevo.
                </h1>
              </div>
            </motion.div>
          )}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {events.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </motion.div>
        </section>
        <section className="mt-8">
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Protocolos
          </motion.h2>
          {protocols.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <h1 className="font-bold text-xl">
                  No hay formularios de protocolo aún, por favor añade uno
                  nuevo.
                </h1>
              </div>
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
        </section>

        <section className="mt-8">
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Logística
          </motion.h2>
          {logistics.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <h1 className="font-bold text-xl">
                  No hay formularios de logistica aún, por favor añade uno
                  nuevo.
                </h1>
              </div>
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
        </section>

        <section className="mt-8">
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Piezas
          </motion.h2>
          {advertisements.length === 0 && (
            <motion.div
              className="flex justify-center items-center p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <h1 className="font-bold text-xl">
                  No hay piezas publicitarias aún, por favor añade uno nuevo.
                </h1>
              </div>
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
        </section>
      </div>
    </div>
  );
}
