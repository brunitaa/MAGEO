import React, { useEffect, useState } from "react";
import { EventCard } from "../Tasks/EventCard";
import { useEventRequest } from "../../context/EventsContext";

const EventList = ({ events }) => {
  const { deleteEvent } = useEventRequest();
  const [updatedEvents, setUpdatedEvents] = useState([]);

  useEffect(() => {
    if (events) {
      setUpdatedEvents(events);
    }
  }, [events]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      const updatedEventList = updatedEvents.filter(
        (event) => event._id !== eventId
      );
      setUpdatedEvents(updatedEventList);
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  return (
    <div>
      {updatedEvents &&
        updatedEvents.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onDelete={handleDeleteEvent}
          />
        ))}
    </div>
  );
};

export default EventList;
