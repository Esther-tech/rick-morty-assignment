import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CharactersPage from "./pages/CharactersPage";
import LocationsPage from "./pages/LocationsPage";
import EpisodesPage from "./pages/EpisodesPage";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">Characters</Link>
          <Link to="/locations">Locations</Link>
          <Link to="/episodes">Episodes</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
        </Routes>
      </main>

      <footer>© 2025 Dharma Assignment</footer>
    </BrowserRouter>
  );
}

export default App;
