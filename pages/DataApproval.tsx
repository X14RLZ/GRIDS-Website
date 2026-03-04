
import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, LayoutGrid, List, Check, X, Eye, ChevronUp, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { Submission } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const DataApproval: React.FC = () => {
  const navigate = useNavigate();
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: '1', formName: 'CMO - Disaggregated Data on Scholars 2025.xls', submittedBy: 'by CMO Staff 1', response: 'Pending', reviewedBy: '-', date: '27 September, 2025', created: '5 minutes ago' },
  ]);

  return (
    <div className="p-4 animate-in fade-in duration-500 relative min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Data Approval</h1>
        <div className="h-1.5 w-24 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-purple-50 overflow-hidden mb-32">
        <table className="w-full text-left">
          <thead className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
            <tr>
              <th className="px-4 py-6">Form Name</th>
              <th className="px-4 py-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="hover:bg-purple-50/20 transition-colors">
                <td className="px-4 py-6 text-sm font-bold text-gray-700">{s.formName}</td>
                <td className="px-4 py-6"><span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-600">{s.response}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        onClick={() => navigate(-1)}
        className="fixed bottom-10 right-10 flex items-center gap-4 px-8 py-5 bg-black text-white rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all z-50 group border border-white/10"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform duration-300" />
        <span className="hidden md:inline font-black text-xs uppercase tracking-[0.2em]">
          {isFromSearch ? "Search Results" : "Previous Page"}
        </span>
      </button>
    </div>
  );
};

export default DataApproval;
