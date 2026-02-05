
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { User } from './types';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import GADData from './pages/GADData';
import GADSectorDetail from './pages/GADSectorDetail';
import IndicatorAnalysis from './pages/IndicatorAnalysis';
import CBMS from './pages/CBMS';
import DataSubmission from './pages/DataSubmission';
import DataApproval from './pages/DataApproval';
import About from './pages/About';
import Policy from './pages/Policy';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Programs from './pages/Programs';
import DataViewer from './pages/DataViewer';
import ContactUs from './pages/ContactUs';
import Help from './pages/Help';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

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
  
  const isAuthPage = location.pathname === '/login';
  const role = user?.role || 'Guest';

  const renderHeader = () => (
    !isAuthPage && (
      <Header 
        user={user} 
        onLoginClick={() => navigate('/login')} 
        isNavFixed={isNavFixed}
        onToggleNav={() => setIsNavFixed(!isNavFixed)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
    )
  );

  const isAtHomePath = location.pathname === '/' || location.pathname === '/home';
  const searchParams = new URLSearchParams(location.search);
  const isSearching = searchParams.has('q');
  
  const isAtDashboardWelcome = isAtHomePath && !isSearching;
  
  const handleHierarchicalBack = () => {
    const path = location.pathname;

    if (path.startsWith('/analysis/')) {
      navigate('/gad-data');
    } else if (path.startsWith('/gad-data/')) {
      navigate('/gad-data');
    } else if (path.startsWith('/view/')) {
      navigate('/');
    } else if (path !== '/' && path !== '/home') {
      navigate('/');
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#0F0C15]' : 'bg-[#E5E2F2]'} min-h-screen flex transition-colors duration-500 ease-in-out`}>
      {!isAuthPage && (
        <Sidebar 
          role={role} 
          onLogout={onLogout} 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isDarkMode={isDarkMode}
        />
      )}
      
      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out relative
        ${!isAuthPage ? 'm-3 ml-0 rounded-[32px] shadow-sm overflow-hidden border' : ''}
        ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-[#F5F1FF] border-white/40'}`}>
        
        {isNavFixed && renderHeader()}

        <div className={`flex-1 relative flex flex-col ${isNavFixed ? 'overflow-auto custom-scrollbar' : 'overflow-visible'}`}>
          <div className={`flex-1 flex flex-col min-h-full ${!isNavFixed ? 'overflow-auto custom-scrollbar' : ''}`}>
             {!isNavFixed && renderHeader()}
             
             <main className="flex-1">
               <Routes>
                 {/* Dashboard is the definitive root and first page */}
                 <Route path="/" element={<Dashboard user={user} isDarkMode={isDarkMode} />} />
                 <Route path="/home" element={<Navigate to="/" replace />} />
                 
                 {/* Login/Landing is an auxiliary path for authentication, not the default entry */}
                 <Route path="/login" element={<Landing onLogin={onLogin} />} />
                 
                 <Route path="/gad-data" element={<GADData />} />
                 <Route path="/gad-data/:sectorId" element={<GADSectorDetail />} />
                 <Route path="/analysis/:indicatorId" element={<IndicatorAnalysis />} />
                 <Route path="/cbms" element={<CBMS />} />
                 <Route path="/data-submission" element={<DataSubmission user={user} />} />
                 <Route path="/data-approval" element={<DataApproval user={user} />} />
                 <Route path="/about" element={<About />} />
                 <Route path="/policy" element={<Policy />} />
                 <Route path="/privacy-policy" element={<Policy />} />
                 <Route path="/profile" element={user ? <Profile user={user} onUpdateUser={onUpdateUser} /> : <Navigate to="/login" />} />
                 <Route path="/members" element={<Members />} />
                 <Route path="/programs" element={<Programs />} />
                 <Route path="/view/:id" element={<DataViewer />} />
                 <Route path="/contact" element={<ContactUs />} />
                 <Route path="/help" element={<Help />} />
                 
                 {/* Any unknown path redirects to Dashboard (First Page) */}
                 <Route path="*" element={<Navigate to="/" replace />} />
               </Routes>
             </main>
          </div>
        </div>

        {!isAuthPage && !isAtDashboardWelcome && (
          <button 
            onClick={handleHierarchicalBack}
            className={`fixed bottom-10 right-10 flex items-center gap-4 px-8 py-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all z-50 group border
              ${isDarkMode 
                ? 'bg-white text-black border-white/20' 
                : 'bg-black text-white border-white/10'}`}
          >
            <ArrowLeft size={22} className="transition-transform group-hover:-translate-x-1" strokeWidth={3} />
            <span className="hidden md:inline font-black text-[11px] uppercase tracking-[0.3em]">
              Back
            </span>
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // A quick splash screen helps with professional perception of "Loading first page"
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (mockUser: User) => {
    setUser({
      ...mockUser,
      birthdate: mockUser.birthdate || '09-09-1999',
      phone: mockUser.phone || '+63 1234567890',
      landline: mockUser.landline || '442-3939'
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf8ff]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] animate-pulse text-center">
              Initializing GRIDS
            </span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest opacity-60 text-center">
              Gender-Responsive Integrated Database System
            </span>
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
