
import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BarChart2, TrendingUp, Info, Target, AlertTriangle, ChevronRight, BookOpen, Brain, 
  Sparkles, FileText, Activity
} from 'lucide-react';

const INDICATOR_MAP: Record<string, { id: string, title: string, sector: string }> = {
  'literacy-rate': { id: '1a', title: 'Basic Literacy Rate', sector: 'Education and Training' },
};

const SectionTitle: React.FC<{ children: React.ReactNode; id: string; subtitle?: string; isDarkMode?: boolean }> = ({ children, id, subtitle, isDarkMode }) => (
  <div id={id} className="mb-8 md:mb-12 scroll-mt-24 md:scroll-mt-32">
    <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{children}</h3>
    <div className="flex items-center gap-4">
      <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">{subtitle || 'Data Source: 2021 Pilot Community-Based Monitoring System (CBMS)'}</p>
      <div className={`h-0.5 flex-1 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
    </div>
  </div>
);

const LiteracyAnalysis: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="space-y-32">
      {/* General Section */}
      <section id="general">
        <SectionTitle id="general" isDarkMode={isDarkMode}>1a. Basic Literacy Rate</SectionTitle>
        <div className="space-y-12">
          <div className="space-y-6">
            <h4 className={`text-2xl font-black uppercase tracking-tight ${textClass}`}>General.</h4>
            <p className={`text-[11px] font-black text-gray-400 uppercase tracking-widest italic`}>* All statistical tests were performed with a 99.5% confidence level.</p>
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

          <div className="flex flex-col items-center">
            <h4 className={`text-lg font-black uppercase tracking-widest mb-10 text-center ${textClass}`}>Basic Literacy Proportion for 10 Years Old and Above</h4>
            <div className="relative w-80 h-80 flex flex-col items-center justify-center">
               <svg viewBox="0 0 100 100" className="w-64 h-64 drop-shadow-2xl">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#F3E8FF" strokeWidth="15" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#8B44AF" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="2.5" transform="rotate(-90 50 50)" />
                 <text x="50" y="45" textAnchor="middle" className="text-[6px] font-black fill-[#8B44AF]">258,793</text>
                 <text x="50" y="52" textAnchor="middle" className="text-[5px] font-black fill-[#8B44AF]">(99%)</text>
                 <text x="50" y="65" textAnchor="middle" className="text-[6px] font-black fill-[#EF4444]">1,410</text>
                 <text x="50" y="72" textAnchor="middle" className="text-[5px] font-black fill-[#EF4444]">(1%)</text>
               </svg>
               <div className="mt-8 flex gap-8">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#8B44AF] rounded-sm"></div><span className="text-[9px] font-black uppercase">Can</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#F3E8FF] rounded-sm"></div><span className="text-[9px] font-black uppercase">Cannot</span></div>
               </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className={`text-2xl font-black uppercase italic mb-6 ${textClass}`}>Current Situation:</h4>
              <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>
                In 2021, out of a total population of 260,203 individuals aged 10 and above, 258,793 (99.46%) are literate, meaning they could read and write simple messages in any language or dialect. Meanwhile, 1,410 individuals (0.54%) were classified as illiterate.
              </p>
            </div>
            <div>
              <h4 className={`text-2xl font-black uppercase italic mb-6 ${textClass}`}>Challenges:</h4>
              <ul className="list-decimal pl-5 space-y-4 text-sm font-medium leading-relaxed ${subTextClass}">
                <li><span className="font-black">Quality of Literacy</span> – This does not account for functional literacy, which includes comprehension, critical thinking, and numeracy skills needed for daily life and work.</li>
                <li><span className="font-black">Limited Access to Opportunities</span> – Illiterate individuals may struggle to find stable employment, as most jobs require basic reading and writing skills.</li>
                <li><span className="font-black">Healthcare Challenges</span> – Illiterate individuals may have difficulty understanding medical instructions, prescriptions, and health information, increasing the risk of poor health outcomes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* By Sex Section */}
      <section id="by-sex">
        <SectionTitle id="by-sex" isDarkMode={isDarkMode}>By Sex.</SectionTitle>
        <div className="space-y-20">
          <div className="flex flex-col items-center">
            <h4 className={`text-lg font-black uppercase tracking-widest mb-10 text-center ${textClass}`}>Basic Literacy Proportion for 10 Years Old and Above by Sex</h4>
            <div className="w-full max-w-2xl flex items-end justify-center gap-16 h-64 border-b border-gray-100 pb-4">
               <div className="flex flex-col items-center w-32">
                  <div className="w-full flex flex-col gap-0.5">
                    <div className="bg-[#F3E8FF] h-2 rounded-t-md flex items-center justify-center text-[7px] font-black">658 (1%)</div>
                    <div className="bg-[#8B44AF] h-56 flex items-center justify-center text-[9px] font-black text-white">125,821 (99%)</div>
                  </div>
                  <span className="mt-4 text-[10px] font-black uppercase">Male</span>
               </div>
               <div className="flex flex-col items-center w-32">
                  <div className="w-full flex flex-col gap-0.5">
                    <div className="bg-[#F3E8FF] h-2 rounded-t-md flex items-center justify-center text-[7px] font-black">752 (1%)</div>
                    <div className="bg-[#8B44AF] h-56 flex items-center justify-center text-[9px] font-black text-white">132,972 (99%)</div>
                  </div>
                  <span className="mt-4 text-[10px] font-black uppercase">Female</span>
               </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className={`text-2xl font-black uppercase italic mb-6 ${textClass}`}>Current Situation:</h4>
              <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>
                Among the 258,793 literate individuals, 132,972 (51%) are female, while 125,821 (49%) are male. Statistical tests indicate a significant difference between the number of literate males and females, with a slightly higher proportion of individuals who can read or write simple messages being female.
              </p>
            </div>
            <div>
              <h4 className={`text-2xl font-black uppercase italic mb-6 ${textClass}`}>Challenges:</h4>
              <ul className="list-decimal pl-5 space-y-4 text-sm font-medium leading-relaxed ${subTextClass}">
                <li><span className="font-black">Gender Gaps in Literacy</span> – Despite more literate females, societal norms and economic roles may still limit their access to higher education and skilled employment.</li>
                <li><span className="font-black">Barriers to Education for Males</span> – The lower proportion of literate males may reflect early workforce entry, especially in sectors that do not require formal education.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Association Section */}
      <section id="association">
        <SectionTitle id="association" isDarkMode={isDarkMode}>Association with Other Demographic Characteristics.</SectionTitle>
        <div className={`table-container rounded-3xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
          <table className="w-full text-center min-w-[600px] text-[11px]">
            <thead className={`${isDarkMode ? 'bg-white/5 text-purple-300' : 'bg-gray-50 text-gray-400'} font-black uppercase tracking-widest`}>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-left">Variable</th>
                <th className="py-4 px-4">General_P</th>
                <th className="py-4 px-4">Male_P</th>
                <th className="py-4 px-4">Female_P</th>
                <th className="py-4 px-4">Assoc_Measure</th>
                <th className="py-4 px-4">Interpretation</th>
              </tr>
            </thead>
            <tbody className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <tr className="border-b border-gray-50">
                <td className="py-4 px-4 text-left">age</td>
                <td className="py-4">6.43E-42</td>
                <td className="py-4">8.14E-02</td>
                <td className="py-4">1.99E-64</td>
                <td className="py-4">0.0265</td>
                <td className="py-4 text-gray-400 uppercase">Very Weak</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-4 px-4 text-left">Cramer V_3 seeing</td>
                <td className="py-4">1.56E-218</td>
                <td className="py-4">5.04E-47</td>
                <td className="py-4">1.98E-181</td>
                <td className="py-4">0.0622</td>
                <td className="py-4 text-gray-400 uppercase">Very Weak</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-left">Cramer V_7 communicating</td>
                <td className="py-4">0.00E+00</td>
                <td className="py-4">0.00E+00</td>
                <td className="py-4">0.00E+00</td>
                <td className="py-4">0.2175</td>
                <td className="py-4 text-purple-600 uppercase">Moderate</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={`mt-8 text-sm font-medium italic ${subTextClass}`}>
          Besides sex, only age and all types of disabilities (seeing, hearing, walking, remembering, self-care, and communicating) show a significant association with basic literacy among the tested demographic factors.
        </p>
      </section>

      {/* By Age A Section */}
      <section id="by-age">
        <SectionTitle id="by-age" isDarkMode={isDarkMode}>By Age A.</SectionTitle>
        <div className={`p-8 md:p-12 rounded-[48px] border flex flex-col items-center ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
          <h4 className={`text-lg font-black uppercase tracking-widest mb-10 ${textClass}`}>Age Distribution of Literate Population</h4>
          <div className="w-full h-48 flex items-end gap-1 px-4 mb-6">
            {[20, 35, 45, 60, 55, 40, 25, 15, 10, 5].map((h, i) => (
              <div key={i} className="flex-1 bg-purple-600 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="w-full flex justify-between px-4 text-[9px] font-black text-gray-400 uppercase">
            <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
          </div>
          <div className="mt-12 text-left w-full">
            <h4 className={`text-2xl font-black uppercase italic mb-4 ${textClass}`}>Current Situation:</h4>
            <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>
              The age distribution of the literate population, with a median of 32 years old, indicates that most individuals who can read/write simple messages are concentrated in younger age groups.
            </p>
          </div>
        </div>
      </section>

      {/* By Age B Section */}
      <section id="by-age-b">
        <SectionTitle id="by-age-b" isDarkMode={isDarkMode}>By Age B.</SectionTitle>
        <div className={`p-8 md:p-12 rounded-[48px] border flex flex-col items-center ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
          <h4 className={`text-lg font-black uppercase tracking-widest mb-10 ${textClass}`}>Age Distribution of Illiterate Population</h4>
          <div className="w-full h-48 flex items-end gap-1 px-4 mb-6">
            {[5, 10, 20, 40, 55, 60, 45, 30, 20, 15].map((h, i) => (
              <div key={i} className="flex-1 bg-purple-900 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="w-full flex justify-between px-4 text-[9px] font-black text-gray-400 uppercase">
            <span>0</span><span>30</span><span>60</span><span>90</span><span>120</span>
          </div>
          <div className="mt-12 text-left w-full">
            <h4 className={`text-2xl font-black uppercase italic mb-4 ${textClass}`}>Current Situation:</h4>
            <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>
              Meanwhile, the age distribution of the illiterate population, with a median of 45 years and two distinct peaks, indicates that illiteracy is concentrated in both younger and older age groups rather than being evenly spread across all ages.
            </p>
          </div>
        </div>
      </section>

      {/* Difficulty Section */}
      <section id="by-difficulty">
        <SectionTitle id="by-difficulty" isDarkMode={isDarkMode}>By Difficulty Type.</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className={`p-10 rounded-[48px] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-purple-50'}`}>
              <h5 className="text-[10px] font-black uppercase text-purple-600 tracking-widest mb-8 text-center">Male Difficulty Proportion</h5>
              <div className="space-y-4">
                 {['Seeing', 'Hearing', 'Walking', 'Remembering', 'Self-care', 'Communicating'].map((type, i) => (
                    <div key={type}>
                       <div className="flex justify-between text-[9px] font-black uppercase mb-1"><span>{type}</span><span>{90 + i}%</span></div>
                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${90 + i}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           <div className={`p-10 rounded-[48px] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-purple-50'}`}>
              <h5 className="text-[10px] font-black uppercase text-purple-600 tracking-widest mb-8 text-center">Female Difficulty Proportion</h5>
              <div className="space-y-4">
                 {['Seeing', 'Hearing', 'Walking', 'Remembering', 'Self-care', 'Communicating'].map((type, i) => (
                    <div key={type}>
                       <div className="flex justify-between text-[9px] font-black uppercase mb-1"><span>{type}</span><span>{88 + i}%</span></div>
                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${88 + i}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
        <div className="mt-12 space-y-12">
            <div>
              <h4 className={`text-2xl font-black uppercase italic mb-6 ${textClass}`}>Current Situation:</h4>
              <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>
                In the literate population, the vast majority—at least 97%—of individuals report having no difficulty in seeing, hearing, walking, etc. Among the small proportion who do experience some difficulty, it affects 5% of males and 6% of females.
              </p>
            </div>
            <div>
              <h4 className={`text-2xl font-black uppercase italic mb-6 ${textClass}`}>Challenges:</h4>
              <ul className="list-decimal pl-5 space-y-4 text-sm font-medium leading-relaxed ${subTextClass}">
                <li><span className="font-black">Gender Differences in Literacy Barriers</span> – Females with remembering difficulties have lower literacy rates, suggesting a need for more targeted educational interventions for women with cognitive disabilities.</li>
              </ul>
            </div>
          </div>
      </section>

      <footer className="mt-32 pt-10 border-t border-gray-100 flex flex-col items-center opacity-30">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-center leading-loose">
          Copyright © City Government of Baguio<br />City Planning, Development, and Sustainability Office<br />Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

const IndicatorAnalysis: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const { indicatorId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('general');

  const indicatorData = indicatorId ? INDICATOR_MAP[indicatorId] : null;
  const isLiteracy = indicatorId === 'literacy-rate';

  const navItems = [
    { id: 'general', title: 'General Overview', icon: BarChart2 },
    { id: 'by-sex', title: 'By Sex', icon: TrendingUp },
    { id: 'association', title: 'Association', icon: Info },
    { id: 'by-age', title: 'By Age A', icon: Target },
    { id: 'by-age-b', title: 'By Age B', icon: Activity },
    { id: 'by-difficulty', title: 'By Difficulty', icon: AlertTriangle },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollOffset = scrollContainerRef.current.scrollTop + (elementTop - containerTop) - 24;

      scrollContainerRef.current.scrollTo({ top: scrollOffset, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!indicatorData) {
    return (
      <div className={`flex flex-col items-center justify-center h-full p-20 text-center ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'}`}>
        <h2 className="text-2xl font-black uppercase mb-4">Indicator Not Found</h2>
        <button onClick={() => navigate('/gad-data')} className="text-purple-600 font-bold hover:underline">Return</button>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col animate-in fade-in duration-700 overflow-hidden ${isDarkMode ? 'bg-[#0F0C15]' : 'bg-white'}`}>
      <div className="flex flex-col lg:flex-row h-full min-h-0">
        {isLiteracy && (
          <aside className={`w-full lg:w-80 border-b lg:border-b-0 lg:border-r flex lg:flex-col overflow-x-auto no-scrollbar lg:overflow-y-auto shrink-0 transition-colors duration-500
            ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-[#fdfaff] border-purple-100'}`}>
            <div className="p-4 lg:p-8 flex lg:flex-col gap-2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all whitespace-nowrap lg:w-full
                    ${activeSection === item.id 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : (isDarkMode ? 'text-gray-500 hover:text-purple-300 hover:bg-white/5' : 'bg-white lg:bg-transparent text-gray-400 hover:text-purple-600 hover:bg-white')}`}
                >
                  <item.icon size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto custom-scrollbar relative" ref={scrollContainerRef}>
          <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20 pb-32">
            {isLiteracy ? <LiteracyAnalysis isDarkMode={isDarkMode} /> : <div className="py-20 text-center text-gray-400 uppercase font-black">Data Content Processing...</div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndicatorAnalysis;
