
import React, { useState, useEffect } from 'react';
import { 
  UserCheck, UserX, Edit, Trash2, Search, X, 
  ShieldCheck, ShieldAlert, Building2, Mail, 
  Phone, User as UserIcon, Check, Save, AlertTriangle,
  Database, Copy, FileCode, CheckCircle2, Server
} from 'lucide-react';
import { User, UserRole } from '../types';

interface ExtendedUser extends User {
  status: 'Pending' | 'Active' | 'Suspended';
  roleId?: string; // Explicitly for SQL mapping
}

const UserManagement: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<ExtendedUser>>({});

  useEffect(() => {
    const loadUsers = () => {
      const stored = localStorage.getItem('grids_users');
      if (stored) {
        const parsedUsers = JSON.parse(stored).map((u: any) => ({
          ...u,
          status: u.status || 'Active',
          roleId: u.roleId || mapRoleToId(u.role)
        }));
        setUsers(parsedUsers);
      }
    };
    loadUsers();
    window.addEventListener('storage', loadUsers);
    return () => window.removeEventListener('storage', loadUsers);
  }, []);

  const mapRoleToId = (role: string): string => {
    const map: Record<string, string> = {
      'Administrator': 'role_admin',
      'Data Provider': 'role_provider',
      'Data Reviewer': 'role_reviewer',
      'Data Analyst': 'role_analyst',
      'Public User': 'role_public',
      'Guest': 'role_guest'
    };
    return map[role] || 'role_public';
  };

  const generateSeedSql = (): string => {
    let sql = "-- GRIDS DATABASE REGISTRY (Seed.sql)\n";
    sql += "-- Updated: " + new Date().toLocaleString() + "\n\n";
    
    // Group users by whether they are already Active (Committed)
    const committed = users.filter(u => u.status === 'Active');
    
    committed.forEach(u => {
      const roleId = u.roleId || mapRoleToId(u.role);
      const contact = u.contactInfo || u.phone || '';
      sql += `INSERT INTO users (user_id, username, password_hash, email, first_name, last_name, role_id, office_id, contact_info, created_at, is_active)\n`;
      sql += `VALUES ('${u.userId}', '${u.username || u.email.split('@')[0]}', '${u.passwordHash || 'HASHED_PWD'}', '${u.email}', '${u.firstName}', '${u.lastName}', '${roleId}', '${u.office}', '${contact}', '${u.createdAt || new Date().toISOString()}', TRUE);\n\n`;
    });
    return sql;
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(generateSeedSql());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const saveToStorage = (updatedUsers: ExtendedUser[]) => {
    localStorage.setItem('grids_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    window.dispatchEvent(new Event('storage'));
  };

  const handleApproveAndCommit = (email: string) => {
    const updated = users.map(u => u.email === email ? { 
      ...u, 
      status: 'Active' as const,
      isActive: true,
      roleId: u.roleId || mapRoleToId(u.role)
    } : u);
    saveToStorage(updated);
    alert('User successfully committed to GRIDS database registry. Generate updated Seed.sql to reflect changes.');
  };

  const handleDelete = () => {
    if (selectedUser) {
      if (selectedUser.email === 'cbmscharles@gmail.com') {
        alert("Primary Administrator cannot be deleted.");
        setIsDeleteModalOpen(false);
        return;
      }
      const updated = users.filter(u => u.email !== selectedUser.email);
      saveToStorage(updated);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleEditSave = () => {
    if (selectedUser && editFormData) {
      const updated = users.map(u => 
        u.email === selectedUser.email ? { ...u, ...editFormData, roleId: mapRoleToId(editFormData.role || u.role) } as ExtendedUser : u
      );
      saveToStorage(updated);
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
  };

  const openEditModal = (user: ExtendedUser) => {
    setSelectedUser(user);
    setEditFormData({ ...user });
    setIsEditModalOpen(true);
  };

  const filteredUsers = users.filter(u => 
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-purple-300' : 'text-gray-500';
  const cardBgClass = isDarkMode ? 'bg-[#1A1625]' : 'bg-white';

  return (
    <div className="max-w-screen-2xl mx-auto p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      <div className="mb-16 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h1 className={`text-6xl font-black mb-2 uppercase tracking-tighter ${textClass}`}>User Accounts</h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Integrated Database Governance & Seed.sql Sync</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:max-w-3xl">
          <div className="w-full relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
              <Search size={22} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              placeholder="Search accounts by name, email or office..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-16 pr-8 py-5 rounded-[28px] border shadow-[0_10px_40px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-8 focus:ring-purple-600/5 transition-all text-sm font-bold
                ${isDarkMode ? 'bg-[#2A2438] border-white/10 text-white placeholder:text-gray-600 focus:border-purple-600/40' : 'bg-white border-purple-50 text-gray-900 placeholder:text-gray-300 focus:border-purple-600/20'}`}
            />
          </div>
          <button 
            onClick={() => setIsSqlModalOpen(true)}
            className="flex items-center gap-3 bg-black text-white px-8 py-5 rounded-[28px] font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl group/sql whitespace-nowrap"
          >
            <Server size={18} className="group-hover/sql:scale-110 transition-transform text-purple-400" />
            Seed.sql Sync
          </button>
        </div>
      </div>

      <div className={`${cardBgClass} rounded-[48px] shadow-2xl border ${isDarkMode ? 'border-white/5' : 'border-purple-50'} overflow-hidden mb-32`}>
        <div className="table-container custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className={`text-[9px] md:text-[10px] font-black ${isDarkMode ? 'text-purple-400' : 'text-gray-400'} uppercase tracking-[0.2em] border-b ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
              <tr>
                <th className="px-8 py-8">User Profile</th>
                <th className="px-8 py-8">Office / Department</th>
                <th className="px-8 py-8">System Role</th>
                <th className="px-8 py-8">Database Status</th>
                <th className="px-8 py-8 text-right">Registry Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-gray-50'}`}>
              {filteredUsers.map((u) => (
                <tr key={u.email} className={`transition-all group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-purple-50/20'}`}>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                        <UserIcon size={20} className={isDarkMode ? 'text-purple-400' : 'text-gray-400'} />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-black ${textClass}`}>{u.firstName} {u.lastName}</span>
                        <span className="text-[10px] font-bold text-gray-400 truncate max-w-[200px]">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-gray-400" />
                      <span className={`text-[10px] md:text-xs font-bold uppercase ${subTextClass}`}>{u.office}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                      ${u.role === 'Administrator' ? 'bg-purple-600 text-white border-purple-500 shadow-md' : (isDarkMode ? 'bg-white/5 text-gray-400 border-white/5' : 'bg-gray-50 text-gray-600 border-gray-100')}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-green-500' : u.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                       <span className={`text-[9px] font-black uppercase tracking-widest ${u.status === 'Active' ? 'text-green-500' : u.status === 'Pending' ? 'text-yellow-600' : 'text-red-500'}`}>
                        {u.status === 'Active' ? 'Committed' : u.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {u.status === 'Pending' && (
                        <button 
                          onClick={() => handleApproveAndCommit(u.email)}
                          className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm font-black text-[9px] uppercase tracking-widest"
                          title="Approve and Commit to DB"
                        >
                          <Database size={14} strokeWidth={2.5} />
                          Commit to DB
                        </button>
                      )}
                      <button 
                        onClick={() => openEditModal(u)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white hover:text-black' : 'bg-gray-50 text-gray-500 hover:bg-black hover:text-white'}`}
                        title="Edit Account"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => { setSelectedUser(u); setIsDeleteModalOpen(true); }}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-red-500 hover:text-white' : 'bg-gray-50 text-gray-500 hover:bg-red-600 hover:text-white'}`}
                        title="Delete Account"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-400 font-bold text-sm uppercase tracking-widest opacity-40">No users found in the system registry</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SQL Generator Modal */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsSqlModalOpen(false)}></div>
          <div className={`relative w-full max-w-4xl rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border flex flex-col h-[80vh]
            ${isDarkMode ? 'bg-[#1A1625] border-white/10' : 'bg-white border-white'}`}>
            <div className="p-10 border-b flex items-center justify-between border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <FileCode size={24} />
                 </div>
                 <div>
                    <h3 className={`text-2xl font-black uppercase tracking-tight ${textClass}`}>Live Seed.sql Integration</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update your database file with approved registries</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <button 
                  onClick={handleCopySql}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-md
                    ${copiedSql ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-purple-600'}`}
                 >
                   {copiedSql ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                   {copiedSql ? 'Copied to Clipboard' : 'Copy Updated SQL'}
                 </button>
                 <button onClick={() => setIsSqlModalOpen(false)} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
              </div>
            </div>
            <div className="flex-1 p-10 overflow-auto bg-[#0F0C15] font-mono text-[11px] leading-relaxed custom-scrollbar">
               <pre className="text-purple-300">
                 {generateSeedSql()}
               </pre>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)}></div>
          <div className={`relative w-full max-w-2xl rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border
            ${isDarkMode ? 'bg-[#1A1625] border-white/10' : 'bg-white border-white'}`}>
            <div className="p-12 lg:p-16">
               <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>Modify Registry</h3>
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Database Overwrite Interface</p>
                  </div>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2">
                    <X size={24} />
                  </button>
               </div>

               <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>First Name</label>
                      <input 
                        type="text" 
                        value={editFormData.firstName} 
                        onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                        className={`w-full px-6 py-4 rounded-[24px] text-xs font-bold focus:outline-none transition-all ${isDarkMode ? 'bg-[#2A2438] text-white border-white/5' : 'bg-gray-50 text-gray-900 border-gray-100'}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Last Name</label>
                      <input 
                        type="text" 
                        value={editFormData.lastName} 
                        onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                        className={`w-full px-6 py-4 rounded-[24px] text-xs font-bold focus:outline-none transition-all ${isDarkMode ? 'bg-[#2A2438] text-white border-white/5' : 'bg-gray-50 text-gray-900 border-gray-100'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Office / Department Acronym</label>
                    <input 
                      type="text" 
                      value={editFormData.office} 
                      onChange={(e) => setEditFormData({ ...editFormData, office: e.target.value })}
                      className={`w-full px-6 py-4 rounded-[24px] text-xs font-bold focus:outline-none transition-all uppercase ${isDarkMode ? 'bg-[#2A2438] text-white border-white/5' : 'bg-gray-50 text-gray-900 border-gray-100'}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>System Role</label>
                      <select 
                        value={editFormData.role} 
                        onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as UserRole })}
                        className={`w-full px-6 py-4 rounded-[24px] text-xs font-bold focus:outline-none transition-all appearance-none cursor-pointer ${isDarkMode ? 'bg-[#2A2438] text-white border-white/5' : 'bg-gray-50 text-gray-900 border-gray-100'}`}
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Data Provider">Data Provider</option>
                        <option value="Data Reviewer">Data Reviewer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Public User">Public User</option>
                        <option value="Guest">Guest</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Account Status</label>
                      <select 
                        value={editFormData.status} 
                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                        className={`w-full px-6 py-4 rounded-[24px] text-xs font-bold focus:outline-none transition-all appearance-none cursor-pointer ${isDarkMode ? 'bg-[#2A2438] text-white border-white/5' : 'bg-gray-50 text-gray-900 border-gray-100'}`}
                      >
                        <option value="Active">Active / Committed</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Pending">Pending Approval</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-8 flex gap-4">
                    <button 
                      onClick={() => setIsEditModalOpen(false)}
                      className={`flex-1 py-5 rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95 ${isDarkMode ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleEditSave}
                      className="flex-1 py-5 bg-black text-white dark:bg-white dark:text-black rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 hover:bg-purple-600 dark:hover:bg-purple-400"
                    >
                      <Save size={18} /> Update Record
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className={`relative w-full max-w-md rounded-[48px] p-12 shadow-2xl animate-in zoom-in-95 duration-300 border
            ${isDarkMode ? 'bg-[#1A1625] border-white/10' : 'bg-white border-white'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[28px] flex items-center justify-center mb-8">
                <AlertTriangle size={40} />
              </div>
              <h3 className={`text-3xl font-black uppercase tracking-tighter mb-4 ${textClass}`}>Registry Removal</h3>
              <p className={`text-sm font-medium leading-relaxed mb-10 ${subTextClass}`}>
                You are about to delete <span className="font-black text-red-500">{selectedUser.firstName} {selectedUser.lastName}</span> from the system. This will also remove them from the Seed.sql generator list.
              </p>
              
              <div className="w-full flex flex-col gap-3">
                 <button 
                  onClick={handleDelete}
                  className="w-full py-5 bg-red-600 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 hover:bg-red-700"
                >
                  Delete from Registry
                </button>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className={`w-full py-5 rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] transition-all ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-500'}`}
                >
                  Keep Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto py-10 flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center leading-relaxed">
          Copyright © City Government of Baguio<br />
          City Planning, Development, and Sustainability Office – CBMS<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default UserManagement;
