import { useEffect, useMemo, useState } from "react";

import {
  db,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "../../Services/firebase";

import "./FormPage.css";

function FormPage({ editId, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const isEditing = !!editId;

  const eventData = useMemo(() => {
    return {
      name: formData.name,
      description: formData.description,
      date: new Date(formData.date),
    };
  }, [formData]);

  useEffect(() => {
    async function loadEvent() {
      if (!editId) {
        return;
      }

      const eventRef = doc(db, "events", editId);

      const eventSnapshot = await getDoc(eventRef);

      if (eventSnapshot.exists()) {
        const data = eventSnapshot.data();

        let formattedDate = "";

        if (data.date) {
          const eventDate = data.date.toDate();

          const localDate = new Date(
            eventDate.getTime() -
              eventDate.getTimezoneOffset() * 60000
          );

          formattedDate = localDate.toISOString().slice(0, 16);
        }

        setFormData({
          name: data.name || "",
          description: data.description || "",
          date: formattedDate,
        });
      }
    }

    loadEvent();
  }, [editId]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (editId) {
      const eventRef = doc(db, "events", editId);

      await updateDoc(eventRef, eventData);
    } else {
      await addDoc(
        collection(db, "events"),
        eventData
      );
    }

    onCancel();
  }

  function handleCancel() {
    setFormData({
      name: "",
      description: "",
      date: "",
    });

    onCancel();
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            rows="6"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="buttons">
          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button type="submit">
            {isEditing ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormPage;