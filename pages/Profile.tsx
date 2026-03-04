
import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Upload, Info, CheckCircle2, Save, X } from 'lucide-react';

interface ProfileProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    birthdate: user?.birthdate || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      onUpdateUser({
        ...user,
        ...formData
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      birthdate: user?.birthdate || '',
      phone: user?.phone || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const inputStyle = "w-full bg-white border border-gray-200 px-6 py-4 rounded-[32px] text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all shadow-sm disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed";

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-6xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Profile</h1>
      </div>

      <div className="bg-[#FDFBF2] rounded-[56px] shadow-2xl shadow-purple-900/5 border border-white overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        
        {/* Left Sidebar - Profile Card */}
        <div className="w-full lg:w-[400px] p-12 flex flex-col items-center border-r border-gray-100 bg-[#FDFBF2]">
          <div className="relative mb-8">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center border-[8px] border-white shadow-2xl shadow-purple-950/10">
              <UserIcon size={96} className="text-gray-900" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-1 text-center">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-12 text-center">
            {user?.role}
          </p>

          <button className="flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-[28px] font-black text-[10px] uppercase tracking-widest shadow-xl border border-gray-100 hover:bg-black hover:text-white transition-all active:scale-95 mb-16">
            <Upload size={18} />
            Upload Profile Picture
          </button>

          <div className="mt-auto flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-3xl p-4 shadow-md flex items-center justify-center border border-gray-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Baguio_City_Seal.png/1200px-Baguio_City_Seal.png" alt="Seal" className="w-full h-full object-contain" />
            </div>
            <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] text-center max-w-[200px] leading-relaxed">
              City Planning, Development, and Sustainability Office
            </p>
          </div>
        </div>

        {/* Right Content - Information Forms */}
        <div className="flex-1 p-12 lg:p-20 flex flex-col gap-16">
          
          {/* Section: Personal Information */}
          <section className="space-y-12">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Personal Information</h3>
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button onClick={handleCancel} className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-all">
                      <X size={16} /> Cancel
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-purple-600 transition-all active:scale-95">
                      <Save size={16} /> Save Changes
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl border border-gray-100 hover:bg-black hover:text-white transition-all active:scale-95">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} className={inputStyle} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} className={inputStyle} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Birthdate</label>
                <input name="birthdate" value={formData.birthdate} onChange={handleChange} disabled={!isEditing} className={inputStyle} placeholder="MM-DD-YYYY" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className={inputStyle} />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                <input name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} className={inputStyle} />
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-gray-100"></div>

          {/* Section: Office Information (Read Only) */}
          <section className="space-y-12">
            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Office Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Office/Barangay</label>
                <div className={`${inputStyle} bg-white shadow-none border-gray-100 flex items-center text-gray-500`}>
                  {user?.office}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Type</label>
                  <Info size={12} className="text-gray-400" />
                </div>
                <div className="relative">
                  <div className={`${inputStyle} bg-white shadow-none border-gray-100 flex items-center text-gray-500`}>
                    {user?.role}
                  </div>
                  <div className="absolute -bottom-6 left-6 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Verified!</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Office Landline</label>
                <div className={`${inputStyle} bg-white shadow-none border-gray-100 flex items-center text-gray-500`}>
                  {user?.landline || '442-3939'}
                </div>
              </div>
            </div>
          </section>

          {/* Footer Branding */}
          <footer className="mt-auto pt-20 flex flex-col items-center">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center leading-relaxed">
              Copyright © City Government of Baguio<br />
              City Planning, Development, and Sustainability Office – CBMS<br />
              Developed by: Charles S. Chantioco
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
