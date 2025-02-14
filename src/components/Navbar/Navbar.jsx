import { Link } from "react-router-dom";
import mainLogo from "../../assets/main_logo.svg"

const Navbar = () => {
  return (
    <nav className="w-full bg-[#861f41] py-6 fixed top-0 left-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8">
        {/* Logo */}
        <div className="w-[86px] h-[66px]">
          <img src={mainLogo} alt="CS Careers @ VT Logo" className="w-full h-full object-contain" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-neutral-50 text-[20px] font-semibold tracking-wider">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
          </li>
          <li>
            <Link to="/news-events" className="hover:text-gray-300 transition">News & Events</Link>
          </li>
          <li>
            <Link to="/sponsorships" className="hover:text-gray-300 transition">Sponsorships</Link>
          </li>
          <li>
            <Link to="/photo-gallery" className="hover:text-gray-300 transition">Photo Gallery</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
