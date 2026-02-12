
import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Save, X, Mail, Phone, Building2, Calendar, ShieldCheck } from 'lucide-react';

interface ProfileProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
  isDarkMode?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, isDarkMode = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    office: user?.office || '',
    birthdate: user?.birthdate || '',
  });

  const handleSave = () => {
    if (user) {
      onUpdateUser({
        ...user,
        ...formData
      });
      setIsEditing(false);
    }
  };

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-purple-300' : 'text-gray-500';
  const cardBgClass = isDarkMode ? 'bg-[#1A1625]' : 'bg-white';
  const inputBgClass = isDarkMode ? 'bg-[#2A2438] border-white/10' : 'bg-gray-50 border-gray-100';

  return (
    <div className="max-w-4xl mx-auto p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className={`text-5xl font-black mb-2 uppercase tracking-tighter ${textClass}`}>User Profile</h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Personal System Registry</p>
        </div>
        
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl active:scale-95"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-4">
            <button 
              onClick={() => setIsEditing(false)}
              className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-10 py-4 bg-purple-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl active:scale-95 flex items-center gap-2"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className={`${cardBgClass} rounded-[48px] shadow-2xl border ${isDarkMode ? 'border-white/5' : 'border-purple-50'} overflow-hidden mb-20`}>
        <div className="p-10 md:p-16">
          <div className="flex flex-col items-center mb-16">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 border-8 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-white shadow-lg'}`}>
              <UserIcon size={64} className={isDarkMode ? 'text-purple-400' : 'text-gray-300'} />
            </div>
            <h2 className={`text-3xl font-black uppercase tracking-tight ${textClass}`}>{user?.firstName} {user?.lastName}</h2>
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-2">{user?.role}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>First Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all ${inputBgClass}`}
                  />
                ) : (
                  <div className={`px-6 py-4 rounded-2xl text-sm font-bold ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>{user?.firstName}</div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Last Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all ${inputBgClass}`}
                  />
                ) : (
                  <div className={`px-6 py-4 rounded-2xl text-sm font-bold ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>{user?.lastName}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Email Address</label>
                <div className={`px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
                  <Mail size={16} />
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Office / Department</label>
                <div className={`px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
                  <Building2 size={16} />
                  {user?.office}
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Phone Number</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all ${inputBgClass}`}
                  />
                ) : (
                  <div className={`px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <Phone size={16} className="text-gray-400" />
                    {user?.phone || 'Not set'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-widest ml-4 ${subTextClass}`}>Birthdate</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    placeholder="YYYY-MM-DD"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                    className={`w-full px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all ${inputBgClass}`}
                  />
                ) : (
                  <div className={`px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <Calendar size={16} className="text-gray-400" />
                    {user?.birthdate || 'Not set'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`mt-16 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${subTextClass}`}>Account Status</p>
                <p className="text-sm font-black text-green-600 uppercase">Verified Personnel</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-[10px] font-black uppercase tracking-widest ${subTextClass}`}>Member Since</p>
              <p className={`text-sm font-black uppercase ${textClass}`}>January 2025</p>
            </div>
          </div>
        </div>
      </div>

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

export default Profile;
