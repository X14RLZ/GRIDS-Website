
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, CheckCircle2, Download, FileText, Loader2, X, Plus, History, Clock, User as UserIcon, ArrowLeft } from 'lucide-react';
import { User, Submission, Notification } from '../types';
import { useNavigate } from 'react-router-dom';

// IndexedDB Logic ...
const DB_NAME = 'GRIDS_FileStorage';
const STORE_NAME = 'files';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveFileToDB = async (id: string, file: File) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({
        content: reader.result,
        name: file.name,
        type: file.type,
        size: file.size
      }, id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    };
    reader.readAsDataURL(file);
  });
};

const deleteFileFromDB = async (id: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
};

const DataSubmission: React.FC<{ user: User | null, isDarkMode?: boolean }> = ({ user, isDarkMode = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [view, setView] = useState<'history' | 'upload'>('history');
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [officeHistory, setOfficeHistory] = useState<Submission[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const stored: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const filtered = stored.filter((s: Submission) => s.office === user?.office);
      setOfficeHistory(filtered);
    };
    loadHistory();
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
  }, [user?.office]);

  const handleChooseFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPendingFiles(prev => [...prev, ...newFiles]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (pendingFiles.length === 0) return;
    setIsUploading(true);
    try {
      const timestamp = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const userName = `${user?.firstName} ${user?.lastName}`;
      const newSubmissions: Submission[] = [];
      for (const file of pendingFiles) {
        const id = `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        await saveFileToDB(id, file);
        const sub: Submission = {
          id: id,
          formName: file.name,
          submittedBy: userName,
          office: user?.office || 'Unknown',
          response: 'Pending',
          reviewedBy: '-',
          date: timestamp,
          created: 'Just now',
          fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          isStoredLocally: true 
        };
        newSubmissions.push(sub);
        const notifications: Notification[] = JSON.parse(localStorage.getItem('grids_notifications') || '[]');
        const newNotif: Notification = {
          id: `subnotif-${Date.now()}`,
          title: 'New Data Submission',
          message: `${userName} from ${user?.office} has submitted a new file for review: ${file.name}.`,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
          department: user?.office || 'System',
          targetUrl: '/data-approval'
        };
        localStorage.setItem('grids_notifications', JSON.stringify([newNotif, ...notifications]));
      }
      const existing: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const updated = [...newSubmissions, ...existing];
      localStorage.setItem('grids_submissions', JSON.stringify(updated));
      setOfficeHistory(updated.filter((s: Submission) => s.office === user?.office));
      setPendingFiles([]);
      setIsUploading(false);
      setView('history'); 
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
      alert("An error occurred while storing the file. Please try again.");
    }
  };

  const removePendingFile = (index: number) => setPendingFiles(prev => prev.filter((_, i) => i !== index));

  const handleDeleteRecord = async (id: string) => {
    await deleteFileFromDB(id);
    const existing: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
    const filtered = existing.filter((s: Submission) => s.id !== id);
    localStorage.setItem('grids_submissions', JSON.stringify(filtered));
    setOfficeHistory(prev => prev.filter(s => s.id !== id));
  };

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = isDarkMode ? 'bg-[#1A1625]' : 'bg-white';
  const innerBgClass = isDarkMode ? 'bg-[#2A2438]' : 'bg-[#FDFBF2]';

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Standardized Consistent Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="text-center md:text-left">
          <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${textClass}`}>
            {view === 'history' ? 'Submission Logs' : 'Data Submission'}
          </h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">Registry Office: {user?.office || 'Authorized Personnel'}</p>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto md:mx-0"></div>
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
        <div className="max-w-6xl mx-auto space-y-6">
          <div className={`${cardBgClass} rounded-[48px] shadow-2xl shadow-purple-900/5 border ${isDarkMode ? 'border-white/5' : 'border-white'} overflow-hidden flex flex-col min-h-[600px]`}>
            <div className="p-12">
              <div className="flex items-center gap-3 mb-10">
                <History className="text-purple-600" size={24} />
                <h2 className={`text-3xl font-black uppercase tracking-tight ${textClass}`}>Office Upload History</h2>
              </div>
              {officeHistory.length > 0 ? (
                <div className="space-y-4">
                  {officeHistory.map((s) => (
                    <div key={s.id} className={`${innerBgClass} rounded-[32px] p-6 flex flex-col md:flex-row md:items-center gap-6 border ${isDarkMode ? 'border-white/5 hover:border-purple-900' : 'border-purple-50 hover:border-purple-200'} transition-all group`}>
                      <div className={`w-14 h-14 ${isDarkMode ? 'bg-white/5' : 'bg-white'} rounded-2xl shadow-sm flex items-center justify-center text-purple-600 flex-shrink-0`}>
                        <FileText size={28} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className={`text-lg font-black truncate ${textClass}`}>{s.formName}</h4>
                          <span className={`px-3 py-0.5 text-[8px] font-black rounded-full uppercase tracking-widest ${s.response === 'Approved' ? 'bg-green-100 text-green-700' : s.response === 'Denied' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {s.response}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                           <span className={s.submittedBy.includes(user?.firstName || '') ? 'text-purple-600' : ''}>By {s.submittedBy}</span>
                           <span>{s.date}</span>
                           <span>{s.fileSize}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-auto">
                        <button onClick={() => navigate(`/view/${s.id}`)} className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${isDarkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white hover:text-black' : 'bg-white text-gray-900 border-gray-100 hover:bg-black hover:text-white'}`}>View</button>
                        {s.submittedBy.includes(user?.firstName || '') && (
                          <button onClick={() => handleDeleteRecord(s.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-32 flex flex-col items-center text-center opacity-40">
                  <History size={48} className="text-gray-400 mb-6" />
                  <h3 className={`text-2xl font-black uppercase tracking-tighter ${textClass}`}>No History Yet</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`${innerBgClass} rounded-[48px] shadow-2xl border ${isDarkMode ? 'border-white/5' : 'border-white'} overflow-hidden relative flex flex-col min-h-[700px]`}>
          <div className="p-12 pb-8 flex flex-col flex-1">
            <h2 className={`text-4xl font-black uppercase mb-8 ${textClass}`}>Select Files</h2>
            <div 
              onClick={handleChooseFile}
              className={`w-full border-[3px] border-dashed rounded-[32px] py-14 flex flex-col items-center justify-center bg-transparent cursor-pointer transition-all mb-8
                ${pendingFiles.length > 0 ? 'border-[#8B1FFF]' : (isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-gray-300 hover:border-gray-900')}`}
            >
              <Upload size={32} className="mb-4 text-purple-600" />
              <p className={`text-xl font-medium text-center px-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose files to upload</p>
              <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" multiple accept=".xls,.xlsx" />
            </div>
            {pendingFiles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                {pendingFiles.map((file, idx) => (
                  <div key={idx} className={`${isDarkMode ? 'bg-white/5' : 'bg-white'} border rounded-2xl p-4 flex items-center justify-between shadow-sm`}>
                    <span className={`text-sm font-bold truncate ${textClass}`}>{file.name}</span>
                    <button onClick={() => removePendingFile(idx)} className="text-gray-300 hover:text-red-500"><X size={16} strokeWidth={3} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-12 pt-0 flex justify-end gap-6">
            <button onClick={() => setView('history')} className={`px-14 py-5 rounded-[28px] font-black text-xs uppercase tracking-widest ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-900'}`}>Cancel</button>
            <button onClick={handleUpload} disabled={pendingFiles.length === 0 || isUploading} className={`px-14 py-5 rounded-[28px] font-black text-xs uppercase tracking-widest bg-black text-white disabled:opacity-50`}>
              {isUploading ? <Loader2 className="animate-spin" /> : 'Confirm Upload'}
            </button>
          </div>
        </div>
      )}

      <footer className="mt-20 w-full flex flex-col items-center">
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          Copyright © City Government of Baguio<br />CPDSO – CBMS Division
        </p>
      </footer>
    </div>
  );
};

export default DataSubmission;
