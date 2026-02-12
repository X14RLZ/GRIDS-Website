import React, { useState, useEffect } from 'react';
import { Check, X, Eye, AlertCircle, Save, Loader2 } from 'lucide-react';
import { Submission, User, Notification } from '../types';
import { Link } from 'react-router-dom';

const DataApproval: React.FC<{ user: User | null, isDarkMode?: boolean }> = ({ user, isDarkMode = false }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [remarks, setRemarks] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = () => {
    const stored: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
    setSubmissions(stored);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleAction = (id: string, status: 'Approved' | 'Denied') => {
    // Rejection requires a remark
    if (status === 'Denied' && !remarks.trim()) {
      alert('Please provide remarks explaining why the data was disapproved.');
      return;
    }

    setIsProcessing(true);
    const reviewerName = user ? `${user.firstName} ${user.lastName}` : 'Administrator';
    
    setTimeout(() => {
      const stored: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const updated = stored.map(s => {
        if (s.id === id) {
          return { 
            ...s, 
            response: status, 
            reviewedBy: reviewerName,
            reviewerRemarks: status === 'Denied' ? remarks : s.reviewerRemarks
          };
        }
        return s;
      });

      localStorage.setItem('grids_submissions', JSON.stringify(updated));
      setSubmissions(updated);

      // Notify the Data Provider
      const targetSub = updated.find(s => s.id === id);
      if (targetSub) {
        const notifications: Notification[] = JSON.parse(localStorage.getItem('grids_notifications') || '[]');
        const newNotif: Notification = {
          id: `resnotif-${Date.now()}`,
          title: `Data Submission ${status}`,
          message: `Your submission "${targetSub.formName}" has been ${status.toLowerCase()} by ${reviewerName}.${status === 'Denied' ? ' Please check remarks for details.' : ''}`,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
          department: user?.office || 'System',
          targetUrl: '/data-submission' // Jump to logs to see status/remarks
        };
        localStorage.setItem('grids_notifications', JSON.stringify([newNotif, ...notifications]));
      }

      setSelectedSubmission(null);
      setRemarks('');
      setIsProcessing(false);
      window.dispatchEvent(new Event('storage'));
    }, 800);
  };

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = isDarkMode ? 'bg-[#1A1625]' : 'bg-white';
  const borderClass = isDarkMode ? 'border-white/5' : 'border-purple-50';

  return (
    <div className="p-4 lg:p-8 animate-in fade-in duration-500 relative min-h-full">
      <div className="mb-10 text-center lg:text-left">
        <h1 className={`text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter ${textClass}`}>Data Approval</h1>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full mx-auto lg:mx-0"></div>
      </div>

      <div className={`${cardBgClass} rounded-[32px] md:rounded-[48px] p-4 md:p-12 shadow-2xl border ${borderClass} overflow-hidden mb-20 md:mb-32`}>
        <div className="table-container custom-scrollbar">
          <table className="w-full text-left table-auto border-collapse min-w-[700px]">
            <thead className={`text-[9px] md:text-[10px] font-black ${isDarkMode ? 'text-purple-400' : 'text-gray-400'} uppercase tracking-[0.2em] border-b ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
              <tr>
                <th className="px-4 md:px-6 py-6 md:py-8">Form Name</th>
                <th className="px-4 md:px-6 py-6 md:py-8">Submitted By</th>
                <th className="px-4 md:px-6 py-6 md:py-8">Date</th>
                <th className="px-4 md:px-6 py-6 md:py-8">Status</th>
                <th className="px-4 md:px-6 py-6 md:py-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-gray-50'}`}>
              {submissions.map((s) => (
                <tr key={s.id} className={`transition-all group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-purple-50/20'}`}>
                  <td className="px-4 md:px-6 py-6 md:py-8">
                    <div className="flex flex-col">
                      <span className={`text-xs md:text-sm font-black group-hover:text-purple-700 transition-colors leading-tight mb-1 truncate max-w-[200px] md:max-w-none ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {s.formName}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">{s.created}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-6 md:py-8 whitespace-nowrap">
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">{s.submittedBy}</span>
                  </td>
                  <td className="px-4 md:px-6 py-6 md:py-8 whitespace-nowrap">
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">{s.date}</span>
                  </td>
                  <td className="px-4 md:px-6 py-6 md:py-8">
                    <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm
                      ${s.response === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 
                        s.response === 'Denied' ? 'bg-red-50 text-red-600 border-red-100' : 
                        'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                      {s.response}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-6 md:py-8 text-right">
                    <div className="flex items-center justify-end gap-2 md:gap-3">
                      <Link to={`/view/${s.id}`} className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl transition-all shadow-sm ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white hover:text-black' : 'bg-gray-50 text-gray-400 hover:bg-black hover:text-white'}`} title="View File">
                        <Eye size={16} />
                      </Link>
                      <button 
                        onClick={() => handleAction(s.id, 'Approved')}
                        disabled={s.response !== 'Pending'}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl transition-all shadow-sm
                          ${s.response === 'Pending' ? 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white' : (isDarkMode ? 'bg-white/5 text-gray-700' : 'bg-gray-50 text-gray-200') + ' cursor-not-allowed'}`}
                      >
                        <Check size={16} strokeWidth={3} />
                      </button>
                      <button 
                        onClick={() => setSelectedSubmission(s)}
                        disabled={s.response !== 'Pending'}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl transition-all shadow-sm
                          ${s.response === 'Pending' ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' : (isDarkMode ? 'bg-white/5 text-gray-700' : 'bg-gray-50 text-gray-200') + ' cursor-not-allowed'}`}
                      >
                        <X size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-50">
                    No submissions available for review
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disapproval Remark Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => !isProcessing && setSelectedSubmission(null)}></div>
          <div className={`relative w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border
            ${isDarkMode ? 'bg-[#1A1625] border-white/10' : 'bg-white border-white'}`}>
            <div className="p-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className={`text-2xl font-black uppercase tracking-tighter mb-2 text-center ${textClass}`}>Disapprove Submission</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 text-center px-4">
                Please provide a justification for rejecting "{selectedSubmission.formName}"
              </p>

              <div className="w-full space-y-2 mb-8">
                 <label className="text-[9px] font-black uppercase tracking-widest ml-4 text-red-600">Rejection Remarks (Required)</label>
                 <textarea 
                    autoFocus
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="E.g. Incomplete sectoral data, wrong year period, or invalid template used..."
                    className={`w-full h-32 px-6 py-4 rounded-[24px] text-xs font-bold focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all resize-none
                      ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}
                 />
              </div>

              <div className="w-full flex gap-4">
                 <button 
                  onClick={() => { setSelectedSubmission(null); setRemarks(''); }}
                  disabled={isProcessing}
                  className={`flex-1 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-400'}`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleAction(selectedSubmission.id, 'Denied')}
                  disabled={isProcessing || !remarks.trim()}
                  className="flex-1 py-4 bg-red-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <><Save size={16} /> Disapprove</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataApproval;