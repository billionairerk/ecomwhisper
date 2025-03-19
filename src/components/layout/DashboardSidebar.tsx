
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Search, 
  BarChart2, 
  LineChart, 
  Link2, 
  Zap, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            ecomWhisper
          </span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground px-2 py-4">MAIN MENU</p>
        
        <NavItem icon={<LayoutDashboard size={18} />} to="/dashboard" label="Overview" exact />
        <NavItem icon={<Search size={18} />} to="/dashboard/keywords" label="Keyword Rankings" />
        <NavItem icon={<BarChart2 size={18} />} to="/dashboard/content" label="Content Monitor" />
        <NavItem icon={<Link2 size={18} />} to="/dashboard/backlinks" label="Backlinks" />
        <NavItem icon={<LineChart size={18} />} to="/dashboard/competitors" label="Competitors" />
        <NavItem icon={<Zap size={18} />} to="/dashboard/growth" label="Growth Hacks" />
        
        <div className="pt-4 mt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground px-2 py-4">SETTINGS</p>
          <NavItem icon={<Settings size={18} />} to="/dashboard/settings" label="Settings" />
          <NavItem icon={<HelpCircle size={18} />} to="/dashboard/help" label="Help & Support" />
        </div>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="glass-card rounded-lg p-4 text-sm text-center">
          <p className="text-muted-foreground">Need help?</p>
          <a href="#" className="text-primary hover:underline mt-1 block">Contact Support</a>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  label: string;
  exact?: boolean;
}

const NavItem = ({ icon, to, label, exact }: NavItemProps) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) => cn(
      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )}
  >
    <span className="text-current">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default DashboardSidebar;
