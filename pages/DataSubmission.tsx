
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, CheckCircle2, Download, FileText, Loader2, X, Plus, History, Clock, User as UserIcon, ArrowLeft } from 'lucide-react';
import { User, Submission } from '../types';
import { useNavigate } from 'react-router-dom';

const DataSubmission: React.FC<{ user: User | null }> = ({ user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const [view, setView] = useState<'history' | 'upload'>('history');
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [officeHistory, setOfficeHistory] = useState<any[]>([]);

  // Load office-wide history from localStorage
  useEffect(() => {
    const loadHistory = () => {
      const stored = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      // Filter by user's office to show only relevant departmental data
      const filtered = stored.filter((s: any) => s.office === user?.office);
      setOfficeHistory(filtered);
    };

    loadHistory();
    // Listen for storage changes in case other tabs upload
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
  }, [user?.office]);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPendingFiles(prev => [...prev, ...newFiles]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (pendingFiles.length === 0) return;
    setIsUploading(true);
    
    setTimeout(() => {
      const timestamp = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const userName = `${user?.firstName} ${user?.lastName}`;
      
      const newSubmissions = pendingFiles.map(file => ({
        id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        formName: file.name,
        submittedBy: userName,
        office: user?.office || 'Unknown',
        response: 'Pending',
        reviewedBy: '-',
        date: timestamp,
        created: 'Just now',
        fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      }));

      const existing = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const updated = [...newSubmissions, ...existing];
      localStorage.setItem('grids_submissions', JSON.stringify(updated));
      
      setOfficeHistory(updated.filter((s: any) => s.office === user?.office));
      setPendingFiles([]);
      setIsUploading(false);
      setView('history'); // Go back to history to see new items
    }, 2000);
  };

  const removePendingFile = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteRecord = (id: string) => {
    const existing = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
    const filtered = existing.filter((s: any) => s.id !== id);
    localStorage.setItem('grids_submissions', JSON.stringify(filtered));
    setOfficeHistory(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
            {view === 'history' ? 'Submission Logs' : 'New Submission'}
          </h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">
            Office: {user?.office || 'Authorized Personnel'}
          </p>
        </div>

        {view === 'history' && (
          <button 
            onClick={() => setView('upload')}
            className="flex items-center gap-4 bg-black text-white px-10 py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-xl active:scale-95 group"
          >
            <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            New Upload
          </button>
        )}
      </div>

      {view === 'history' ? (
        /* HISTORY VIEW */
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-white rounded-[48px] shadow-2xl shadow-purple-900/5 border border-white overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-12">
              <div className="flex items-center gap-3 mb-10">
                <History className="text-purple-600" size={24} />
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Office Upload History</h2>
              </div>

              {officeHistory.length > 0 ? (
                <div className="space-y-4">
                  {officeHistory.map((s) => {
                    const isMe = s.submittedBy === `${user?.firstName} ${user?.lastName}`;
                    return (
                      <div key={s.id} className="bg-[#FDFBF2] rounded-[32px] p-6 flex flex-col md:flex-row md:items-center gap-6 border border-purple-50 hover:border-purple-200 transition-all group">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-600 flex-shrink-0">
                          <FileText size={28} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-lg font-black text-gray-900 truncate">{s.formName}</h4>
                            <span className={`px-3 py-0.5 text-[8px] font-black rounded-full uppercase tracking-widest ${s.response === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {s.response === 'Approved' ? 'Approved' : 'Uploaded'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <UserIcon size={12} />
                              <span className={isMe ? 'text-purple-600' : ''}>{isMe ? 'Uploaded by You' : `By ${s.submittedBy}`}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <Clock size={12} />
                              <span>{s.date}</span>
                            </div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{s.fileSize}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                          <button 
                            onClick={() => navigate(`/view/${s.id}`)}
                            className="px-6 py-3 bg-white text-gray-900 rounded-xl font-black text-[10px] uppercase tracking-widest border border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
                          >
                            View
                          </button>
                          {isMe && (
                            <button 
                              onClick={() => handleDeleteRecord(s.id)}
                              className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-32 flex flex-col items-center text-center opacity-40">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <History size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">No History Yet</h3>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Upload your first data file to start the log.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* UPLOAD FORM VIEW */
        <div className="max-w-6xl mx-auto bg-[#FDFBF2] rounded-[48px] shadow-2xl shadow-purple-900/5 border border-white overflow-hidden relative flex flex-col min-h-[700px] transition-all duration-500">
          <div className="p-12 pb-8 flex flex-col">
            <h2 className="text-5xl font-medium text-gray-900 mb-8">Select Files</h2>
            
            <div className="flex-1">
              {/* Dropzone Area */}
              <div 
                onClick={handleChooseFile}
                className={`w-full border-[3px] border-dashed rounded-[32px] py-14 flex flex-col items-center justify-center bg-transparent cursor-pointer transition-all group relative overflow-hidden mb-8
                  ${pendingFiles.length > 0 ? 'border-[#8B1FFF] bg-purple-50/10' : 'border-gray-300 hover:bg-black/5 hover:border-gray-900'}`}
              >
                <div className={`w-14 h-18 rounded-lg flex items-center justify-center mb-6 relative transition-transform group-hover:scale-110
                  ${pendingFiles.length > 0 ? 'bg-[#8B1FFF]' : 'bg-gray-200'}`}>
                   <div className={`absolute top-0 right-0 w-5 h-5 rounded-bl-lg ${pendingFiles.length > 0 ? 'bg-purple-400' : 'bg-gray-300'}`}></div>
                   <div className="text-white p-2">
                     <Upload size={24} strokeWidth={2.5} />
                   </div>
                </div>
                <p className="text-xl font-medium text-gray-600 text-center px-6">
                  Drag and Drop files here or <span className="underline text-gray-900 font-bold">Choose files</span>
                </p>
                <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" multiple accept=".xls,.xlsx" />
              </div>

              {/* Pending Batch Queue */}
              {pendingFiles.length > 0 && (
                <div className="mb-10 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600">Files to be Uploaded ({pendingFiles.length})</span>
                    <div className="h-px flex-1 bg-purple-100"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pendingFiles.map((file, idx) => (
                      <div key={idx} className="bg-white border border-purple-200 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-in zoom-in-95">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 bg-[#1D6F42] rounded-md flex items-center justify-center text-white flex-shrink-0 text-[10px] font-black">X</div>
                          <span className="text-sm font-bold text-gray-900 truncate">{file.name}</span>
                        </div>
                        <button onClick={() => removePendingFile(idx)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                          <X size={16} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Template Download Section */}
              <div className="bg-[#F5F0FF] rounded-[32px] p-8 flex items-center gap-6 border border-purple-100 mb-10 group hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-[#1D6F42] rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <span className="font-black text-xl">X</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-medium text-gray-900 mb-0.5">Sample Template</h4>
                  <p className="text-base text-gray-500 leading-tight">Download the official template to ensure your data format is correctly validated.</p>
                </div>
                <button className="px-8 py-4 bg-[#8B1FFF] text-white rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95 flex items-center gap-2">
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto p-12 pt-0 flex justify-end gap-6 relative z-10">
            <button onClick={() => setView('history')} className="px-14 py-5 bg-[#EBE9F5] text-gray-900 rounded-[28px] font-medium text-2xl hover:bg-gray-200 transition-all active:scale-95">
              Cancel
            </button>
            <button 
              onClick={handleUpload}
              disabled={pendingFiles.length === 0 || isUploading}
              className={`px-14 py-5 rounded-[28px] font-medium text-2xl transition-all shadow-lg flex items-center gap-4
                ${pendingFiles.length > 0 && !isUploading ? 'bg-black text-white hover:bg-purple-600 active:scale-95' : 'bg-[#EBE9F5] text-gray-400 cursor-not-allowed opacity-70'}`}
            >
              {isUploading ? (
                <><Loader2 size={24} className="animate-spin" /> Uploading...</>
              ) : (
                <>Upload {pendingFiles.length > 0 ? `(${pendingFiles.length})` : ''}</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <footer className="mt-20 w-full flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center leading-relaxed">
          Copyright © City Government of Baguio<br />
          City Planning Development Service Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default DataSubmission;
