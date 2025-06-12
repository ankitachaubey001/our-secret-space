import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-rose-600 mb-4 text-center">Welcome back, Lovebirds 💞</h1>
      <p className="text-gray-600 mb-8 text-center italic">
        “Love is made of moments, not milestones.”
      </p>

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <p className="text-lg text-gray-700">❤️ Total Memories: <strong>12</strong></p>
          <p className="text-lg text-gray-700">📅 Last Added: <strong>June 9, 2025</strong></p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            to="/memories"
            className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-full font-semibold transition"
          >
            ✨ View Memory Wall
          </Link>
         <Link
  to="/memories?add=true"
  className="border border-rose-400 text-rose-500 hover:bg-rose-100 py-2 px-4 rounded-full font-semibold transition"
>
  📸 Add New Memory
</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
