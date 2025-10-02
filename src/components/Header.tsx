import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../assets/MenuIcon";
import CloseIcon from "../assets/CloseIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <button className="nav-toggle" onClick={toggleMenu}>
          {menuOpen ? (
            <CloseIcon className="icon" />
          ) : (
            <MenuIcon className="icon" />
          )}
        </button>
        <div className="nav-links">
          <Link to="/">Characters</Link>
          <Link to="/locations">Locations</Link>
          <Link to="/episodes">Episodes</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
