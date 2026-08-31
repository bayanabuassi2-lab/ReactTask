import { useEffect, useState } from "react";

import {
  db,
  collection,
  getDocs,
} from "../../Services/firebase";

import Event from "./Event/Event";

import "./EventPage.css";

function EventsPage({ onEdit }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const eventsData = await getDocs(
        collection(db, "events")
      );

      const loadedEvents = [];

      eventsData.forEach((docItem) => {
        loadedEvents.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setEvents(loadedEvents);
    }

    fetchEvents();
  }, []);

  return (
    <section>
      <div className="cards">
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  );
}

export default EventsPage;