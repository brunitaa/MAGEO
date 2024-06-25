import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useEventRequest } from "../../context/EventsContext";
import { Button, ButtonLink } from "../ui";

// Función para traducir el estado
function translateState(state) {
  switch (state) {
    case "Pending":
      return "Pendiente";
    case "Accept":
      return "Aceptado";
    case "Reject":
      return "Rechazado";
    default:
      return state;
  }
}

// Función para traducir el formato
function translateFormat(format) {
  switch (format) {
    case "In person":
      return "Presencial";
    case "Virtual":
      return "Virtual";
    default:
      return format;
  }
}

// Función para traducir el tipo de evento
function translateEventType(eventType) {
  switch (eventType) {
    case "Talks":
      return "Charlas";
    case "Contest":
      return "Concurso";
    case "Seminar":
      return "Seminario";
    case "Symposium":
      return "Simposio";
    case "Workshop":
      return "Taller";
    case "Conference":
      return "Conferencia";
    case "Fair":
      return "Feria";
    case "Signing of Agreement":
      return "Firma de Acuerdo";
    case "Inauguration":
      return "Inauguración";
    case "Exhibition":
      return "Exposición";
    case "Cultural Activity":
      return "Actividad Cultural";
    case "Others":
      return "Otros";
    default:
      return eventType;
  }
}

export function EventCard({ event, onDelete }) {
  const { deleteEvent } = useEventRequest();
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteEvent(event._id);
      onDelete(event._id); // Llama a la función onDelete para actualizar el estado local
    } catch (error) {
      console.log("Error eliminando evento:", error);
    }
  };

  return (
    <motion.div
      className="mx-auto my-4 rounded-lg shadow-lg overflow-hidden event-card-container"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <img
          src={
            event.image_url || "https://cladera.org/foda/images/subcat-2152.jpg"
          }
          alt="Event Image"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-white z-10 mt-4 px-4">
            {event.event_name}
          </h2>
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-gray-700 mb-4">{event.event_description}</p>
        <p className="text-gray-700 mb-4">
          Observaciones: {event.observations}
        </p>
        <p className="text-gray-700 mb-4">
          Estado: {translateState(event.state)}
        </p>
        {event.schedules.map((schedule, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-700">
              Fecha: {new Date(schedule.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              Hora: {new Date(schedule.start_time).toLocaleTimeString()} -{" "}
              {new Date(schedule.end_time).toLocaleTimeString()}
            </p>
            <p className="text-gray-700">Lugar: {schedule.place}</p>
            <p className="text-gray-700">
              Formato: {translateFormat(schedule.format)}
            </p>
            <p className="text-gray-700">
              Tipo de evento: {translateEventType(schedule.event_type)}
            </p>
          </div>
        ))}
        <p className="text-gray-700 mb-4">
          Fecha de solicitud:{" "}
          {new Date(event.request_date).toLocaleDateString()}
        </p>

        <div className="flex justify-end space-x-4 mt-4">
          {isAdmin && (
            <ButtonLink to={`/admin/event/${event._id}`} className="...">
              Ver
            </ButtonLink>
          )}
          {!isAdmin && (
            <ButtonLink to={`/user/event/${event._id}`} className="...">
              Editar
            </ButtonLink>
          )}
        </div>
      </div>
    </motion.div>
  );
}
