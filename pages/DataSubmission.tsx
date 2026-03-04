
import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, X, Check, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DataSubmission: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploads, setUploads] = useState<any[]>([]);
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  const handleChooseFile = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploads(prev => [...prev, { id: Math.random(), name: file.name, status: 'complete', progress: 100, size: '2MB' }]);
    }
  };

  return (
    <div className="p-4 animate-in fade-in duration-500 relative min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Data Submission</h1>
        <div className="h-1.5 w-24 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-purple-50 mb-32">
        <div 
          onClick={handleChooseFile}
          className="border-2 border-dashed rounded-[32px] p-16 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer"
        >
          <Upload size={32} className="mb-4 text-gray-500" />
          <p className="text-lg text-gray-600 font-medium">Drag and Drop or <span className="text-purple-600 font-bold underline">Choose file</span></p>
        </div>
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

export default DataSubmission;
