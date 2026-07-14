import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import clubLogo from "@assets/icons/club_logo.png";
import { handleButtonNav } from "../../../button_nav";

const links = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About Us" },
  { to: "/events", label: "Events" },
  { to: "/photo-gallery", label: "Photo Gallery" },
  { to: "/coffee-chats", label: "Coffee Chats" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/">
          <img src={clubLogo} alt="" className="brand__logo" />
          <span className="brand__name">CS Careers</span>
        </NavLink>

        <nav className="nav" aria-label="Primary">
          <ul className="nav__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? "is-active" : "")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a href="#" className="btn btn--ghost btn--sm">Log in</a>
          <button
            className="btn btn--primary btn--sm"
            onClick={() => handleButtonNav({ type: "internal", path: "/#follow" }, navigate)}
          >
            Get Involved
          </button>
        </div>

        <button
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {isOpen && (
        <nav className="mobile-menu" aria-label="Primary mobile">
          <ul className="mobile-menu__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? "is-active" : "")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="btn btn--primary mobile-menu__cta"
            onClick={() => { closeMenu(); handleButtonNav({ type: "internal", path: "/#follow" }, navigate); }}
          >
            Get Involved
          </button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
