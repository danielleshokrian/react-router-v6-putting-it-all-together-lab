import { Link, useOutletContext } from "react-router-dom";

export default function DirectorList() {
  const { directors } = useOutletContext();

  return (
    <ul>
      {directors.map(d => (
        <li key={d.id}>
          <Link to={`/directors/${d.id}`}>{d.name}</Link>
        </li>
      ))}
    </ul>
  );
}



