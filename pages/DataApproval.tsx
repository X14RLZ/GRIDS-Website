import React, { useState, useEffect, useMemo } from 'react';
import { Check, X, Eye, Filter, BarChart as BarChartIcon, CheckCircle, Clock, AlertCircle, FileSpreadsheet, FileText, ChevronRight } from 'lucide-react';
import { Submission, User } from '../types';
import { Link } from 'react-router-dom';

const DataApproval: React.FC<{ user: User | null }> = ({ user }) => {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Denied'>('All');
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: '1', formName: 'CMO - Disaggregated Data on Scholars 2025.xls', submittedBy: 'by CMO Staff 1', response: 'Pending', reviewedBy: '-', date: '27 September, 2025', created: '5 minutes ago', fileSize: '1.2 MB' },
    { id: '2', formName: 'CEPMO - Environmental Quality Indicators 2024.xlsx', submittedBy: 'by CEPMO Admin', response: 'Pending', reviewedBy: '-', date: '28 September, 2025', created: '1 hour ago', fileSize: '4.5 MB' },
    { id: '3', formName: 'CHSO - Health Facility Distribution 2024.xls', submittedBy: 'by Health Unit', response: 'Approved', reviewedBy: 'System Admin', date: '20 September, 2025', created: '3 days ago', fileSize: '0.8 MB' },
  ]);

  useEffect(() => {
    const loadData = () => {
      const stored = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      setSubmissions(prev => {
        const combined = [...prev];
        stored.forEach((storedItem: Submission) => {
          const index = combined.findIndex(item => item.id === storedItem.id);
          if (index !== -1) {
            combined[index] = storedItem;
          } else {
            combined.unshift(storedItem);
          }
        });
        return combined;
      });
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleAction = (id: string, status: 'Approved' | 'Denied') => {
    const reviewerName = user ? `${user.firstName} ${user.lastName}` : 'Administrator';
    const updatedSubmissions = submissions.map(s => 
      s.id === id ? { ...s, response: status, reviewedBy: reviewerName } : s
    );
    setSubmissions(updatedSubmissions);

    const stored = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
    const existingIndex = stored.findIndex((s: any) => s.id === id);
    let newStorage;
    if (existingIndex !== -1) {
      newStorage = stored.map((s: any) => 
        s.id === id ? { ...s, response: status, reviewedBy: reviewerName } : s
      );
    } else {
      const itemToStore = updatedSubmissions.find(s => s.id === id);
      if (itemToStore) newStorage = [itemToStore, ...stored];
      else newStorage = stored;
    }
    localStorage.setItem('grids_submissions', JSON.stringify(newStorage));
  };

  const filteredSubmissions = useMemo(() => {
    if (filter === 'All') return submissions;
    return submissions.filter(s => s.response === filter);
  }, [submissions, filter]);

  const stats = useMemo(() => {
    return {
      total: submissions.length,
      pending: submissions.filter(s => s.response === 'Pending').length,
      approved: submissions.filter(s => s.response === 'Approved').length,
      denied: submissions.filter(s => s.response === 'Denied').length,
    };
  }, [submissions]);

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-500 relative min-h-full">
      <div className="mb-10">
        <h1 className="text-5xl font-black text-gray-900 mb-2 uppercase tracking-tighter italic">Data Review Portal</h1>
        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Official Verification & Governance Console</p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Pending Review', val: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Total Approved', val: stats.approved, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Recently Denied', val: stats.denied, icon: X, color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'Workload Volume', val: stats.total, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((item, i) => (
          <div key={i} className={`p-8 rounded-[32px] border border-white shadow-xl shadow-purple-900/5 ${item.bg} flex items-center justify-between group hover:scale-[1.02] transition-all`}>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{item.label}</span>
              <span className={`text-4xl font-black ${item.color} tabular-nums`}>{item.val}</span>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${item.color} shadow-sm group-hover:rotate-12 transition-transform`}>
              <item.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[48px] shadow-2xl shadow-purple-900/5 border border-purple-50 overflow-hidden mb-32 flex flex-col">
        
        {/* Filter Toolbar */}
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Filter size={18} />
            </div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Review Queue</h2>
          </div>
          
          <div className="flex bg-gray-50 p-1 rounded-2xl">
            {(['All', 'Pending', 'Approved', 'Denied'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${filter === f ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse">
            <thead className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/30">
              <tr>
                <th className="px-10 py-6">Resource Information</th>
                <th className="px-6 py-6">Source/Origin</th>
                <th className="px-6 py-6">Submission Date</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-10 py-6 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSubmissions.map((s) => (
                <tr key={s.id} className="hover:bg-purple-50/20 transition-all duration-300 group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all
                        ${s.formName.includes('.xls') ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        <FileSpreadsheet size={24} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black text-gray-800 group-hover:text-purple-700 transition-colors leading-tight mb-1 truncate max-w-[280px]">
                          {s.formName}
                        </span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <BarChartIcon size={10} /> {s.fileSize || 'Database Record'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-8">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      {s.submittedBy.replace('by ', '')}
                    </span>
                  </td>

                  <td className="px-6 py-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-700 uppercase tracking-tight">
                        {s.date}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase italic">
                        {s.created}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-8">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm inline-flex items-center gap-2
                      ${s.response === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        s.response === 'Denied' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${s.response === 'Approved' ? 'bg-emerald-600' : s.response === 'Denied' ? 'bg-rose-600' : 'bg-amber-600 animate-pulse'}`}></div>
                      {s.response}
                    </span>
                  </td>

                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        to={`/view/${s.id}`} 
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm group/btn"
                        title="View & Inspect"
                      >
                        <Eye size={18} />
                      </Link>
                      
                      <div className="w-px h-6 bg-gray-100 mx-1"></div>

                      <button 
                        onClick={() => handleAction(s.id, 'Approved')}
                        disabled={s.response !== 'Pending'}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm
                          ${s.response === 'Pending' 
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white' 
                            : 'bg-gray-50 text-gray-200 cursor-not-allowed'}`}
                        title="Final Approve"
                      >
                        <Check size={18} strokeWidth={3} />
                      </button>

                      <button 
                        onClick={() => handleAction(s.id, 'Denied')}
                        disabled={s.response !== 'Pending'}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm
                          ${s.response === 'Pending' 
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' 
                            : 'bg-gray-50 text-gray-200 cursor-not-allowed'}`}
                        title="Decline / Reject"
                      >
                        <X size={18} strokeWidth={3} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSubmissions.length === 0 && (
            <div className="py-40 text-center flex flex-col items-center opacity-40">
              <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-8 border border-gray-100">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Queue is clear!</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">All submissions for this category have been processed.</p>
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-12 w-full flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center leading-relaxed">
          Copyright © City Government of Baguio<br />
          City Planning Development Service Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default DataApproval;