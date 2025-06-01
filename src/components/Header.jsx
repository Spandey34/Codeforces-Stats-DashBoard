import { Moon, Sun } from 'lucide-react';

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md mb-8 transition-all duration-300">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mx-auto">
        Codeforces Stats Dashboard
      </h1>
      
      <button
        onClick={toggleDarkMode}
        className="absolute right-6 top-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
      </button>
    </header>
  );
}
