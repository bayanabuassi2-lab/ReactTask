import "./Event.css";

function Event({ event, onEdit }) {
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
      onClick={() => onEdit(event.id)}
    >
      <h3>{event.name}</h3>

      <p>{date.toLocaleString()}</p>
    </div>
  );
}

export default Event;