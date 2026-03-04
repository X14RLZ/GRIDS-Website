
import React from 'react';
import { X, Printer, Settings, Share2, Check, XCircle, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const DataViewer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full h-full bg-[#1e1e1e] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Toolbar */}
        <div className="h-14 bg-[#2d2d2d] flex items-center justify-between px-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-white text-sm font-bold tracking-tight">CMO - Disaggregated Data on Scholars 2025.xls</span>
            </div>
            
            {/* Approval Controls (for admin) */}
            <div className="ml-8 flex gap-2">
              <button className="px-4 py-1.5 bg-green-600 text-white text-[10px] font-black rounded-lg uppercase hover:bg-green-700 transition-colors flex items-center gap-1.5">
                <Check size={12} strokeWidth={4} /> Approve
              </button>
              <button className="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black rounded-lg uppercase hover:bg-red-700 transition-colors flex items-center gap-1.5">
                <XCircle size={12} strokeWidth={4} /> Deny
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            <button className="hover:text-white transition-colors"><Printer size={18} /></button>
            <button className="hover:text-white transition-colors"><Share2 size={18} /></button>
            <button className="hover:text-white transition-colors"><Settings size={18} /></button>
          </div>
        </div>

        {/* Excel Content */}
        <div className="flex-1 bg-white overflow-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white z-10">
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
                <td colSpan={16} className="border border-gray-200 p-4">
                  <h2 className="font-bold text-gray-800 italic">Table 1. Sex Distribution of Household Members per Barangay</h2>
                </td>
              </tr>
              <tr className="bg-blue-900 text-white text-[10px] font-bold text-center">
                 <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">2</td>
                 <td className="border border-white/20 p-2" rowSpan={2}>City/Barangay</td>
                 <td className="border border-white/20 p-2" colSpan={2}>Female</td>
                 <td className="border border-white/20 p-2" colSpan={2}>Male</td>
                 <td className="border border-white/20 p-2" rowSpan={2}>Total Population</td>
                 <td className="border border-white/20 p-2" rowSpan={2}>Sex Ratio (Males/Females)</td>
                 <td colSpan={9} className="border border-white/20"></td>
              </tr>
              <tr className="bg-blue-900 text-white text-[10px] font-bold text-center">
                 <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">3</td>
                 <td className="border border-white/20 p-2">Population</td>
                 <td className="border border-white/20 p-2">%</td>
                 <td className="border border-white/20 p-2">Population</td>
                 <td className="border border-white/20 p-2">%</td>
                 <td colSpan={9} className="border border-white/20"></td>
              </tr>
              {rows.map((r, i) => (
                <tr key={i} className={i === 0 ? 'bg-blue-100/50 font-bold' : ''}>
                  <td className="bg-gray-100 border border-gray-200 text-center text-[10px] font-bold text-gray-400">{i + 4}</td>
                  <td className="border border-gray-200 px-4 py-2 text-xs text-gray-800">{r.barangay}</td>
                  <td className="border border-gray-200 px-4 py-2 text-xs text-gray-800 text-center">{r.popF}</td>
                  <td className="border border-gray-200 px-4 py-2 text-xs text-gray-800 text-center">{r.pctF}</td>
                  <td className="border border-gray-200 px-4 py-2 text-xs text-gray-800 text-center">{r.popM}</td>
                  <td className="border border-gray-200 px-4 py-2 text-xs text-gray-800 text-center">{r.pctM}</td>
                  <td className="border border-gray-200 px-4 py-2 text-xs text-gray-800 text-center">{r.total}</td>
                  <td className="border border-gray-200 px-4 py-2 text-xs text-gray-800 text-center">{r.ratio}</td>
                  <td colSpan={9} className="border border-gray-200"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataViewer;
