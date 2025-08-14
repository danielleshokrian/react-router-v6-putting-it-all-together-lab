import { useParams, Outlet, useOutletContext, Link } from "react-router-dom";

export default function DirectorCard() {
  const { directorId } = useParams();
  const { directors, setDirectors } = useOutletContext();

  if (!directors.length) return <h2>Loading directors...</h2>;

  const director = directors.find(d => d.id === directorId);

  if (!director) return <h2>Director not found.</h2>;

  return (
    <div>
      <h2>{director.name}</h2>
      <p>{director.bio}</p>
      <h3>Movies:</h3>
      <ul>
        {director.movies.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="movies/add">Add New Movie</Link>

      <Outlet context={{ director, setDirectors }} />
    </div>
  );
}




