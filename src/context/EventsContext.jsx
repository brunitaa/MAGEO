import { createContext, useContext, useState } from "react";
import {
  createEventRequest,
  deleteEventsRequest,
  getEventRequest,
  getEventsRequest,
  updateEventsRequest,
  acceptEventsRequest,
  rejectEventsRequest,
  getMyEventsRequest,
} from "../api/events";

const EventContext = createContext();

export const useEventRequest = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents must be used within a TaskProvider");
  return context;
};

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      // Fetch tasks from the API
      const res = await getEventsRequest();

      const fetchedEvents = res.data.data;
      console.log(res.data.data);

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const getMyEvents = async () => {
    try {
      // Fetch tasks from the API
      const res = await getMyEventsRequest();

      const fetchedEvents = res.data.data;
      console.log(res.data.data);

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const deleteEvent = async (id) => {
    try {
      const res = await deleteEventsRequest(id);
      if (res.status === 204)
        setEvent(events.filter((event) => event._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (event) => {
    try {
      const res = await createEventRequest(event);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEvent = async (id) => {
    try {
      const res = await getEventRequest(id);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEvent = async (id, event) => {
    try {
      await updateEventsRequest(id, event);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptEvent = async (id, event) => {
    try {
      await acceptEventsRequest(id, event);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectEvent = async (id, event) => {
    try {
      await rejectEventsRequest(id, event);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        getEvent,
        deleteEvent,
        createEvent,
        getEvents,
        updateEvent,
        acceptEvent,
        rejectEvent,
        getMyEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
