// App.tsx
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useAutoLock } from "./hooks/useAutoLock";
import AccessPage from "./pages/AccessPage";
import CreateLetter from "./pages/CreateLetter";
import Home from "./pages/Home";
import LetterDetail from "./pages/LetterDetail";
import LetterList from "./pages/LetterList";
import Login from "./pages/Login";
import MemoryDetail from "./pages/MemoryDetail";
import MemoryWall from "./pages/MemoryWall";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";
import SpecialDays from "./pages/SpecialDays";
import ToDoPage from "./pages/ToDoPage";

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
            {/* <Route path="/voicenotes" element={<VoiceNotes />} /> */}
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
