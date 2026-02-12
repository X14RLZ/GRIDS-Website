import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Moon, Sun, User as UserIcon, X, Menu } from 'lucide-react';
import { BaguioLogo } from './Logo';
import { User, Notification } from '../types';

interface HeaderProps {
  user: User | null;
  onLoginClick?: () => void;
  isNavFixed?: boolean;
  onToggleNav?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onToggleMobileMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, onLoginClick, isNavFixed = true, onToggleNav, isDarkMode = false, 
  onToggleDarkMode, onToggleMobileMenu
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const loadNotifications = () => {
    const stored: Notification[] = JSON.parse(localStorage.getItem('grids_notifications') || '[]');
    // If admin, show all (including registrations). If user, show relevant to them.
    if (user?.role === 'Administrator') {
      setNotifications(stored);
    } else {
      // Filter out registration notifications for non-admins
      setNotifications(stored.filter((n: Notification) => n.title !== 'New Registration'));
    }
  };

  useEffect(() => {
    loadNotifications();
    window.addEventListener('storage', loadNotifications);
    return () => window.removeEventListener('storage', loadNotifications);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('grids_notifications', JSON.stringify([]));
    setNotifications([]);
  };

  const handleNotificationClick = (notif: Notification) => {
    // Mark as read
    const stored: Notification[] = JSON.parse(localStorage.getItem('grids_notifications') || '[]');
    const updated = stored.map(n => n.id === notif.id ? { ...n, isRead: true } : n);
    localStorage.setItem('grids_notifications', JSON.stringify(updated));
    setNotifications(updated);

    // Jump to interface
    if (notif.targetUrl) {
      navigate(notif.targetUrl);
    }
    setShowNotifications(false);
  };

  const headerBgClass = isDarkMode ? 'bg-[#1A1625]/80 border-white/5' : 'bg-white/80 border-white/20';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className={`${headerBgClass} backdrop-blur-md h-16 md:h-20 flex items-center justify-between px-4 md:px-10 border-b z-40 transition-all duration-300 ${isNavFixed ? 'sticky top-0' : 'relative'}`}>
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-gray-500 hover:text-purple-600 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>

        <a 
          href="https://new.baguio.gov.ph/home" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 md:gap-3 no-underline group"
        >
          <BaguioLogo />
          <span className={`text-base md:text-xl font-bold tracking-tight ${textClass} hidden xs:block`}>eGov: Baguio</span>
        </a>
      </div>

      <div className="flex items-center gap-3 md:gap-8">
        <button 
          onClick={() => user ? navigate('/profile') : onLoginClick?.()}
          className={`flex items-center gap-2 group md:px-4 py-1.5 rounded-full transition-all ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-white/50'}`}
        >
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all 
            ${isDarkMode ? 'border-white/20 text-white' : 'border-gray-900 text-gray-900 group-hover:bg-gray-900 group-hover:text-white'}`}>
            <UserIcon className="w-4 h-4 md:w-5 h-5" />
          </div>
          <span className={`text-[10px] md:text-sm font-bold ${textClass} hidden sm:block`}>
            {user ? `${user.firstName}` : 'Login'}
          </span>
        </button>

        <div className={`flex items-center gap-3 md:gap-6 ${textClass}`}>
          <button onClick={onToggleDarkMode} className="hover:scale-110 active:scale-90 transition-all p-1">
            {isDarkMode ? <Sun className="w-5 h-5 md:w-6 h-6 text-yellow-400" /> : <Moon className="w-5 h-5 md:w-6 h-6"/>}
          </button>
          
          <div className="relative" ref={notificationRef}>
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative hover:scale-110 active:scale-90 transition-all p-1">
              <Bell className="w-5 h-5 md:w-6 h-6"/>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full border-2 border-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={`absolute right-[-10px] md:right-0 mt-4 w-72 md:w-80 shadow-2xl rounded-2xl md:rounded-3xl border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 
                ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-white border-gray-100'}`}>
                <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                  <h3 className={`text-xs font-black uppercase tracking-widest ${textClass}`}>Notifications</h3>
                  <button onClick={clearNotifications} className="text-[8px] font-black uppercase text-purple-600 hover:underline">Clear All</button>
                </div>
                <div className="max-h-64 overflow-y-auto p-2 custom-scrollbar">
                  {notifications.length > 0 ? notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationClick(n)}
                      className={`p-4 rounded-xl transition-all cursor-pointer border-b last:border-0 
                        ${n.isRead ? '' : (isDarkMode ? 'bg-white/5' : 'bg-purple-50')}
                        ${isDarkMode ? 'hover:bg-white/10 border-white/5' : 'hover:bg-purple-100 border-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-xs font-black ${textClass}`}>{n.title}</h4>
                        <span className="text-[8px] font-bold text-gray-400">{n.date}</span>
                      </div>
                      <p className={`text-[10px] leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>{n.message}</p>
                    </div>
                  )) : (
                    <div className="py-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest opacity-50">No new alerts</div>
                  )}
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