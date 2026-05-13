"use client";
import { createContext, useContext, useEffect } from "react";

type Theme = "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hard-lock to dark mode — remove any previously saved light preference
    document.documentElement.classList.remove("light");
    localStorage.removeItem("pf-theme");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}
