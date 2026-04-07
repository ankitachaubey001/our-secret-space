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
    { path: "/specialdays", label: "Special Days" },
    { path: "/todo", label: "To-Do" },
    { path: "/settings", label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("secret-access");
    window.location.href = "/";
  };

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block py-2 text-sm font-semibold transition ${
            location.pathname === item.path
              ? "text-rose-700"
              : "text-slate-600 hover:text-rose-600"
          }`}
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}

      <button
        onClick={handleLogout}
        className="block py-2 text-sm font-semibold text-slate-600 hover:text-rose-600 cursor-pointer"
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-300 shadow-lg shadow-rose-200/60" />
          <div>
            <p className="text-xl font-display text-rose-800 leading-none">
              Our Secret Space
            </p>
            <p className="text-xs text-slate-500">A private archive of your story</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>

        <button
          onClick={toggleDrawer}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6">
          <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-rose-100 shadow-lg px-5 py-4 space-y-2">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
}
