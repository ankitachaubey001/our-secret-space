// hooks/useAutoLock.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

export function useAutoLock() {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem("secret-access");
        navigate("/access");
      }, INACTIVITY_LIMIT);
    };

    const events = ["mousemove", "mousedown", "click", "keydown", "scroll"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // initialize on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeout);
    };
  }, [navigate]);
}
