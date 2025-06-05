import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get("https://python-notes-app-backend.onrender.com/notes").then((res) => setNotes(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://python-notes-app-backend.onrender.com/notes", form);
    setNotes([...notes, res.data]);
    setForm({ title: "", content: "" });
  };

  return (
    <div>
      <h2>My Notes</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}><strong>{note.title}</strong>: {note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
