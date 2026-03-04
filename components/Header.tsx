import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Moon, Sun, User as UserIcon, ToggleLeft, ToggleRight, X, ChevronDown } from 'lucide-react';
import { BaguioLogo } from './Logo';
import { User, Notification } from '../types';

interface HeaderProps {
  user: User | null;
  onLoginClick?: () => void;
  isNavFixed?: boolean;
  onToggleNav?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLoginClick, 
  isNavFixed = true, 
  onToggleNav, 
  isDarkMode = false, 
  onToggleDarkMode 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const notifications: Notification[] = [
    { id: '1', title: 'John Doe', message: 'New data submission available for review.', date: '3:24 PM', isRead: false, department: 'CPDSO' },
    { id: '2', title: 'System', message: 'Data submission approved for CMO.', date: '1:15 PM', isRead: false, department: 'IT' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (user) navigate('/profile');
    else if (onLoginClick) onLoginClick();
  };

  return (
    <header className={`h-20 flex items-center justify-between px-8 z-40 transition-all duration-300 border-b
      ${isDarkMode ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white/80 border-slate-100'} 
      backdrop-blur-md ${isNavFixed ? 'sticky top-0' : 'relative'}`}>
      
      {/* Brand */}
      <a 
        href="https://new.baguio.gov.ph/home" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-3 group transition-all"
      >
        <BaguioLogo />
        <div className="flex flex-col">
          <span className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>eGov Baguio</span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Smart City Portal</span>
        </div>
      </a>

      {/* Actions */}
      <div className="flex items-center gap-6">
        
        {/* Fix Nav Toggle */}
        <div className="hidden md:flex items-center gap-2 pr-6 border-r border-slate-200/50">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Dock Nav</span>
          <button onClick={onToggleNav} className="transition-all hover:scale-110 active:scale-95">
            {isNavFixed ? (
              <ToggleRight className="text-purple-600" size={32} />
            ) : (
              <ToggleLeft className="text-slate-300" size={32} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleDarkMode}
            className={`p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-50 text-slate-500'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2.5 rounded-xl transition-all relative hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-slate-800 text-purple-400' : 'bg-slate-50 text-slate-500'}`}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-4 w-80 shadow-2xl rounded-2xl border overflow-hidden z-50 animate-fade-in
                ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                  <h3 className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-4 transition-all cursor-pointer border-b last:border-0 
                      ${isDarkMode ? 'hover:bg-white/5 border-slate-800' : 'hover:bg-slate-50 border-slate-50'}`}>
                      <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{n.title}</h4>
                      <p className={`text-[11px] mt-1 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{n.message}</p>
                      <span className="text-[9px] font-bold text-purple-500 mt-2 block uppercase">{n.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <button 
            onClick={handleUserClick}
            className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full transition-all border 
              ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-purple-500' : 'bg-slate-50 border-slate-200 hover:border-purple-300'}`}
          >
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm">
              <UserIcon size={16} />
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className={`text-[11px] font-bold leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {user ? user.firstName : 'Guest User'}
              </span>
              <span className="text-[9px] font-medium text-purple-500 uppercase tracking-widest">
                {user ? user.role : 'Sign In'}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;