
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Info, AlertTriangle, Target, TrendingUp, BarChart2, Hash, 
  Download, FileText, ChevronRight, User, Users, Globe, 
  Construction, Clock, Database, Search, FileSearch, Sparkles, BookOpen, Brain, Accessibility
} from 'lucide-react';
import { Logo } from '../components/Logo';

const INDICATOR_MAP: Record<string, { id: string, title: string, sector: string }> = {
  'literacy-rate': { id: '1', title: 'Basic and Functional Literacy Rate, by Sex', sector: 'Education' },
  'completion-rate': { id: '2', title: 'Elementary and Highschool/Secondary Completion Rate, by Sex', sector: 'Education' },
  'dropout-rate': { id: '3', title: 'Elementary and Secondary Dropout Rate, by Sex', sector: 'Education' },
  'enrolment-rate': { id: '4', title: 'Net Enrolment Rate for Primary and Secondary Education, by Sex', sector: 'Education' },
  'tertiary-enrolment': { id: '5', title: 'Enrolment in Tertiary Education and in STEAM, by Sex', sector: 'Education' },
  'college-graduates': { id: '6', title: 'Percent Distribution of College Graduates, by Cluster Program and Sex', sector: 'Education' },
  'tvet-graduates': { id: '7', title: 'Number of TVET Graduates, by Sex and Cluster Program', sector: 'Education' },
  'mean-schooling': { id: '8', title: 'Mean Years of Schooling, by Sex', sector: 'Education' },
  'labor-participation': { id: '9', title: 'Labor Force Participation Rate, by Sex and Age Group', sector: 'Economy' },
  'employment-rate': { id: '10', title: 'Employment and Unemployment Rate, by Sex', sector: 'Economy' },
  'women-employment-share': { id: '11', title: 'Share of Women to Total Employment, by Major Occupation Group', sector: 'Economy' },
  'underemployment': { id: '12', title: 'Underemployment Rate, by Sex', sector: 'Economy' },
  'family-income': { id: '13', title: 'Average Annual Family Income, Expenditure and Savings, by Sex', sector: 'Economy' },
  'unpaid-work': { id: '14', title: 'Average Time Spent on Unpaid Domestic and Care Work, by Sex', sector: 'Economy' },
  'stunting': { id: '15', title: 'Prevalence of Stunting Among Children Under 5, by Sex', sector: 'Health' },
  'overweight': { id: '16', title: 'Prevalence of Overweight Among Children Under 5, by Sex', sector: 'Health' },
  'wasting': { id: '17', title: 'Prevalence of Wasting Among Children Under 5, by Sex', sector: 'Health' },
  'life-expectancy': { id: '18', title: 'Life Expectancy at Birth, by Sex', sector: 'Health' },
  'contraceptive-rate': { id: '19', title: 'Modern Contraceptive Prevalence Rate (%)', sector: 'Health' },
  'unmet-need': { id: '20', title: 'Unmet Need for Modern Family Planning, by Sex', sector: 'Health' },
  'maternal-mortality': { id: '21', title: 'Maternal Mortality Ratio', sector: 'Health' },
  'birth-attendance': { id: '22', title: 'Proportion of Births Attended by Skilled Health Personnel', sector: 'Health' },
  'child-mortality': { id: '23', title: 'Child Mortality Rate (Under-five Mortality Rate, by Sex)', sector: 'Health' },
  'neonatal-mortality': { id: '24', title: 'Neonatal Mortality Rate, by Sex', sector: 'Health' },
  'mortality-causes': { id: '25', title: 'Mortality Rate, by Leading Causes, Sex and Age', sector: 'Health' },
  'adolescent-birth': { id: '26', title: 'Adolescent Birth Rate, by Background Characteristics', sector: 'Health' },
  'teenage-pregnancy': { id: '27', title: 'Teenage Pregnancy Rate', sector: 'Health' },
  'hiv-new': { id: '28', title: 'Number of Newly-Diagnosed HIV Cases, by Sex and Age', sector: 'Health' },
  'hiv-total': { id: '29', title: 'Number of Reported HIV-AIDS Cases (Annual and Cumulative)', sector: 'Health' },
  'poverty-women': { id: '30', title: 'Poverty Incidence Among Women and Children', sector: 'Poverty' },
  'poverty-families': { id: '31', title: 'Poverty Incidence Among Families, by Sex of Family Head', sector: 'Poverty' },
  'govt-seats': { id: '32', title: 'Proportion of Seats Held by Women in National and Local Governments', sector: 'Power and Decision-Making' },
  'managerial-positions': { id: '33', title: 'Proportion of Women in Managerial Positions', sector: 'Power and Decision-Making' },
  'third-level-positions': { id: '34', title: 'Proportion of Women in Third-Level Positions in Govt Agencies', sector: 'Power and Decision-Making' },
  'govt-personnel': { id: '35', title: 'Number of Government Personnel, by Major Subdivision and Sex', sector: 'Power and Decision-Making' },
  'female-police': { id: '36', title: 'Percentage of Female Police Officers', sector: 'Power and Decision-Making' },
  'female-judges': { id: '37', title: 'Percentage of Female Judges', sector: 'Power and Decision-Making' },
  'agrarian-beneficiaries': { id: '38', title: 'Number of Agrarian Reform Beneficiaries (ARBs), by Sex', sector: 'Power and Decision-Making' },
  'intimate-violence': { id: '39', title: 'Physical and/or Sexual Violence by an Intimate Partner', sector: 'Violence Against Women' },
  'non-intimate-violence': { id: '40', title: 'Sexual Violence by Persons Other Than An Intimate Partner', sector: 'Violence Against Women' },
  'abuse-cases': { id: '41', title: 'Number of Reported Abuse Cases for Women and Children', sector: 'Violence Against Women' },
  'dswd-cases': { id: '42', title: 'Cases Served by DSWD on Violence Against Women and Child Abuse', sector: 'Violence Against Women' },
  'child-marriage': { id: '43', title: 'Percentage of Women Married or in Union Before Age 15 or 18', sector: 'Human Rights' },
  'gad-plans': { id: '44', title: 'Proportion of Agencies with Approved GAD Plans and Budget', sector: 'Institutional Mechanism' },
  'gad-allocation': { id: '45', title: 'Annual GAD Budget Allocation and Utilization', sector: 'Institutional Mechanism' },
  'vaw-desks': { id: '46', title: 'Proportion of Barangays with VAW Desks', sector: 'Institutional Mechanism' },
  'focal-points': { id: '47', title: 'Number of Agencies with Established GAD Focal Point Systems', sector: 'Institutional Mechanism' },
  'mtrcb-complaints': { id: '48', title: 'Complaints on Abuse or Derogatory Portrayal of Women via MTRCB', sector: 'Media' },
  'disaster-deaths': { id: '49', title: 'Deaths, Missing, and Affected Persons Attributed to Disasters', sector: 'Environment' },
  'waterborne-diseases': { id: '50', title: 'Mortality Due to Water-borne and Vector-borne Diseases', sector: 'Environment' },
  'social-access': { id: '51', title: 'Proportion of Women and Men with Access to Social Protection', sector: 'Social Protection' },
};

