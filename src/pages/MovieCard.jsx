import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function MovieCard() {
  const { directorId, movieId } = useParams();
  const { directors } = useOutletContext();

  const director = directors?.find(d => d.id === directorId);
  if (!director) return <h2>Director not found.</h2>;

  const movie = director.movies.find(m => m.id === movieId);
  if (!movie) return <h2>Movie not found.</h2>; 

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Duration: {movie.time} minutes</p>
      <p>Genres: {movie.genres.join(", ")}</p>
    </div>
  );
}


