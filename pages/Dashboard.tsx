
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { 
  Search, Download, FileText, ChevronRight, ArrowRight, X, 
  Database, Layout, Users, Activity, Sparkles, BookOpen, 
  FileSearch, History, Globe, ShieldCheck, PieChart, TrendingUp,
  Clock, Calendar as CalendarIcon, Gavel, ShieldAlert, Award, Info, HelpCircle
} from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { CPDSOLogo, Logo } from '../components/Logo';
import PageLayout from '../components/PageLayout';

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
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
  });

  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
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

  const searchableItems: SearchResult[] = [
    { id: 'p1', title: 'GAD Data and Analysis', type: 'Page', path: '/gad-data', description: 'Access 51 core Gender and Development indicators for Baguio City.' },
    { id: 'p2', title: 'CBMS Table', type: 'Page', path: '/cbms', description: 'Official 2021 Community-Based Monitoring System data reports and records.', keywords: ['survey', 'census', 'economic'] },
    { id: 'p3', title: 'About GRIDS Project', type: 'Page', path: '/about', description: 'Information on the Gender-Responsive Integrated Database System initiative.' },
    { id: 'pol-cedaw', title: 'CEDAW Convention', type: 'Policy', path: '/policy', description: 'International convention on the elimination of discrimination against women.' },
    { id: 'pol-mcw', title: 'Magna Carta of Women', type: 'Policy', path: '/policy', description: 'RA 9710 - Comprehensive women\'s human rights law in the Philippines.' },
    { id: 'pol-safe', title: 'Safe Spaces Act', type: 'Policy', path: '/policy', description: 'RA 11313 - Gender-based sexual harassment protection law.' },
    { id: 'pol-jmc', title: 'PCW-DILG-DBM-NEDA JMC', type: 'Policy', path: '/policy', description: 'National joint guidelines for GAD planning and budgeting.' },
    { id: 'mech-siged', title: 'SIGED GAD Awards', type: 'Award', path: '/gad-data/institutional', description: 'Sustaining Initiatives on Gender Equality and Development recognition.' },
    { id: 'mech-agenda', title: 'Baguio GAD Agenda 2025-2030', type: 'Mechanism', path: '/gad-data/institutional', description: 'Six-year strategic roadmap for gender development in Baguio City.' },
    { id: 'mech-code', title: '2020 Amended GAD Code', type: 'Policy', path: '/gad-data/institutional', description: 'The local legislative framework governing gender rights in Baguio.' },
    { id: 'i1', title: 'Basic and Functional Literacy Rate', type: 'Indicator', path: '/gad-data/education-and-training/literacy-rate', description: 'Statistics on literacy by sex and demographic association.' },
    { id: 'i2', title: 'School Completion Rate', type: 'Indicator', path: '/gad-data/education-and-training/completion-rate', description: 'Elementary and secondary education completion metrics.' },
    { id: 'prog-cswdo', title: 'CSWDO Services', type: 'Page', path: '/programs', description: 'Social welfare, child protection, and family development services.' }
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

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title={isSearching ? "Search Results" : "GRIDS"}
      subtitle={isSearching ? `Found ${searchResults.length} matches for "${searchQuery}"` : "Gender-Responsive Integrated Database System"}
      headerActions={
        <div className="relative group w-full sm:w-80">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors z-20">
            <Search size={18} strokeWidth={3} />
          </div>
          
          {/* Ghost Text Suggestion */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-200 dark:text-white/5">
              {searchQuery && ghostText ? searchQuery : ''}
              <span className="opacity-100">{searchQuery && ghostText ? ghostText.slice(searchQuery.length) : ''}</span>
            </span>
          </div>

          <input 
            type="text" 
            placeholder="Search database or records..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={`w-full pl-12 pr-10 py-4 rounded-[28px] border shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-600/10 transition-all text-[11px] font-black uppercase tracking-widest relative z-10 bg-transparent
              ${isDarkMode ? 'text-white border-white/5' : 'text-gray-900 border-purple-50'}`}
          />

          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
                setGhostText('');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors z-20"
            >
              <X size={14} strokeWidth={3} />
            </button>
          )}
        </div>
      }
    >
      {!isSearching && (
        <>
          <div className="w-full flex flex-col items-center mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <p className={`text-sm md:text-lg font-medium uppercase tracking-[0.3em] ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {formattedDate}
            </p>
            <p className={`text-sm md:text-lg font-medium uppercase tracking-[0.3em] mt-1 ${textClass}`}>
              {formattedTime}
            </p>
          </div>
          <div className="w-full max-w-6xl aspect-[16/6] md:aspect-[24/6] rounded-[32px] md:rounded-[48px] relative overflow-hidden flex items-center px-8 md:px-16 mb-16 shadow-xl">
             <div className={`absolute inset-0 transition-colors duration-500 ${isDarkMode ? 'bg-[#2A2438]' : 'bg-[#E5D1F8]'}`}>
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[140%] bg-green-500/10 blur-[100px] rounded-full"></div>
             </div>
             
             <div className="relative z-10 space-y-2">
               <h2 className={`text-[10px] md:text-xs font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                  {getGreeting()}
               </h2>
               <h2 className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                 {user ? `Welcome, ${user.firstName}!` : 'Welcome to GRIDS!'}
               </h2>
             </div>
          </div>
        </>
      )}

      {!isSearching && (
        <div className="w-full max-w-6xl space-y-20 mb-20">
          {/* Quick Access */}
          <div className="space-y-8">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-purple-600">Quick Access</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* GAD Indicators */}
              <div 
                onClick={() => navigate('/gad-data')}
                className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/10' : 'bg-[#f8f5ff] border-purple-50'}`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center shadow-md transition-all group-hover:scale-110
                  ${isDarkMode ? 'bg-[#2A2438] text-purple-400' : 'bg-white text-purple-600'}`}>
                  <PieChart className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>GAD Indicators</h4>
                  <p className={`text-sm font-medium leading-relaxed text-gray-500`}>Access 51 core Gender and Development indicators for Baguio City.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black text-purple-600 uppercase tracking-widest mt-4 group/link">
                    View Indicators <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* CBMS Data Hub */}
              <div 
                onClick={() => navigate('/cbms')}
                className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-blue-950/10' : 'bg-[#f0f7ff] border-blue-50'}`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center shadow-md transition-all group-hover:scale-110
                  ${isDarkMode ? 'bg-[#2A2438] text-blue-400' : 'bg-white text-blue-600'}`}>
                  <Database className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>CBMS Data Hub</h4>
                  <p className={`text-sm font-medium leading-relaxed text-gray-500`}>Official 2021 Community-Based Monitoring System data reports and records.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest mt-4 group/link">
                    Explore Data <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div 
                onClick={() => navigate('/policy')}
                className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/10' : 'bg-[#f8f5ff] border-purple-50'}`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center shadow-md transition-all group-hover:scale-110
                  ${isDarkMode ? 'bg-[#2A2438] text-purple-400' : 'bg-white text-purple-600'}`}>
                  <BookOpen className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>Policies</h4>
                  <p className={`text-sm font-medium leading-relaxed text-gray-500`}>Review official city ordinances and national GAD mandates like CEDAW and Magna Carta.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black text-purple-600 uppercase tracking-widest mt-4 group/link">
                    Explore Policies <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* GAD Programs */}
              <div 
                onClick={() => navigate('/programs')}
                className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-orange-950/10' : 'bg-[#fff9f0] border-orange-50'}`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center shadow-md transition-all group-hover:scale-110
                  ${isDarkMode ? 'bg-[#2A2438] text-orange-400' : 'bg-white text-orange-600'}`}>
                  <Sparkles className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>GAD Programs</h4>
                  <p className={`text-sm font-medium leading-relaxed text-gray-500`}>Explore city-wide social welfare, child protection, and family development initiatives.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-widest mt-4 group/link">
                    View Programs <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* People */}
              <div 
                onClick={() => navigate('/members')}
                className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-green-950/10' : 'bg-[#f0fff4] border-green-50'}`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center shadow-md transition-all group-hover:scale-110
                  ${isDarkMode ? 'bg-[#2A2438] text-green-400' : 'bg-white text-green-600'}`}>
                  <Users className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>People</h4>
                  <p className={`text-sm font-medium leading-relaxed text-gray-500`}>Connect with dedicated Baguio City GFPS focal members and departmental leads.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest mt-4 group/link">
                    View Focal Points <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div 
                onClick={() => navigate('/help')}
                className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col items-start gap-6 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/10' : 'bg-[#fffbf5] border-purple-50'}`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center shadow-md transition-all group-hover:scale-110
                  ${isDarkMode ? 'bg-[#2A2438] text-purple-400' : 'bg-white text-purple-600'}`}>
                  <HelpCircle className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>FAQs</h4>
                  <p className={`text-sm font-medium leading-relaxed text-gray-500`}>Find answers to common questions about GRIDS usage, data, and policies.</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black text-purple-600 uppercase tracking-widest mt-4 group/link">
                    Get Help <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News & Announcements */}
          <div className="space-y-8">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-blue-600">Latest Updates</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col md:flex-row items-start md:items-center gap-8 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/10' : 'bg-[#f8f5ff] border-purple-50'}`}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] flex items-center justify-center shadow-md transition-all group-hover:scale-110 shrink-0
                  ${isDarkMode ? 'bg-[#2A2438] text-purple-400' : 'bg-white text-purple-600'}`}>
                  <CalendarIcon className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em]">Event • March 2026</span>
                  <h4 className={`text-xl md:text-3xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>National Women's Month Celebration</h4>
                  <p className={`text-sm md:text-lg font-medium leading-relaxed text-gray-500`}>Join us for the 2026 Women's Month kick-off ceremony at Baguio City Hall. Empowering women, building a better future.</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0
                  ${isDarkMode ? 'bg-white/5 text-gray-500 group-hover:text-purple-400' : 'bg-white text-gray-300 group-hover:bg-purple-600 group-hover:text-white'}`}>
                  <ArrowRight size={24} strokeWidth={3} />
                </div>
              </div>

              <div className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col md:flex-row items-start md:items-center gap-8 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-blue-950/10' : 'bg-[#f0f7ff] border-blue-50'}`}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] flex items-center justify-center shadow-md transition-all group-hover:scale-110 shrink-0
                  ${isDarkMode ? 'bg-[#2A2438] text-blue-400' : 'bg-white text-blue-600'}`}>
                  <Info className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Announcement</span>
                  <h4 className={`text-xl md:text-3xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>New CBMS Data Released</h4>
                  <p className={`text-sm md:text-lg font-medium leading-relaxed text-gray-500`}>The 2021 Pilot CBMS Section Q (WASH) data is now available in the Data Hub for public access and analysis.</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0
                  ${isDarkMode ? 'bg-white/5 text-gray-500 group-hover:text-blue-400' : 'bg-white text-gray-300 group-hover:bg-blue-600 group-hover:text-white'}`}>
                  <ArrowRight size={24} strokeWidth={3} />
                </div>
              </div>

              <div className={`p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 flex flex-col md:flex-row items-start md:items-center gap-8 group shadow-sm transition-all hover:shadow-2xl cursor-pointer
                ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-green-950/10' : 'bg-[#f0fff4] border-green-50'}`}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] flex items-center justify-center shadow-md transition-all group-hover:scale-110 shrink-0
                  ${isDarkMode ? 'bg-[#2A2438] text-green-400' : 'bg-white text-green-600'}`}>
                  <Award className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">News</span>
                  <h4 className={`text-xl md:text-3xl font-black uppercase tracking-tighter leading-tight ${textClass}`}>SIGED Awards 2026 Nominations</h4>
                  <p className={`text-sm md:text-lg font-medium leading-relaxed text-gray-500`}>Nominations for the Sustaining Initiatives on Gender Equality are now open. Recognize excellence in GAD implementation.</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0
                  ${isDarkMode ? 'bg-white/5 text-gray-500 group-hover:text-green-400' : 'bg-white text-gray-300 group-hover:bg-green-600 group-hover:text-white'}`}>
                  <ArrowRight size={24} strokeWidth={3} />
                </div>
              </div>
            </div>
            
            <button className="w-full py-6 rounded-[32px] border-2 border-dashed border-gray-200 dark:border-white/10 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-purple-600 hover:border-purple-600/50 transition-all">
              View All Updates & Announcements
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex-1 transition-all duration-500">
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

            <div className="grid grid-cols-1 gap-3 pb-12">
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
                    <p className={`text-[10px] md:text-xs font-medium truncate opacity-60 text-gray-500`}>{result.description}</p>
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
        ) : null}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
