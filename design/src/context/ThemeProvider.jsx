import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { toast } from "react-toastify";

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "darkMode"
        );

      return saved
        ? JSON.parse(saved)
        : false;
    });

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    document.body.className =
      darkMode ? "dark" : "";
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(
      (prev) => !prev
    );
    toast.success("MODE changed!!!");
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;