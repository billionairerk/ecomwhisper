
import React from 'react';
import { Bell, User, Search, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  children?: React.ReactNode;
}

const DashboardHeader = ({ children }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <Link to="/" className="mr-6">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400"
          >
            trisul.ai
          </motion.span>
        </Link>
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
        
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-zinc-800"
            onClick={() => navigate('/')}
            title="Go to homepage"
          >
            <Home size={18} className="text-zinc-400" />
          </Button>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button variant="ghost" size="icon" className="relative hover:bg-zinc-800">
            <Bell size={18} className="text-zinc-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full shadow-glow shadow-blue-500/50"></span>
          </Button>
        </motion.div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-zinc-300">Account</p>
            <button 
              className="text-xs text-zinc-500 hover:text-blue-400"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full bg-zinc-800 hover:bg-zinc-700"
              onClick={handleLogout}
              title="Sign out"
            >
              <LogOut size={18} className="text-zinc-300" />
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
