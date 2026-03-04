
import React, { useState } from 'react';
import { 
  GraduationCap, TrendingUp, Heart, ShieldAlert, 
  UserCheck, Globe, Briefcase, ImageIcon, 
  Sun, UserPlus, HelpCircle, ArrowRight, BookOpen, Database,
  Search, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CPDSOLogo } from '../components/Logo';
import PageLayout from '../components/PageLayout';

const GADData: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sectors = [
    { id: 'education-and-training', title: 'Education and Training', icon: GraduationCap, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', count: 10, desc: 'Literacy rates, completion statistics, and educational attainment by sex.' },
    { id: 'economy', title: 'Economy', icon: TrendingUp, img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600', count: 6, desc: 'Labor participation, employment rates, and family income data.' },
    { id: 'health', title: 'Health', icon: Heart, img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600', count: 15, desc: 'Maternal health, child mortality, and prevalence of diseases.' },
    { id: 'poverty', title: 'Poverty', icon: HelpCircle, img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600', count: 3, desc: 'Poverty incidence among women, children, and household heads.' },
    { id: 'power', title: 'Power and Decision-Making', icon: UserCheck, img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600', count: 8, desc: 'Representation in government and leadership positions by gender.' },
    { id: 'violence', title: 'Violence Against Women', icon: ShieldAlert, img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600', count: 5, desc: 'Reported cases of abuse and support services availability.' },
    { id: 'institutional', title: 'Institutional Mechanism', icon: Briefcase, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600', count: 4, desc: 'GAD budget utilization, policy implementation, and focal points.' },
    { id: 'environment', title: 'Environment', icon: Sun, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600', count: 3, desc: 'Disaster impacts and climate change resilience metrics.' }
  ];

  const filteredSectors = sectors.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title="GAD Data and Analysis"
      subtitle={searchQuery ? `Found ${filteredSectors.length} sectors for "${searchQuery}"` : "Sectoral Indicator Catalog"}
      description="Evidence-based gender data categorized into key development sectors."
      headerActions={
        <>
          <div className="relative group w-full sm:w-80">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
              <Search size={18} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              placeholder="Filter sectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-10 py-4 rounded-[28px] border shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-600/10 transition-all text-[11px] font-black uppercase tracking-widest
                ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white' : 'bg-white border-purple-50 text-gray-900'}`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                <X size={14} strokeWidth={3} />
              </button>
            )}
          </div>
          <div className={`px-6 py-3 rounded-2xl border w-full sm:w-auto text-center sm:text-left ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-purple-50 border-purple-100'}`}>
            <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-400'}`}>Total Monitored</span>
            <span className={`text-2xl md:text-3xl font-black tracking-tight ${isDarkMode ? 'text-purple-100' : 'text-purple-700'}`}>54 Indicators</span>
          </div>
        </>
      }
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12 flex-1">
        {filteredSectors.map((s, idx) => (
          <Link 
            key={idx}
            to={`/gad-data/${s.id}`} 
            className={`group relative h-[380px] md:h-[420px] rounded-[40px] md:rounded-[48px] overflow-hidden shadow-sm card-hover border flex flex-col transition-colors duration-500
              ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-gray-100'}`}
          >
            <div className="h-1/3 md:h-2/5 relative overflow-hidden">
               <img src={s.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${isDarkMode ? 'to-[#1A1625]' : 'to-white'}`}></div>
               <div className={`absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-all
                 ${isDarkMode ? 'bg-[#2A2438] text-purple-400 group-hover:bg-purple-600 group-hover:text-white' : 'bg-white text-purple-600 group-hover:bg-purple-600 group-hover:text-white'}`}>
                 <s.icon className="w-5 h-5 md:w-6 h-6" />
               </div>
            </div>

            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between pt-2">
              <div className="space-y-2">
                <span className="text-9px font-black uppercase text-purple-500">{s.count} Indicators</span>
                <h3 className={`text-xl md:text-2xl font-black leading-tight uppercase tracking-tight ${textClass}`}>{s.title}</h3>
                <p className={`text-xs md:text-sm font-medium line-clamp-2 md:line-clamp-3 leading-relaxed text-gray-500`}>
                  {s.desc}
                </p>
              </div>
              
              <div className={`pt-4 flex items-center justify-between border-t ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                 <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Explore</span>
                 <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all
                   ${isDarkMode ? 'bg-white text-black group-hover:bg-purple-600 group-hover:text-white' : 'bg-gray-900 text-white group-hover:bg-purple-600'}`}>
                   <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={3} />
                 </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </PageLayout>
  );
};

export default GADData;
