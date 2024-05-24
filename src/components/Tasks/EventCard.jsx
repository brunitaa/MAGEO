import { useAuth } from "../../context/AuthContext";
import { useEventRequest } from "../../context/EventsContext";
import { Button, ButtonLink, Card } from "../ui";

export function EventCard({ event }) {
  const { deleteEvent } = useEventRequest();
  const isAdmin = useAuth();
  const handleDelete = async () => {
    try {
      await deleteEvent(event._id); // Llama a la función para eliminar el evento
      window.location.reload(); // Recarga la página después de eliminar
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{event.event_name}</h2>
      </header>
      <p className="text-slate-600">{event.event_description}</p>
      <p className="text-slate-600">Observaciones:{event.observations}</p>
      <p className="text-slate-600">Estado:{event.state}</p>
      {/* format date */}
      <p>
        {event.request_date &&
          new Date(event.request_date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <br />
      <div className="flex gap-x-2 items-center">
        <Button onClick={handleDelete}>Delete</Button>
        {isAdmin ? (
          <ButtonLink to={`/admin/event/${event._id}`}>Edit</ButtonLink>
        ) : (
          <ButtonLink to={`/user/event/${event._id}`}>View</ButtonLink>
        )}
      </div>
    </Card>
  );
}
