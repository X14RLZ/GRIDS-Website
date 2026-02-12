
import React from 'react';

const PrivacyPolicy: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const SectionDivider = () => (
    <div className={`w-full max-w-lg mx-auto h-[3px] my-12 rounded-full transition-colors
      ${isDarkMode ? 'bg-white/10' : 'bg-gray-900'}`}></div>
  );

  const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-700';
  const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="max-w-screen-xl mx-auto p-4 lg:p-12 animate-in fade-in duration-700 relative min-h-screen">
      {/* Standardized Header */}
      <div className="mb-16 text-center lg:text-left">
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${headingClass}`}>Privacy Policy</h1>
        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">CPDSO Data Governance Framework</p>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
      </div>

      <div className={`rounded-[48px] p-8 md:p-16 lg:p-20 shadow-2xl border mb-20 transition-colors duration-500
        ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'}`}>
        
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* 1. Introduction */}
          <section id="introduction" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>1. Introduction</h2>
            <p className={`text-base md:text-lg leading-relaxed font-medium ${textClass}`}>
              The City Planning and Development and Sustainability Office (CPDSO) of Baguio City is committed to protecting the privacy and ensuring the security of all personal and sensitive information collected through the implementation of the Community-Based Monitoring System (CBMS). This policy outlines how data is collected, used, stored, shared, and protected in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173).
            </p>
            <SectionDivider />
          </section>

          {/* 2. Purpose of Data Collection */}
          <section id="purpose" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>2. Purpose of Data Collection</h2>
            <p className={`text-base md:text-lg leading-relaxed font-medium mb-6 ${textClass}`}>
              The CBMS is a data-driven tool used to collect household- and individual-level information to:
            </p>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li>Aid in local planning, budgeting, and policy formulation.</li>
              <li>Monitor and evaluate the impact of government programs.</li>
              <li>Identify and prioritize areas for social protection and service delivery.</li>
              <li>Support evidence-based governance and sustainable development goals.</li>
            </ul>
            <SectionDivider />
          </section>

          {/* 3. Scope and Coverage */}
          <section id="scope" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>3. Scope and Coverage</h2>
            <p className={`text-base md:text-lg leading-relaxed font-medium mb-6 ${textClass}`}>
              This privacy policy covers all data collected by the CPDSO through CBMS, including:
            </p>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li>Sensitive personal information (e.g., income, health status, education, disability status).</li>
              <li>Geolocation and household demographic data.</li>
            </ul>
            <SectionDivider />
          </section>

          {/* 4. Legal Basis for Processing */}
          <section id="legal" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>4. Legal Basis for Processing</h2>
            <p className={`text-base md:text-lg leading-relaxed font-medium mb-6 ${textClass}`}>
              The processing of personal data under CBMS is based on:
            </p>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li>Republic Act No. 11315 (Community-Based Monitoring System Act).</li>
              <li>Republic Act No. 10173 (Data Privacy Act of 2012).</li>
              <li>DILG Memorandum Circulars and Joint Memoranda with the Philippine Statistics Authority (PSA).</li>
            </ul>
            <SectionDivider />
          </section>

          {/* 5. Data Collection Methods */}
          <section id="methods" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>5. Data Collection Methods</h2>
            <p className={`text-base md:text-lg leading-relaxed font-medium mb-6 ${textClass}`}>
              CBMS data is collected using:
            </p>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li>Structured household surveys.</li>
              <li>Mobile applications or digital data-gathering tools.</li>
              <li>Face-to-face interviews conducted by trained enumerators.</li>
            </ul>
            <p className={`mt-8 text-sm md:text-base font-medium italic ${textClass}`}>
              Participation in CBMS is voluntary, and data subjects are informed of their rights and the purpose of data collection before the survey.
            </p>
            <SectionDivider />
          </section>

          {/* 6. Data Storage and Retention */}
          <section id="storage" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>6. Data Storage and Retention</h2>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li>All collected data is stored in secure, access-controlled digital systems managed by the CPDSO and the PSA.</li>
              <li>Physical forms, if any, are securely kept and disposed of following retention and disposal policies.</li>
              <li>Personal data is retained only as long as necessary to fulfill the stated purposes or as required by law.</li>
            </ul>
            <SectionDivider />
          </section>

          {/* 7. Data Sharing and Access */}
          <section id="sharing" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>7. Data Sharing and Access</h2>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li>CBMS data may be shared with national agencies, academic institutions, or development partners only when anonymized and aggregated.</li>
              <li>Individual-level data is kept confidential and accessible only to authorized personnel, in accordance with strict data-sharing agreements.</li>
              <li>No personal data is sold, traded, or disclosed for commercial purposes.</li>
            </ul>
            <SectionDivider />
          </section>

          {/* 8. Security Measures */}
          <section id="security" className="text-center md:text-left">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>8. Security Measures</h2>
            <p className={`text-base md:text-lg leading-relaxed font-medium mb-6 ${textClass}`}>
              We implement appropriate organizational, physical, and technical measures to:
            </p>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li>Protect data from unauthorized access, alteration, or destruction.</li>
              <li>Regularly audit systems for vulnerabilities and perform updates.</li>
              <li>Train staff and enumerators in data privacy protocols and secure handling procedures.</li>
            </ul>
            <SectionDivider />
          </section>

          {/* 9. Rights of Data Subjects */}
          <section id="rights" className="text-center md:text-left pb-10">
            <h2 className={`text-3xl md:text-4xl font-black mb-6 ${headingClass}`}>9. Rights of Data Subjects</h2>
            <p className={`text-base md:text-lg leading-relaxed font-medium mb-6 ${textClass}`}>
              Data subjects have the following rights under the Data Privacy Act:
            </p>
            <ul className={`space-y-4 text-base md:text-lg font-medium list-disc pl-6 text-left ${textClass}`}>
              <li><strong>Right to be informed</strong> – You have the right to know how your data will be used.</li>
              <li><strong>Right to access</strong> – You may request access to your personal data.</li>
              <li><strong>Right to object</strong> – You may refuse participation or withdraw consent at any time.</li>
              <li><strong>Right to correct</strong> – You may request correction of inaccurate or outdated information.</li>
              <li><strong>Right to erasure</strong> – You may request deletion of data, subject to legal and policy constraints.</li>
              <li><strong>Right to data portability and to file a complaint</strong> – You may raise concerns with our Data Protection Officer or with the National Privacy Commission.</li>
            </ul>
          </section>

        </div>

        <footer className="w-full flex flex-col items-center pt-20 border-t border-gray-100 dark:border-white/5">
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

export default PrivacyPolicy;
