
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BarChart2, TrendingUp, Info, Target, AlertTriangle, ChevronRight, BookOpen, Brain, 
  Sparkles, FileText, Activity, Users, GraduationCap, Accessibility,
  ExternalLink, Globe, Loader2
} from 'lucide-react';
import { GeminiAI } from '../services/gemini';
import { CPDSOLogo } from '../components/Logo';
import PageLayout from '../components/PageLayout';

// Maps indicator slugs to titles and sectors for routing display
const INDICATOR_MAP: Record<string, { id: string, title: string, sector: string }> = {
  'literacy-rate': { id: '1', title: 'Basic and Functional Literacy Rate, By Sex', sector: 'Education and Training' },
  'completion-rate': { id: '2', title: 'School Completion Rate', sector: 'Education and Training' },
  'labor-participation': { id: '9', title: 'Labor Force Participation Rate', sector: 'Economy' },
  'stunting': { id: '15', title: 'Prevalence of Stunting', sector: 'Health' },
  'govt-seats': { id: '32', title: 'Seats Held by Women in Govt', sector: 'Power and Decision-Making' },
};

/**
 * Section title component with consistent styling and subtitle.
 */
const SectionTitle: React.FC<{ children: React.ReactNode; id: string; subtitle?: string; isDarkMode?: boolean }> = ({ children, id, subtitle, isDarkMode }) => (
  <div id={id} className="mb-4 md:mb-6 scroll-mt-32">
    <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{children}</h3>
    <div className="flex items-center gap-4">
      <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{subtitle || 'Data Source: 2021 Pilot Community-Based Monitoring System (CBMS)'}</p>
      <div className={`h-0.5 flex-1 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
    </div>
  </div>
);

/**
 * Text analysis block for displaying qualitative insights from the database.
 */
const AnalysisTextSection = ({ title, items, isDarkMode }: { title: string, items: { label?: string, text: string }[] | string, isDarkMode: boolean }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  
  return (
    <div className="mb-6">
      <h4 className={`text-xl font-black uppercase mb-4 ${textClass}`}>{title}:</h4>
      {typeof items === 'string' ? (
        <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>{items}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className={`text-sm leading-relaxed ${subTextClass}`}>
                {item.label && <strong className={`font-black uppercase text-xs mr-1 ${textClass}`}>{item.label} –</strong>}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AnalysisListSection = ({ title, items, isDarkMode }: { title: string, items: { label?: string, text: string }[], isDarkMode: boolean }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  return (
    <div className="mb-6">
      <h4 className={`text-xl font-black uppercase mb-6 ${textClass}`}>{title}:</h4>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black">{i + 1}</span>
            <div className="flex-1">
              <p className={`text-sm leading-relaxed ${subTextClass}`}>
                {item.label && <strong className={`font-black uppercase text-xs block mb-1 ${textClass}`}>{item.label}</strong>}
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Component displaying detailed statistical analysis for Literacy Rates.
 */
const LiteracyAnalysis: React.FC<{ isDarkMode: boolean, indicatorTitle: string }> = ({ isDarkMode, indicatorTitle }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [groundedContext, setGroundedContext] = useState<{text: string, sources: any} | null>(null);
  const [loadingGrounding, setLoadingGrounding] = useState(false);

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const handleFetchGrounding = async () => {
    setLoadingGrounding(true);
    try {
      const result = await GeminiAI.getGroundedAnalysis(indicatorTitle, "Summarize the latest Baguio City DepEd programs and PSA literacy trends as of 2024 to contextualize this GAD indicator.");
      setGroundedContext(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingGrounding(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'by-sex', label: 'By Sex' },
    { id: 'association', label: 'Association' },
    { id: 'by-age-a', label: 'By Age A' },
    { id: 'by-age-b', label: 'By Age B' },
    { id: 'by-difficulty', label: 'Difficulty Type' },
    { id: 'grounding', label: 'Search Grounding' }
  ];

  return (
    <div className="space-y-6">
      {/* Analysis Sections Navigation */}
      <div className="flex flex-col items-center gap-6">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Analysis Sections</h3>
        <div className={`flex p-1.5 rounded-[24px] shadow-xl border transition-colors duration-500 overflow-x-auto no-scrollbar
          ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-white border-purple-50'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'grounding' && !groundedContext) handleFetchGrounding();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300
                ${activeTab === tab.id 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
        {activeTab === 'grounding' && (
          <section className="space-y-8 animate-in fade-in">
             <SectionTitle id="grounding" isDarkMode={isDarkMode} subtitle="Search Grounding via Gemini 3 API">Real-time Policy Context</SectionTitle>
             <div className={`${isDarkMode ? 'bg-white/5' : 'bg-purple-50/50'} rounded-[32px] p-8 md:p-12 border border-purple-100/20`}>
                {loadingGrounding ? (
                  <div className="flex flex-col items-center py-20">
                     <Loader2 size={32} className="animate-spin text-purple-600 mb-4" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Consulting Google Search for ground truth...</p>
                  </div>
                ) : (
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <h4 className={`text-xl font-black uppercase flex items-center gap-2 ${textClass}`}>
                           <Globe size={18} className="text-purple-600" /> Grounded Analysis
                        </h4>
                        <div className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                           {groundedContext?.text}
                        </div>
                     </div>
                     {groundedContext?.sources && (
                        <div className="pt-8 border-t border-purple-100/20">
                           <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Cited Sources</h5>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {groundedContext.sources.map((source: any, i: number) => (
                                 <a 
                                    key={i} 
                                    href={source.web?.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100 hover:border-purple-200'}`}
                                 >
                                    <div className="flex-1 truncate pr-4">
                                       <span className={`block text-[11px] font-black truncate ${textClass}`}>{source.web?.title}</span>
                                       <span className="text-[9px] font-medium text-gray-400 truncate block">{source.web?.uri}</span>
                                    </div>
                                    <ExternalLink size={14} className="text-gray-300 group-hover:text-purple-600" />
                                 </a>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
                )}
             </div>
          </section>
        )}

        {activeTab === 'general' && (
          <section id="general" className="animate-in fade-in">
            <SectionTitle id="general" isDarkMode={isDarkMode}>1a. Basic Literacy Rate</SectionTitle>
            <div className="space-y-6">
              <div className="space-y-6">
                <h4 className={`text-2xl font-black uppercase tracking-tight ${textClass}`}>General.</h4>
                <p className={`text-[11px] font-black text-gray-400 uppercase tracking-widest`}>* All statistical tests were performed with a 99.5% confidence level.</p>
                
                <div className={`table-container rounded-3xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
                  <table className="w-full text-center min-w-[600px]">
                    <thead className={`${isDarkMode ? 'bg-white/5 text-purple-300' : 'bg-gray-50/50 text-gray-400'} text-[9px] font-black uppercase tracking-widest`}>
                      <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                        <th className="py-4 px-4">total_population</th>
                        <th className="py-4 px-4">literate_count</th>
                        <th className="py-4 px-4">illiterate_count</th>
                        <th className="py-4 px-4">literacy_rate</th>
                        <th className="py-4 px-4">illiteracy_rate</th>
                      </tr>
                    </thead>
                    <tbody className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      <tr>
                        <td className="py-8 px-4">260,203</td>
                        <td className="py-8 px-4">258,793</td>
                        <td className="py-8 px-4">1,410</td>
                        <td className="py-8 px-4">99.45812</td>
                        <td className="py-8 px-4">0.541846</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col items-center bg-gray-50 dark:bg-white/5 p-10 rounded-[48px] border border-gray-100 dark:border-white/5">
                <h4 className={`text-lg font-black uppercase tracking-widest mb-4 text-center ${textClass}`}>Basic Literacy Proportion for 10 Years Old and Above</h4>
                <p className="text-[8px] font-bold text-gray-400 mb-10 text-center uppercase tracking-widest">χ²(1) = 2.55e+05, p = 0.00, Cramér's V = 0.70, CI99.5% [0.70, 0.70], n_obs = 260,203</p>
                <div className="relative w-80 h-80 flex flex-col items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                     <circle cx="50" cy="50" r="40" fill="#8B44AF" />
                     <path d="M 50 50 L 50 10 A 40 40 0 0 1 54 10.2 Z" fill="#4B1261" />
                     <text x="50" y="45" textAnchor="middle" className="text-[6px] font-black fill-white">258,793</text>
                     <text x="50" y="52" textAnchor="middle" className="text-[5px] font-black fill-white">(99%)</text>
                     <text x="55" y="15" textAnchor="start" className="text-[4px] font-black fill-[#4B1261]">1,410 (1%)</text>
                   </svg>
                   <div className="mt-8 flex gap-6">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#4B1261] rounded-sm"></div>
                        <span className="text-[9px] font-black uppercase text-gray-500">Cannot</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#8B44AF] rounded-sm"></div>
                        <span className="text-[9px] font-black uppercase text-gray-500">Can</span>
                     </div>
                   </div>
                </div>
                <p className="mt-10 text-[9px] font-black text-purple-600 uppercase tracking-[0.3em]">Read / Write Simple Messages</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <AnalysisTextSection title="Current Situation" isDarkMode={isDarkMode} items="In 2021, out of a total population of 260,203 individuals aged 10 and above, 258,793 (99.46%) are literate." />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const IndicatorAnalysis: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode = false }) => {
  const { sectorId, indicatorId } = useParams<{ sectorId: string, indicatorId: string }>();
  const navigate = useNavigate();
  const indicator = indicatorId ? INDICATOR_MAP[indicatorId] : null;

  if (!indicator) {
    return (
      <div className={`flex flex-col items-center justify-center h-full p-20 text-center ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'}`}>
        <h2 className={`text-4xl font-black uppercase mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Indicator Not Found</h2>
        <button onClick={() => navigate(`/gad-data/${sectorId}`)} className="text-purple-600 font-bold hover:underline">Return to Sector List</button>
      </div>
    );
  }

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title={indicator.title}
      subtitle={`Sector: ${indicator.sector}`}
    >
      <div className={`rounded-[48px] p-6 md:p-10 border shadow-2xl ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'}`}>
         {indicatorId === 'literacy-rate' ? (
           <LiteracyAnalysis isDarkMode={isDarkMode} indicatorTitle={indicator.title} />
         ) : (
           <div className="py-20 text-center flex flex-col items-center opacity-40">
             <Brain size={64} className="text-gray-300 mb-6" />
             <h3 className={`text-2xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
               Analysis Pending
             </h3>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">
               The comprehensive statistical report for this indicator is currently being finalized.
             </p>
           </div>
         )}
      </div>
    </PageLayout>
  );
};

export default IndicatorAnalysis;
