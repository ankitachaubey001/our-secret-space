import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const NavLinks = () => (
    <>
      <Link to="/home" className="block text-gray-700 hover:text-rose-500 py-2">
        Home
      </Link>
      <Link to="/memories" className="block text-gray-700 hover:text-rose-500 py-2">
        Memory Wall
      </Link>
      <Link to="/letters" className="block text-gray-700 hover:text-rose-500 py-2">
        Letters
      </Link>
      <Link to="/voicenotes" className="block text-gray-700 hover:text-rose-500 py-2">
        Voice Notes
      </Link>
      <Link to="/specialdays" className="block text-gray-700 hover:text-rose-500 py-2">
        Special Days
      </Link>
      <Link to="/todo" className="block text-gray-700 hover:text-rose-500 py-2">
        To-Do
      </Link>
       <Link
            to="/settings"
            className="text-gray-600 hover:text-rose-500 font-medium transition"
          >
            Settings
          </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-rose-600">Our Secret Space 💖</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
       <button onClick={toggleDrawer} className="md:hidden text-rose-600">
  {isOpen ? "✖️" : "☰"}
</button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 rounded-xl px-6 py-4 space-y-2 animate-slide-down">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}
