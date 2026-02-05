
import React, { useState, useEffect } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { Submission, User } from '../types';
import { Link } from 'react-router-dom';

const DataApproval: React.FC<{ user: User | null }> = ({ user }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: '1', formName: 'CMO - Disaggregated Data on Scholars 2025.xls', submittedBy: 'by CMO Staff 1', response: 'Pending', reviewedBy: '-', date: '27 September, 2025', created: '5 minutes ago' },
    { id: '2', formName: 'CEPMO - Environmental Quality Indicators 2024.xlsx', submittedBy: 'by CEPMO Admin', response: 'Pending', reviewedBy: '-', date: '28 September, 2025', created: '1 hour ago' },
  ]);

  // Sync with localStorage to reflect real submissions
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
    
    // Update local state
    const updatedSubmissions = submissions.map(s => 
      s.id === id ? { ...s, response: status, reviewedBy: reviewerName } : s
    );
    setSubmissions(updatedSubmissions);

    // Persist to localStorage
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

  return (
    <div className="p-4 lg:p-8 animate-in fade-in duration-500 relative min-h-full">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Data Approval</h1>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[48px] p-8 lg:p-12 shadow-2xl shadow-purple-900/5 border border-purple-50 overflow-hidden mb-32">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse">
            <thead className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
              <tr>
                <th className="px-6 py-8 text-left">Form Name</th>
                <th className="px-6 py-8 text-left">Submitted By</th>
                <th className="px-6 py-8 text-left">Date</th>
                <th className="px-6 py-8 text-left">Status</th>
                <th className="px-6 py-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {submissions.map((s) => (
                <tr key={s.id} className="hover:bg-purple-50/20 transition-all duration-300 group">
                  {/* Form Name - Takes most space */}
                  <td className="px-6 py-8 align-middle">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-800 group-hover:text-purple-700 transition-colors leading-tight mb-1">
                        {s.formName}
                      </span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        {s.created}
                      </span>
                    </div>
                  </td>

                  {/* Submitted By - Constrained width */}
                  <td className="px-6 py-8 align-middle whitespace-nowrap">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                      {s.submittedBy}
                    </span>
                  </td>

                  {/* Date - Constrained width */}
                  <td className="px-6 py-8 align-middle whitespace-nowrap">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                      {s.date}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-8 align-middle">
                    <div className="flex items-center">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border shadow-sm
                        ${s.response === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 
                          s.response === 'Denied' ? 'bg-red-50 text-red-600 border-red-100' : 
                          'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                        {s.response}
                      </span>
                    </div>
                  </td>

                  {/* Action Buttons - Right Aligned */}
                  <td className="px-6 py-8 align-middle text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        to={`/view/${s.id}`} 
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm group/btn"
                        title="View File"
                      >
                        <Eye size={18} />
                      </Link>
                      
                      <div className="w-px h-6 bg-gray-100 mx-1"></div>

                      <button 
                        onClick={() => handleAction(s.id, 'Approved')}
                        disabled={s.response !== 'Pending'}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm
                          ${s.response === 'Pending' 
                            ? 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white' 
                            : 'bg-gray-50 text-gray-200 cursor-not-allowed'}`}
                        title="Approve"
                      >
                        <Check size={18} strokeWidth={3} />
                      </button>

                      <button 
                        onClick={() => handleAction(s.id, 'Denied')}
                        disabled={s.response !== 'Pending'}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm
                          ${s.response === 'Pending' 
                            ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' 
                            : 'bg-gray-50 text-gray-200 cursor-not-allowed'}`}
                        title="Deny"
                      >
                        <X size={18} strokeWidth={3} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {submissions.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center opacity-40">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Check size={32} className="text-gray-300" />
              </div>
              <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">No pending approvals</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Branding */}
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
