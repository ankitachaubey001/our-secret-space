import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MemoryWall from './pages/MemoryWall';
// placeholder home page for now
// const Home = () => <div className="text-center mt-20 text-2xl">🏠 Home</div>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/memories" element={<MemoryWall />} />
    </Routes>
  );
}
