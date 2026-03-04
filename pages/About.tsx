
import React from 'react';
import { Mail, Phone, Globe, Facebook, MapPin, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  return (
    <div className="max-w-screen-2xl mx-auto p-4 relative">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">About GRIDS</h1>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
      </div>

      <div className="relative rounded-[50px] overflow-hidden min-h-[500px] shadow-2xl mb-32">
        <div className="p-16 flex flex-col items-center text-center">
          <Logo size="lg" />
          <h2 className="text-gray-900 text-5xl font-black tracking-tighter uppercase mt-8 mb-2">We are the CPDSO Family</h2>
          <p className="text-gray-500 text-xl font-bold uppercase tracking-widest">Baguio City Planning, Development, and Sustainability Office</p>
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

export default About;
