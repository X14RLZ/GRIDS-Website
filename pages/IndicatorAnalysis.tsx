
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Info, AlertTriangle, Lightbulb, Target, TrendingUp, BarChart2, Circle, Hash } from 'lucide-react';
import { Logo } from '../components/Logo';

const IndicatorAnalysis: React.FC = () => {
  const { indicatorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('general');
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  const navItems = [
    { id: 'general', title: 'General Overview', icon: BarChart2 },
    { id: 'by-sex', title: 'Distribution By Sex', icon: TrendingUp },
    { id: 'association', title: 'Demographic Associations', icon: Info },
    { id: 'by-age-a', title: 'Age Profile (A)', icon: Target },
    { id: 'by-age-b', title: 'Age Distribution (B)', icon: Hash },
    { id: 'by-difficulty', title: 'By Difficulty Type', icon: AlertTriangle },
  ];

  // Handle auto-scroll on mount if hash exists
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.split('#').pop();
        if (id) scrollToSection(id);
      }, 300);
    }
  }, [location.pathname]);

  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollOffset = scrollContainerRef.current.scrollTop + (elementTop - containerTop) - 24;

      scrollContainerRef.current.scrollTo({
        top: scrollOffset,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col animate-in fade-in duration-700 bg-white overflow-hidden">
      <div className="flex h-full min-h-0">
        <aside className="hidden lg:flex w-80 bg-[#fdfaff] border-r border-purple-100 flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="p-8 pb-32">
            <div className="mb-10 px-2">
              <h2 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-4">
                Analysis Dashboard
              </h2>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-purple-50">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xs">1A</div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Indicator</span>
                  <span className="text-[10px] font-black text-gray-900 uppercase truncate max-w-[140px]">Basic Literacy</span>
                </div>
              </div>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative flex items-center gap-4 w-full text-left p-4 transition-all duration-300 rounded-2xl
                      ${isActive 
                        ? 'text-purple-700 bg-purple-100/50 shadow-sm translate-x-1' 
                        : 'text-gray-400 hover:text-purple-400 hover:bg-white hover:translate-x-1'
                      }
                    `}
                  >
                    <div className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-full transition-all duration-500
                      ${isActive ? 'bg-purple-600 scale-y-100 opacity-100' : 'bg-purple-200 scale-y-0 opacity-0 group-hover:scale-y-50 group-hover:opacity-50'}
                    `} />
                    <item.icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-purple-600' : 'text-gray-300 group-hover:text-purple-300'}`} />
                    <span className={`text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${isActive ? 'translate-x-1' : ''}`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth bg-white min-h-0" ref={scrollContainerRef}>
          <div className="max-w-5xl mx-auto p-8 lg:p-20 pb-64">
            <div className="mb-24 space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="px-4 py-1.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-purple-200">Indicator 1A</span>
                <span className="h-px w-12 bg-gray-100"></span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Education Sector</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
                Basic and Functional<br />Literacy Rate, By Sex
              </h1>
              <div className="h-2 w-48 bg-purple-600 rounded-full"></div>
            </div>

            <section id="general" className="mb-40 space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <h3 className="text-6xl font-black text-gray-900 uppercase tracking-tighter">General.</h3>
                <div className="flex items-center gap-4"><p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Source: 2021 Pilot CBMS</p><div className="h-1 flex-1 bg-gray-50 rounded-full"></div></div>
              </div>
              <div className="bg-[#fdfaff] p-10 rounded-[48px] border border-purple-100 shadow-sm overflow-hidden">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b-2 border-purple-100">
                      <th className="py-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Total Population</th>
                      <th className="py-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Literate Count</th>
                      <th className="py-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Illiterate Count</th>
                      <th className="py-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Literacy Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-2xl font-black text-gray-800">
                      <td className="py-12 px-4 tabular-nums">260,203</td>
                      <td className="py-12 px-4 tabular-nums text-purple-600">258,793</td>
                      <td className="py-12 px-4 tabular-nums text-gray-400">1,410</td>
                      <td className="py-12 px-4 tabular-nums">99.46%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <footer className="pt-32 border-t border-gray-100 text-center">
              <div className="mb-12"><Logo size="md" /></div>
              <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em] text-center leading-[2.5]">
                Copyright © City Government of Baguio<br />
                City Planning, Development, and Sustainability Office<br />
                Developed by: Charles S. Chantioco
              </p>
            </footer>
          </div>
        </main>
      </div>

      <button 
        onClick={() => navigate(-1)}
        className="fixed bottom-10 right-10 flex items-center gap-4 px-8 py-5 bg-black text-white rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all z-50 group border border-white/10"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform duration-300" />
        <span className="hidden md:inline font-black text-xs uppercase tracking-[0.2em]">
          {isFromSearch ? "Search Results" : "Previous Page"}
        </span>
      </button>
    </div>
  );
};

export default IndicatorAnalysis;
