
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { 
  Home, LogOut, FileText, Users, Cog, 
  Hand, Monitor, FileBarChart, Layers, Mail, CheckCircle, FileUp, Shield, HelpCircle,
  ChevronLeft, ChevronRight, UserCircle
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
  isDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onLogout, isCollapsed = false, onToggle, isDarkMode = false }) => {
  const isAdmin = role === 'Administrator';
  const isProvider = role === 'Data Provider' || isAdmin;
  const isReviewer = role === 'Data Reviewer' || isAdmin;
  const isGuest = role === 'Guest';

  const textClass = isDarkMode ? 'text-white/70' : 'text-gray-900';

  const NavItem = ({ to, icon: Icon, children }: any) => (
    <NavLink 
      to={to} 
      title={isCollapsed ? children : undefined}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 relative group
        ${isActive 
          ? `shadow-lg font-black ${isDarkMode ? 'bg-[#B17FE1] text-white' : 'bg-white text-purple-700'}` 
          : `${textClass} hover:bg-white/10 font-bold`}
        ${isCollapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
      `}
    >
      <Icon size={18} strokeWidth={2.5} className="flex-shrink-0" />
      <span className={`text-[11px] tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
        {children}
      </span>
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-14 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] whitespace-nowrap shadow-xl">
          {children}
        </div>
      )}
    </NavLink>
  );

  return (
    <div className={`bg-transparent flex flex-col h-screen sticky top-0 py-6 transition-all duration-500 ease-in-out relative z-50 ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}`}>
      
      {/* Middle Edge Toggle Button */}
      <button 
        onClick={onToggle}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 border rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 group active:scale-90
          ${isDarkMode ? 'bg-[#2A2438] border-white/10 text-[#B17FE1] hover:bg-[#B17FE1] hover:text-white' : 'bg-white border-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white'}`}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
        ) : (
          <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" />
        )}
      </button>

      {/* Sidebar Header / Logo */}
      <div className={`mb-10 transition-all duration-500 flex flex-col items-center ${isCollapsed ? 'pl-0' : 'pl-4'}`}>
        <Logo size={isCollapsed ? 'sm' : 'md'} />
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar px-4">
        {/* DATABASE Section */}
        <div>
          {!isCollapsed && (
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-3 animate-in fade-in ${isDarkMode ? 'text-[#B17FE1]/70' : 'text-[#B17FE1]'}`}>Database</h3>
          )}
          <div className="space-y-1.5">
            <NavItem to="/gad-data" icon={Hand}>GAD Data and Analysis</NavItem>
            <NavItem to="/cbms" icon={Monitor}>CBMS Table</NavItem>
            <NavItem to="/about" icon={FileBarChart}>About GRIDS</NavItem>
            
            {!isGuest && (
              <>
                {isProvider && <NavItem to="/data-submission" icon={FileUp}>Data Submission</NavItem>}
                {isReviewer && <NavItem to="/data-approval" icon={CheckCircle}>Data Review</NavItem>}
              </>
            )}
          </div>
        </div>

        {/* GAD ENTRY POINTS Section */}
        <div>
          {!isCollapsed && (
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-3 animate-in fade-in ${isDarkMode ? 'text-[#B17FE1]/70' : 'text-[#B17FE1]'}`}>GAD Entry Points</h3>
          )}
          <div className="space-y-1.5">
            <NavItem to="/policy" icon={FileText}>Policy</NavItem>
            <NavItem to="/members" icon={Users}>People</NavItem>
            <NavItem to="/mechanism" icon={Cog}>Enabling Mechanism</NavItem>
            <NavItem to="/programs" icon={Layers}>Program, Projects, Activities</NavItem>
          </div>
        </div>

        {/* MENU Section */}
        <div>
          {!isCollapsed && (
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-3 animate-in fade-in ${isDarkMode ? 'text-[#B17FE1]/70' : 'text-[#B17FE1]'}`}>Menu</h3>
          )}
          <div className="space-y-1.5">
            <NavItem to="/" icon={Home}>Home</NavItem>
            {!isGuest && <NavItem to="/profile" icon={UserCircle}>Profile</NavItem>}
            <NavItem to="/contact" icon={Mail}>Contact Us</NavItem>
            <NavItem to="/privacy-policy" icon={Shield}>Privacy Policy</NavItem>
            <NavItem to="/help" icon={HelpCircle}>Help</NavItem>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={`mt-4 pt-4 border-t px-4 ${isDarkMode ? 'border-white/5' : 'border-white/20'}`}>
        {!isGuest && (
          <button 
            onClick={onLogout}
            title={isCollapsed ? "Log Out" : undefined}
            className={`flex items-center gap-3 w-full py-3 rounded-full transition-all duration-200 font-black text-[11px] uppercase tracking-widest ${isCollapsed ? 'justify-center px-0' : 'px-6'}
              ${isDarkMode ? 'text-white/60 hover:bg-red-900/20 hover:text-red-400' : 'text-gray-900 hover:bg-red-50 hover:text-red-600'}`}
          >
            <LogOut size={18} />
            <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>Log Out</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
