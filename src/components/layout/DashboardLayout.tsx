
import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Add transition class after initial load to enable smooth dark mode transitions
    setTimeout(() => {
      document.body.classList.add('transition-colors', 'duration-300');
    }, 300);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  return (
    <div className={cn(
      "flex h-screen bg-background overflow-hidden transition-colors duration-300",
      "dark:bg-gradient-to-br dark:from-background dark:to-background/95"
    )}>
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <DashboardSidebar 
          collapsed={isSidebarCollapsed} 
          toggleCollapse={toggleSidebar} 
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader>
          <button
            onClick={toggleDarkMode}
            className="ml-auto p-2 rounded-full hover:bg-muted transition-colors focus:outline-none focus-ring"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </DashboardHeader>
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
          <div className="max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
