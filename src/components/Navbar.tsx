// components/Navbar.tsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-rose-600">Our Secret Space 💖</h1>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-rose-500 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/memories"
            className="text-gray-600 hover:text-rose-500 font-medium transition"
          >
            Memory Wall
          </Link>
        </div>
      </div>
    </nav>
  );
}
