import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => setIsOpen(!isOpen);

  const navItems = [
    { path: "/home", label: "Home" },
    { path: "/memories", label: "Memory Wall" },
    { path: "/letters", label: "Letters" },
    // { path: "/voicenotes", label: "Voice Notes" },
    { path: "/specialdays", label: "Special Days" },
    { path: "/todo", label: "To-Do" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("secret-access");
    window.location.href = "/access";
  };

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block py-2 text-lg font-medium transition duration-300 ${
            location.pathname === item.path
              ? "text-rose-600 underline"
              : "text-gray-700 hover:text-rose-500 hover:underline"
          }`}
          onClick={() => setIsOpen(false)} 
        >
          {item.label}
        </Link>
      ))}

      <button
        onClick={handleLogout}
        className="block py-2 text-lg font-medium text-gray-700 hover:text-rose-500 hover:underline cursor-pointer"
      >
        🚪 Logout
      </button>
    </>
  );

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-rose-600 flex items-center gap-2">
          Our Secret Space <span className="animate-bounce">💖</span>
        </h1>

        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        <button
          onClick={toggleDrawer}
          className="md:hidden text-rose-600 p-2 rounded-full border border-rose-600 hover:bg-rose-50 transition cursor-pointer"
        >
          {isOpen ? "✖️" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 rounded-xl px-6 py-4 space-y-2 animate-slide-down">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}
