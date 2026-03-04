
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { 
  Home, LogOut, FileText, Users, Cog, 
  Hand, Monitor, Mail, HelpCircle,
  ChevronLeft, ChevronRight, BarChart3, TreePine, Package,
  ClipboardCheck, Shield, UserCog, User as UserIcon, CloudDownload,
  History, Layers, X
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
  const isAnalyzer = role === 'Data Analyst' || isAdmin;
  const isLoggedIn = role !== 'Guest';

  const sectionLabelClass = `text-[10px] font-black uppercase tracking-[0.4em] mb-4 transition-all duration-500 ${
    isDarkMode ? 'text-purple-400' : 'text-[#8B44AF]'
  } ${isCollapsed ? 'px-0 text-center opacity-0' : 'pl-20 opacity-100'}`;

  const NavItem = ({ to, icon: Icon, children }: any) => (
    <NavLink 
      to={to} 
      onClick={(e) => {
        e.stopPropagation();
      }}
      title={isCollapsed ? children : ""}
      className={({ isActive }) => `
        flex items-center rounded-full transition-all duration-500 relative group mb-1.5
        ${isActive 
          ? `shadow-sm font-bold ${isDarkMode ? 'bg-purple-600/20 text-purple-200' : 'bg-[#F2E7FF] text-[#4A1D6E]'}` 
          : `${isDarkMode ? 'text-purple-200/60 hover:bg-white/5 hover:text-white' : 'text-gray-900 hover:bg-gray-100'} font-medium`}
        ${isCollapsed ? 'justify-center w-10 h-10 md:w-12 md:h-12 mx-auto' : 'w-full py-2.5'}
      `}
    >
      {({ isActive }) => (
        <>
          <div className="w-20 flex-shrink-0 flex items-center justify-center">
            <Icon size={18} strokeWidth={isActive ? 3 : 2} className="transition-transform duration-500" />
          </div>
          <span className={`text-[12px] whitespace-nowrap overflow-hidden transition-all duration-500 
            ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            {children}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <div 
      onClick={(e) => {
        if (isCollapsed) {
          e.stopPropagation();
          onToggle?.();
        }
      }}
      className={`
      ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'} border transition-all duration-500 ease-in-out z-50 
      ${isDarkMode ? 'border-white/5' : 'border-gray-100'}
      flex flex-col h-full sticky top-0
      ${isCollapsed ? 'md:w-20 cursor-pointer' : 'md:absolute md:top-0 md:left-0 md:w-72 shadow-2xl'}
      w-full md:rounded-r-[32px] lg:rounded-r-[48px]
    `}>
      
      {/* Sidebar Header - Aligned with Content Header */}
      <div className={`h-16 md:h-20 flex items-center border-b transition-all duration-500 mb-6
        ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="w-20 flex-shrink-0 flex items-center justify-center">
          <Logo size="sm" isDarkMode={isDarkMode} />
        </div>
        {!isCollapsed && (
          <span className={`font-black text-xl tracking-tighter transition-all duration-500 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            GRIDS
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        <div className="mb-8">
          <h3 className={sectionLabelClass}>
            Database
          </h3>
          {isCollapsed && <div className="h-px bg-gray-200 dark:bg-white/10 mx-6 mb-6 transition-all duration-500"></div>}
          <div className="space-y-0.5">
            <NavItem to="/gad-data" icon={Hand}>GAD Data and Analysis</NavItem>
            <NavItem to="/cbms" icon={Monitor}>CBMS Table</NavItem>
            {isProvider && <NavItem to="/data-submission" icon={BarChart3}>Data Submission</NavItem>}
            {isReviewer && <NavItem to="/data-approval" icon={ClipboardCheck}>Data Approval</NavItem>}
            {isAnalyzer && <NavItem to="/data-retrieval" icon={CloudDownload}>Data Retrieval</NavItem>}
            {isAdmin && <NavItem to="/user-management" icon={UserCog}>User Management</NavItem>}
            {isAdmin && <NavItem to="/audit-trail" icon={History}>Audit Trail</NavItem>}
            <NavItem to="/about" icon={TreePine}>About GRIDS</NavItem>
          </div>
          {isCollapsed && <div className="h-px bg-gray-200 dark:bg-white/10 mx-6 mt-6 transition-all duration-500"></div>}
        </div>

        <div className="mb-8">
          <h3 className={sectionLabelClass}>
            GAD Entry Points
          </h3>
          {!isCollapsed && <div className="h-px bg-gray-200 dark:bg-white/10 mx-6 mb-6 transition-all duration-500 opacity-0"></div>}
          <div className="space-y-0.5">
            <NavItem to="/policy" icon={FileText}>Legal Policies</NavItem>
            <NavItem to="/members" icon={Users}>People</NavItem>
            <NavItem to="/enabling-mechanisms" icon={Layers}>Enabling Mechanisms</NavItem>
            <NavItem to="/programs" icon={Package}>Program, Projects, Activities</NavItem>
          </div>
          {isCollapsed && <div className="h-px bg-gray-200 dark:bg-white/10 mx-6 mt-6 transition-all duration-500"></div>}
        </div>

        <div className="mb-4">
          <h3 className={sectionLabelClass}>
            Menu
          </h3>
          {isCollapsed && <div className="h-px bg-gray-100 dark:bg-white/5 mx-4 mb-6 transition-all duration-500"></div>}
          <div className="space-y-0.5">
            <NavItem to="/" icon={Home}>Home</NavItem>
            {isLoggedIn && <NavItem to="/profile" icon={UserIcon}>Profile</NavItem>}
            <NavItem to="/contact" icon={Mail}>Contact Us</NavItem>
            <NavItem to="/privacy-policy" icon={Shield}>Privacy Policy</NavItem>
            <NavItem to="/help" icon={HelpCircle}>Help</NavItem>
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className={`p-4 border-t transition-all duration-500 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        {isLoggedIn && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
            }}
            title={isCollapsed ? "Log Out" : ""}
            className={`flex items-center rounded-xl transition-all font-bold text-[12px]
              ${isDarkMode 
                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                : 'bg-red-50 text-red-600 hover:bg-red-100'}
              ${isCollapsed ? 'justify-center w-10 h-10 md:w-12 md:h-12 mx-auto' : 'w-full py-3'}
            `}
          >
            <div className="w-20 flex-shrink-0 flex items-center justify-center">
              <LogOut size={18} />
            </div>
            <span className={`transition-all duration-500 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              Log Out
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
