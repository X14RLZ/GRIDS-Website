
import React from 'react';
import { Database, TrendingUp, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const SectionDivider = () => (
    <div className="w-full max-w-lg mx-auto h-[3px] bg-black my-16 rounded-full opacity-100"></div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 relative min-h-screen">
      {/* Header Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">About GRIDS</h1>
        <div className="w-full h-[2px] bg-gray-900/10"></div>
      </div>

      <div className="bg-[#F8F5FF] rounded-[48px] p-10 md:p-20 shadow-2xl shadow-purple-900/5 border border-white mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Main Description */}
        <div className="max-w-4xl mx-auto space-y-8 text-justify text-gray-800 text-lg md:text-xl font-medium leading-relaxed">
          <p>
            The <span className="font-black text-gray-900">Gender-Responsive Integrated Database System (GRIDS)</span> is Baguio City's flagship digital transformation project mandated by the Magna Carta of Women. It aims to build a centralized, secure, and accessible database for Gender and Development (GAD) data — enabling evidence-based policymaking and gender-sensitive planning across all sectors of the city.
          </p>
          <p>
            GRIDS addresses long-standing challenges in data management, such as manual data collection, fragmented storage, and time-consuming validation processes. By automating workflows and consolidating datasets, it eliminates duplication, improves data accuracy, and speeds up policy formulation.
          </p>
          <p>
            Built on a modular and scalable architecture, GRIDS includes core features for authentication, user management, data submission and review, search and export, and real-time notifications. Its role-based access control (RBAC) and compliance with the Data Privacy Act of 2012 ensure both security and accountability.
          </p>
          <p>
            Through automated processes, standardized validation, and comprehensive audit trails, GRIDS significantly enhances efficiency, transparency, and data quality in the city's GAD reporting.
          </p>
        </div>

        <SectionDivider />

        {/* Section: Data-Driven Decisions */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="relative">
            <div className="w-32 h-32 bg-black rounded-[32px] flex items-center justify-center text-white shadow-xl">
              <TrendingUp size={64} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 border-4 border-[#F8F5FF] text-gray-900 shadow-lg">
              <CheckCircle2 size={32} fill="currentColor" className="text-white bg-black rounded-full overflow-hidden" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Data-Driven Decisions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl">
            GRIDS provides clear, reliable gender data that helps leaders understand real conditions in the city. 
            Instead of assumptions, policies and programs are guided by solid evidence — ensuring that 
            identified gender issues are seen and acted upon.
          </p>
        </div>

        <SectionDivider />

        {/* Section: Centralized & Consistent Information */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="relative">
            <div className="w-32 h-32 text-black flex items-center justify-center">
              <Database size={84} strokeWidth={2.5} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 ml-6 bg-black text-white p-2 rounded-full border-4 border-[#F8F5FF]">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Centralized & Consistent Information
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl">
            All GAD-related data is stored in one secure system, replacing scattered files and inconsistent 
            reporting formats. This improves data quality, prevents duplication, and makes analysis faster and 
            more accurate.
          </p>
        </div>

        <SectionDivider />

        {/* Section: Faster & Smarter Workflows */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="w-32 h-32 text-black flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-12 border-4 border-black mb-1 mx-auto rounded-sm"></div>
              <div className="flex gap-1">
                <div className="w-10 h-10 border-4 border-black rounded-sm"></div>
                <div className="w-10 h-10 border-4 border-black rounded-sm"></div>
                <div className="w-10 h-10 border-4 border-black rounded-sm"></div>
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[4px] h-4 bg-black"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Faster & Smarter Workflows
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl">
            GRIDS streamlines the entire data process — from collection to reporting. Staff no longer waste time 
            searching through multiple sources. Authorized users can instantly access what they need, allowing 
            more focus on meaningful analysis and action.
          </p>
        </div>

        <SectionDivider />

        {/* Section: Transparency & Accountability */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="w-32 h-32 text-black flex items-center justify-center relative">
            <div className="absolute inset-0 border-[6px] border-dashed border-black rounded-full"></div>
            <div className="w-20 h-20 bg-black rounded-full flex flex-col gap-1 p-4 items-center justify-center">
               <div className="w-full h-2 bg-white rounded-full opacity-40"></div>
               <div className="w-full h-2 bg-white rounded-full"></div>
               <div className="w-full h-2 bg-white rounded-full opacity-60"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Transparency & Accountability
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl">
            With structured access and audit trails, GRIDS strengthens public trust. Key reports and insights can 
            be made available to stakeholders and the community, promoting open and responsible 
            governance.
          </p>
        </div>

        <SectionDivider />

        {/* Footer info precisely as in reference */}
        <footer className="w-full flex flex-col items-center pt-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed text-gray-900">
            Copyright © City Government of Baguio<br />
            City Planning Development Service Office – CBMS<br />
            Developed by: Charles S. Chantioco
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
