import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function MovieForm() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [genres, setGenres] = useState("");

  const navigate = useNavigate();
  const { director, setDirectors } = useOutletContext();

  if (!director) return <h2>Director not found.</h2>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      id: uuidv4(),
      title,
      time: parseInt(time),
      genres: genres.split(",").map(g => g.trim()),
    };

    // Update backend
    fetch(`http://localhost:4000/directors/${director.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movies: [...director.movies, newMovie] }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add movie");
        return res.json();
      })
      .then(updatedDirector => {
        // Update context
        setDirectors(prev =>
          prev.map(d => (d.id === updatedDirector.id ? updatedDirector : d))
        );

        // Navigate to the newly created movie's detail page
        navigate(`/directors/${director.id}/movies/${newMovie.id}`);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Add New Movie for {director.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={e => setGenres(e.target.value)}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}




