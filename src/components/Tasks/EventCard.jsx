import { useAuth } from "../../context/AuthContext";
import { useEventRequest } from "../../context/EventsContext";
import { Button, ButtonLink, Card } from "../ui";
import { motion } from "framer-motion";

export function EventCard({ event }) {
  const { deleteEvent } = useEventRequest();
  const isAdmin = useAuth();

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
      className="max-w-md mx-auto my-4 p-4 rounded-lg shadow-md bg-gray-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{event.event_name}</h2>
      </header>
      <p className="text-gray-600 my-2">{event.event_description}</p>
      <p className="text-gray-600 my-2">Observaciones: {event.observations}</p>
      <p className="text-gray-600 my-2">Estado: {event.state}</p>
      <p className="text-gray-600 my-2">
        {event.request_date &&
          new Date(event.request_date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>

      <div className="flex justify-end mt-4 space-x-2">
        <Button className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
          Delete
        </Button>
        {isAdmin ? (
          <ButtonLink
            to={`/admin/event/${event._id}`}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Edit
          </ButtonLink>
        ) : (
          <ButtonLink
            to={`/user/event/${event._id}`}
            className="bg-green-500 hover:bg-green-600"
          >
            View
          </ButtonLink>
        )}
      </div>
    </motion.div>
  );
}
