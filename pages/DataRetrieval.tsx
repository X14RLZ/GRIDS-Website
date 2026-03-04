
import React, { useState, useEffect } from 'react';
import { CloudDownload, Eye, Search, Filter, Database, FileSpreadsheet, Building2, User as UserIcon, Clock } from 'lucide-react';
import { Submission } from '../types';
import { Link } from 'react-router-dom';

const DataRetrieval: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [approvedData, setApprovedData] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOffice, setFilterOffice] = useState('All');

  const loadData = () => {
    const stored: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
    setApprovedData(stored.filter((s: Submission) => s.response === 'Approved'));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const offices = Array.from(new Set(approvedData.map(d => d.office))).sort();

  const filteredData = approvedData.filter(d => {
    const matchesSearch = d.formName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOffice = filterOffice === 'All' || d.office === filterOffice;
    return matchesSearch && matchesOffice;
  });

  const handleDownload = (formName: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = formName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`Downloading ${formName}... Dataset successfully retrieved from GRIDS vault.`);
  };

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = isDarkMode ? 'bg-[#1A1625]' : 'bg-white';

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Standardized Header */}
      <div className="mb-16 text-center lg:text-left">
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${textClass}`}>Data Retrieval</h1>
        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">Registry Vault Access</p>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
      </div>

      <div className="mb-10 flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto lg:mx-0">
           <div className="flex-1 relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                <Search size={20} strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder="Search approved datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-14 pr-6 py-4 rounded-[24px] border shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all text-xs font-bold
                  ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white placeholder:text-gray-600' : 'bg-white border-purple-50 text-gray-900 placeholder:text-gray-300'}`}
              />
           </div>
           <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                <Filter size={18} strokeWidth={3} />
              </div>
              <select 
                value={filterOffice}
                onChange={(e) => setFilterOffice(e.target.value)}
                className={`pl-14 pr-10 py-4 rounded-[24px] border shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all text-xs font-black uppercase appearance-none cursor-pointer
                  ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white' : 'bg-white border-purple-50 text-gray-900'}`}
              >
                <option value="All">All Offices</option>
                {offices.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
           </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-20">
        {filteredData.map((d) => (
          <div key={d.id} className={`${cardBgClass} rounded-[40px] p-8 border shadow-sm transition-all hover:shadow-2xl flex flex-col group ${isDarkMode ? 'border-white/5' : 'border-purple-50'}`}>
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all group-hover:bg-purple-600 group-hover:text-white
                ${isDarkMode ? 'bg-[#2A2438] text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                <FileSpreadsheet size={28} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Approved File</span>
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">Validated</span>
              </div>
            </div>

            <h3 className={`text-xl font-black uppercase tracking-tight mb-4 leading-tight line-clamp-2 min-h-[3.5rem] ${textClass}`}>
              {d.formName}
            </h3>

            <div className={`space-y-4 p-5 rounded-[28px] mb-8 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                     <Building2 size={14} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Office</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase ${textClass}`}>{d.office}</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                     <UserIcon size={14} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Provider</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase ${textClass}`}>{d.submittedBy}</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                     <Clock size={14} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Approved on</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase ${textClass}`}>{d.date}</span>
               </div>
            </div>

            <div className="mt-auto flex gap-3">
               <Link 
                to={`/view/${d.id}`} 
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-white hover:text-black' : 'bg-white border border-gray-100 text-gray-900 hover:bg-black hover:text-white'}`}
              >
                <Eye size={16} /> Preview
              </Link>
              <button 
                onClick={() => handleDownload(d.formName)}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-purple-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all"
              >
                <CloudDownload size={16} /> Download
              </button>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="col-span-full py-40 flex flex-col items-center opacity-30">
            <Database size={64} className="text-gray-300 mb-6" />
            <h3 className={`text-2xl font-black uppercase tracking-tighter ${textClass}`}>No data matched your criteria</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>

      <footer className="mt-auto py-10 flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center leading-loose">
          Copyright © City Government of Baguio<br />
          City Planning, Development, and Sustainability Office – CBMS Division
        </p>
      </footer>
    </div>
  );
};

export default DataRetrieval;
