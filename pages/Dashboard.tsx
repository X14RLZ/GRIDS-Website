
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { Search, Download, FileText, ExternalLink, Calendar, ChevronRight, ArrowRight, X, Clock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface DashboardProps {
  user: User | null;
  isDarkMode?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'Page' | 'Indicator' | 'Resource' | 'Member' | 'Section';
  path: string;
  description: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isDarkMode = false }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  
  // State persistence via localStorage
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('grids_search_query') || '');
  const [searchResults, setSearchResults] = useState<SearchResult[]>(() => {
    const saved = localStorage.getItem('grids_search_results');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSearching, setIsSearching] = useState(() => localStorage.getItem('grids_is_searching') === 'true');
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [ghostText, setGhostText] = useState('');
  
  const suggestionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search Database
  const searchableItems: SearchResult[] = [
    { id: '1', title: 'GAD Data and Analysis', type: 'Page', path: '/gad-data', description: 'Core Gender and Development indicators and analysis portal.' },
    { id: '2', title: 'CBMS Table', type: 'Page', path: '/cbms', description: 'Community-Based Monitoring System data tables.' },
    { id: '3', title: 'About GRIDS', type: 'Page', path: '/about', description: 'Information about the Gender-Responsive Integrated Database System.' },
    { id: '4', title: 'Privacy Policy', type: 'Page', path: '/policy', description: 'Data protection and privacy guidelines.' },
    { id: '5', title: 'GFPS Members', type: 'Member', path: '/members', description: 'Baguio City GAD Focal Point System members directory.' },
    { id: '6', title: 'Basic Literacy Rate', type: 'Indicator', path: '/analysis/basic-literacy-rate', description: 'Statistics on basic and functional literacy disaggregated by sex.' },
    { id: '7', title: 'Literacy Distribution By Sex', type: 'Section', path: '/analysis/basic-literacy-rate#by-sex', description: 'Jump to the comparison of literacy rates between males and females.' },
    { id: '8', title: 'Annual Gender Report 2024', type: 'Resource', path: '/view/1', description: 'Yearly summary of gender-responsive initiatives in XLS format.' },
    { id: '11', title: 'CBMS 2024 Household Data', type: 'Resource', path: '/view/2', description: 'Raw household survey data disaggregated by sex and barangay.' },
  ];

  // Expanded keywords derived from searchable content and GAD domain
  const getKeywords = () => {
    const baseKeywords = ['Literacy', 'Education', 'CBMS', 'Ordinance', 'Budget', 'Survey', 'Statistics', 'Baguio', 'Gender', 'Analysis', 'Policy', 'Report', 'Development', 'Integrated', 'Database'];
    const itemTitles = searchableItems.flatMap(item => item.title.split(' '));
    const all = [...baseKeywords, ...itemTitles]
      .map(k => k.replace(/[,.]/g, ''))
      .filter(k => k.length > 3);
    return Array.from(new Set(all));
  };

  const keywords = getKeywords();

  // Persist search state
  useEffect(() => {
    localStorage.setItem('grids_search_query', searchQuery);
    localStorage.setItem('grids_search_results', JSON.stringify(searchResults));
    localStorage.setItem('grids_is_searching', isSearching.toString());
  }, [searchQuery, searchResults, isSearching]);

  // Click outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = keywords
        .filter(k => k.toLowerCase().includes(value.toLowerCase()))
        .sort((a, b) => {
          const aStarts = a.toLowerCase().startsWith(value.toLowerCase());
          const bStarts = b.toLowerCase().startsWith(value.toLowerCase());
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return a.toLowerCase().indexOf(value.toLowerCase()) - b.toLowerCase().indexOf(value.toLowerCase());
        });
      
      const topMatches = filtered.slice(0, 6);
      setSuggestions(topMatches);
      setShowSuggestions(true);

      // Ghost text logic: only if it starts with the query
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
    const finalQuery = query || searchQuery;
    const results = searchableItems.filter(item => 
      item.title.toLowerCase().includes(finalQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(finalQuery.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(true);
    setShowSuggestions(false);
    setSearchQuery(finalQuery);
    setGhostText('');
  };

  const handleClearResults = () => {
    setIsSearching(false);
    setSearchResults([]);
    setShowSuggestions(false);
    setGhostText('');
    
    setIsPopping(true);
    setTimeout(() => {
      setIsPopping(false);
      searchInputRef.current?.focus();
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeSearch();
    } else if ((e.key === 'Tab' || e.key === 'ArrowRight') && ghostText) {
      // Complete the word
      e.preventDefault();
      setSearchQuery(ghostText);
      setGhostText('');
      // Keep suggestions updated for the full word
      handleSearchChange({ target: { value: ghostText } } as any);
    }
  };

  const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';

  const featuredResources = [
    { title: "ANNUAL GENDER REPORT 2024", desc: "Comprehensive summary of gender statistics and city-wide initiatives.", type: "PDF", size: "4.2 MB", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "CBMS 2024 HOUSEHOLD DATA", desc: "Aggregated results from the latest Community-Based Monitoring System survey.", type: "XLS", size: "12.8 MB", color: "text-green-600", bg: "bg-green-50" },
    { title: "CITY ORDINANCE NO. 101-2023", desc: "Official legislation regarding gender-responsive budgeting and policy.", type: "DOC", size: "1.1 MB", color: "text-blue-600", bg: "bg-blue-50" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-10 py-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Welcome Banner */}
      <div className="w-full relative h-[320px] rounded-[48px] overflow-hidden shadow-2xl welcome-gradient mb-10">
        <div className="absolute inset-0 flex items-center px-16 z-10">
          <h2 className="text-white text-[130px] font-black leading-none tracking-tighter">Welcome!</h2>
        </div>
        <div className="absolute inset-0 z-0 opacity-40">
          <svg className="absolute bottom-0 left-0 w-full h-[80%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L80,186.7C160,213,320,267,480,261.3C640,256,800,192,960,186.7C1120,181,1280,235,1360,261.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* SEARCH BAR WITH INLINE AUTOCOMPLETE AND DYNAMIC SUGGESTIONS */}
      <div 
        className={`w-full max-w-5xl mb-16 relative transition-all duration-300 ease-out z-50
          ${isPopping ? 'scale-105 shadow-[0_20px_60px_rgba(139,68,175,0.2)]' : 'scale-100'}
          ${ghostText && !isSearching ? 'ring-2 ring-purple-400 ring-offset-4 rounded-3xl ring-offset-[#F5F1FF]' : ''}`} 
        ref={suggestionRef}
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none z-20">
            <Search className={`transition-colors duration-300 ${searchQuery ? 'text-purple-600' : 'text-gray-400'}`} size={20} strokeWidth={3} />
          </div>
          
          {/* Ghost Text Layer */}
          <div className={`absolute inset-y-0 left-16 right-24 flex items-center pointer-events-none select-none z-10 text-sm font-bold opacity-30
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {ghostText}
          </div>

          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
            className={`w-full pl-16 pr-24 py-6 border-none rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] text-sm font-bold placeholder:text-gray-400 focus:outline-none transition-all relative z-20 bg-transparent
              ${isDarkMode ? 'text-white ring-1 ring-white/5 focus:ring-[#B17FE1]/50' : 'text-gray-900 ring-1 ring-gray-100 focus:ring-purple-200'}`}
            style={{ 
              backgroundColor: isDarkMode ? '#2A2438' : 'white',
              caretColor: isDarkMode ? '#B17FE1' : '#8B44AF' 
            }}
            placeholder="Search for data, ordinances, or reports..."
          />
          
          <button 
            onClick={() => executeSearch()}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl transition-all active:scale-90 z-30
              ${searchQuery ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-50 text-gray-300'}`}
          >
            <ArrowRight size={22} strokeWidth={3} />
          </button>
        </div>

        {/* Dynamic Suggestions Overlay */}
        {showSuggestions && suggestions.length > 0 && (
          <div className={`absolute top-full left-0 right-0 mt-3 rounded-[32px] shadow-2xl overflow-hidden z-[60] border animate-in fade-in slide-in-from-top-2 backdrop-blur-xl
            ${isDarkMode ? 'bg-[#2A2438]/90 border-white/5' : 'bg-white/95 border-gray-100'}`}>
            <div className="p-3">
              <div className="px-5 py-2 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Suggested Keywords</span>
                {ghostText && <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded-md">Press Tab ⇥</span>}
              </div>
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => { executeSearch(s); }}
                  className={`w-full text-left px-6 py-4 rounded-2xl flex items-center gap-4 transition-all font-bold text-sm group
                    ${isDarkMode ? 'hover:bg-white/5 text-gray-300 hover:text-white' : 'hover:bg-purple-50 text-gray-600 hover:text-purple-700'}`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5 text-gray-500 group-hover:text-purple-400' : 'bg-gray-50 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                    <Search size={14} strokeWidth={3} />
                  </div>
                  <span>{s}</span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} className="text-purple-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="w-full min-h-[500px]">
        {isSearching ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
            <div className="flex items-center justify-between px-2">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">SEARCH RESULTS</h2>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Displaying matches for "{searchQuery}"</p>
              </div>
              <button 
                onClick={handleClearResults}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full border border-gray-100 bg-white text-gray-900 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm active:scale-95"
              >
                <X size={16} /> Clear Results
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 pb-20">
              {searchResults.length > 0 ? searchResults.map((result) => (
                <button 
                  key={result.id} 
                  onClick={() => navigate(result.path)}
                  className="w-full text-left p-8 rounded-[40px] border border-gray-100 bg-white transition-all group flex items-start gap-6 hover:shadow-xl hover:translate-x-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gray-100 text-gray-500">{result.type}</span>
                      <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors">{result.title}</h4>
                    </div>
                    <p className="text-sm font-medium text-gray-500 line-clamp-2">{result.description}</p>
                  </div>
                  <div className="p-4 rounded-full text-purple-600 group-hover:bg-purple-50 transition-all">
                    <ArrowRight size={20} />
                  </div>
                </button>
              )) : (
                <div className="text-center py-24 rounded-[48px] border-2 border-dashed border-gray-100">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">No matches found</h3>
                  <p className="text-sm font-bold text-gray-400">Try a different search term.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700 space-y-16">
            
            {/* Resources Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900">RECENT RESOURCES & DOWNLOADS</h3>
                <Link to="/gad-data" className="flex items-center gap-2 text-[11px] font-black text-purple-600 uppercase tracking-widest hover:translate-x-1 transition-all">
                  VIEW ALL RESOURCES <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredResources.map((res, i) => (
                  <div key={i} className="p-10 rounded-[48px] border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${res.bg} ${res.color}`}>
                      <FileText size={26} />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-none">
                      {res.title}
                    </h4>
                    <p className="text-[11px] font-medium leading-relaxed text-gray-400 mb-12 flex-1">
                      {res.desc}
                    </p>
                    <div className="flex items-center justify-between pt-6">
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

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
              <div className="p-10 rounded-[48px] bg-[#f8f6ff] border border-purple-100 flex items-center gap-8 group">
                <div className="w-20 h-20 rounded-3xl bg-white text-purple-600 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Calendar size={36} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-1 block">ANNOUNCEMENT</span>
                  <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-2">UPCOMING GAD PLANNING WORKSHOP</h4>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">October 15, 2025 • Baguio Convention Center</p>
                </div>
                <button className="px-8 py-3 bg-white border border-purple-100 text-gray-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-sm active:scale-95">
                  REGISTER
                </button>
              </div>

              <div className="p-10 rounded-[48px] bg-[#f0fff4] border border-green-100 flex items-center gap-8 group">
                <div className="w-20 h-20 rounded-3xl bg-white text-green-600 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ExternalLink size={36} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-1 block">PARTNER LINK</span>
                  <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-2">PHILIPPINE STATISTICS AUTHORITY</h4>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Access national disaggregated data portals.</p>
                </div>
                <a href="https://psa.gov.ph" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white border border-green-100 text-gray-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all shadow-sm active:scale-95 text-center">
                  VISIT SITE
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="w-full flex flex-col items-center pt-10 pb-8 border-t border-gray-50">
        <p className={`text-[9px] font-black uppercase tracking-[0.3em] text-center leading-relaxed opacity-30 ${headingClass}`}>
          Copyright © City Government of Baguio<br />
          City Planning Development Service Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
