
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

  // Fixed NavItem to correctly access isActive state within its children
  const NavItem = ({ to, icon: Icon, children }: any) => (
    <NavLink 
      to={to} 
      title={isCollapsed ? children : undefined}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group mb-1
        ${isActive 
          ? `shadow-md font-bold ${isDarkMode ? 'bg-[#7c3aed] text-white' : 'bg-purple-600 text-white'}` 
          : `${isDarkMode ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-purple-50 hover:text-purple-700'}`}
        ${isCollapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
      `}
    >
      {({ isActive }) => (
        <>
          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
          <span className={`text-[12px] tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            {children}
          </span>
          
          {isCollapsed && (
            <div className="absolute left-16 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-[100] whitespace-nowrap shadow-xl -translate-x-2 group-hover:translate-x-0">
              {children}
            </div>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <div className={`flex flex-col h-screen sticky top-0 py-8 transition-all duration-500 ease-in-out z-50 ${isCollapsed ? 'w-[88px]' : 'w-[280px]'} ${isDarkMode ? 'bg-[#0f172a]' : 'bg-white border-r border-slate-100'}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className={`absolute -right-4 top-12 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 border active:scale-90
          ${isDarkMode ? 'bg-slate-800 border-slate-700 text-purple-400' : 'bg-white border-slate-200 text-purple-600 hover:bg-purple-600 hover:text-white'}`}
      >
        {isCollapsed ? <ChevronRight size={14} strokeWidth={3} /> : <ChevronLeft size={14} strokeWidth={3} />}
      </button>

      {/* Brand */}
      <div className={`mb-12 flex justify-center ${isCollapsed ? 'px-2' : 'px-6'}`}>
        <Logo size={isCollapsed ? 'sm' : 'md'} />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-8">
        <div>
          {!isCollapsed && (
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-3 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Database</h3>
          )}
          <div className="space-y-0.5">
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

        <div>
          {!isCollapsed && (
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-3 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Entry Points</h3>
          )}
          <div className="space-y-0.5">
            <NavItem to="/policy" icon={FileText}>Policy</NavItem>
            <NavItem to="/members" icon={Users}>People</NavItem>
            <NavItem to="/mechanism" icon={Cog}>Mechanism</NavItem>
            <NavItem to="/programs" icon={Layers}>Programs</NavItem>
          </div>
        </div>

        <div>
          {!isCollapsed && (
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 mb-3 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>System</h3>
          )}
          <div className="space-y-0.5">
            <NavItem to="/" icon={Home}>Home</NavItem>
            {!isGuest && <NavItem to="/profile" icon={UserCircle}>Profile</NavItem>}
            <NavItem to="/contact" icon={Mail}>Contact Us</NavItem>
            <NavItem to="/help" icon={HelpCircle}>Support</NavItem>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-6">
        {!isGuest && (
          <button 
            onClick={onLogout}
            className={`flex items-center gap-3 w-full py-3 rounded-xl transition-all duration-200 font-bold text-[12px] 
              ${isCollapsed ? 'justify-center' : 'px-4'}
              ${isDarkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-slate-500 hover:bg-red-50 hover:text-red-600'}`}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
