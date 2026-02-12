import React from 'react';
import { 
  GraduationCap, TrendingUp, Heart, ShieldAlert, 
  UserCheck, Globe, Briefcase, ImageIcon, 
  Sun, UserPlus, HelpCircle, ArrowRight, BookOpen, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

const GADData: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const sectors = [
    { id: 'education-and-training', title: 'Education and Training', icon: GraduationCap, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', count: 8, desc: 'Literacy rates, completion statistics, and educational attainment by sex.' },
    { id: 'economy', title: 'Economy', icon: TrendingUp, img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600', count: 6, desc: 'Labor participation, employment rates, and family income data.' },
    { id: 'health', title: 'Health', icon: Heart, img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600', count: 15, desc: 'Maternal health, child mortality, and prevalence of diseases.' },
    { id: 'poverty', title: 'Poverty', icon: HelpCircle, img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600', count: 2, desc: 'Poverty incidence among women, children, and household heads.' },
    { id: 'power', title: 'Power and Decision-Making', icon: UserCheck, img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600', count: 7, desc: 'Representation in government and leadership positions by gender.' },
    { id: 'violence', title: 'Violence Against Women', icon: ShieldAlert, img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600', count: 4, desc: 'Reported cases of abuse and support services availability.' },
    { id: 'institutional', title: 'Institutional Mechanism', icon: Briefcase, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600', count: 4, desc: 'GAD budget utilization, policy implementation, and focal points.' },
    { id: 'environment', title: 'Environment', icon: Sun, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600', count: 2, desc: 'Disaster impacts and climate change resilience metrics.' }
  ];

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-purple-300' : 'text-gray-500';

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 animate-in fade-in duration-700">
      
      <header className={`mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b pb-12 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="space-y-4 max-w-2xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3">
             <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
             <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Sectoral Catalog</span>
          </div>
          <h1 className={`text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-none ${textClass}`}>
            GAD Indicators
          </h1>
          <p className={`text-sm md:text-lg font-medium leading-relaxed ${subTextClass}`}>
            Evidence-based gender data categorized into key development sectors.
          </p>
        </div>
        
        <div className="flex shrink-0">
           <div className={`px-6 py-3 rounded-2xl border w-full sm:w-auto text-center sm:text-left ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-purple-50 border-purple-100'}`}>
              <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-400'}`}>Total Monitored</span>
              <span className={`text-2xl md:text-3xl font-black tracking-tight ${isDarkMode ? 'text-purple-100' : 'text-purple-700'}`}>51 Indicators</span>
           </div>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-20">
        {sectors.map((s, idx) => (
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
                 {/* Fix: Replaced invalid md:size prop with responsive Tailwind classes */}
                 <s.icon className="w-5 h-5 md:w-6 h-6" />
               </div>
            </div>

            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between pt-2">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase text-purple-500">{s.count} Data Points</span>
                <h3 className={`text-xl md:text-2xl font-black leading-tight uppercase tracking-tight ${textClass}`}>{s.title}</h3>
                <p className={`text-xs md:text-sm font-medium line-clamp-2 md:line-clamp-3 leading-relaxed ${subTextClass}`}>
                  {s.desc}
                </p>
              </div>
              
              <div className={`pt-4 flex items-center justify-between border-t ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                 <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Explore</span>
                 <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all
                   ${isDarkMode ? 'bg-white text-black group-hover:bg-purple-600 group-hover:text-white' : 'bg-gray-900 text-white group-hover:bg-purple-600'}`}>
                   {/* Fix: Replaced invalid md:size prop with responsive Tailwind classes */}
                   <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={3} />
                 </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <footer className={`mt-20 w-full flex flex-col items-center pt-10 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <p className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] text-center leading-loose">
          City Government of Baguio<br />© CPDSO Baguio City
        </p>
      </footer>
    </div>
  );
};

export default GADData;