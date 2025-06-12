// App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import MemoryWall from './pages/MemoryWall';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MemoryDetail from './pages/MemoryDetail';
import NotFound from './pages/NotFound';
import LetterList from './pages/LetterList';
import CreateLetter from './pages/CreateLetter';
import LetterDetail from './pages/LetterDetail';
import VoiceNotes from './pages/VoiceNotes';

export default function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/memories" element={<MemoryWall />} />
  <Route path="/memory/:id" element={<MemoryDetail />} />
  <Route path="*" element={<NotFound />} />
  <Route path="/letters" element={<LetterList />} />
<Route path="/letters/new" element={<CreateLetter />} />
<Route path="/letters/:id" element={<LetterDetail />} />
<Route path="/voicenotes" element={<VoiceNotes />} />



      </Routes>
    </>
  );
}

