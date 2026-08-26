import { useEffect, useState } from "react";

import { db, collection, getDocs } from "../firebase";

function EventsPage({ onEdit }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const eventsData = await getDocs(collection(db, "events"));

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
        {events.map((event) => {
          const date = event.date.toDate();

          const currentDate = new Date();

          let dateClass = "";

          if (date.toDateString() === currentDate.toDateString()) {
            dateClass = "today";
          } else if (date < currentDate) {
            dateClass = "past";
          } else {
            dateClass = "future";
          }

          return (
            <div
              className={`card ${dateClass}`}
              key={event.id}
              onClick={() => onEdit(event.id)}
            >
              <h3>{event.name}</h3>

              <p>{date.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EventsPage;
