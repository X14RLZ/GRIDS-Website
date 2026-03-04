
import React, { useState, useEffect } from 'react';
import { 
  History, Search, Filter, Shield, 
  Clock, User as UserIcon, Activity,
  FileSearch, Download, Trash2, Layout,
  X, Database, ChevronRight, UserCog
} from 'lucide-react';
import { AuditLog } from '../types';
import PageLayout from '../components/PageLayout';

const AuditTrail: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('All');

  const loadLogs = () => {
    const stored = JSON.parse(localStorage.getItem('grids_audit_logs') || '[]');
    setLogs(stored);
  };

  useEffect(() => {
    loadLogs();
    window.addEventListener('storage', loadLogs);
    return () => window.removeEventListener('storage', loadLogs);
  }, []);

  const clearLogs = () => {
    if (window.confirm("Are you sure you want to clear all system audit logs? This action cannot be undone.")) {
      localStorage.setItem('grids_audit_logs', JSON.stringify([]));
      setLogs([]);
    }
  };

  const modules = Array.from(new Set(logs.map(l => l.module))).sort();

  const filteredLogs = logs.filter(l => {
    const matchesSearch = 
      l.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'All' || l.module === filterModule;
    return matchesSearch && matchesModule;
  });

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = isDarkMode ? 'bg-[#1A1625]' : 'bg-white';

  const getActionColor = (action: string) => {
    const a = action.toLowerCase();
    if (a.includes('delete') || a.includes('denied') || a.includes('removed')) return 'text-red-500 bg-red-500/10';
    if (a.includes('approve') || a.includes('success') || a.includes('commit')) return 'text-green-500 bg-green-500/10';
    if (a.includes('login')) return 'text-blue-500 bg-blue-500/10';
    return 'text-purple-500 bg-purple-500/10';
  };

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title="Audit Trail"
      subtitle="System Security & Activity Monitoring"
      headerActions={
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button 
            onClick={() => {
              const headers = ['Timestamp', 'User', 'Office', 'Role', 'Module', 'Action', 'Details'];
              const csvData = logs.map(l => [
                l.timestamp,
                l.userName,
                l.office,
                l.userRole,
                l.module,
                l.action,
                l.details.replace(/,/g, ';')
              ]);
              const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement("a");
              const url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", `GRIDS_Audit_Trail_${new Date().toISOString().split('T')[0]}.csv`);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className={`px-8 py-4 rounded-2xl border flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest
              ${isDarkMode ? 'bg-purple-900/20 border-purple-900/30 text-purple-400 hover:bg-purple-900/40' : 'bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-100'}`}
          >
            <Download size={16} /> Export CSV
          </button>
          <button 
            onClick={clearLogs}
            className={`px-8 py-4 rounded-2xl border flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest
              ${isDarkMode ? 'bg-red-900/20 border-red-900/30 text-red-400 hover:bg-red-900/40' : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100'}`}
          >
            <Trash2 size={16} /> Clear Logs
          </button>
        </div>
      }
    >
      <div className="mb-6 flex flex-col md:flex-row gap-4 w-full max-w-3xl">
           <div className="flex-1 relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                <Search size={20} strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder="Search logs by user, action or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-14 pr-6 py-4 rounded-[24px] border shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all text-xs font-bold
                  ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white placeholder:text-gray-600' : 'bg-white border-purple-50 text-gray-900 placeholder:text-gray-300'}`}
              />
           </div>
           <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                <Filter size={18} strokeWidth={3} />
              </div>
              <select 
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className={`pl-14 pr-10 py-4 rounded-[24px] border shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all text-xs font-black uppercase appearance-none cursor-pointer
                  ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white' : 'bg-white border-purple-50 text-gray-900'}`}
              >
                <option value="All">All Modules</option>
                {modules.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
           </div>
      </div>

      <div className={`${cardBgClass} rounded-[48px] shadow-2xl border ${isDarkMode ? 'border-white/5' : 'border-purple-50'} overflow-hidden mb-8`}>
        <div className="table-container custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className={`text-[9px] md:text-[10px] font-black ${isDarkMode ? 'text-purple-400' : 'text-gray-400'} uppercase tracking-[0.2em] border-b ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
              <tr>
                <th className="px-8 py-8">Timestamp</th>
                <th className="px-8 py-8">User & Office</th>
                <th className="px-8 py-8">Module</th>
                <th className="px-8 py-8">Action</th>
                <th className="px-8 py-8">Activity Details</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-gray-50'}`}>
              {filteredLogs.map((l) => (
                <tr key={l.id} className={`transition-all group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-purple-50/10'}`}>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-gray-400" />
                      <div className="flex flex-col">
                        <span className={`text-[11px] font-bold ${textClass}`}>{new Date(l.timestamp).toLocaleDateString()}</span>
                        <span className="text-[9px] font-medium text-gray-400">{new Date(l.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex flex-col">
                       <span className={`text-xs font-black uppercase ${textClass}`}>{l.userName}</span>
                       <span className="text-[9px] font-bold text-purple-600/70 uppercase tracking-widest">{l.office} • {l.userRole}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                      {l.module}
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${getActionColor(l.action)}`}>
                      {l.action}
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <p className={`text-xs font-medium leading-relaxed max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {l.details}
                    </p>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-40 text-center flex flex-col items-center opacity-30">
                    <History size={64} className="text-gray-300 mb-6" />
                    <h3 className={`text-2xl font-black uppercase tracking-tighter ${textClass}`}>Registry Empty</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">No activity logs recorded yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default AuditTrail;
