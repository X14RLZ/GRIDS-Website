
import React from 'react';
import { Globe, Shield, FileText, Landmark, ChevronRight, Gavel, ExternalLink, BookOpen, ShieldCheck, ScrollText } from 'lucide-react';

const Policy: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const SectionDivider = () => (
    <div className={`w-full max-w-lg mx-auto h-[3px] my-12 rounded-full transition-colors
      ${isDarkMode ? 'bg-white/10' : 'bg-gray-900/5'}`}></div>
  );

  const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';

  const PolicyCard = ({ title, desc, link = "#" }: { title: string, desc: string, link?: string }) => (
    <div className={`p-8 rounded-[32px] border transition-all hover:shadow-xl group
      ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-purple-900/50' : 'bg-[#FBF6FF] border-purple-50 hover:border-purple-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className={`text-xl font-black uppercase tracking-tight leading-tight group-hover:text-purple-600 transition-colors ${headingClass}`}>
          {title}
        </h4>
        <ExternalLink size={18} className="text-gray-300 group-hover:text-purple-600" />
      </div>
      <p className={`text-sm font-medium leading-relaxed mb-6 ${textClass}`}>{desc}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-purple-600 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
        View Document <ChevronRight size={14} />
      </a>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-12 animate-in fade-in duration-700 relative min-h-screen">
      <div className="mb-12">
        <h1 className={`text-5xl lg:text-6xl font-black mb-2 uppercase tracking-tighter ${headingClass}`}>Policy Framework</h1>
        <div className="h-2 w-48 bg-purple-600 rounded-full"></div>
      </div>

      <div className={`rounded-[48px] p-8 md:p-16 lg:p-20 shadow-2xl border mb-20 transition-colors duration-500
        ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'}`}>
        
        {/* A. International Conventions */}
        <section id="international">
          <div className="flex items-center gap-4 mb-10">
            <Globe className="text-purple-600" size={32} />
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${headingClass}`}>International Conventions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PolicyCard 
              title="CEDAW" 
              desc="Convention on the Elimination of All Forms of Discrimination Against Women. Often described as an international bill of rights for women."
              link="https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-elimination-all-forms-discrimination-against-women"
            />
            <PolicyCard 
              title="Beijing Platform for Action" 
              desc="BPFA - An agenda for women's empowerment that aims at accelerating the implementation of the Nairobi Forward-looking Strategies."
              link="https://www.unwomen.org/en/how-we-work/intergovernmental-support/world-conferences-on-women/beijing"
            />
          </div>
        </section>

        <SectionDivider />

        {/* B. National Laws */}
        <section id="national">
          <div className="flex items-center gap-4 mb-10">
            <Landmark className="text-purple-600" size={32} />
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${headingClass}`}>National Laws</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PolicyCard 
              title="Magna Carta of Women" 
              desc="Republic Act No. 9710. A comprehensive women's human rights law that seeks to eliminate discrimination through recognition and protection."
              link="https://pcw.gov.ph/republic-act-9710-magna-carta-of-women/"
            />
            <PolicyCard 
              title="Safe Spaces Act" 
              desc="Republic Act No. 11313. Defines and penalizes gender-based sexual harassment in streets, public spaces, and online."
              link="https://pcw.gov.ph/republic-act-11313-safe-spaces-act-bawal-bastos-law/"
            />
            <div className={`p-8 rounded-[32px] border border-dashed flex items-center justify-center text-center ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 leading-relaxed px-4">Including Cybercrime Law, Solo Parents Welfare, and VAWC Act</span>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* C. Joint Memorandum Circulars */}
        <section id="jmc">
          <div className="flex items-center gap-4 mb-10">
            <FileText className="text-purple-600" size={32} />
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${headingClass}`}>Joint Memorandum Circulars</h2>
          </div>
          <div className="space-y-4">
            {[
              { id: "PCW-DILG-DBM-NEDA JMC 2013-01", desc: "Guidelines for the localization of the Magna Carta of Women." },
              { id: "PCW-DILG-DBM-NEDA JMC 2016-01", desc: "Amendments to the localization guidelines for GAD planning and budgeting." },
              { id: "PCW-DILG-DBM-NEDA JMC 2024-01", desc: "Latest updated harmonized guidelines for GAD mainstreaming." }
            ].map(jmc => (
              <div key={jmc.id} className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-purple-600/5
                ${isDarkMode ? 'bg-[#2A2438] border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-[10px]">JMC</div>
                  <div>
                    <h5 className={`font-black text-sm uppercase tracking-widest ${headingClass}`}>{jmc.id}</h5>
                    <p className={`text-[11px] font-medium ${textClass}`}>{jmc.desc}</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-black text-white rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-purple-600 transition-colors">Download</button>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* D. Baguio City */}
        <section id="local" className="pb-10">
          <div className="flex items-center gap-4 mb-10">
            <Gavel className="text-purple-600" size={32} />
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${headingClass}`}>Baguio City</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className={`p-10 rounded-[40px] border flex flex-col gap-6 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#f0f9ff] border-blue-50'}`}>
               <div className="flex items-center gap-3">
                 <ShieldCheck className="text-blue-600" />
                 <h4 className="text-2xl font-black uppercase tracking-tight text-blue-600">Ordinances</h4>
               </div>
               <p className={`text-sm font-medium leading-relaxed ${textClass}`}>Local legislative acts passed by the Sangguniang Panlungsod governing gender welfare and city-wide GAD implementation.</p>
               <button className="mt-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest self-start">Explore Repository</button>
            </div>
            <div className={`p-10 rounded-[40px] border flex flex-col gap-6 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#fff7ed] border-orange-50'}`}>
               <div className="flex items-center gap-3">
                 <ScrollText className="text-orange-600" />
                 <h4 className="text-2xl font-black uppercase tracking-tight text-orange-600">Executive Orders</h4>
               </div>
               <p className={`text-sm font-medium leading-relaxed ${textClass}`}>Directives issued by the City Mayor for the administration and enforcement of GAD programs and task force creation.</p>
               <button className="mt-auto px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest self-start">View Latest Orders</button>
            </div>
          </div>
        </section>

        <footer className="w-full flex flex-col items-center pt-20">
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed transition-colors
            ${isDarkMode ? 'text-gray-700' : 'text-gray-900 opacity-20'}`}>
            Copyright © City Government of Baguio<br />
            City Planning Development Service Office – CBMS<br />
            Developed by: Charles S. Chantioco
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Policy;
