import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import mainLogo from "@assets/icons/main_logo.svg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="w-full bg-csc-maroon-bg py-6 fixed top-0 left-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={mainLogo}
              alt="CS Careers @ VT Logo"
              className="h-16 w-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-neutral-50 text-2xl font-semibold tracking-wider">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-gray-300 transition">About Us</Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-gray-300 transition">Events</Link>
          </li>
          <li>
            <Link to="/photo-gallery" className="hover:text-gray-300 transition">Photo Gallery</Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col items-center space-y-4 mt-4 md:hidden text-neutral-50 text-xl font-semibold tracking-wider bg-csc-maroon-bg">
          <li><Link to="/" onClick={closeMenu} className="hover:text-gray-300 transition">Home</Link></li>
          <li><Link to="/about-us" onClick={closeMenu} className="hover:text-gray-300 transition">About Us</Link></li>
          <li><Link to="/events" onClick={closeMenu} className="hover:text-gray-300 transition">Events</Link></li>
          <li><Link to="/photo-gallery" onClick={closeMenu} className="hover:text-gray-300 transition">Photo Gallery</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
