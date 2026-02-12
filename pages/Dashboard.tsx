
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { 
  Search, Download, FileText, ChevronRight, ArrowRight, X, 
  Database, Layout, Users, Activity, Sparkles, BookOpen, 
  FileSearch, History, Globe, ShieldCheck, PieChart, TrendingUp,
  Clock, Calendar as CalendarIcon, Gavel, ShieldAlert, Award
} from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

interface DashboardProps {
  user: User | null;
  isDarkMode?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'Page' | 'Indicator' | 'Resource' | 'Member' | 'Section' | 'Policy' | 'Award' | 'Mechanism';
  path: string;
  description: string;
  keywords?: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, isDarkMode = false }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', { 
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' 
  });

  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', hour12: true 
  });

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(!!queryParam);
  
  const [ghostText, setGhostText] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ENHANCED INTELLIGENT SEARCH INDEX
  const searchableItems: SearchResult[] = [
    { id: 'p1', title: 'GAD Data and Analysis', type: 'Page', path: '/gad-data', description: 'Access 51 core Gender and Development indicators for Baguio City.' },
    { id: 'p2', title: 'CBMS Table Hub', type: 'Page', path: '/cbms', description: 'Official 2021 Community-Based Monitoring System data reports and records.', keywords: ['survey', 'census', 'economic'] },
    { id: 'p3', title: 'About GRIDS Project', type: 'Page', path: '/about', description: 'Information on the Gender-Responsive Integrated Database System initiative.' },
    { id: 'pol-cedaw', title: 'CEDAW Convention', type: 'Policy', path: '/policy', description: 'International convention on the elimination of discrimination against women.' },
    { id: 'pol-mcw', title: 'Magna Carta of Women', type: 'Policy', path: '/policy', description: 'RA 9710 - Comprehensive women\'s human rights law in the Philippines.' },
    { id: 'pol-safe', title: 'Safe Spaces Act', type: 'Policy', path: '/policy', description: 'RA 11313 - Gender-based sexual harassment protection law.' },
    { id: 'pol-jmc', title: 'PCW-DILG-DBM-NEDA JMC', type: 'Policy', path: '/policy', description: 'National joint guidelines for GAD planning and budgeting.' },
    { id: 'mech-siged', title: 'SIGED GAD Awards', type: 'Award', path: '/gad-data/institutional', description: 'Sustaining Initiatives on Gender Equality and Development recognition.' },
    { id: 'mech-agenda', title: 'Baguio GAD Agenda 2025-2030', type: 'Mechanism', path: '/gad-data/institutional', description: 'Six-year strategic roadmap for gender development in Baguio City.' },
    { id: 'mech-code', title: '2020 Amended GAD Code', type: 'Policy', path: '/gad-data/institutional', description: 'The local legislative framework governing gender rights in Baguio.' },
    { id: 'i1', title: 'Basic and Functional Literacy Rate', type: 'Indicator', path: '/analysis/literacy-rate', description: 'Statistics on literacy by sex and demographic association.' },
    { id: 'i2', title: 'School Completion Rate', type: 'Indicator', path: '/analysis/completion-rate', description: 'Elementary and secondary education completion metrics.' },
    { id: 'i45', title: 'GAD Budget Allocation', type: 'Indicator', path: '/analysis/gad-allocation', description: 'Monitoring city budget utilization for gender-responsive programs.' },
    { id: 'prog-cswdo', title: 'CSWDO Services', type: 'Page', path: '/programs', description: 'Social welfare, child protection, and family development services.' },
    { id: 'prog-hso', title: 'Health Services Office', type: 'Page', path: '/programs', description: 'Public health implementation and maternal care services.' }
  ];

  const keywords = ['Literacy', 'Education', 'CBMS', 'Budget', 'Survey', 'Statistics', 'Baguio', 'Gender', 'VAW', 'Health', 'Economy', 'Policy', 'Awards', 'SIGED', 'Magna Carta', 'JMC'];

  useEffect(() => {
    if (queryParam) {
      const q = queryParam.toLowerCase();
      const results = searchableItems.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q)))
      );
      setSearchResults(results);
      setIsSearching(true);
      setSearchQuery(queryParam);
    } else {
      setIsSearching(false);
      setSearchResults([]);
      setSearchQuery('');
    }
  }, [queryParam]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value }, { replace: true });
      const filtered = keywords.filter(term => term.toLowerCase().includes(value.toLowerCase())).slice(0, 3);
      const firstMatch = filtered.find(k => k.toLowerCase().startsWith(value.toLowerCase()));
      setGhostText(firstMatch && firstMatch.toLowerCase() !== value.toLowerCase() ? value + firstMatch.slice(value.length) : '');
    } else {
      setSearchParams({}, { replace: true });
      setGhostText('');
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Page': return <Layout size={20} />;
      case 'Indicator': return <Activity size={20} />;
      case 'Policy': return <Gavel size={20} />;
      case 'Award': return <Award size={20} />;
      case 'Mechanism': return <ShieldCheck size={20} />;
      case 'Section': return <PieChart size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-purple-300' : 'text-gray-500';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center animate-in fade-in duration-1000 scroll-smooth relative">
      
      {!isSearching && (
        <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between mb-8 text-center md:text-left animate-in slide-in-from-top-2 duration-1000">
           <div className="mb-4 md:mb-0">
             <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.95] ${textClass}`}>
               GRIDS Baguio
             </h1>
             <p className={`text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] ${subTextClass}`}>
               Gender-Responsive Integrated Database System
             </p>
           </div>
           
           <div className={`flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest ${textClass} opacity-60`}>
              <div className="flex items-center gap-2">
                <CalendarIcon size={14} className="text-purple-500" />
                <span>{formattedDate}</span>
              </div>
              <div className="w-px h-4 bg-gray-300/30"></div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-purple-500" />
                <span className="tabular-nums">{formattedTime}</span>
              </div>
           </div>
        </div>
      )}

      {!isSearching && (
        <div className="w-full max-w-6xl aspect-[16/6] md:aspect-[24/6] rounded-[32px] md:rounded-[48px] relative overflow-hidden flex items-center px-8 md:px-16 mb-8 shadow-xl">
           <div className={`absolute inset-0 transition-colors duration-500 ${isDarkMode ? 'bg-[#2A2438]' : 'bg-[#E5D1F8]'}`}>
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[140%] bg-green-500/10 blur-[100px] rounded-full"></div>
           </div>
           
           <div className="relative z-10 space-y-2">
             <h2 className={`text-[10px] md:text-xs font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                {getGreeting()}
             </h2>
             <h2 className={`text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tighter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
               {user ? `Welcome, ${user.firstName}!` : 'Welcome to GRIDS!'}
             </h2>
           </div>
        </div>
      )}

      {/* SEARCH BAR: Intelligent suggest and Category mapping */}
      <div className={`w-full max-w-6xl transition-all duration-500 ease-out z-10 px-0 md:px-4 ${isSearching ? 'mb-8 mt-0' : 'mb-12 md:mb-20'}`}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-6 md:left-14 flex items-center pointer-events-none z-30">
            <Search className={`${searchQuery ? 'text-purple-600' : (isDarkMode ? 'text-gray-500' : 'text-gray-400')} w-5 h-5 md:w-6 h-6`} strokeWidth={3} />
          </div>
          
          <div className={`hidden md:flex absolute inset-y-0 left-[100px] right-32 items-center pointer-events-none select-none z-10 text-lg font-bold opacity-20 overflow-hidden whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {ghostText}
          </div>

          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            className={`w-full pl-16 md:pl-24 pr-10 py-5 md:py-7 border-none rounded-[28px] md:rounded-[40px] shadow-lg text-sm md:text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:ring-4 md:focus:ring-8 focus:ring-purple-600/5 transition-all relative z-20
              ${isDarkMode ? 'bg-[#1A1625] text-white border border-white/5' : 'bg-white text-gray-900 border border-purple-50'}`}
            placeholder="Search database, policies, or mechanisms..."
          />
        </div>
      </div>

      <div className="w-full min-h-[400px] transition-all duration-500">
        {isSearching ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between px-4 gap-4">
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-purple-600">Smart Matches</h3>
              <button 
                onClick={() => setSearchParams({})}
                className={`flex items-center gap-2 text-[10px] font-black uppercase px-6 py-3 rounded-full border transition-colors
                  ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-purple-200 hover:bg-white/5' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                <X size={14} /> Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 pb-20">
              {searchResults.length > 0 ? searchResults.map((result) => (
                <button 
                  key={result.id} 
                  onClick={() => navigate(result.path)}
                  className={`w-full text-left p-6 md:p-7 rounded-[28px] md:rounded-[36px] border transition-all group flex items-center gap-6 md:gap-8 hover:shadow-xl
                    ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-gray-50 shadow-sm'}`}
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm
                    ${isDarkMode ? 'bg-[#2A2438] text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                    {getIconForType(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] md:text-[9px] font-black uppercase text-gray-400 block mb-0.5">{result.type}</span>
                    <h4 className={`text-sm md:text-xl font-black uppercase truncate ${textClass}`}>{result.title}</h4>
                    <p className={`text-[10px] md:text-xs font-medium truncate opacity-60 ${subTextClass}`}>{result.description}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                    ${isDarkMode ? 'bg-white/5 text-gray-500 group-hover:text-purple-400' : 'bg-gray-50 text-gray-300 md:group-hover:bg-purple-100 md:group-hover:text-purple-600'}`}>
                    <ArrowRight size={18} strokeWidth={3} />
                  </div>
                </button>
              )) : (
                <div className={`text-center py-20 rounded-[40px] border-4 border-dashed flex flex-col items-center ${isDarkMode ? 'bg-[#1A1625]/50 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                  <Search size={48} className="text-gray-200 mb-6" />
                  <h3 className={`text-2xl font-black uppercase tracking-tighter ${textClass}`}>No records found</h3>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-16 md:space-y-24 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className={`p-8 md:p-12 rounded-[40px] md:rounded-[56px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl
                ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-900/10' : 'bg-[#f8f5ff] border-purple-50'}`}>
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-[20px] md:rounded-[28px] flex items-center justify-center shadow-md
                  ${isDarkMode ? 'bg-[#2A2438] text-purple-400' : 'bg-white text-purple-600'}`}>
                  <BookOpen className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>Policies</h4>
                  <p className={`text-sm md:text-lg font-medium leading-relaxed ${subTextClass}`}>Review official city ordinances and national GAD mandates like CEDAW and Magna Carta.</p>
                  <Link to="/policy" className="inline-flex items-center gap-2 text-[10px] font-black text-purple-600 uppercase tracking-widest mt-4 group/link">
                    Explore Policies <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className={`p-8 md:p-12 rounded-[40px] md:rounded-[56px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl
                ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-green-900/10' : 'bg-[#f0fff4] border-green-50'}`}>
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-[20px] md:rounded-[28px] flex items-center justify-center shadow-md
                  ${isDarkMode ? 'bg-[#2A2438] text-green-400' : 'bg-white text-green-600'}`}>
                  <Users className="w-8 h-8 md:w-10 h-10" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>People</h4>
                  <p className={`text-sm md:text-lg font-medium leading-relaxed ${subTextClass}`}>Connect with dedicated Baguio City GFPS focal members and departmental leads.</p>
                  <Link to="/members" className="inline-flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest mt-4 group/link">
                    View Focal Points <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="w-full flex flex-col items-center pt-16 pb-8 border-t border-gray-100 dark:border-white/5">
        <p className={`text-[9px] font-black uppercase tracking-[0.6em] text-center leading-loose px-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          Copyright © City Government of Baguio<br />
          City Planning Development Service Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
