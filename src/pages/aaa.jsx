import { useEffect } from "react";
import { useEventRequest } from "../context/EventsContext";

import Sidebar from "../components/SideBar";
import { EventCard } from "../components/Tasks/EventCard";

export function TasksPage() {
  const { events, getEvents } = useEventRequest([]);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      {events.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {events.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
    </div>
  );
}
