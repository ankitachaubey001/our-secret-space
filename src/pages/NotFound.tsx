import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-rose-600 mb-4">404</h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you're looking for doesn't exist 💔
      </p>
      <Link
        to="/home"
        className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
      >
        🏠 Back to Home
      </Link>
    </div>
  );
}
