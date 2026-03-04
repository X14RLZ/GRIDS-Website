
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { 
  Home, LogOut, FileText, Users, Cog, 
  Hand, Monitor, Mail, HelpCircle,
  ChevronLeft, ChevronRight, BarChart3, TreePine, Package,
  ClipboardCheck, Shield, UserCog, User as UserIcon, CloudDownload
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

  const sectionLabelClass = `text-[10px] font-black uppercase tracking-[0.4em] px-5 mb-4 transition-colors duration-500 ${
    isDarkMode ? 'text-purple-400' : 'text-[#8B44AF]'
  }`;

  const NavItem = ({ to, icon: Icon, children }: any) => (
    <NavLink 
      to={to} 
      title={isCollapsed ? children : ""}
      className={({ isActive }) => `
        flex items-center gap-4 px-5 py-2.5 rounded-full transition-all duration-300 relative group mb-1.5
        ${isActive 
          ? `shadow-sm font-bold ${isDarkMode ? 'bg-purple-600/20 text-purple-200' : 'bg-[#F2E7FF] text-[#4A1D6E]'}` 
          : `${isDarkMode ? 'text-purple-200/60 hover:bg-white/5 hover:text-white' : 'text-gray-900 hover:bg-gray-100'} font-medium`}
        ${isCollapsed ? 'justify-center px-0 w-12 h-12 mx-auto' : ''}
      `}
    >
      {({ isActive }) => (
        <>
          <Icon size={18} strokeWidth={isActive ? 3 : 2} className="flex-shrink-0" />
          {!isCollapsed && (
            <span className={`text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300 opacity-100`}>
              {children}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <div className={`
      ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'} lg:bg-transparent border-r lg:border-none transition-all duration-500 ease-in-out relative z-50 
      ${isDarkMode ? 'border-white/5' : 'border-gray-100'}
      flex flex-col h-full lg:h-screen sticky top-0 py-8
      ${isCollapsed ? 'w-24' : 'w-72'}
    `}>
      
      <button 
        onClick={onToggle}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 border rounded-full shadow-lg items-center justify-center transition-all duration-300 z-50 group active:scale-90 hidden lg:flex
          ${isDarkMode ? 'bg-[#2A2438] border-white/10 text-[#B17FE1] hover:text-white hover:border-purple-50' : 'bg-white border-purple-100 text-purple-600 hover:text-purple-900'}`}
      >
        {isCollapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
      </button>

      <div className={`mb-10 transition-all flex flex-col items-center ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <Logo size={isCollapsed ? 'sm' : 'md'} isDarkMode={isDarkMode} />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4">
        <div className="mb-8">
          {!isCollapsed ? (
            <h3 className={sectionLabelClass}>Database</h3>
          ) : (
            <div className="h-px bg-gray-100 dark:bg-white/5 mx-4 mb-6"></div>
          )}
          <div className="space-y-0.5">
            <NavItem to="/gad-data" icon={Hand}>GAD Data and Analysis</NavItem>
            <NavItem to="/cbms" icon={Monitor}>CBMS Table Hub</NavItem>
            {isProvider && <NavItem to="/data-submission" icon={BarChart3}>Data Submission</NavItem>}
            {isReviewer && <NavItem to="/data-approval" icon={ClipboardCheck}>Data Approval</NavItem>}
            {isAnalyzer && <NavItem to="/data-retrieval" icon={CloudDownload}>Data Retrieval</NavItem>}
            {isAdmin && <NavItem to="/user-management" icon={UserCog}>User Management</NavItem>}
            <NavItem to="/about" icon={TreePine}>About GRIDS</NavItem>
          </div>
        </div>

        <div className="mb-8">
          {!isCollapsed ? (
            <h3 className={sectionLabelClass}>GAD Entry Points</h3>
          ) : (
            <div className="h-px bg-gray-100 dark:bg-white/5 mx-4 mb-6"></div>
          )}
          <div className="space-y-0.5">
            <NavItem to="/policy" icon={FileText}>Legal Policies</NavItem>
            <NavItem to="/members" icon={Users}>People</NavItem>
            <NavItem to="/gad-data/institutional" icon={Cog}>Enabling Mechanism</NavItem>
            <NavItem to="/programs" icon={Package}>Program, Projects, Activities</NavItem>
          </div>
        </div>

        <div className="mb-8">
          {!isCollapsed ? (
            <h3 className={sectionLabelClass}>Menu</h3>
          ) : (
            <div className="h-px bg-gray-100 dark:bg-white/5 mx-4 mb-6"></div>
          )}
          <div className="space-y-0.5">
            <NavItem to="/" icon={Home}>Home</NavItem>
            {isLoggedIn && <NavItem to="/profile" icon={UserIcon}>Profile</NavItem>}
            <NavItem to="/contact" icon={Mail}>Contact Us</NavItem>
            <NavItem to="/privacy-policy" icon={Shield}>Privacy Policy</NavItem>
            <NavItem to="/help" icon={HelpCircle}>Help</NavItem>
            
            {isLoggedIn && (
              <button 
                onClick={onLogout}
                title={isCollapsed ? "Log Out" : ""}
                className={`flex items-center gap-4 w-full px-5 py-2.5 rounded-full transition-all font-medium text-[12px] mt-1
                  ${isCollapsed 
                    ? 'justify-center px-0 w-12 h-12 mx-auto' 
                    : `${isDarkMode ? 'text-gray-400 hover:bg-red-500/10 hover:text-red-400' : 'text-gray-900 hover:bg-red-50 hover:text-red-600'}`}
                `}
              >
                <LogOut size={18} />
                {!isCollapsed && <span>Log Out</span>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
