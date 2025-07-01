// App.tsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import MemoryWall from "./pages/MemoryWall";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MemoryDetail from "./pages/MemoryDetail";
import NotFound from "./pages/NotFound";
import LetterList from "./pages/LetterList";
import CreateLetter from "./pages/CreateLetter";
import LetterDetail from "./pages/LetterDetail";
import VoiceNotes from "./pages/VoiceNotes";
import SpecialDays from "./pages/SpecialDays";
import ToDoPage from "./pages/ToDoPage";
import SettingsPage from "./pages/SettingsPage";
import AccessPage from "./pages/AccessPage";
import { useAutoLock } from "./hooks/useAutoLock";

export default function App() {
  const location = useLocation();
  useAutoLock();
  const hideNavbarRoutes = ["/", "/access"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem("secret-access") === "unlocked";
    console.log("App unlocked state:", unlocked);
    setIsUnlocked(unlocked);
  }, [location]);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/access" element={<AccessPage />} />
        
        {isUnlocked ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/memories" element={<MemoryWall />} />
            <Route path="/memory/:id" element={<MemoryDetail />} />
            <Route path="/letters" element={<LetterList />} />
            <Route path="/letters/new" element={<CreateLetter />} />
            <Route path="/letters/:id" element={<LetterDetail />} />
            <Route path="/voicenotes" element={<VoiceNotes />} />
            <Route path="/specialdays" element={<SpecialDays />} />
            <Route path="/todo" element={<ToDoPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/access" replace />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
