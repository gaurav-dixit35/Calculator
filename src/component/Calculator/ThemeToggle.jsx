import React from "react";

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="text-sm px-3 py-1 rounded 
                 bg-gray-300 hover:bg-gray-400 
                 dark:bg-gray-700 dark:hover:bg-gray-600 
                 text-black dark:text-white"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
