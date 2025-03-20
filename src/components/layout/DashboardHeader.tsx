
import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  children?: React.ReactNode;
}

const DashboardHeader = ({ children }: DashboardHeaderProps) => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-800/70 border border-zinc-700/30 text-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {children}
        
        <Button variant="ghost" size="icon" className="relative hover:bg-zinc-800">
          <Bell size={18} className="text-zinc-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-zinc-300">Sarah Johnson</p>
            <p className="text-xs text-zinc-500">Admin</p>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-zinc-800 hover:bg-zinc-700">
            <User size={18} className="text-zinc-300" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
