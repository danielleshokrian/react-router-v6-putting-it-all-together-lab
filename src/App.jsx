import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import DirectorContainer from "./pages/DirectorContainer";
import DirectorList from "./pages/DirectorList";
import DirectorForm from "./pages/DirectorForm";
import DirectorCard from "./pages/DirectorCard";
import MovieForm from "./pages/MovieForm";
import MovieCard from "./pages/MovieCard";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        
        <Route path="/directors" element={<DirectorContainer />}>
            <Route index element={<DirectorList />} />
            <Route path="new" element={<DirectorForm />} />
            <Route path=":directorId" element={<DirectorCard />}>
                <Route path="movies/add" element={<MovieForm />} />              {/* Add movie */}
                <Route path="movies/:movieId" element={<MovieCard />} />         {/* Movie detail */}
            </Route>
        </Route>

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
