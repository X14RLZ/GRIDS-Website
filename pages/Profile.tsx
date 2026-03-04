
import React from 'react';
import { User } from '../types';
import { Camera, Mail, Phone, Calendar, Building2, UserCircle, ShieldCheck, HelpCircle, PhoneCall, MapPin, UserCheck, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  return (
    <div className="max-w-screen-2xl mx-auto p-4 relative">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">View Detail</h1>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[48px] p-16 shadow-2xl shadow-purple-950/5 border border-purple-50 mb-32">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-1/3 bg-[#fdfaff] border border-purple-100 rounded-[40px] p-12 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-64 h-64 bg-white rounded-full border-[8px] border-white shadow-2xl overflow-hidden mb-8 ring-12 ring-purple-50">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName}`} alt="avatar" className="w-full h-full bg-purple-50" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{user?.firstName} {user?.lastName}</h2>
            <p className="text-sm font-black text-purple-400 uppercase tracking-[0.3em] mt-2 mb-16">{user?.role}</p>
          </div>
          <div className="flex-1 space-y-16 py-8">
            <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-12">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">First Name</label><div className="bg-[#fdf8ff] border-2 border-gray-100 px-8 py-5 rounded-full text-lg font-black text-gray-800 shadow-inner">{user?.firstName}</div></div>
              <div className="space-y-4"><label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">Last Name</label><div className="bg-[#fdf8ff] border-2 border-gray-100 px-8 py-5 rounded-full text-lg font-black text-gray-800 shadow-inner">{user?.lastName}</div></div>
            </div>
          </div>
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

export default Profile;
