import { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { ThemeToggle } from './components/ThemeToggle';
import { AppProvider, useApp } from './context/AppContext';

function AppContent() {
  const { dispatch } = useApp();

  useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    dispatch({ type: 'SET_THEME', payload: initialTheme });
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Telegram Clone
        </h1>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <Sidebar />
        <ChatWindow />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
