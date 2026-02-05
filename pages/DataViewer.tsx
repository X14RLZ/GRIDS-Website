
import React, { useState, useEffect } from 'react';
import { X, Printer, Settings, Share2, Download, Check, Copy, Info, Calendar, FileText, User, Loader2, FileSpreadsheet } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const DataViewer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState<any>(null);
  const [showShare, setShowShare] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock excel data rows
  const rows = [
    { barangay: 'Baguio City', popF: '155,003', pctF: '50.9%', popM: '149,410', pctM: '49.1%', total: '304,413', ratio: '96' },
    { barangay: 'A. Bonifacio-Caguioa-Rimando', popF: '361', pctF: '61.1%', popM: '230', pctM: '38.9%', total: '591', ratio: '64' },
    { barangay: 'Abanao-Zandueta-Kayong-Chugum-Otek', popF: '18', pctF: '48.6%', popM: '19', pctM: '51.4%', total: '37', ratio: '106' },
    { barangay: 'Alfonso Tabora', popF: '583', pctF: '52.6%', popM: '525', pctM: '47.4%', total: '1,108', ratio: '90' },
    { barangay: 'Ambiong', popF: '1,306', pctF: '52.1%', popM: '1,200', pctM: '47.9%', total: '2,506', ratio: '92' },
    { barangay: 'Andres Bonifacio', popF: '377', pctF: '52.0%', popM: '348', pctM: '48.0%', total: '725', ratio: '92' },
    { barangay: 'Apugan-Loakan', popF: '1,200', pctF: '49.0%', popM: '1,251', pctM: '51.0%', total: '2,451', ratio: '104' },
    { barangay: 'Asin Road', popF: '5,881', pctF: '50.0%', popM: '5,885', pctM: '50.0%', total: '11,766', ratio: '100' },
  ];

  useEffect(() => {
    // Resolve which file we are viewing
    const resolveFile = () => {
      // 1. Check user submissions in localStorage
      const stored = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      
      // 2. Define standard mock files
      const staticFiles = [
        { id: '1', formName: 'CMO - Disaggregated Data on Scholars 2025.xls', submittedBy: 'CMO Staff 1', date: '27 September, 2025', fileSize: '4.2 MB' },
        { id: '2', formName: 'CEPMO - Environmental Quality Indicators 2024.xlsx', submittedBy: 'CEPMO Admin', date: '28 September, 2025', fileSize: '12.8 MB' },
      ];

      const found = [...stored, ...staticFiles].find(f => f.id === id);
      
      if (found) {
        setFileData(found);
      } else {
        // Default if not found
        setFileData({
          formName: 'Document Preview.xls',
          submittedBy: 'System',
          date: new Date().toLocaleDateString(),
          fileSize: 'Unknown'
        });
      }
    };

    resolveFile();

    // Simulate file retrieval time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileData?.formName || 'document.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1e1e1e] flex flex-col items-center justify-center p-6 text-white animate-in fade-in duration-300">
        <div className="w-24 h-24 mb-8 relative">
          <div className="absolute inset-0 border-4 border-white/10 rounded-3xl"></div>
          <div className="absolute inset-0 border-4 border-[#8B1FFF] rounded-3xl border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[#8B1FFF]">
             <FileSpreadsheet size={32} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-black uppercase tracking-widest animate-pulse">Opening Document</h2>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Establishing secure connection to GRIDS database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-0 md:p-6 print:p-0">
      <div className="w-full h-full bg-[#1e1e1e] rounded-none md:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 print:rounded-none">
        
        {/* Toolbar */}
        <div className="h-16 bg-[#2d2d2d] flex items-center justify-between px-6 border-b border-white/5 print:hidden">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <X size={22} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-black tracking-tight uppercase truncate max-w-[300px] lg:max-w-none">
                  {fileData?.formName}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Secure Preview • {fileData?.fileSize || 'Database Record'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all"
              title="Print Table"
            >
              <Printer size={20} />
            </button>
            <button 
              onClick={() => setShowShare(true)}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
              title="Share Link"
            >
              <Share2 size={20} />
            </button>
            <button 
              onClick={handleDownload}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl text-gray-400 hover:text-green-400 hover:bg-green-400/10 transition-all"
              title="Download File"
            >
              <Download size={20} />
            </button>
            <div className="w-px h-6 bg-white/10 mx-2 hidden lg:block"></div>
            <button 
              onClick={() => setShowInfo(true)}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              title="File Settings & Info"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Excel Content */}
        <div className="flex-1 bg-white overflow-auto custom-scrollbar print:overflow-visible">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white z-10 print:static">
              <tr className="bg-gray-100">
                <th className="w-12 border border-gray-200"></th>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map(l => (
                  <th key={l} className="border border-gray-200 px-2 py-1 text-[10px] text-gray-400 font-bold">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">1</td>
                <td colSpan={16} className="border border-gray-200 p-6 bg-gray-50/30">
                  <h2 className="font-black text-xl text-gray-900 uppercase tracking-tighter italic">Table 1. Sex Distribution of Household Members per Barangay</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Source: 2024 Household Census – CPDSO</p>
                </td>
              </tr>
              <tr className="bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest text-center">
                 <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">2</td>
                 <td className="border border-white/20 p-4" rowSpan={2}>City/Barangay</td>
                 <td className="border border-white/20 p-4" colSpan={2}>Female</td>
                 <td className="border border-white/20 p-4" colSpan={2}>Male</td>
                 <td className="border border-white/20 p-4" rowSpan={2}>Total Population</td>
                 <td className="border border-white/20 p-4" rowSpan={2}>Sex Ratio (Males/Females)</td>
                 <td colSpan={9} className="border border-white/20"></td>
              </tr>
              <tr className="bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest text-center">
                 <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">3</td>
                 <td className="border border-white/20 p-3">Population</td>
                 <td className="border border-white/20 p-3">%</td>
                 <td className="border border-white/20 p-3">Population</td>
                 <td className="border border-white/20 p-3">%</td>
                 <td colSpan={9} className="border border-white/20"></td>
              </tr>
              {rows.map((r, i) => (
                <tr key={i} className={`hover:bg-purple-50/30 transition-colors ${i === 0 ? 'bg-blue-50 font-black' : ''}`}>
                  <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">{i + 4}</td>
                  <td className="border border-gray-200 px-4 py-3 text-xs font-bold text-gray-900">{r.barangay}</td>
                  <td className="border border-gray-200 px-4 py-3 text-xs text-gray-700 text-center tabular-nums">{r.popF}</td>
                  <td className="border border-gray-200 px-4 py-3 text-xs text-purple-600 font-black text-center tabular-nums">{r.pctF}</td>
                  <td className="border border-gray-200 px-4 py-3 text-xs text-gray-700 text-center tabular-nums">{r.popM}</td>
                  <td className="border border-gray-200 px-4 py-3 text-xs text-blue-600 font-black text-center tabular-nums">{r.pctM}</td>
                  <td className="border border-gray-200 px-4 py-3 text-xs text-gray-900 font-black text-center tabular-nums">{r.total}</td>
                  <td className="border border-gray-200 px-4 py-3 text-xs text-gray-500 font-bold text-center tabular-nums">{r.ratio}</td>
                  <td colSpan={9} className="border border-gray-200"></td>
                </tr>
              ))}
              {/* Fill more rows to look like real excel */}
              {Array.from({ length: 20 }).map((_, i) => (
                <tr key={i + 12}>
                  <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">{i + 12}</td>
                  {Array.from({ length: 16 }).map((_, j) => (
                    <td key={j} className="border border-gray-200 px-4 py-2"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER BAR */}
        <div className="h-8 bg-[#2d2d2d] flex items-center px-4 gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
            <span>Sheet 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-transparent border border-gray-600 rounded-sm"></div>
            <span>Sheet 2</span>
          </div>
          <span className="ml-auto">Zoom: 100%</span>
        </div>
      </div>

      {/* SHARE POPUP */}
      {showShare && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowShare(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Share Resource</h3>
              <button onClick={() => setShowShare(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 font-medium mb-6">Share this direct link to the database record with other authorized personnel.</p>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                <Share2 size={16} />
              </div>
              <input 
                type="text" 
                readOnly 
                value={window.location.href}
                className="w-full pl-14 pr-32 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none"
              />
              <button 
                onClick={handleCopyUrl}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2
                  ${copied ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-purple-600'}`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILE INFO POPUP (GEAR/SETTINGS) */}
      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowInfo(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">File Details</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Metadata & Governance Info</p>
                </div>
              </div>
              <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-purple-600">
                    <FileText size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Type</span>
                  </div>
                  <p className="text-sm font-black text-gray-900 uppercase">{fileData?.formName?.split('.').pop()?.toUpperCase() || 'XLS'}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-purple-600">
                    <Calendar size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Uploaded</span>
                  </div>
                  <p className="text-sm font-black text-gray-900 uppercase">{fileData?.date}</p>
                </div>
              </div>

              <div className="p-8 bg-[#fdfaff] border border-purple-100 rounded-3xl space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <User size={18} className="text-purple-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Submitted By</span>
                    </div>
                    <span className="text-xs font-black text-gray-900 uppercase">{fileData?.submittedBy?.replace('by ', '') || 'Staff'}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Check size={18} className="text-green-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Approval Status</span>
                    </div>
                    <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest
                      ${fileData?.response === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {fileData?.response || 'Processing'}
                    </span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Download size={18} className="text-blue-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">File Size</span>
                    </div>
                    <span className="text-xs font-black text-gray-900 uppercase">{fileData?.fileSize}</span>
                 </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => setShowInfo(false)}
                  className="w-full py-5 bg-black text-white rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-purple-600 transition-all shadow-xl active:scale-95"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataViewer;
