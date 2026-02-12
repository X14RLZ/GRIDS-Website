
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Search, ShieldCheck, HelpCircle, FileText, UserCircle, Users, Layout, BookOpen } from 'lucide-react';

type HelpCategory = 'ui' | 'policy' | 'citizens' | 'staff' | null;

const Help: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory>(null);
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  const QABlock = ({ q, a, num }: { q: string, a: React.ReactNode, num?: string | number }) => (
    <div className="space-y-3 group">
      <h4 className={`text-lg font-black leading-tight group-hover:text-purple-600 transition-colors ${textClass}`}>
        {num ? `Q${num}. ` : ''}{q}
      </h4>
      <div className={`text-sm font-medium leading-relaxed pl-4 border-l-2 border-transparent group-hover:border-purple-600 transition-all text-gray-500`}>
        {a}
      </div>
    </div>
  );

  const renderUIHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl space-y-12">
      <div className="mb-10">
        <h2 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>for the GRIDS website UI</h2>
        <p className="text-sm font-bold mt-1 text-gray-500">Stuck on something? We're here to help with all your questions and answers in one place.</p>
      </div>
      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>General</h3>
        <div className="space-y-8">
          <QABlock num={1} q="What is GRIDS?" a="GRIDS (Gender-Responsive Integrated Database System) is Baguio City's centralized database for Gender and Development (GAD) data. It supports evidence-based, gender-responsive planning and policy-making." />
          <QABlock num={2} q="Who can use GRIDS?" a={
            <ul className="list-disc pl-5 space-y-1">
              <li>Public officials and government staff</li>
              <li>Members of the Gender Focal Point System (GFPS)</li>
              <li>The general public (for viewing public data)</li>
            </ul>
          } />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-12 animate-in fade-in duration-700 relative min-h-screen">
      {/* Standardized Header */}
      <div className="mb-16 text-center lg:text-left">
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${textClass}`}>Help Center</h1>
        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">Community Support Hub</p>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
      </div>

      <div className={`rounded-[64px] p-10 md:p-20 shadow-2xl transition-colors duration-500 border ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'} mb-20`}>
        {selectedCategory && (
          <button onClick={() => setSelectedCategory(null)} className={`mb-12 flex items-center gap-3 border px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 ${isDarkMode ? 'bg-[#2A2438] border-white/10 text-white hover:bg-white hover:text-black' : 'bg-white border-gray-100 text-gray-900 hover:bg-black hover:text-white'}`}>
            <ArrowLeft size={16} strokeWidth={3} /> Back to Categories
          </button>
        )}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <button onClick={() => setSelectedCategory('ui')} className="group relative w-full h-48 rounded-[48px] overflow-hidden shadow-xl border border-white hover:scale-[1.02] transition-all">
               <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/60 group-hover:bg-purple-900/60 transition-colors"></div>
               <div className="absolute inset-0 flex items-center justify-between px-12">
                 <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white"><Layout size={32} /></div>
                 <h3 className="text-white text-3xl font-black uppercase tracking-tighter text-right">GRIDS Website UI</h3>
               </div>
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">{selectedCategory === 'ui' && renderUIHelp()}</div>
        )}
      </div>
    </div>
  );
};

export default Help;
