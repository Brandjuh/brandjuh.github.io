import React from 'react';

interface Props {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}

const Header: React.FC<Props> = ({ darkMode, setDarkMode }) => (
  <header className="flex justify-between items-center">
    <h1 className="text-xl font-bold">VOP Tracker</h1>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  </header>
);

export default Header;
