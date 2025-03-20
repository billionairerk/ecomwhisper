
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
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DashboardSidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const DashboardSidebar = ({ collapsed, toggleCollapse }: DashboardSidebarProps) => {
  return (
    <aside className={cn(
      "h-screen flex flex-col transition-all duration-300 border-r border-zinc-800",
      "bg-zinc-900/90 backdrop-blur-lg",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className={cn(
        "p-6 flex items-center", 
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            ecomWhisper
          </span>
        )}
        {collapsed && (
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            eW
          </span>
        )}
        <button 
          onClick={toggleCollapse} 
          className="p-2 rounded-full hover:bg-zinc-800/70 transition-colors ml-auto focus:outline-none focus-ring"
        >
          {collapsed ? (
            <ChevronRight size={18} className="text-zinc-400" />
          ) : (
            <ChevronLeft size={18} className="text-zinc-400" />
          )}
        </button>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto transition-all duration-300">
        {!collapsed && (
          <p className="text-xs font-semibold text-zinc-500 px-2 py-4">MAIN MENU</p>
        )}
        
        <NavItem 
          icon={<LayoutDashboard size={18} />} 
          to="/dashboard" 
          label="Overview" 
          exact 
          collapsed={collapsed} 
        />
        <NavItem 
          icon={<Search size={18} />} 
          to="/dashboard/keywords" 
          label="Keyword Rankings" 
          collapsed={collapsed} 
        />
        <NavItem 
          icon={<BarChart2 size={18} />} 
          to="/dashboard/content" 
          label="Content Monitor" 
          collapsed={collapsed} 
        />
        <NavItem 
          icon={<Link2 size={18} />} 
          to="/dashboard/backlinks" 
          label="Backlinks" 
          collapsed={collapsed} 
        />
        <NavItem 
          icon={<LineChart size={18} />} 
          to="/dashboard/competitors" 
          label="Competitors" 
          collapsed={collapsed} 
        />
        <NavItem 
          icon={<Zap size={18} />} 
          to="/dashboard/growth" 
          label="Growth Hacks" 
          collapsed={collapsed} 
        />
        
        <div className="pt-4 mt-4 border-t border-zinc-800">
          {!collapsed && (
            <p className="text-xs font-semibold text-zinc-500 px-2 py-4">SETTINGS</p>
          )}
          <NavItem 
            icon={<Settings size={18} />} 
            to="/dashboard/settings" 
            label="Settings" 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={<HelpCircle size={18} />} 
            to="/dashboard/help" 
            label="Help & Support" 
            collapsed={collapsed} 
          />
        </div>
      </nav>
      
      {!collapsed && (
        <div className="p-4 mt-auto">
          <div className="bg-zinc-800/50 backdrop-blur-md border border-zinc-700/30 rounded-lg p-4 text-sm text-center transition-all group hover:border-blue-600/30 hover:bg-gradient-to-b hover:from-zinc-800/50 hover:to-zinc-900/50">
            <p className="text-zinc-400">Need help?</p>
            <a href="#" className="text-blue-400 hover:text-blue-300 mt-1 block transition-colors">Contact Support</a>
          </div>
        </div>
      )}
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  label: string;
  exact?: boolean;
  collapsed?: boolean;
}

const NavItem = ({ icon, to, label, exact, collapsed }: NavItemProps) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) => cn(
      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150',
      isActive
        ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-400'
        : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100',
      collapsed && 'justify-center'
    )}
  >
    <span className="text-current">{icon}</span>
    {!collapsed && <span>{label}</span>}
  </NavLink>
);

export default DashboardSidebar;
