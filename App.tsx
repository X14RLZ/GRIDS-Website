
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { User, Notification } from './types';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import GADData from './pages/GADData';
import GADSectorDetail from './pages/GADSectorDetail';
import IndicatorAnalysis from './pages/IndicatorAnalysis';
import CBMS from './pages/CBMS';
import DataSubmission from './pages/DataSubmission';
import DataApproval from './pages/DataApproval';
import DataRetrieval from './pages/DataRetrieval';
import UserManagement from './pages/UserManagement';
import AuditTrail from './pages/AuditTrail';
import About from './pages/About';
import Policy from './pages/Policy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Programs from './pages/Programs';
import EnablingMechanisms from './pages/EnablingMechanisms';
import DataViewer from './pages/DataViewer';
import ContactUs from './pages/ContactUs';
import Help from './pages/Help';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import { recordAuditLog } from './utils/auditLogger';

const AppContent: React.FC<{
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  isNavFixed: boolean;
  setIsNavFixed: (val: boolean) => void;
  onUpdateUser: (user: User) => void;
}> = ({ 
  user, onLogin, onLogout, isDarkMode, setIsDarkMode, 
  isSidebarCollapsed, setIsSidebarCollapsed, isNavFixed, setIsNavFixed,
  onUpdateUser
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const path = location.pathname;
    let title = 'GRIDS | Baguio City';
    
    if (path === '/') {
      title = 'Dashboard | GRIDS Baguio City';
    }
    else if (path.includes('/gad-data')) {
      title = 'GAD Indicators | GRIDS Baguio City';
    }
    else if (path.includes('/cbms')) {
      title = 'CBMS Statistics | GRIDS Baguio City';
    }
    
    document.title = title;
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isAuthPage = location.pathname === '/login';
  const role = user?.role || 'Guest';
  const isAdmin = role === 'Administrator';
  const isAnalyzer = role === 'Data Analyst' || isAdmin;

  const renderHeader = () => (
    !isAuthPage && (
      <Header 
        user={user} 
        onLoginClick={() => navigate('/login')} 
        isNavFixed={isNavFixed}
        onToggleNav={() => setIsNavFixed(!isNavFixed)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
    )
  );

  const isAtHomePath = location.pathname === '/' || location.pathname === '/home';
  const searchParams = new URLSearchParams(location.search);
  const isSearching = searchParams.has('q');
  const isAtDashboardWelcome = isAtHomePath && !isSearching;
  
  const handleHierarchicalBack = () => {
    const path = location.pathname;
    const pathnames = path.split('/').filter((x) => x);
    
    if (pathnames.length > 1) {
      // Custom parent mapping for routes that don't have a direct parent index page
      const parentMapping: Record<string, string> = {
        'analysis': '/gad-data',
        'view': '/data-retrieval',
      };

      const parentKey = pathnames[0];
      if (parentMapping[parentKey]) {
        navigate(parentMapping[parentKey]);
      } else {
        // Default: Go to parent path
        const parentPath = `/${pathnames.slice(0, pathnames.length - 1).join('/')}`;
        navigate(parentPath);
      }
    } else if (path !== '/' && path !== '/home') {
      // Go to home
      navigate('/');
    }
  };

  const isViewerPage = location.pathname.startsWith('/view/');
  
  return (
    <div className={`${isDarkMode ? 'dark bg-[#0F0C15]' : 'bg-[#f0f2f5]'} h-screen w-full flex transition-colors duration-500 ease-in-out overflow-hidden md:gap-2`}>
      {/* Sidebar Container - Fixed width to prevent pushing content */}
      {!isAuthPage && (
        <div className={`
          md:relative md:translate-x-0 fixed inset-y-0 left-0 z-50 transition-all duration-500 ease-in-out md:w-20
          ${isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}
        `}>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/40 md:hidden z-[-1]" onClick={() => setIsMobileMenuOpen(false)} />
          )}
          <Sidebar 
            role={role} 
            onLogout={onLogout} 
            isCollapsed={isMobileMenuOpen ? false : isSidebarCollapsed} 
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
      
      {/* MAIN LAYOUT WRAPPER */}
      <div 
        onClick={() => {
          if (!isAuthPage) {
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            if (!isSidebarCollapsed) setIsSidebarCollapsed(true);
          }
        }}
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out relative overflow-hidden
        ${!isAuthPage ? `m-0 shadow-2xl border cursor-default md:rounded-l-[32px] lg:rounded-l-[48px]` : ''}
        ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-gray-200/50'}`}>
        
        {isNavFixed && renderHeader()}

        <div className={`flex-1 relative flex flex-col overflow-auto custom-scrollbar`}>
          <div className="flex-1 flex flex-col min-h-full">
             {!isNavFixed && renderHeader()}
             
             <main id="main-content" className="flex-1 flex flex-col">
               {/* Breadcrumbs System */}
               {!isAuthPage && !isAtDashboardWelcome && !isViewerPage && (
                 <div className="px-4 md:px-12 pt-8">
                   <Breadcrumbs isDarkMode={isDarkMode} />
                 </div>
               )}
               <Routes>
                 <Route path="/" element={<Dashboard user={user} isDarkMode={isDarkMode} />} />
                 <Route path="/home" element={<Navigate to="/" replace />} />
                 <Route path="/login" element={<Landing onLogin={onLogin} isDarkMode={isDarkMode} />} />
                 <Route path="/gad-data" element={<GADData isDarkMode={isDarkMode} />} />
                 <Route path="/enabling-mechanisms" element={<EnablingMechanisms isDarkMode={isDarkMode} />} />
                 <Route path="/gad-data/:sectorId" element={<GADSectorDetail isDarkMode={isDarkMode} />} />
                 <Route path="/analysis/:indicatorId" element={<IndicatorAnalysis isDarkMode={isDarkMode} />} />
                 <Route path="/cbms" element={<CBMS isDarkMode={isDarkMode} />} />
                 <Route path="/data-submission" element={<DataSubmission user={user} isDarkMode={isDarkMode} />} />
                 <Route path="/data-approval" element={<DataApproval user={user} isDarkMode={isDarkMode} />} />
                 <Route path="/data-retrieval" element={isAnalyzer ? <DataRetrieval isDarkMode={isDarkMode} /> : <Navigate to="/" />} />
                 <Route path="/user-management" element={isAdmin ? <UserManagement isDarkMode={isDarkMode} /> : <Navigate to="/" />} />
                 <Route path="/audit-trail" element={isAdmin ? <AuditTrail isDarkMode={isDarkMode} /> : <Navigate to="/" />} />
                 <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
                 <Route path="/policy" element={<Policy isDarkMode={isDarkMode} />} />
                 <Route path="/privacy-policy" element={<PrivacyPolicy isDarkMode={isDarkMode} />} />
                 <Route path="/profile" element={user ? <Profile user={user} onUpdateUser={onUpdateUser} isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />
                 <Route path="/members" element={<Members isDarkMode={isDarkMode} />} />
                 <Route path="/programs" element={<Programs isDarkMode={isDarkMode} />} />
                 <Route path="/view/:id" element={<DataViewer user={user} isDarkMode={isDarkMode} />} />
                 <Route path="/contact" element={<ContactUs isDarkMode={isDarkMode} />} />
                 <Route path="/help" element={<Help isDarkMode={isDarkMode} />} />
                 <Route path="*" element={<Navigate to="/" replace />} />
               </Routes>
             </main>
          </div>
        </div>

        {/* Global Floating Back Button */}
        {!isAuthPage && !isAtDashboardWelcome && !isViewerPage && (
          <button 
            onClick={handleHierarchicalBack}
            aria-label="Navigate Back"
            className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 flex items-center justify-center gap-3 w-14 h-14 md:w-auto md:px-6 md:py-4 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all z-50 border
              ${isDarkMode 
                ? 'bg-white text-black border-white/20' 
                : 'bg-gray-900 text-white border-white/10'}`}
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" strokeWidth={3} />
            <span className="hidden md:inline font-black text-[10px] uppercase tracking-[0.2em]">Back</span>
          </button>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavFixed, setIsNavFixed] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('grids_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('grids_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // SYNC WITH SEED.SQL LOGIC
    const storedUsers = localStorage.getItem('grids_users');
    let userList = storedUsers ? JSON.parse(storedUsers) : [];

    // MANDATORY ADMIN ACCOUNT (Always present)
    const primaryAdmin = {
      userId: 'u_admin_1',
      username: 'charles_admin',
      password: '1234',
      passwordHash: 'hashed_pwd_123',
      email: 'cbmscharles@gmail.com',
      firstName: 'Charles',
      lastName: 'Chantioco',
      role: 'Administrator',
      roleId: 'role_admin',
      office: 'CPDSO',
      phone: '442-3939',
      contactInfo: '442-3939',
      status: 'Active',
      createdAt: new Date('2025-01-01').toISOString()
    };

    // FILTER RULE: Only keep your admin account and actual registered users
    // This removes other "pre-seeded" people while allowing registration persistence
    userList = userList.filter((u: any) => 
      u.email === 'cbmscharles@gmail.com' || u.userId.startsWith('u_reg_')
    );

    // Ensure Admin is always there
    if (!userList.some((u: any) => u.email === primaryAdmin.email)) {
      userList.unshift(primaryAdmin);
    }

    localStorage.setItem('grids_users', JSON.stringify(userList));

    const session = localStorage.getItem('grids_session');
    if (session) setUser(JSON.parse(session));

    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('grids_session', JSON.stringify(authenticatedUser));
    
    // Log Activity
    recordAuditLog(authenticatedUser, 'LOGIN_SUCCESS', `User ${authenticatedUser.email} successfully logged into the session.`, 'Authentication');

    const notifications: Notification[] = JSON.parse(localStorage.getItem('grids_notifications') || '[]');
    const loginNotif: Notification = {
      id: `login-${Date.now()}`,
      title: 'Login Successful',
      message: `Welcome back, ${authenticatedUser.firstName}! You have successfully accessed the GRIDS system.`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      department: 'System',
      targetUrl: '/'
    };
    localStorage.setItem('grids_notifications', JSON.stringify([loginNotif, ...notifications]));
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = () => {
    if (user) {
      recordAuditLog(user, 'LOGOUT_SUCCESS', `User ${user.email} terminated the session.`, 'Authentication');
    }
    setUser(null);
    localStorage.removeItem('grids_session');
  };

  const handleUpdateUser = (updatedUser: User) => {
    recordAuditLog(updatedUser, 'PROFILE_UPDATE', `User updated their personal registry profile details.`, 'User Profile');
    setUser(updatedUser);
    localStorage.setItem('grids_session', JSON.stringify(updatedUser));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white animate-in fade-in duration-500">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-purple-50 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-[spin_0.8s_linear_infinite]"></div>
          </div>
          <div className="flex flex-col items-center gap-1.5 px-4 text-center">
            <span className="text-xs font-black text-purple-600 uppercase tracking-[0.6em] ml-2">GRIDS</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">INTEGRATED DATABASE SYSTEM</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <AppContent 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isNavFixed={isNavFixed}
        setIsNavFixed={setIsNavFixed}
        onUpdateUser={handleUpdateUser}
      />
    </HashRouter>
  );
};

export default App;
