import React, { useState, useEffect, useRef, useMemo } from 'react';
import { User } from '../types';
import { Search, Download, FileText, ExternalLink, Calendar, ChevronRight, ArrowRight, X, Database, Shield, Layout, Users, Activity, LogIn, Monitor, HelpCircle, CheckCircle, Clock } from 'lucide-react';
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
  
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(!!queryParam);
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ghostText, setGhostText] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Authorization flags
  const isAdmin = user?.role === 'Administrator';
  const isReviewer = user?.role === 'Data Reviewer' || isAdmin;

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

  const keywords = ['Literacy', 'Education', 'CBMS', 'Ordinance', 'Budget', 'Survey', 'Statistics', 'Baguio', 'Gender', 'Analysis', 'Policy', 'Report', 'Development', 'VAW', 'Health', 'Economy', 'Poverty'];

  useEffect(() => {
    if (queryParam) {
      const results = searchableItems.filter(item => 
        item.title.toLowerCase().includes(queryParam.toLowerCase()) || 
        item.description.toLowerCase().includes(queryParam.toLowerCase())
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
      const filtered = keywords.filter(k => k.toLowerCase().includes(value.toLowerCase())).sort();
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);

      const firstMatch = filtered.find(k => k.toLowerCase().startsWith(value.toLowerCase()));
      if (firstMatch && firstMatch.toLowerCase() !== value.toLowerCase()) {
        setGhostText(value + firstMatch.slice(value.length));
      } else {
        setGhostText('');
      }
    } else {
      setSearchParams({}, { replace: true });
      setShowSuggestions(false);
      setGhostText('');
    }
  };

  const executeSearch = (query: string = searchQuery) => {
    if (!query.trim()) return;
    setSearchParams({ q: query });
    setShowSuggestions(false);
    setGhostText('');
  };

  const featuredResources = [
    { title: "Annual Gender Report 2024", desc: "Comprehensive summary of gender statistics and city-wide initiatives.", type: "PDF", size: "4.2 MB", iconColor: "text-purple-600", iconBg: "bg-purple-50" },
    { title: "CBMS 2024 Household Data", desc: "Aggregated results from the latest Community-Based Monitoring System survey.", type: "XLS", size: "12.8 MB", iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
    { title: "City Ordinance No. 101-2023", desc: "Official legislation regarding gender-responsive budgeting and policy.", type: "DOC", size: "1.1 MB", iconColor: "text-blue-600", iconBg: "bg-blue-50" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-12">
      
      {/* Hero Section */}
      {!isSearching && (
        <div className="w-full relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl welcome-gradient">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 flex flex-col items-start justify-center px-12 lg:px-20 z-10 text-white">
            <span className="text-[12px] font-black uppercase tracking-[0.4em] mb-4 opacity-80">Baguio City GAD Portal</span>
            <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter mb-6 italic">
              Empowering through Data.
            </h1>
            <p className="max-w-xl text-lg opacity-90 font-medium mb-10 leading-relaxed">
              Gender-Responsive Integrated Database System. Access real-time indicators, policy documents, and community statistics.
            </p>
            {!user && (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-3 px-8 py-4 bg-white text-purple-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-purple-900/20 active:scale-95"
              >
                Get Started <ArrowRight size={18} />
              </button>
            )}
          </div>
          {/* Abstract SVG Background */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="#FFFFFF" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.2,-0.7C83.3,14.2,76.1,28.4,67.1,40.9C58.1,53.4,47.3,64.2,34.3,71.5C21.3,78.8,6,82.6,-8.9,81.1C-23.8,79.5,-38.3,72.7,-50.7,63.1C-63.1,53.6,-73.4,41.4,-78.9,27.3C-84.4,13.2,-85.1,-2.8,-81.4,-17.6C-77.7,-32.4,-69.5,-46,-58.1,-55C-46.7,-64.1,-32.1,-68.5,-18.3,-73.4C-4.5,-78.3,8.5,-83.7,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className={`w-full max-w-4xl mx-auto transition-all duration-500 ${isSearching ? 'mb-10' : 'mb-20'}`}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-20">
            <Search className={`transition-colors duration-300 ${searchQuery ? 'text-purple-600' : 'text-slate-400'}`} size={22} strokeWidth={2.5} />
          </div>
          
          <div className={`absolute inset-y-0 left-16 right-24 flex items-center pointer-events-none select-none z-10 text-base font-medium opacity-20 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {ghostText}
          </div>

          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
            className={`w-full pl-16 pr-24 py-6 rounded-3xl border shadow-lg text-lg font-medium focus:outline-none transition-all
              ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-4 focus:ring-purple-500/20' : 'bg-white border-slate-100 text-slate-900 focus:ring-8 focus:ring-purple-500/5 focus:border-purple-200'}`}
            placeholder="Search for indicators, ordinances, reports..."
          />
          
          <button 
            onClick={() => executeSearch()}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl transition-all active:scale-90 ${searchQuery ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}
          >
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className={`absolute left-0 right-0 mt-3 rounded-2xl shadow-2xl border overflow-hidden z-[60] animate-fade-in
            ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="p-2">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => executeSearch(s)}
                  className={`w-full text-left px-5 py-3 rounded-xl flex items-center gap-3 transition-all font-medium text-sm
                    ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-purple-50 text-slate-600 hover:text-purple-700'}`}
                >
                  <Search size={14} className="text-slate-300" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Area */}
      <div className="min-h-[400px]">
        {isSearching ? (
          <div className="animate-fade-in space-y-8">
            <div className="flex items-center justify-between px-2">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Search Results</h2>
                <p className="text-sm text-slate-400 font-medium">Found {searchResults.length} matches for "{queryParam}"</p>
              </div>
              <button 
                onClick={() => setSearchParams({})}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all active:scale-95"
              >
                <X size={16} /> Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {searchResults.length > 0 ? searchResults.map((result) => (
                <Link 
                  key={result.id} 
                  to={result.path}
                  className={`p-6 rounded-3xl border border-slate-100 bg-white transition-all flex items-center gap-6 group hover:shadow-xl hover:border-purple-200`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    {result.type === 'Indicator' ? <Activity size={24} /> : result.type === 'Policy' ? <Shield size={24} /> : <FileText size={24} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-500">{result.type}</span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{result.title}</h4>
                    </div>
                    <p className="text-sm text-slate-500 font-medium line-clamp-1">{result.description}</p>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-purple-600 transition-all" />
                </Link>
              )) : (
                <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                  <Database size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900">No results found</h3>
                  <p className="text-slate-400 mt-2">Try different keywords like "health", "budget", or "education".</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Reviewer Console Widget (Privileged View) */}
            {isReviewer && (
              <div className="animate-fade-in p-10 rounded-[40px] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                             <CheckCircle size={22} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Reviewer Console</span>
                       </div>
                       <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Manage Data Queue.</h3>
                       <p className="text-sm font-medium text-slate-400 max-w-lg leading-relaxed">
                          Authorized verification required for incoming city disaggregated datasets. Ensure data integrity and disaggregation compliance.
                       </p>
                    </div>
                    <Link 
                      to="/data-approval"
                      className="px-10 py-5 bg-white text-slate-900 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-purple-500 hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-3"
                    >
                      Enter Portal <ArrowRight size={18} strokeWidth={3} />
                    </Link>
                 </div>
                 {/* Decorative background icon */}
                 <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 opacity-5 pointer-events-none">
                    <Shield size={240} />
                 </div>
              </div>
            )}

            {/* Quick Actions / Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Indicators', path: '/gad-data', color: 'bg-purple-500', icon: Activity },
                { label: 'Statistics', path: '/cbms', color: 'bg-emerald-500', icon: Monitor },
                { label: 'Policies', path: '/policy', color: 'bg-blue-500', icon: Shield },
                { label: 'Help', path: '/help', color: 'bg-amber-500', icon: HelpCircle },
              ].map((cat, i) => (
                <Link 
                  key={i} 
                  to={cat.path}
                  className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center"
                >
                  <div className={`w-12 h-12 rounded-2xl ${cat.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <cat.icon size={24} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">{cat.label}</span>
                </Link>
              ))}
            </div>

            {/* Resources Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Featured Resources</h3>
                <Link to="/gad-data" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                  Browse All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredResources.map((res, i) => (
                  <div key={i} className="group p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${res.iconBg} ${res.iconColor}`}>
                      <FileText size={22} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{res.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8 flex-1">{res.desc}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{res.type} • {res.size}</span>
                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-purple-600 hover:text-white transition-all active:scale-90">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Links */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
              <div className="p-8 rounded-[32px] bg-purple-50 border border-purple-100 flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white text-purple-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Calendar size={28} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1 block">Announcement</span>
                  <h4 className="text-lg font-black text-slate-900 leading-tight">GAD Planning Workshop 2025</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Oct 15 • Baguio Convention Center</p>
                </div>
                <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-sm">Join</button>
              </div>

              <div className="p-8 rounded-[32px] bg-emerald-50 border border-emerald-100 flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <ExternalLink size={28} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 block">Partner Site</span>
                  <h4 className="text-lg font-black text-slate-900 leading-tight">Philippine Statistics Authority</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">National data disaggregation portals.</p>
                </div>
                <a href="https://psa.gov.ph" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm">Visit</a>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="pt-10 border-t border-slate-100 text-center opacity-40">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 leading-relaxed">
          City Government of Baguio • CPDSO CBMS Unit<br />
          Developed by Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;