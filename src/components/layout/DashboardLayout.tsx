
import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  
  useEffect(() => {
    // Add dark mode by default
    document.documentElement.classList.add('dark');
    
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
      "flex h-screen overflow-hidden transition-all duration-300",
      "bg-gradient-to-br from-zinc-950 to-black"
    )}>
      <motion.div 
        layout
        initial={{ width: isSidebarCollapsed ? "5rem" : "16rem" }}
        animate={{ width: isSidebarCollapsed ? "5rem" : "16rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="transition-all duration-300 ease-in-out"
      >
        <DashboardSidebar 
          collapsed={isSidebarCollapsed} 
          toggleCollapse={toggleSidebar} 
        />
      </motion.div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="ml-auto p-2 rounded-full hover:bg-zinc-800 transition-colors focus:outline-none focus-ring"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5 text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5 text-slate-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </DashboardHeader>
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
