
import React from 'react';

const Policy: React.FC = () => {
  const SectionDivider = () => (
    <div className="w-full max-w-lg mx-auto h-[3px] bg-black my-16 rounded-full opacity-100"></div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-8 animate-in fade-in duration-700 relative min-h-screen">
      {/* Header Title */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">Privacy Policy</h1>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[48px] p-10 md:p-20 shadow-2xl shadow-purple-900/5 border border-purple-50 mb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* 1. Introduction */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed text-lg text-justify font-medium">
              The City Planning and Development and Sustainability Office (CPDSO) of Baguio City is committed to protecting the privacy and ensuring the security of all personal and sensitive information collected through the implementation of the Community-Based Monitoring System (CBMS). This policy outlines how data is collected, used, stored, shared, and protected in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173).
            </p>
          </section>

          <SectionDivider />

          {/* 2. Purpose of Data Collection */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">2. Purpose of Data Collection</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 font-medium">
              The CBMS is a data-driven tool used to collect household- and individual-level information to:
            </p>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium">
              <li>Aid in local planning, budgeting, and policy formulation.</li>
              <li>Monitor and evaluate the impact of government programs.</li>
              <li>Identify and prioritize areas for social protection and service delivery.</li>
              <li>Support evidence-based governance and sustainable development goals.</li>
            </ul>
          </section>

          <SectionDivider />

          {/* 3. Scope and Coverage */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">3. Scope and Coverage</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 font-medium">
              This privacy policy covers all data collected by the CPDSO through CBMS, including:
            </p>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium">
              <li>Sensitive personal information (e.g., income, health status, education, disability status).</li>
              <li>Geolocation and household demographic data.</li>
            </ul>
          </section>

          <SectionDivider />

          {/* 4. Legal Basis for Processing */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">4. Legal Basis for Processing</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 font-medium">
              The processing of personal data under CBMS is based on:
            </p>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium">
              <li>Republic Act No. 11315 (Community-Based Monitoring System Act).</li>
              <li>Republic Act No. 10173 (Data Privacy Act of 2012).</li>
              <li>DILG Memorandum Circulars and Joint Memoranda with the Philippine Statistics Authority (PSA).</li>
            </ul>
          </section>

          <SectionDivider />

          {/* 5. Data Collection Methods */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">5. Data Collection Methods</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 font-medium">
              CBMS data is collected using:
            </p>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium mb-8">
              <li>Structured household surveys.</li>
              <li>Mobile applications or digital data-gathering tools.</li>
              <li>Face-to-face interviews conducted by trained enumerators.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-lg text-justify font-medium italic">
              Participation in CBMS is voluntary, and data subjects are informed of their rights and the purpose of data collection before the survey.
            </p>
          </section>

          <SectionDivider />

          {/* 6. Data Storage and Retention */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">6. Data Storage and Retention</h2>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium">
              <li>All collected data is stored in secure, access-controlled digital systems managed by the CPDSO and the PSA.</li>
              <li>Physical forms, if any, are securely kept and disposed of following retention and disposal policies.</li>
              <li>Personal data is retained only as long as necessary to fulfill the stated purposes or as required by law.</li>
            </ul>
          </section>

          <SectionDivider />

          {/* 7. Data Sharing and Access */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">7. Data Sharing and Access</h2>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium">
              <li>CBMS data may be shared with national agencies, academic institutions, or development partners only when anonymized and aggregated.</li>
              <li>Individual-level data is kept confidential and accessible only to authorized personnel, in accordance with strict data-sharing agreements.</li>
              <li>No personal data is sold, traded, or disclosed for commercial purposes.</li>
            </ul>
          </section>

          <SectionDivider />

          {/* 8. Security Measures */}
          <section>
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">8. Security Measures</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 font-medium">
              We implement appropriate organizational, physical, and technical measures to:
            </p>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium">
              <li>Protect data from unauthorized access, alteration, or destruction.</li>
              <li>Regularly audit systems for vulnerabilities and perform updates.</li>
              <li>Train staff and enumerators in data privacy protocols and secure handling procedures.</li>
            </ul>
          </section>

          <SectionDivider />

          {/* 9. Rights of Data Subjects */}
          <section className="pb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">9. Rights of Data Subjects</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 font-medium">
              Data subjects have the following rights under the Data Privacy Act:
            </p>
            <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg font-medium">
              <li><span className="font-black text-gray-800">Right to be informed</span> – You have the right to know how your data will be used.</li>
              <li><span className="font-black text-gray-800">Right to access</span> – You may request access to your personal data.</li>
              <li><span className="font-black text-gray-800">Right to object</span> – You may refuse participation or withdraw consent at any time.</li>
              <li><span className="font-black text-gray-800">Right to correct</span> – You may request correction of inaccurate or outdated information.</li>
              <li><span className="font-black text-gray-800">Right to erasure</span> – You may request deletion of data, subject to legal and policy constraints.</li>
              <li><span className="font-black text-gray-800">Right to data portability and to file a complaint</span> – You may raise concerns with our Data Protection Officer or with the National Privacy Commission.</li>
            </ul>
          </section>

        </div>

        {/* Footer info consistent with branding */}
        <footer className="w-full flex flex-col items-center pt-20">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed text-gray-900 opacity-30">
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
