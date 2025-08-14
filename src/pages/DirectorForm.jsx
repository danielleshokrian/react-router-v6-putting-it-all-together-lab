import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function DirectorForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { directors, setDirectors } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDirector = {
      id: uuidv4(),   // unique ID for frontend
      name,
      bio,
      movies: [],
    };

    // Send to backend
    fetch("http://localhost:4000/directors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDirector),
    })
      .then(r => {
        if (!r.ok) throw new Error("Failed to add director");
        return r.json();
      })
      .then(data => {
        // Update context state
        setDirectors([...directors, data]);

        // Navigate to the new director's page
        navigate(`/directors/${data.id}`);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Add New Director</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Director's Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Director's Bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          required
        />
        <button type="submit">Add Director</button>
      </form>
    </div>
  );
}



