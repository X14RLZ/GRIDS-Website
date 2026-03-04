import React from 'react';
import { Mail, MapPin, Globe, Phone, Facebook } from 'lucide-react';
import { CPDSOLogo } from '../components/Logo';
import PageLayout from '../components/PageLayout';

const ContactUs: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title="Contact Us"
      subtitle="Connect with Baguio CPDSO Team"
    >
      <div className="relative w-full rounded-[48px] overflow-hidden shadow-2xl border border-white group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
            alt="CPDSO Family Background" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] linear"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 px-6 py-10 lg:px-16 lg:py-16 flex flex-col items-center text-white min-h-[600px]">
          <div className="mb-8">
            <CPDSOLogo size="lg" />
          </div>

          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-2 text-center drop-shadow-2xl">
            We are the CPDSO Family
          </h2>
          <p className="text-lg lg:text-xl font-medium tracking-tight mb-8 text-center opacity-80 uppercase">
            Baguio City Planning, Development, and Sustainability Office
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 w-full max-w-6xl mb-12">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-8">City Mission</h3>
              <p className="text-lg lg:text-xl font-medium leading-relaxed opacity-90">
                “We shall create a sustainable and enabling environment that will promote economic stability and ensure the general well-being of our citizenry.”
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-8">City Vision</h3>
              <p className="text-lg lg:text-xl font-medium leading-relaxed opacity-90">
                “We want a progressive, peaceful, clean and green Baguio – a center for education, trade and family-oriented tourism, managed by God-loving and strong willed leaders in partnership with self-reliant and disciplined citizenry.”
              </p>
            </div>
          </div>

          <div className="w-full max-w-7xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-px flex-1 bg-white/20"></div>
              <h3 className="text-4xl font-black uppercase tracking-tight">Contact Channels</h3>
              <div className="h-px flex-1 bg-white/20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-10">
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
    </PageLayout>
  );
};

export default ContactUs;