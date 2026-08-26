import { useEffect, useState } from "react";

import { db, collection, addDoc, doc, getDoc, updateDoc } from "../firebase";

function FormPage({ editId, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      if (!editId) {
        return;
      }

      setIsEditing(true);

      const eventRef = doc(db, "events", editId);

      const eventSnapshot = await getDoc(eventRef);

      if (eventSnapshot.exists()) {
        const eventData = eventSnapshot.data();

        setName(eventData.name);

        setDescription(eventData.description);

        if (eventData.date) {
          const eventDate = eventData.date.toDate();

          const localDate = new Date(
            eventDate.getTime() - eventDate.getTimezoneOffset() * 60000,
          );

          setDate(localDate.toISOString().slice(0, 16));
        }
      }
    }

    loadEvent();
  }, [editId]);

  async function handleSubmit(event) {
    event.preventDefault();

    const eventData = {
      name: name,

      description: description,

      date: new Date(date),
    };

    if (editId) {
      const eventRef = doc(db, "events", editId);

      await updateDoc(eventRef, eventData);
    } else {
      await addDoc(collection(db, "events"), eventData);
    }

    onCancel();
  }

  function handleCancel() {
    setName("");
    setDescription("");
    setDate("");

    setIsEditing(false);

    onCancel();
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            rows="6"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="datetime-local"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className="buttons">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>

          <button type="submit">{isEditing ? "Save" : "Add"}</button>
        </div>
      </form>
    </section>
  );
}

export default FormPage;
