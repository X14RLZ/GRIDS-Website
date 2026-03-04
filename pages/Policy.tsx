
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Policy: React.FC = () => {
  const navigate = useNavigate();
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  return (
    <div className="p-4 relative min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Privacy Policy</h1>
        <div className="h-1.5 w-24 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[32px] p-12 shadow-sm border border-purple-50 max-w-5xl mx-auto mb-32">
        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">1. Introduction</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">The City Planning and Development and Sustainability Office (CPDSO) of Baguio City is committed to protecting the privacy and ensuring the security of all data.</p>
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

export default Policy;
