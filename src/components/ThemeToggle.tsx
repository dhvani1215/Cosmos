
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

// This component is kept for backward compatibility
// but it's no longer used in the navbar
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.5rem] w-[1.5rem] text-yellow-400" />
      ) : (
        <Moon className="h-[1.5rem] w-[1.5rem] text-slate-700" />
      )}
    </Button>
  );
};

export default ThemeToggle;
