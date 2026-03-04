
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavFixed, setIsNavFixed] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (mockUser: User) => {
    setUser(mockUser);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf8ff]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const role = user?.role || 'Guest';

  return (
    <HashRouter>
      <div className={`${isDarkMode ? 'dark bg-[#0F0C15]' : 'bg-[#E5E2F2]'} min-h-screen flex transition-colors duration-500 ease-in-out`}>
        {/* Auth Overlay - Only visible when clicking Login */}
        {showAuth && (
          <div className="fixed inset-0 z-[100] bg-white dark:bg-[#0F0C15] overflow-y-auto">
            <Landing onLogin={handleLogin} onCancel={() => setShowAuth(false)} />
          </div>
        )}

        <Sidebar 
          role={role} 
          onLogout={handleLogout} 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isDarkMode={isDarkMode}
        />
        
        {/* Main Content Wrapper */}
        <div className={`flex-1 flex flex-col m-3 ml-0 rounded-[32px] shadow-sm overflow-hidden border transition-all duration-500 ease-in-out relative
          ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-[#F5F1FF] border-white/40'}`}>
          
          {/* Scrollable Container */}
          <div className="flex-1 overflow-auto custom-scrollbar relative flex flex-col">
            <Header 
              user={user} 
              onLoginClick={() => setShowAuth(true)} 
              isNavFixed={isNavFixed}
              onToggleNav={() => setIsNavFixed(!isNavFixed)}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard user={user} isDarkMode={isDarkMode} />} />
                <Route path="/gad-data" element={<GADData />} />
                <Route path="/gad-data/:sectorId" element={<GADSectorDetail />} />
                <Route path="/analysis/:indicatorId" element={<IndicatorAnalysis />} />
                <Route path="/cbms" element={<CBMS />} />
                
                {/* Role-Protected Routes */}
                <Route path="/data-submission" element={
                  (role === 'Data Provider' || role === 'Administrator') ? <DataSubmission /> : <Navigate to="/" />
                } />
                <Route path="/data-approval" element={
                  (role === 'Data Reviewer' || role === 'Administrator') ? <DataApproval /> : <Navigate to="/" />
                } />
                
                <Route path="/about" element={<About />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/privacy-policy" element={<Policy />} />
                <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
                <Route path="/members" element={<Members />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/view/:id" element={<DataViewer />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
