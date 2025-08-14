import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>🎬 Welcome to the Movie Directory 🎥</h1>
      <p>Explore famous directors and their movies!</p>
      <nav>
        <Link to="/directors">View Directors</Link> |{" "}
        <Link to="/about">Learn More About This App</Link>
      </nav>
    </main>
  );
}

export default Home;

