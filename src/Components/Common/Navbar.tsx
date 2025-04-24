import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-red-500">
          <Link to="/">🎬 Movie Explorer</Link>
        </div>

        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="hover:text-red-400 transition">Home</Link>
          <Link to="/" className="hover:text-red-400 transition">Movies</Link>
          <Link to="/" className="hover:text-red-400 transition">Genres</Link>
          <Link to="/" className="hover:text-red-400 transition">My List</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-sm px-3 py-1 rounded-full pl-8 placeholder-gray-400 focus:outline-none"
            />
            <FaSearch className="absolute top-1.5 left-2.5 text-gray-400 text-sm" />
          </div>

          <FaUserCircle className="text-2xl hover:text-red-400 cursor-pointer pl-2" />

          <div className="md:hidden items-center flex">
            <button onClick={toggleMenu}>
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Link to="/" className="hover:text-red-400" onClick={toggleMenu}>Home</Link>
          <Link to="/" className="hover:text-red-400" onClick={toggleMenu}>Movies</Link>
          <Link to="/" className="hover:text-red-400" onClick={toggleMenu}>Genres</Link>
          <Link to="/" className="hover:text-red-400" onClick={toggleMenu}>My List</Link>
        </div>
      )}
    </nav>
  );
}
export default Navbar;