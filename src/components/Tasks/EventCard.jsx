import { useAuth } from "../../context/AuthContext";
import { useEventRequest } from "../../context/EventsContext";
import { Button, ButtonLink } from "../ui";
import { motion } from "framer-motion";

export function EventCard({ event }) {
  const { deleteEvent } = useEventRequest();
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteEvent(event._id);
      window.location.reload();
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  return (
    <motion.div
      className=" mx-auto my-4 rounded-lg shadow-lg overflow-hidden event-card-container"
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
        <p className="text-gray-700 mb-4">Estado: {event.state}</p>
        {event.schedules.map((schedule, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-700">
              Fecha: {new Date(schedule.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              Hora: {new Date(schedule.time).toLocaleTimeString()}
            </p>
            <p className="text-gray-700">Lugar: {schedule.place}</p>
            <p className="text-gray-700">Formato: {schedule.format}</p>
            <p className="text-gray-700">
              Tipo de evento: {schedule.event_type}
            </p>
          </div>
        ))}
        <p className="text-gray-700 mb-4">
          Fecha de solicitud:{" "}
          {new Date(event.request_date).toLocaleDateString()}
        </p>

        <div className="flex justify-end space-x-4 mt-4">
          <Button
            className="bg-univalleColorOne hover:bg-univalleColorOne text-white"
            onClick={handleDelete}
          >
            Delete
          </Button>
          {isAdmin && (
            <ButtonLink to={`/admin/event/${event._id}`} className="...">
              View
            </ButtonLink>
          )}
          {!isAdmin && (
            <ButtonLink to={`/user/event/${event._id}`} className="...">
              Edit
            </ButtonLink>
          )}
        </div>
      </div>
    </motion.div>
  );
}
