import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, CheckCircle2, Download, FileText, Loader2, X, Plus, History, Clock, User as UserIcon, ArrowLeft } from 'lucide-react';
import { User, Submission, Notification } from '../types';
import { useNavigate } from 'react-router-dom';

/**
 * HYBRID STORAGE STRATEGY:
 * LocalStorage has a strict 5MB limit. To allow users to upload large Excel files (dissemination),
 * we use IndexedDB for the binary file content and LocalStorage for the lightweight metadata.
 */

// 1. DATABASE INITIALIZATION: Creates a local "object store" in the user's browser
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

/**
 * SAVE TO INDEXEDDB: 
 * Converts a raw File to a Base64 string (DataURL) and persists it locally.
 * This allows the file to survive page refreshes.
 */
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

// HELPER: Removes data from persistent browser storage
const deleteFileFromDB = async (id: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
};

/**
 * DATA SUBMISSION PAGE:
 * Allows authorized personnel to upload sectoral data reports.
 * Includes a "Submission History" view filtered by the user's office.
 */
const DataSubmission: React.FC<{ user: User | null, isDarkMode?: boolean }> = ({ user, isDarkMode = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // UI States
  const [view, setView] = useState<'history' | 'upload'>('history');
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [officeHistory, setOfficeHistory] = useState<Submission[]>([]);

  /**
   * DATA ISOLATION:
   * Only loads submissions that belong to the user's specific office (e.g., CPDSO, CMO).
   */
  useEffect(() => {
    const loadHistory = () => {
      const stored: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const filtered = stored.filter((s: Submission) => s.office === user?.office);
      setOfficeHistory(filtered);
    };

    loadHistory();
    // Watch for changes in other tabs (cross-tab synchronization)
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
  }, [user?.office]);

  // Visual helper to trigger the hidden file input
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  // Logic for adding files to the "Pending" staging area
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPendingFiles(prev => [...prev, ...newFiles]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  /**
   * SUBMISSION ORCHESTRATOR:
   * 1. Generates unique IDs
   * 2. Saves binary data to IndexedDB
   * 3. Saves searchable metadata to LocalStorage
   * 4. Updates global audit logs
   */
  const handleUpload = async () => {
    if (pendingFiles.length === 0) return;
    setIsUploading(true);
    
    try {
      const timestamp = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const userName = `${user?.firstName} ${user?.lastName}`;
      
      const newSubmissions: Submission[] = [];
      
      for (const file of pendingFiles) {
        const id = `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Step A: Save heavy binary data
        await saveFileToDB(id, file);
        
        // Step B: Create lightweight metadata entry
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

        // Notify Reviewers
        const notifications: Notification[] = JSON.parse(localStorage.getItem('grids_notifications') || '[]');
        const newNotif: Notification = {
          id: `subnotif-${Date.now()}`,
          title: 'New Data Submission',
          message: `${userName} from ${user?.office} has submitted a new file for review: ${file.name}.`,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
          department: user?.office || 'System',
          targetUrl: '/data-approval' // Jump to approval for reviewer
        };
        localStorage.setItem('grids_notifications', JSON.stringify([newNotif, ...notifications]));
      }

      // Step C: Persist metadata list to global registry
      const existing: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const updated = [...newSubmissions, ...existing];
      localStorage.setItem('grids_submissions', JSON.stringify(updated));
      
      // Reset UI state
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

  // UI cleanup for the staging area
  const removePendingFile = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Full deletion from both browser storage systems
  const handleDeleteRecord = async (id: string) => {
    await deleteFileFromDB(id);
    const existing: Submission[] = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
    const filtered = existing.filter((s: Submission) => s.id !== id);
    localStorage.setItem('grids_submissions', JSON.stringify(filtered));
    setOfficeHistory(prev => prev.filter(s => s.id !== id));
  };

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBgClass = isDarkMode ? 'bg-[#1A1625]' : 'bg-white';
  const innerBgClass = isDarkMode ? 'bg-[#2A2438]' : 'bg-[#FDFBF2]';

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Header with context-aware title */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className={`text-5xl font-black mb-2 uppercase tracking-tighter ${textClass}`}>
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
        /* HISTORY VIEW: Lists previous uploads for auditing */
        <div className="max-w-6xl mx-auto space-y-6">
          <div className={`${cardBgClass} rounded-[48px] shadow-2xl shadow-purple-900/5 border ${isDarkMode ? 'border-white/5' : 'border-white'} overflow-hidden flex flex-col min-h-[600px]`}>
            <div className="p-12">
              <div className="flex items-center gap-3 mb-10">
                <History className="text-purple-600" size={24} />
                <h2 className={`text-3xl font-black uppercase tracking-tight ${textClass}`}>Office Upload History</h2>
              </div>

              {officeHistory.length > 0 ? (
                <div className="space-y-4">
                  {officeHistory.map((s) => {
                    const isMe = s.submittedBy === `${user?.firstName} ${user?.lastName}`;
                    return (
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
                            {s.isStoredLocally && (
                              <span className="text-[8px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-full">Secure Store</span>
                            )}
                          </div>
                          {s.reviewerRemarks && (
                            <div className="mt-3 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                              <span className="text-[8px] font-black text-red-500 uppercase tracking-widest block mb-1">Reviewer Remarks:</span>
                              <p className="text-[10px] font-medium text-red-700/80">{s.reviewerRemarks}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                          <button 
                            onClick={() => navigate(`/view/${s.id}`)}
                            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all shadow-sm ${isDarkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white hover:text-black' : 'bg-white text-gray-900 border-gray-100 hover:bg-black hover:text-white'}`}
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
                  <h3 className={`text-2xl font-black uppercase tracking-tighter ${textClass}`}>No History Yet</h3>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Upload your first data file to start the log.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* UPLOAD VIEW: Interactive dropzone for file selection */
        <div className={`${innerBgClass} rounded-[48px] shadow-2xl shadow-purple-900/5 border ${isDarkMode ? 'border-white/5' : 'border-white'} overflow-hidden relative flex flex-col min-h-[700px] transition-all duration-500`}>
          <div className="p-12 pb-8 flex flex-col">
            <h2 className={`text-5xl font-medium mb-8 ${textClass}`}>Select Files</h2>
            
            <div className="flex-1">
              {/* DROPZONE AREA: Visual feedback for file dragging/selection */}
              <div 
                onClick={handleChooseFile}
                className={`w-full border-[3px] border-dashed rounded-[32px] py-14 flex flex-col items-center justify-center bg-transparent cursor-pointer transition-all group relative overflow-hidden mb-8
                  ${pendingFiles.length > 0 ? 'border-[#8B1FFF] bg-purple-50/10' : (isDarkMode ? 'border-white/10 hover:bg-white/5 hover:border-white/30' : 'border-gray-300 hover:bg-black/5 hover:border-gray-900')}`}
              >
                <div className={`w-14 h-18 rounded-lg flex items-center justify-center mb-6 relative transition-transform group-hover:scale-110
                  ${pendingFiles.length > 0 ? 'bg-[#8B1FFF]' : (isDarkMode ? 'bg-white/10' : 'bg-gray-200')}`}>
                   <div className={`absolute top-0 right-0 w-5 h-5 rounded-bl-lg ${pendingFiles.length > 0 ? 'bg-purple-400' : (isDarkMode ? 'bg-white/20' : 'bg-gray-300')}`}></div>
                   <div className="text-white p-2">
                     <Upload size={24} strokeWidth={2.5} />
                   </div>
                </div>
                <p className={`text-xl font-medium text-center px-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drag and Drop files here or <span className={`underline font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Choose files</span>
                </p>
                <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" multiple accept=".xls,.xlsx" />
              </div>

              {/* STAGING LIST: Files chosen but not yet committed to storage */}
              {pendingFiles.length > 0 && (
                <div className="mb-10 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600">Files to be Uploaded ({pendingFiles.length})</span>
                    <div className={`h-px flex-1 ${isDarkMode ? 'bg-purple-900/40' : 'bg-purple-100'}`}></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pendingFiles.map((file, idx) => (
                      <div key={idx} className={`${isDarkMode ? 'bg-white/5 border-purple-900' : 'bg-white border-purple-200'} border rounded-2xl p-4 flex items-center justify-between shadow-sm animate-in zoom-in-95`}>
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 bg-[#1D6F42] rounded-md flex items-center justify-center text-white flex-shrink-0 text-[10px] font-black">X</div>
                          <span className={`text-sm font-bold truncate ${textClass}`}>{file.name}</span>
                        </div>
                        <button onClick={() => removePendingFile(idx)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                          <X size={16} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESOURCE AREA: Encourages use of official data templates */}
              <div className={`${isDarkMode ? 'bg-purple-900/10 border-white/5' : 'bg-[#F5F0FF] border-purple-100'} rounded-[32px] p-8 flex items-center gap-6 border mb-10 group hover:shadow-md transition-all`}>
                <div className="w-14 h-14 bg-[#1D6F42] rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <span className="font-black text-xl">X</span>
                </div>
                <div className="flex-1">
                  <h4 className={`text-xl font-medium mb-0.5 ${textClass}`}>Sample Template</h4>
                  <p className={`text-base leading-tight ${subTextClass}`}>Download the official template to ensure your data format is correctly validated.</p>
                </div>
                <button className="px-8 py-4 bg-[#8B1FFF] text-white rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95 flex items-center gap-2">
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons with loading feedback */}
          <div className="mt-auto p-12 pt-0 flex justify-end gap-6 relative z-10">
            <button onClick={() => setView('history')} className={`px-14 py-5 rounded-[28px] font-medium text-2xl transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-[#EBE9F5] text-gray-900 hover:bg-gray-200'}`}>
              Cancel
            </button>
            <button 
              onClick={handleUpload}
              disabled={pendingFiles.length === 0 || isUploading}
              className={`px-14 py-5 rounded-[28px] font-medium text-2xl transition-all shadow-lg flex items-center gap-4
                ${pendingFiles.length > 0 && !isUploading ? 'bg-black text-white hover:bg-purple-600 active:scale-95' : (isDarkMode ? 'bg-white/5 text-gray-600 cursor-not-allowed opacity-70' : 'bg-[#EBE9F5] text-gray-400 cursor-not-allowed opacity-70')}`}
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

      {/* Persistence Branding Footer */}
      <footer className="mt-20 w-full flex flex-col items-center">
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          Copyright © City Government of Baguio<br />
          City Planning Development Service Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default DataSubmission;