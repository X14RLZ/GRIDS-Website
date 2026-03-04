
import React from 'react';
import { Database, TrendingUp, Network, PieChart, CheckCircle2 } from 'lucide-react';

const About: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const SectionDivider = () => (
    <div className={`w-full max-w-lg mx-auto h-[3px] my-16 rounded-full transition-colors duration-500
      ${isDarkMode ? 'bg-white/10' : 'bg-black'}`}></div>
  );

  const textClass = isDarkMode ? 'text-gray-300' : 'text-gray-800';
  const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-8 animate-in fade-in duration-700 relative min-h-screen">
      {/* Consistent Standard Header Block */}
      <div className="mb-16 text-center lg:text-left">
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${headingClass}`}>About GRIDS</h1>
        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">The GAD Database Foundation</p>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
      </div>

      <div className={`rounded-[48px] p-10 md:p-20 shadow-2xl border mb-20 transition-colors duration-500
        ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-[#F8F5FF] border-white shadow-purple-900/5'}`}>
        
        {/* Main Description */}
        <div className={`max-w-5xl mx-auto space-y-8 text-lg md:text-xl font-medium leading-relaxed ${textClass}`}>
          <p>
            The <span className={`font-black ${headingClass}`}>Gender-Responsive Integrated Database System (GRIDS)</span> is Baguio City's flagship digital transformation project mandated by the Magna Carta of Women. It aims to build a centralized, secure, and accessible database for Gender and Development (GAD) data — enabling evidence-based policymaking and gender-sensitive planning across all sectors of the city.
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
            <div className={`w-32 h-32 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <TrendingUp size={84} strokeWidth={2.5} />
            </div>
            <div className="absolute bottom-2 right-2">
              <CheckCircle2 size={32} className="text-purple-600 fill-white" />
            </div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>
            Data-Driven Decisions
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            GRIDS provides clear, reliable gender data that helps leaders understand real conditions in the city. 
            Instead of assumptions, policies and programs are guided by solid evidence — ensuring that 
            identified gender issues are seen and acted upon.
          </p>
        </div>

        <SectionDivider />

        {/* Section: Centralized & Consistent Information */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className={`w-32 h-32 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <Database size={84} strokeWidth={2.5} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>
            Centralized & Consistent Information
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            All GAD-related data is stored in one secure system, replacing scattered files and inconsistent 
            reporting formats. This improves data quality, prevents duplication, and makes analysis faster and 
            more accurate.
          </p>
        </div>

        <SectionDivider />

        {/* Section: Faster & Smarter Workflows */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className={`w-32 h-32 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
             <Network size={84} strokeWidth={2.5} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>
            Faster & Smarter Workflows
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            GRIDS streamlines the entire data process — from collection to reporting. Staff no longer waste time 
            searching through multiple sources. Authorized users can instantly access what they need, allowing 
            more focus on meaningful analysis and action.
          </p>
        </div>

        <SectionDivider />

        {/* Section: Transparency & Accountability */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className={`w-32 h-32 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
             <PieChart size={84} strokeWidth={2.5} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>
            Transparency & Accountability
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-3xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            With structured access and audit trails, GRIDS strengthens public trust. Key reports and insights can 
            be made available to stakeholders and the community, promoting open and responsible 
            governance.
          </p>
        </div>

        <SectionDivider />

        <footer className="w-full flex flex-col items-center pt-10">
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed transition-colors
            ${isDarkMode ? 'text-gray-600' : 'text-gray-900 opacity-30'}`}>
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
