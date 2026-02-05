
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Moon, Sun, User as UserIcon, ToggleLeft, ToggleRight, X } from 'lucide-react';
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
    { id: '1', title: 'John Doe', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '3:24 PM', isRead: false, department: 'CPDSO' },
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

  const headerBgClass = isDarkMode ? 'bg-[#1A1625]/60 border-white/5' : 'bg-white/60 border-white/20';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <header className={`${headerBgClass} backdrop-blur-md h-20 flex items-center justify-between px-10 border-b z-40 transition-all duration-300 ${isNavFixed ? 'sticky top-0' : 'relative'}`}>
      {/* Left Section: Seal and Branding - Updated to external link */}
      <a 
        href="https://new.baguio.gov.ph/home" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-3 no-underline group hover:opacity-80 transition-opacity"
      >
        <BaguioLogo />
        <span className={`text-xl font-bold tracking-tight ${textClass}`}>eGov: Baguio</span>
      </a>

      {/* Right Section: Navigation Items */}
      <div className="flex items-center gap-8">
        
        {/* Profile / Login Section */}
        <button 
          onClick={handleUserClick}
          className={`flex items-center gap-3 group px-4 py-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-white/50'}`}
        >
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all 
            ${isDarkMode ? 'border-white/20 text-white group-hover:bg-white group-hover:text-black' : 'border-gray-900 text-gray-900 group-hover:bg-gray-900 group-hover:text-white'}`}>
            <UserIcon size={20} />
          </div>
          <span className={`text-sm font-bold transition-colors ${textClass}`}>
            {user ? `${user.firstName}` : 'Login'}
          </span>
        </button>

        {/* Fix Nav Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleNav}
            className="transition-transform active:scale-95 flex items-center"
          >
            {isNavFixed ? (
              <ToggleRight className="text-[#B17FE1]" size={40} strokeWidth={1} fill="currentColor" />
            ) : (
              <ToggleLeft className={isDarkMode ? 'text-gray-600' : 'text-gray-300'} size={40} strokeWidth={1} fill="currentColor" />
            )}
          </button>
          <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-gray-900'}`}>FIX NAV</span>
        </div>

        {/* Icons */}
        <div className={`flex items-center gap-6 ${textClass}`}>
          <button 
            onClick={onToggleDarkMode}
            className="hover:text-purple-600 transition-all hover:scale-110 active:scale-90"
          >
            {isDarkMode ? <Sun size={24} strokeWidth={2} className="text-yellow-400" /> : <Moon size={24} strokeWidth={2}/>}
          </button>
          
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="hover:text-purple-600 transition-all relative hover:scale-110 active:scale-90"
            >
              <Bell size={24} strokeWidth={2}/>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1A1625]"></span>
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-8 w-80 shadow-2xl rounded-3xl border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 
                ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-white border-gray-100'}`}>
                <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                  <h3 className={`text-sm font-black uppercase tracking-widest ${textClass}`}>Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-gray-400">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 rounded-2xl transition-all cursor-pointer border-b last:border-0 
                      ${isDarkMode ? 'hover:bg-white/5 border-white/5' : 'hover:bg-purple-50 border-gray-50'}`}>
                      <h4 className={`text-xs font-bold ${textClass}`}>{n.title}</h4>
                      <p className={`text-[11px] line-clamp-1 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
