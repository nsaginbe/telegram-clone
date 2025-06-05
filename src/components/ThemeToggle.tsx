import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

export function ThemeToggle() {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {state.theme === 'light' ? (
        <MoonIcon className="w-5 h-5 text-gray-600" />
      ) : (
        <SunIcon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
} 