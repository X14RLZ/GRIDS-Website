
import React, { useState } from 'react';
import { Search, ArrowUpDown, LayoutGrid, List, Mail, Phone, Building2, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Members: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  const members = [
    { id: 'gfps001', name: 'John Doe', role: 'DATA REVIEWER', dept: 'CMO', status: 'Active', email: 'cpdso.johndoe@gmail.com', phone: '+63 1234567890', joined: '29 Oct, 2020' },
    { id: 'gfps021', name: 'John Doe', role: 'DATA PROVIDER', dept: 'CEPMO', status: 'Inactive', email: 'cpdso.johndoe@gmail.com', phone: '+63 1234567890', joined: '29 Oct, 2020' },
    { id: 'gfps013', name: 'John Doe', role: 'ADMINISTRATOR', dept: 'CPDSO', status: 'Active', email: 'cpdso.johndoe@gmail.com', phone: '+63 1234567890', joined: '29 Oct, 2020' },
  ];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 relative min-h-full">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">GFPS Members</h1>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[48px] p-12 shadow-2xl shadow-purple-950/5 border border-purple-50 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((m, idx) => (
            <div key={idx} className="bg-[#fdfaff] border border-purple-100 rounded-[40px] p-10 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group hover:-translate-y-2">
              <div className="flex flex-col items-center mb-8 pt-4">
                <div className="w-32 h-32 bg-white rounded-full border-[6px] border-white shadow-xl overflow-hidden mb-6 ring-8 ring-purple-50/30 group-hover:ring-purple-100 transition-all">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.id}`} alt="avatar" className="w-full h-full bg-purple-50" />
                </div>
                <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-1">{m.name}</h4>
                <p className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">{m.role}</p>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest pt-6 border-t border-purple-50/50">
                <span>Joined at <span className="text-gray-900">{m.joined}</span></span>
                <button className="text-purple-600 hover:text-purple-800 transition-all font-black flex items-center gap-1 group/btn">View details <Eye size={14} className="group-hover/btn:translate-x-1 transition-transform" /></button>
              </div>
            </div>
          ))}
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

export default Members;
