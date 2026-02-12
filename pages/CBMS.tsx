
import React, { useState, useEffect } from 'react';
import { Submission } from '../types';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Sprout, Layers, ShieldCheck, FileText, Download, 
  ExternalLink, Search, ShieldAlert, Heart, Map, Tractor, 
  Wheat, Beef, Info, ArrowUpDown, FileSpreadsheet, FileCode,
  ChevronUp, ChevronDown, Layout, Globe, Smartphone, UserCheck,
  Activity
} from 'lucide-react';

const CBMS: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [data, setData] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<'section-p' | 'section-e' | 'section-l' | 'records'>('section-e');
  const [expandedSection, setExpandedSection] = useState<string | null>('main');
  
  useEffect(() => {
    const loadData = () => {
      const stored = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      setData(stored.filter((s: any) => s.response === 'Approved'));
    };
    loadData();
  }, []);

  const AnalysisBarChart = ({ data, sectionId }: { data: any[], sectionId: string }) => (
    <div className={`p-6 md:p-10 transition-colors duration-500 ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'}`}>
      <div className="flex gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
          <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Female</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
          <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Male</span>
        </div>
      </div>
      <div className="space-y-6">
        {data.map((item, i) => {
          const total = item.male + item.female;
          const maxVal = 160000;
          const fWidth = (item.female / maxVal) * 100;
          const mWidth = (item.male / maxVal) * 100;
          return (
            <div key={i} className="animate-in fade-in">
              <div className="flex justify-between mb-2 px-1">
                <span className={`text-[9px] md:text-[10px] font-black uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                <span className={`text-[9px] md:text-[10px] font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{total.toLocaleString()}</span>
              </div>
              <div className={`h-4 md:h-5 w-full rounded-full flex overflow-hidden shadow-inner ${isDarkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
                <div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${fWidth}%` }}></div>
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${mWidth}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="p-4 md:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Standardized Header */}
      <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="text-center lg:text-left">
          <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${textClass}`}>CBMS Table Hub</h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">Official 2021 Survey Statistics</p>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
        </div>
        
        <div className={`flex p-1.5 rounded-[24px] shadow-lg border transition-colors duration-500 overflow-x-auto no-scrollbar
          ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-white border-purple-50'}`}>
          {['section-e', 'section-l', 'section-p', 'records'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase whitespace-nowrap transition-all
                ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg' : (isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-600')}`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-20">
        {activeTab === 'records' ? (
          <div className={`rounded-[48px] shadow-xl border overflow-hidden ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-gray-100'}`}>
            <div className="table-container custom-scrollbar">
              <table className="w-full text-left min-w-[600px]">
                <thead className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-white/5 text-purple-300' : 'bg-gray-50/50 text-gray-400'}`}>
                  <tr>
                    <th className="px-10 py-5">Form Name</th>
                    <th className="px-6 py-5">Origin</th>
                    <th className="px-10 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-gray-50'}`}>
                  {data.map((d) => (
                    <tr key={d.id} className="hover:bg-purple-50/10 transition-all group">
                      <td className="px-10 py-6 font-black text-sm">{d.formName}</td>
                      <td className="px-6 py-6 text-[10px] font-bold text-gray-400 uppercase">{d.submittedBy}</td>
                      <td className="px-10 py-6 text-right"><Link to={`/view/${d.id}`} className="text-purple-600 font-black text-[10px] uppercase hover:underline">View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={`rounded-[48px] shadow-2xl border overflow-hidden divide-y ${isDarkMode ? 'bg-[#1A1625] border-white/5 divide-white/5' : 'bg-white border-white divide-gray-50'}`}>
            <button onClick={() => setExpandedSection(expandedSection === 'main' ? null : 'main')} className="w-full flex items-center justify-between p-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md"><Activity size={24} /></div>
                <h3 className={`text-2xl font-black uppercase tracking-tight ${textClass}`}>Employment Distribution</h3>
              </div>
              {expandedSection === 'main' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            {expandedSection === 'main' && <AnalysisBarChart data={[{name: 'Employed', male: 58875, female: 43502}, {name: 'Unemployed', male: 79056, female: 100509}]} sectionId="main" />}
          </div>
        )}
      </div>

      <footer className="mt-auto py-10 flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center leading-loose">
          City Government of Baguio<br />CPDSO – CBMS Division
        </p>
      </footer>
    </div>
  );
};

export default CBMS;
