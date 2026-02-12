
import React from 'react';
import { Mail, MapPin, Globe, Phone, Facebook } from 'lucide-react';

const ContactUs: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="p-4 lg:p-8 animate-in fade-in duration-700 relative min-h-screen">
      {/* Standardized Header */}
      <div className="mb-16 text-center lg:text-left">
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${textClass}`}>Contact Us</h1>
        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">Connect with Baguio CPDSO Team</p>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
      </div>

      <div className="relative w-full rounded-[48px] overflow-hidden shadow-2xl border border-white group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
            alt="CPDSO Family Background" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] linear"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 px-8 py-16 lg:px-24 lg:py-24 flex flex-col items-center text-white min-h-[900px]">
          <div className="mb-8">
            <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-lg">
              <path d="M100 20C40 20 10 80 10 140C10 200 100 240 100 240V20Z" fill="#8B44AF" />
              <path d="M100 20C160 20 190 80 190 140C190 200 100 240 100 240V20Z" fill="#5D921C" />
              <path d="M100 50V210" stroke="white" strokeWidth="12" strokeLinecap="round" />
              <path d="M100 80L50 40M100 120L40 90M100 160L30 140" stroke="white" strokeWidth="8" strokeLinecap="round" />
              <path d="M100 80L150 40M100 120L160 90M100 160L170 140" stroke="white" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-2 text-center drop-shadow-2xl italic">
            We are the CPDSO Family
          </h2>
          <p className="text-lg lg:text-xl font-medium tracking-tight mb-20 text-center opacity-80 uppercase">
            Baguio City Planning, Development, and Sustainability Office
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 w-full max-w-6xl mb-24">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-8">City Mission</h3>
              <p className="text-lg lg:text-xl font-medium leading-relaxed italic opacity-90">
                “We shall create a sustainable and enabling environment that will promote economic stability and ensure the general well-being of our citizenry.”
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-8">City Vision</h3>
              <p className="text-lg lg:text-xl font-medium leading-relaxed italic opacity-90">
                “We want a progressive, peaceful, clean and green Baguio – a center for education, trade and family-oriented tourism, managed by God-loving and strong willed leaders in partnership with self-reliant and disciplined citizenry.”
              </p>
            </div>
          </div>

          <div className="w-full max-w-7xl">
            <div className="flex items-center gap-6 mb-16">
              <div className="h-px flex-1 bg-white/20"></div>
              <h3 className="text-4xl font-black uppercase tracking-tight italic">Contact Channels</h3>
              <div className="h-px flex-1 bg-white/20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-y-16">
              <div className="flex flex-col items-center text-center group">
                <div className="mb-4">
                   <h4 className="text-xl font-black uppercase tracking-widest border-b-2 border-white pb-1 mb-4 inline-block">Address</h4>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 flex-shrink-0 text-white" />
                  <p className="text-sm font-bold uppercase tracking-tight leading-relaxed max-w-[250px]">
                    Right Wing, Main Floor, City Hall, Baguio City
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                   <h4 className="text-xl font-black uppercase tracking-widest border-b-2 border-white pb-1 mb-4 inline-block">Social</h4>
                </div>
                <a href="https://www.facebook.com/BaguioCPDSO" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95">
                  <Facebook size={36} fill="white" />
                </a>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                   <h4 className="text-xl font-black uppercase tracking-widest border-b-2 border-white pb-1 mb-4 inline-block">Website</h4>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={18} className="mt-1 flex-shrink-0 text-white" />
                  <a href="https://new.baguio.gov.ph/city-planning-office/about" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-tight underline hover:text-purple-300 transition-colors break-all max-w-[250px]">
                    https://new.baguio.gov.ph/city-planning-office/about
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                   <h4 className="text-xl font-black uppercase tracking-widest border-b-2 border-white pb-1 mb-4 inline-block">Email Address</h4>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-1 flex-shrink-0 text-white" />
                  <p className="text-sm font-bold uppercase tracking-tight break-all max-w-[250px]">cityplanninganddevelopment@gmail.com</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center lg:col-start-3">
                <div className="mb-4">
                   <h4 className="text-xl font-black uppercase tracking-widest border-b-2 border-white pb-1 mb-4 inline-block">Contact Number</h4>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-1 flex-shrink-0 text-white" />
                  <p className="text-sm font-bold uppercase tracking-widest">442-6607</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
