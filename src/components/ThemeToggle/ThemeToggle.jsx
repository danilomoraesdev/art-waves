import { useState, useEffect } from "react";
import { CgSun, CgMoon } from "react-icons/cg";
import "./ThemeToggle.css";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={handleToggleTheme}
      aria-label={isDark ? "Light Mode" : "Dark Mode"}
      title={isDark ? "Light Mode" : "Dark Mode"}
    >
      {isDark ? <CgSun /> : <CgMoon />}
    </button>
  );
}; 