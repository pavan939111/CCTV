"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read the current theme class on mount
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-bg-card hover:bg-bg-secondary border border-border-custom text-text-primary transition-all duration-300 active:scale-95"
      aria-label="Toggle visual theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-accent-glow" />
      ) : (
        <Moon className="h-5 w-5 text-accent" />
      )}
    </button>
  );
}
