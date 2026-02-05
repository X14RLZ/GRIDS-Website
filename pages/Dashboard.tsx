
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { Search, Download, FileText, ExternalLink, Calendar, ChevronRight, ArrowRight, X, Database, Shield, Layout, Users, Activity, LogIn } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

interface DashboardProps {
  user: User | null;
  isDarkMode?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'Page' | 'Indicator' | 'Resource' | 'Member' | 'Section' | 'Policy';
  path: string;
  description: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isDarkMode = false }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState(new Date());
  
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(!!queryParam);
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [ghostText, setGhostText] = useState('');
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchableItems: SearchResult[] = [
    { id: 'p1', title: 'GAD Data and Analysis', type: 'Page', path: '/gad-data', description: 'Core Gender and Development indicators and analysis portal.' },
    { id: 'p2', title: 'CBMS Table', type: 'Page', path: '/cbms', description: 'Community-Based Monitoring System data tables.' },
    { id: 'p3', title: 'About GRIDS', type: 'Page', path: '/about', description: 'Information about the Gender-Responsive Integrated Database System.' },
    { id: 'p4', title: 'Privacy Policy', type: 'Policy', path: '/privacy-policy', description: 'Data protection and privacy guidelines compliant with RA 10173.' },
    { id: 'p5', title: 'Contact Us', type: 'Page', path: '/contact', description: 'Get in touch with the Baguio City Planning and Development Office.' },
    { id: 'p6', title: 'Help and FAQs', type: 'Page', path: '/help', description: 'Frequently asked questions for Citizens, GFPS, and Officials.' },
    { id: 'p7', title: 'People / GFPS Members', type: 'Page', path: '/members', description: 'Directory of Baguio City GAD Focal Point System members.' },
    { id: 'i1', title: 'Basic and Functional Literacy Rate', type: 'Indicator', path: '/analysis/literacy-rate', description: 'Statistics on literacy disaggregated by sex and age group.' },
    { id: 'i2', title: 'School Completion Rate', type: 'Indicator', path: '/analysis/completion-rate', description: 'Elementary and Highschool completion statistics by sex.' },
    { id: 'i9', title: 'Seats Held by Women in Government', type: 'Indicator', path: '/analysis/govt-seats', description: 'Proportion of seats held by women in national and local government.' },
    { id: 'i10', title: 'GAD Budget Allocation', type: 'Indicator', path: '/analysis/gad-allocation', description: 'Annual Gender and Development budget and utilization stats.' },
    { id: 'r1', title: 'Annual Gender Report 2024', type: 'Resource', path: '/view/r1', description: 'Yearly summary of gender-responsive initiatives (XLS).' },
    { id: 'r2', title: 'CBMS 2024 Household Data', type: 'Resource', path: '/view/r2', description: 'Aggregated results from the latest household survey.' },
  ];

  const keywords = ['Literacy', 'Education', 'CBMS', 'Ordinance', 'Budget', 'Survey', 'Statistics', 'Baguio', 'Gender', 'Analysis', 'Policy', 'Report', 'Development', 'Integrated', 'Database', 'VAW', 'Health', 'Economy', 'Poverty', 'Rights', 'Staff', 'FAQ', 'Help'];

  useEffect(() => {
    if (queryParam) {
      const results = searchableItems.filter(item => 
        item.title.toLowerCase().includes(queryParam.toLowerCase()) || 
        item.description.toLowerCase().includes(queryParam.toLowerCase()) ||
        item.type.toLowerCase().includes(queryParam.toLowerCase())
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
    } else {
      setSearchParams({}, { replace: true });
    }
    
    if (value.trim().length > 0) {
      const filtered = keywords.filter(k => k.toLowerCase().includes(value.toLowerCase())).sort();
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);

      const firstMatch = filtered.find(k => k.toLowerCase().startsWith(value.toLowerCase()));
      if (firstMatch && firstMatch.toLowerCase() !== value.toLowerCase()) {
        setGhostText(value + firstMatch.slice(value.length));
      } else {
        setGhostText('');
      }
    } else {
      setShowSuggestions(false);
      setGhostText('');
    }
  };

  const executeSearch = (query: string = searchQuery) => {
    if (!query.trim()) return;
    setSearchParams({ q: query }, { replace: false });
    setShowSuggestions(false);
    setGhostText('');
    searchInputRef.current?.blur();
  };

  const handleClearResults = () => {
    setSearchParams({}, { replace: false });
    setShowSuggestions(false);
    setGhostText('');
    setSearchQuery('');
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 300);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Page': return <Layout size={20} />;
      case 'Indicator': return <Activity size={20} />;
      case 'Resource': return <Database size={20} />;
      case 'Member': return <Users size={20} />;
      case 'Policy': return <Shield size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const featuredResources = [
    { title: "ANNUAL GENDER REPORT 2024", desc: "Comprehensive summary of gender statistics and city-wide initiatives.", type: "PDF", size: "4.2 MB", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "CBMS 2024 HOUSEHOLD DATA", desc: "Aggregated results from the latest Community-Based Monitoring System survey.", type: "XLS", size: "12.8 MB", color: "text-green-600", bg: "bg-green-50" },
    { title: "CITY ORDINANCE NO. 101-2023", desc: "Official legislation regarding gender-responsive budgeting and policy.", type: "DOC", size: "1.1 MB", color: "text-blue-600", bg: "bg-blue-50" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-10 py-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Welcome Banner - Primary dissemination focal point */}
      <div className="w-full relative h-[320px] rounded-[48px] overflow-hidden shadow-2xl welcome-gradient mb-10">
        <div className="absolute inset-0 flex flex-col items-start justify-center px-16 z-10">
          <h2 className="text-white text-[100px] lg:text-[130px] font-black leading-none tracking-tighter">Welcome!</h2>
          {!user && (
            <div className="flex items-center gap-4 mt-4">
              <span className="text-white/80 font-black text-xs uppercase tracking-[0.3em]">Guest Portal</span>
              <div className="h-px w-12 bg-white/40"></div>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform"
              >
                Sign in to manage <LogIn size={14} />
              </button>
            </div>
          )}
        </div>
        <div className="absolute inset-0 z-0 opacity-40">
          <svg className="absolute bottom-0 left-0 w-full h-[80%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L80,186.7C160,213,320,267,480,261.3C640,256,800,192,960,186.7C1120,181,1280,235,1360,261.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* SEARCH BAR - Dissemination Hub primary tool */}
      <div 
        className={`w-full max-w-5xl mb-16 relative transition-all duration-300 ease-out z-50
          ${isPopping ? 'scale-105 shadow-[0_20px_60px_rgba(139,68,175,0.2)]' : 'scale-100'}`} 
        ref={suggestionRef}
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none z-20">
            <Search className={`transition-colors duration-300 ${searchQuery ? 'text-purple-600' : 'text-gray-400'}`} size={20} strokeWidth={3} />
          </div>
          
          <div className={`absolute inset-y-0 left-16 right-24 flex items-center pointer-events-none select-none z-10 text-sm font-bold opacity-30
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {ghostText}
          </div>

          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') executeSearch();
              if ((e.key === 'Tab' || e.key === 'ArrowRight') && ghostText) {
                e.preventDefault();
                setSearchQuery(ghostText);
                setGhostText('');
              }
            }}
            className={`w-full pl-16 pr-24 py-6 border-none rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] text-sm font-bold placeholder:text-gray-400 focus:outline-none transition-all relative z-20 bg-transparent
              ${isDarkMode ? 'text-white ring-1 ring-white/5 focus:ring-[#B17FE1]/50' : 'text-gray-900 ring-1 ring-gray-100 focus:ring-purple-200'}`}
            style={{ 
              backgroundColor: isDarkMode ? '#2A2438' : 'white',
              caretColor: isDarkMode ? '#B17FE1' : '#8B44AF' 
            }}
            placeholder="Search for indicators, ordinances, reports, or help..."
          />
          
          <button 
            onClick={() => executeSearch()}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl transition-all active:scale-90 z-30
              ${searchQuery ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-50 text-gray-300'}`}
          >
            <ArrowRight size={22} strokeWidth={3} />
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className={`absolute top-full left-0 right-0 mt-3 rounded-[32px] shadow-2xl overflow-hidden z-[60] border animate-in fade-in slide-in-from-top-2 backdrop-blur-xl
            ${isDarkMode ? 'bg-[#2A2438]/90 border-white/5' : 'bg-white/95 border-gray-100'}`}>
            <div className="p-3">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => executeSearch(s)}
                  className={`w-full text-left px-6 py-4 rounded-2xl flex items-center gap-4 transition-all font-bold text-sm group
                    ${isDarkMode ? 'hover:bg-white/5 text-gray-300 hover:text-white' : 'hover:bg-purple-50 text-gray-600 hover:text-purple-700'}`}
                >
                  <Search size={14} strokeWidth={3} className="text-gray-400 group-hover:text-purple-600" />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full min-h-[500px]">
        {isSearching ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
            <div className="flex items-center justify-between px-2">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">APP SEARCH RESULTS</h2>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Displaying matches within GRIDS for "{queryParam}"</p>
              </div>
              <button 
                onClick={handleClearResults}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full border border-gray-100 bg-white text-gray-900 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm active:scale-95"
              >
                <X size={16} /> Exit Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 pb-20">
              {searchResults.length > 0 ? searchResults.map((result) => (
                <button 
                  key={result.id} 
                  onClick={() => navigate(result.path)}
                  className="w-full text-left p-8 rounded-[40px] border border-gray-100 bg-white transition-all group flex items-start gap-6 hover:shadow-xl hover:translate-x-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    {getIconForType(result.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gray-100 text-gray-500">{result.type}</span>
                      <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">{result.title}</h4>
                    </div>
                    <p className="text-sm font-medium text-gray-500 line-clamp-2">{result.description}</p>
                  </div>
                  <ArrowRight size={20} strokeWidth={3} className="text-purple-600 group-hover:bg-purple-100 transition-all self-center p-4 rounded-full" />
                </button>
              )) : (
                <div className="text-center py-24 rounded-[48px] border-2 border-dashed border-gray-100 bg-gray-50/50">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">No content matches found</h3>
                  <p className="text-sm font-bold text-gray-400">Try keywords like 'Literacy', 'Health', 'CBMS', or 'Budget'.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700 space-y-16">
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900">RECENT RESOURCES & DOWNLOADS</h3>
                <Link to="/gad-data" className="flex items-center gap-2 text-[11px] font-black text-purple-600 uppercase tracking-widest hover:translate-x-1 transition-all">
                  VIEW ALL RESOURCES <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredResources.map((res, i) => (
                  <div key={i} className="p-10 rounded-[48px] border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${res.bg} ${res.color}`}>
                      <FileText size={26} />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-none">
                      {res.title}
                    </h4>
                    <p className="text-[11px] font-medium leading-relaxed text-gray-400 mb-12 flex-1">
                      {res.desc}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-0.5">{res.type}</span>
                        <span className="text-[11px] font-black text-gray-900">{res.size}</span>
                      </div>
                      <button className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-900 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all active:scale-90 shadow-sm">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Cards - Alignment Fix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
              {/* Announcement Card */}
              <div className="p-10 rounded-[48px] bg-[#f8f6ff] border border-purple-100 flex items-center gap-8 group shadow-sm">
                <div className="w-20 h-20 rounded-[28px] bg-white text-purple-600 flex items-center justify-center shadow-sm flex-shrink-0 transition-transform group-hover:scale-105">
                  <Calendar size={36} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#B17FE1] mb-1.5 block">ANNOUNCEMENT</span>
                  <h4 className="text-[22px] font-black uppercase tracking-tight text-gray-900 mb-1.5 leading-none">UPCOMING GAD PLANNING WORKSHOP</h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">October 15, 2025 • Baguio Convention Center</p>
                </div>
                <button className="px-10 py-5 bg-white text-gray-900 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-95">
                  REGISTER
                </button>
              </div>

              {/* Partner Link Card */}
              <div className="p-10 rounded-[48px] bg-[#f0fff4] border border-green-100 flex items-center gap-8 group shadow-sm">
                <div className="w-20 h-20 rounded-[28px] bg-white text-green-600 flex items-center justify-center shadow-sm flex-shrink-0 transition-transform group-hover:scale-105">
                  <ExternalLink size={36} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500 mb-1.5 block">PARTNER LINK</span>
                  <h4 className="text-[22px] font-black uppercase tracking-tight text-gray-900 mb-1.5 leading-none">PHILIPPINE STATISTICS AUTHORITY</h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Access national disaggregated data portals.</p>
                </div>
                <a href="https://psa.gov.ph" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-gray-900 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-green-600 hover:text-white transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-95">
                  VISIT SITE
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="w-full flex flex-col items-center pt-10 pb-8 border-t border-gray-50">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-center leading-relaxed opacity-30 text-gray-900">
          Copyright © City Government of Baguio<br />
          City Planning Development Service Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
