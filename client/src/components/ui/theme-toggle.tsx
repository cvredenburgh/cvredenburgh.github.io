import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./button";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return 'light';
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400"
    >
      {theme === 'light' ? (
        <>
          <Moon className="h-4 w-4" />
          <span className="text-sm font-medium">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          <span className="text-sm font-medium">Light Mode</span>
        </>
      )}
    </Button>
  );
}
