
import React, { useState } from 'react';
import { Eye, Search, X, Mail, Phone, Calendar, Building2, UserCircle, ShieldCheck } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: 'Active' | 'Inactive';
  email: string;
  phone: string;
  joined: string;
}

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const members: Member[] = [
    { id: 'gfps001', name: 'John Doe', role: 'DATA REVIEWER', dept: 'CMO', status: 'Active', email: 'cmo.johndoe@gmail.com', phone: '+63 123 456 7890', joined: '29 Oct, 2020' },
    { id: 'gfps002', name: 'Jane Smith', role: 'DATA PROVIDER', dept: 'CMO', status: 'Active', email: 'cmo.jsmith@gmail.com', phone: '+63 123 456 7891', joined: '15 Jan, 2021' },
    { id: 'gfps021', name: 'Robert Fox', role: 'DATA PROVIDER', dept: 'CEPMO', status: 'Inactive', email: 'cepmo.rfox@gmail.com', phone: '+63 123 456 7892', joined: '05 Mar, 2022' },
    { id: 'gfps013', name: 'Alice Walker', role: 'ADMINISTRATOR', dept: 'CPDSO', status: 'Active', email: 'cpdso.awalker@gmail.com', phone: '+63 123 456 7893', joined: '12 Sep, 2019' },
    { id: 'gfps014', name: 'Charlie Day', role: 'DATA REVIEWER', dept: 'CPDSO', status: 'Active', email: 'cpdso.cday@gmail.com', phone: '+63 123 456 7894', joined: '21 Jun, 2020' },
    { id: 'gfps033', name: 'Michael Scott', role: 'DATA PROVIDER', dept: 'CSWDO', status: 'Active', email: 'cswdo.mscott@gmail.com', phone: '+63 123 456 7895', joined: '01 Apr, 2021' },
  ];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group members by department
  const groupedMembers = filteredMembers.reduce((acc, member) => {
    if (!acc[member.dept]) acc[member.dept] = [];
    acc[member.dept].push(member);
    return acc;
  }, {} as Record<string, Member[]>);

  const departments = Object.keys(groupedMembers).sort();

  return (
    <div className="max-w-screen-2xl mx-auto p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Header & Search */}
      <div className="mb-16 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h1 className="text-6xl font-black text-gray-900 mb-2 uppercase tracking-tighter">People</h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Baguio City GAD Focal Point System</p>
        </div>

        <div className="w-full max-w-xl relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
            <Search size={22} strokeWidth={3} />
          </div>
          <input 
            type="text" 
            placeholder="Search members by name or office..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white rounded-[28px] border border-purple-50 shadow-[0_10px_40px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 text-sm font-bold text-gray-900 transition-all placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Categorized List */}
      <div className="space-y-20 mb-32">
        {departments.length > 0 ? departments.map((dept) => (
          <div key={dept} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6 mb-10">
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{dept}</h2>
              <div className="h-px flex-1 bg-gray-100"></div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{groupedMembers[dept].length} Members</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedMembers[dept].map((m) => (
                <div key={m.id} className="bg-white border border-purple-50 rounded-[48px] p-10 shadow-sm hover:shadow-2xl hover:shadow-purple-900/5 transition-all duration-500 relative overflow-hidden group hover:-translate-y-2">
                  <div className="flex flex-col items-center mb-10 pt-4">
                    <div className="relative mb-8">
                      <div className="w-36 h-36 bg-white rounded-full border-[8px] border-white shadow-xl overflow-hidden ring-8 ring-purple-50/30 group-hover:ring-purple-100 transition-all">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.id}`} 
                          alt={m.name} 
                          className="w-full h-full bg-[#fdfaff] object-cover" 
                        />
                      </div>
                      <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white shadow-sm ${m.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-1 text-center leading-none">{m.name}</h4>
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.3em]">{m.role}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-8 border-t border-purple-50">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Joined at</span>
                      <span className="text-[11px] font-black text-gray-900 uppercase">{m.joined}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedMember(m)}
                      className="px-6 py-3 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 flex items-center gap-2 group/btn"
                    >
                      View details 
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
            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">No results found</h3>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Try searching for a member name or an office acronym (e.g., CMO, CPDSO)</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedMember(null)}></div>
          <div className="relative w-full max-w-2xl bg-[#FDFBF2] rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white">
            
            {/* Modal Content */}
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Avatar & Role */}
              <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 bg-white/50">
                <div className="w-48 h-48 bg-white rounded-[56px] shadow-2xl overflow-hidden border-[10px] border-white mb-8">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMember.id}`} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-1 text-center">{selectedMember.name}</h3>
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6">{selectedMember.role}</span>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${selectedMember.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                  {selectedMember.status} Status
                </span>
              </div>

              {/* Right Side - Information */}
              <div className="flex-1 p-12 md:p-16 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Information</h4>
                  <button onClick={() => setSelectedMember(null)} className="p-2 text-gray-300 hover:text-black transition-colors"><X size={24} /></button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Office / Department</p>
                      <p className="text-sm font-black text-gray-900 uppercase">{selectedMember.dept}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                      <p className="text-sm font-bold text-gray-900">{selectedMember.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                      <p className="text-sm font-bold text-gray-900">{selectedMember.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Registration Date</p>
                      <p className="text-sm font-black text-gray-900 uppercase">{selectedMember.joined}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="w-full py-4 bg-black text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-xl active:scale-95"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="mt-auto py-10 flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center leading-relaxed">
          Copyright © City Government of Baguio<br />
          City Planning, Development, and Sustainability Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default Members;
