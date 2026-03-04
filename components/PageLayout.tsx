
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { ChevronUp } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  title: React.ReactNode;
  subtitle?: string;
  description?: string;
  headerActions?: React.ReactNode;
  maxWidth?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  isDarkMode, 
  title, 
  subtitle, 
  description, 
  headerActions,
  maxWidth = "max-w-7xl"
}) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`flex-1 w-full ${maxWidth} mx-auto p-4 md:p-6 animate-in fade-in duration-700 relative flex flex-col min-h-full`}>
      <header className={`mb-2 md:mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-2 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="max-w-2xl text-left">
          {subtitle && (
            <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-1">
              {subtitle}
            </p>
          )}
          <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none flex items-center gap-4 ${textClass}`}>
            {title}
          </h1>
          {description && (
            <p className={`text-sm md:text-lg font-medium leading-relaxed text-gray-500 mt-2`}>
              {description}
            </p>
          )}
          <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-2"></div>
        </div>
        
        {headerActions && (
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 items-end md:items-end ml-auto">
            {headerActions}
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col mb-2 md:mb-4">
        {children}
      </main>

      <Footer isDarkMode={isDarkMode} />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-2xl shadow-2xl transition-all duration-300 z-50 group active:scale-90
          ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}
          ${isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-gray-900 text-white hover:bg-purple-600'}`}
        aria-label="Back to top"
      >
        <ChevronUp size={24} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default PageLayout;
