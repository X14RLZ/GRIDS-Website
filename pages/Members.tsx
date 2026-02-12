
import React, { useState, useEffect } from 'react';
import { Eye, Search, X, Mail, Building2, ShieldCheck, Database, UserCheck } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: 'Active' | 'Pending' | 'Suspended';
  email: string;
  phone: string;
  joined: string;
  isSeeded: boolean;
}

const Members: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [dynamicMembers, setDynamicMembers] = useState<Member[]>([]);

  useEffect(() => {
    const loadSystemUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem('grids_users') || '[]');
      const allMembers: Member[] = storedUsers
        .filter((u: any) => u.email === 'cbmscharles@gmail.com' || u.status === 'Active')
        .map((u: any) => {
          const isSeeded = u.email === 'cbmscharles@gmail.com';
          return {
            id: u.userId || `sys-${u.email}`,
            name: `${u.firstName} ${u.lastName}`,
            role: u.role.toUpperCase(),
            dept: u.office || 'N/A',
            status: u.status || (u.isActive ? 'Active' : 'Suspended'),
            email: u.email,
            phone: u.contactInfo || u.phone || 'Contact Office',
            joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'System Default',
            isSeeded: isSeeded
          };
        });
      setDynamicMembers(allMembers);
    };

    loadSystemUsers();
    window.addEventListener('storage', loadSystemUsers);
    return () => window.removeEventListener('storage', loadSystemUsers);
  }, []);

  const filteredMembers = dynamicMembers.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    const deptKey = member.dept || 'UNCATEGORIZED';
    if (!acc[deptKey]) acc[deptKey] = [];
    acc[deptKey].push(member);
    return acc;
  }, {} as Record<string, Member[]>);

  const departments = Object.keys(groupedMembers).sort();

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Standardized Consistent Header */}
      <header className={`mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b pb-12 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="space-y-2 max-w-2xl text-center lg:text-left">
          <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${textClass}`}>
            People
          </h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">Verified Database Personnel Registry</p>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
        </div>

        <div className="w-full max-w-xl relative group mx-auto lg:mx-0 lg:mb-1">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
            <Search size={22} strokeWidth={3} />
          </div>
          <input 
            type="text" 
            placeholder="Search directory by name or office..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-16 pr-8 py-5 rounded-[28px] border shadow-[0_10px_40px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-8 focus:ring-purple-600/5 transition-all text-sm font-bold
              ${isDarkMode ? 'bg-[#2A2438] border-white/10 text-white placeholder:text-gray-600' : 'bg-white border-purple-50 text-gray-900 placeholder:text-gray-300'}`}
          />
        </div>
      </header>

      <div className="space-y-20 mb-32">
        {departments.length > 0 ? departments.map((dept) => (
          <div key={dept} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6 mb-10">
              <h2 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>{dept}</h2>
              <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
              <span className={`text-[10px] font-black uppercase tracking-widest text-purple-600`}>{groupedMembers[dept].length} Verified Personnel</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedMembers[dept].map((m) => (
                <div key={m.id} className={`rounded-[48px] p-10 shadow-sm card-hover transition-all duration-500 relative overflow-hidden group border
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'}`}>
                  
                  <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm
                    ${m.isSeeded ? 'bg-purple-600 text-white' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                    {m.isSeeded ? <ShieldCheck size={10} /> : <UserCheck size={10} />}
                    {m.isSeeded ? 'Primary Admin' : 'Registry Active'}
                  </div>

                  <div className="flex flex-col items-center mb-10 pt-4">
                    <div className="relative mb-8">
                      <div className={`w-36 h-36 rounded-full border-[8px] shadow-xl overflow-hidden ring-8 transition-all
                        ${isDarkMode ? 'bg-[#2A2438] border-[#2A2438] ring-white/5 group-hover:ring-purple-900' : 'bg-white border-white ring-purple-50/30 group-hover:ring-purple-100'}`}>
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.id}`} 
                          alt={m.name} 
                          className={`w-full h-full object-cover ${isDarkMode ? 'bg-black/20' : 'bg-[#fdfaff]'}`} 
                        />
                      </div>
                    </div>
                    <h4 className={`text-3xl font-black uppercase tracking-tighter mb-1 text-center leading-none ${textClass}`}>{m.name}</h4>
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.3em]">{m.role}</p>
                  </div>
                  
                  <div className={`flex justify-between items-center pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-purple-50'}`}>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Database status</span>
                      <span className="text-[11px] font-black uppercase text-green-500">Verified</span>
                    </div>
                    <button 
                      onClick={() => setSelectedMember(m)}
                      className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center gap-2 group/btn
                        ${isDarkMode ? 'bg-white text-black hover:bg-purple-600 hover:text-white' : 'bg-gray-50 text-gray-900 hover:bg-black hover:text-white'}`}
                    >
                      Details 
                      <Eye size={14} className="group-hover/btn:scale-125 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) : (
          <div className="py-40 text-center flex flex-col items-center opacity-30">
            <Search size={64} className="text-gray-300 mb-6" />
            <h3 className={`text-3xl font-black uppercase tracking-tighter ${textClass}`}>Registry Empty</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Only approved registered accounts are reflected here.</p>
          </div>
        )}
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedMember(null)}></div>
          <div className={`relative w-full max-w-2xl rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border
            ${isDarkMode ? 'bg-[#1A1625] border-white/10' : 'bg-white border-white'}`}>
            <div className="flex flex-col md:flex-row">
              <div className={`w-full md:w-1/2 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r transition-colors
                ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-white/50 border-gray-100'}`}>
                <div className={`w-48 h-48 rounded-[56px] shadow-2xl overflow-hidden border-[10px] mb-8 ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-white border-white'}`}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMember.id}`} alt={selectedMember.name} className="w-full h-full object-cover" />
                </div>
                <h3 className={`text-3xl font-black uppercase tracking-tighter mb-1 text-center ${textClass}`}>{selectedMember.name}</h3>
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6">{selectedMember.role}</span>
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                  Joined: {selectedMember.joined}
                </div>
              </div>
              <div className="flex-1 p-12 md:p-16 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xl font-black uppercase tracking-tight ${textClass}`}>Database Info</h4>
                  <button onClick={() => setSelectedMember(null)} className="p-2 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-purple-50 text-purple-600"><Building2 size={20} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Assigned Office</p>
                      <p className={`text-sm font-black uppercase ${textClass}`}>{selectedMember.dept}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-purple-50 text-purple-600"><Mail size={20} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Contact Point</p>
                      <p className={`text-sm font-bold ${textClass}`}>{selectedMember.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-purple-50 text-purple-600"><ShieldCheck size={20} /></div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Registry ID</p>
                      <p className={`text-sm font-bold font-mono ${textClass}`}>{selectedMember.id}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedMember(null)} className="w-full py-4 bg-black text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95">Close Directory</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto py-10 flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center leading-relaxed">
          Copyright © City Government of Baguio<br />CPDSO – CBMS Division
        </p>
      </footer>
    </div>
  );
};

export default Members;