const SectionHeader: React.FC<{ children: React.ReactNode; id: string; subtitle?: string }> = ({ children, id, subtitle }) => (
  <div id={id} className="mb-10 scroll-mt-24">
    <div className="flex items-center gap-4 mb-2">
      <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase">{children}</h3>
      <div className="h-0.5 flex-1 bg-slate-100 rounded-full"></div>
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{subtitle || 'Source: Official CBMS Repository'}</p>
  </div>
);

const IndicatorAnalysis: React.FC = () => {
  const { indicatorId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('general');

  const indicatorData = indicatorId ? INDICATOR_MAP[indicatorId] : null;
  const isDataAvailable = indicatorId === 'literacy-rate';

  const navItems = [
    { id: 'general', title: 'General Overview', icon: BarChart2 },
    { id: 'by-sex', title: 'Sex Distribution', icon: Users },
    { id: 'association', title: 'Demographics', icon: Info },
    { id: 'by-age', title: 'Age Profile', icon: Target },
    { id: 'by-difficulty', title: 'Difficulty Types', icon: Accessibility },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!indicatorData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-20 text-center animate-fade-in">
        <h2 className="text-3xl font-black text-slate-900 uppercase mb-6">Indicator Not Found</h2>
        <button onClick={() => navigate('/gad-data')} className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-purple-700 transition-all">Return Home</button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden animate-fade-in">
      <div className="flex h-full">
        
        {/* Sidebar Nav */}
        {isDataAvailable && (
          <aside className="hidden lg:flex w-72 bg-slate-50 border-r border-slate-100 flex-col h-full p-8 space-y-12">
            <div>
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-4 block">Analysis Modules</span>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all
                        ${isActive ? 'bg-white text-purple-700 shadow-md ring-1 ring-slate-100 font-bold' : 'text-slate-500 hover:bg-white hover:text-slate-900'}
                      `}
                    >
                      <item.icon size={16} className={isActive ? 'text-purple-600' : 'text-slate-300'} />
                      <span className="text-[11px] uppercase tracking-wider">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200/50">
              <button 
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all shadow-sm"
              >
                <Download size={14} /> Export Report
              </button>
            </div>
          </aside>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth" ref={scrollContainerRef}>
          <div className="max-w-4xl mx-auto p-8 lg:p-16 pb-40">
            
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-widest rounded">Indicator {indicatorData.id}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{indicatorData.sector}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase">{indicatorData.title}</h1>
              <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6"></div>
            </div>

            {isDataAvailable ? (
              <div className="space-y-32">
                {/* GENERAL */}
                <section id="general">
                  <SectionHeader id="general">Overview.</SectionHeader>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {[
                      { label: 'Total Sample', val: '260,203', color: 'text-slate-900' },
                      { label: 'Literate', val: '258,793', color: 'text-purple-600' },
                      { label: 'Rate', val: '99.46%', color: 'text-emerald-600' },
                      { label: 'Gaps', val: '1,410', color: 'text-rose-500' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{stat.label}</span>
                        {/* Fixed stat.statColor typo to stat.color */}
                        <span className={`text-2xl font-black ${stat.color} tabular-nums`}>{stat.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                    <p className="text-lg leading-relaxed font-medium relative z-10">
                      In 2021, out of a total population of 260,203 individuals aged 10 and above, 258,793 (99.46%) are literate. Meanwhile, 1,410 individuals (0.54%) are considered illiterate. This baseline is critical for Baguio's GAD planning.
                    </p>
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                      <Sparkles size={120} />
                    </div>
                  </div>
                </section>

                {/* BY SEX */}
                <section id="by-sex">
                  <SectionHeader id="by-sex">Sex Distribution.</SectionHeader>
                  <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Female (51%)</span>
                        <span className="text-sm font-black text-slate-900">132,972</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 w-[51%] transition-all duration-1000"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Male (49%)</span>
                        <span className="text-sm font-black text-slate-900">125,821</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 w-[49%] transition-all duration-1000"></div>
                      </div>
                    </div>
                    <div className="w-px h-32 bg-slate-100 hidden md:block"></div>
                    <div className="flex-1">
                      <p className="text-base text-slate-600 font-medium leading-relaxed italic border-l-4 border-purple-500 pl-6">
                        "Statistical analysis reveals a significant difference in literacy across genders, suggesting that social norms and local access points influence male and female outcomes differently."
                      </p>
                    </div>
                  </div>
                </section>

                {/* ASSOCIATION */}
                <section id="association">
                  <SectionHeader id="association">Demographics.</SectionHeader>
                  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Parameter</th>
                          <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Measure</th>
                          <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { var: 'Communication', val: '0.2215', int: 'Moderate' },
                          { var: 'Cognitive', val: '0.1893', int: 'Weak' },
                          { var: 'Mobility', val: '0.1230', int: 'Weak' },
                          { var: 'Vision', val: '0.1082', int: 'Weak' },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-5 text-sm font-bold text-slate-800 uppercase">{row.var}</td>
                            <td className="p-5 text-sm font-black text-purple-600 text-center tabular-nums">{row.val}</td>
                            <td className="p-5 text-right">
                               <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${row.int === 'Moderate' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                                  {row.int}
                               </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* BY AGE */}
                <section id="by-age">
                  <SectionHeader id="by-age">Age Profile.</SectionHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center">
                       <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10">Literate Age Median</h5>
                       <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="64" cy="64" r="58" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                            <circle cx="64" cy="64" r="58" fill="transparent" stroke="#7c3aed" strokeWidth="8" strokeDasharray="364" strokeDashoffset="100" strokeLinecap="round" />
                          </svg>
                          <span className="text-4xl font-black text-slate-900">32</span>
                       </div>
                    </div>
                    <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center">
                       <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10">Illiterate Age Median</h5>
                       <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="64" cy="64" r="58" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                            <circle cx="64" cy="64" r="58" fill="transparent" stroke="#f43f5e" strokeWidth="8" strokeDasharray="364" strokeDashoffset="180" strokeLinecap="round" />
                          </svg>
                          <span className="text-4xl font-black text-slate-900">45</span>
                       </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <Construction size={48} className="text-slate-300" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Analysis Pending</h2>
                <p className="text-slate-500 font-medium max-w-lg mx-auto mt-4 leading-relaxed italic">
                  The detailed statistical analysis for this indicator is currently being finalized by the City Planning Office and will be available in the next reporting cycle.
                </p>
                <button onClick={() => navigate('/gad-data')} className="mt-12 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-purple-600 transition-all shadow-xl active:scale-95">Explore Other Indicators</button>
              </div>
            )}

            <footer className="mt-40 pt-12 border-t border-slate-100 text-center opacity-40">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500 leading-relaxed">
                City Government of Baguio • CPDSO GAD System<br />
                Copyright 2024
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndicatorAnalysis;
