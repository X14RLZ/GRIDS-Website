
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Search, ShieldCheck, HelpCircle, FileText, UserCircle, Users, Layout, BookOpen } from 'lucide-react';

type HelpCategory = 'ui' | 'policy' | 'citizens' | 'staff' | null;

const Help: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory>(null);

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const SectionDivider = () => (
    <div className={`w-full h-[3px] my-8 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black'}`}></div>
  );

  const QABlock = ({ q, a, num }: { q: string, a: React.ReactNode, num?: string | number }) => (
    <div className="space-y-3 group">
      <h4 className={`text-lg font-black leading-tight group-hover:text-purple-600 transition-colors ${textClass}`}>
        {num ? `Q${num}. ` : ''}{q}
      </h4>
      <div className={`text-sm font-medium leading-relaxed pl-4 border-l-2 border-transparent group-hover:border-purple-600 transition-all ${subTextClass}`}>
        {a}
      </div>
    </div>
  );

  const renderUIHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl space-y-12">
      <div className="mb-10">
        <h2 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>for the GRIDS website UI</h2>
        <p className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Stuck on something? We're here to help with all your questions and answers in one place.</p>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>General</h3>
        <div className="space-y-8">
          <QABlock num={1} q="What is GRIDS?" a="GRIDS (Gender-Responsive Integrated Database System) is Baguio City's centralized database for Gender and Development (GAD) data. It supports evidence-based, gender-responsive planning and policy-making." />
          <QABlock num={2} q="Who can use GRIDS?" a={
            <ul className="list-disc pl-5 space-y-1">
              <li>Public officials and government staff</li>
              <li>Members of the Gender Focal Point System (GFPS)</li>
              <li>The general public (for viewing public data)</li>
            </ul>
          } />
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Access & Accounts</h3>
        <div className="space-y-8">
          <QABlock num={3} q="Do I need an account to use GRIDS?" a="No account needed to view public statistics and reports. Accounts are required for data providers, reviewers, analysts, and admins." />
          <QABlock num={4} q="How do I log in?" a="Go to the GRIDS website, click Login, and enter your username and password." />
          <QABlock num={5} q="What if I forget my password?" a="Use the Forgot Password option or contact the GRIDS administrator for assistance." />
        </div>
      </div>
      
      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Searching & Viewing Data</h3>
        <div className="space-y-8">
          <QABlock num={6} q="How do I search for data?" a="Use the Search bar, type a keyword (e.g., 'education', 'transport', 'employment'), and open a result to view details." />
          <QABlock num={7} q="Can I download the data?" a="Yes. Public users can download anonymized and aggregated datasets and reports." />
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Data Submission (for Offices / GFPS)</h3>
        <div className="space-y-8">
          <QABlock num={8} q="Who can submit data to GRIDS?" a="Authorized Data Providers from city departments, offices, and GFPS units." />
          <QABlock num={9} q="How do I submit data?" a={<div className="space-y-1"><p>a. Log in</p><p>b. Go to Data Submission</p><p>c. Upload your file using the official template</p><p>d. Add details (title, description)</p><p>e. Click Submit</p></div>} />
          <QABlock num={10} q="How do I know the status of my submission?" a="Go to My Submissions to see if it is Pending, Under Review, Approved, or Denied." />
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Review & Approval (for Reviewers)</h3>
        <div className="space-y-8">
          <QABlock num={11} q="How do I review submitted data?" a={<div className="space-y-1"><p>a. Log in</p><p>b. Go to Review Submissions</p><p>c. Open an entry</p><p>d. Approve or deny, and add comments if needed</p></div>} />
          <QABlock num={12} q="Will the provider see my remarks?" a="Yes. GRIDS notifies the provider and shows your comments." />
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Privacy & Security</h3>
        <div className="space-y-8">
          <QABlock num={13} q="Is personal information shown in GRIDS?" a="No. GRIDS publishes aggregated, anonymized data only, in line with the Data Privacy Act of 2012." />
          <QABlock num={14} q="Who can see detailed or raw data?" a="Only authorized users such as GFPS, Department Heads, CPDSO/CBMS, and system admins." />
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Help & Support</h3>
        <div className="space-y-8">
          <QABlock num={15} q="How do I report an issue with the system?" a="Use the Feedback / Report Issue link on the GRIDS website or contact the designated GRIDS coordinator." />
        </div>
      </div>
    </div>
  );

  const renderStaffHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl space-y-12">
      <div className="mb-10">
        <h2 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>for Officials, GFPS, Staff</h2>
        <p className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Stuck on something? We're here to help with all your questions and answers in one place.</p>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>A. For Data Providers (Offices / GFPS)</h3>
        <div className="space-y-8">
          <QABlock num={1} q="I am a Data Provider. What is my main task in GRIDS?" a="Your main task is to submit accurate GAD-related data from your office using the standard templates and timelines." />
          <QABlock num={2} q="How do I submit data?" a={<div className="space-y-1"><p>• Log in to GRIDS</p><p>• Go to Data Submission</p><p>• Upload your file using the official template</p><p>• Fill in required fields (title, period, office, etc.)</p><p>• Click Submit</p></div>} />
          <QABlock num={3} q="What if my submission is denied?" a="Check the remarks from the reviewer, correct the data, and resubmit through the same module." />
          <QABlock num={4} q="How often should I submit data?" a="At a minimum, yearly, or as required in the guidelines for your office or indicator." />
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>B. For Data Reviewers (GFPS Focals / Department Heads)</h3>
        <div className="space-y-8">
          <QABlock num={1} q="What is my role as a Data Reviewer?" a="You validate and approve or deny submitted data from offices under your scope, ensuring accuracy, completeness, and alignment with GAD standards." />
          <QABlock num={4} q="How do I log in?" a="Go to the GRIDS website, click Login, and enter your username and password." />
          <QABlock num={5} q="What if I forget my password?" a="Use the Forgot Password option or contact the GRIDS administrator for assistance." />
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Searching & Viewing Data</h3>
        <div className="space-y-8">
          <QABlock num={6} q="How do I search for data?" a="Use the Search bar, type a keyword (e.g., 'education', 'transport', 'employment'), and open a result to view details." />
          <QABlock num={7} q="Can I download the data?" a="Yes. Public users can download anonymized and aggregated datasets and reports." />
        </div>
      </div>
      
      {/* Continuing duplication of common sections as per image layout */}
      <div>
        <h3 className={`text-2xl font-black uppercase mb-6 ${textClass}`}>Data Submission (for Offices / GFPS)</h3>
        <div className="space-y-8">
          <QABlock num={8} q="Who can submit data to GRIDS?" a="Authorized Data Providers from city departments, offices, and GFPS units." />
        </div>
      </div>
      
      <div className="opacity-50 italic text-[10px] uppercase font-bold tracking-widest pt-10">...Additional sections match UI categories for cross-referencing staff guidelines...</div>
    </div>
  );

  const renderPolicyHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl space-y-12">
      <div className="mb-10">
        <h2 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>for Policy Docs, Manuals, Attachments</h2>
        <p className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Frequently Asked Questions (FAQ) on GRIDS Usage</p>
      </div>

      <div className="space-y-10">
        <QABlock num={1} q="What is the Gender-Responsive Integrated Database System (GRIDS)?" a="The Gender-Responsive Integrated Database System (GRIDS) is a centralized GAD database of the City Government of Baguio. It consolidates gender-related data from various offices to support gender-responsive planning, policy-making, monitoring, and reporting, in line with the Magna Carta of Women and the Data Privacy Act of 2012." />
        <QABlock num={2} q="Who are the primary users of GRIDS?" a="Primary users include policymakers, members of the Gender Focal Point System (GFPS), department and office personnel acting as data providers or reviewers, the CPDSO and CBMS teams as data analysts, IT administrators, and the general public (for viewing non-sensitive data)." />
        <QABlock num={3} q="Is a user account required to access GRIDS?" a="Public users may access aggregated and anonymized information without an account. User accounts are required for internal roles, specifically: Admin, Data Provider, Data Reviewer, and Data Analyst, in order to submit, review, analyze, or manage data." />
        <QABlock num={4} q="How do users log in to GRIDS?" a={<div className="space-y-1"><p>1. Navigate to the GRIDS website;</p><p>2. Click the Login button;</p><p>3. Enter their assigned username and password; and</p><p>4. Proceed to the GRIDS Dashboard after successful authentication.</p></div>} />
        <QABlock num={5} q="What should a user do if they forget their password?" a="Users may utilize the Forgot Password feature, where available, or coordinate with the system administrator/IT support for password reset, subject to identity verification." />
        <QABlock num={6} q="How can users search for data within GRIDS?" a="Users may use the built-in Search function to query datasets, indicators, or reports by keyword and, where applicable, filter results by category, office, year, or other available criteria." />
        <QABlock num={7} q="Are users allowed to download data from GRIDS?" a="Yes. Public and internal users may download aggregated, non-identifiable data, subject to their role permissions. Access to detailed or raw datasets is restricted to authorized personnel only." />
        <QABlock num={8} q="How do Data Providers submit GAD-related data?" a={<div className="space-y-1"><p>1. Log in to GRIDS;</p><p>2. Navigate to the Data Submission section;</p><p>3. Upload data using approved templates and file formats;</p><p>4. Provide the required metadata (e.g., title, period covered, office); and</p><p>5. Click Submit to send the data for review.</p></div>} />
        <QABlock num={9} q="How is submitted data reviewed and validated?" a="Data Reviewers (GFPS focal persons and Department Heads) access the Review Submissions module, examine the submitted data, and either approve or deny the submission. They may also provide comments or justifications, especially when returning data for correction." />
        <QABlock num={10} q="How can a Data Provider monitor the status of their submissions?" a="Data Providers can view the status of their submissions (e.g., Pending, Under Review, Approved, Denied) in the My Submissions section of GRIDS. The system may also send automated notifications for status changes." />
        <QABlock num={11} q="How is data privacy ensured within GRIDS?" a="GRIDS enforces role-based access control, anonymization of sensitive data, secure authentication, and detailed audit trails. Only aggregated, non-identifiable information is exposed to the public, consistent with the Data Privacy Act of 2012, its IRR, and relevant city policies." />
        <QABlock num={12} q="Where is GRIDS hosted and how is data stored?" a="GRIDS is hosted on the official servers of the City Government of Baguio, with data stored in secure network storage solutions in coordination with the Management Information and Technology Division (MITD)." />
        <QABlock num={13} q="How should issues or technical problems be reported?" a="Users may report issues through the Feedback/Report Issue feature on the GRIDS website or by directly contacting the designated GRIDS system administrator or IT support team." />
      </div>
    </div>
  );

  const renderCitizensHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl space-y-12">
      <div className="mb-10">
        <h2 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>for General Citizens</h2>
        <p className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Frequently Asked Questions (FAQ) on GRIDS Usage</p>
      </div>

      <div className="space-y-10">
        <QABlock num={1} q="What exactly is GRIDS?" a="GRIDS is a city database that collects and organizes information about women, men, girls, and boys in Baguio. It helps the city see where there are gaps or inequalities so that programs and budgets can better respond to everyone's needs." />
        <QABlock num={2} q="Why does the city need a system like this?" a="Before GRIDS, information was scattered in different files, folders, and offices. It was hard to get a full picture. GRIDS brings these data together in one place, so decisions are based on facts, not guesses." />
        <QABlock num={3} q="Can I access GRIDS as an ordinary citizen?" a="Yes. The public can view summaries, charts, and reports that do not show any personal information. Only overall numbers and trends are shown." />
        <QABlock num={4} q="Does GRIDS show names or personal data?" a="No. GRIDS does not display names or identifying details. Data is anonymized and shown in totals or percentages. This is to protect people's privacy." />
        <QABlock num={5} q="What kinds of information can I see?" a={<ul className="list-disc pl-5 space-y-1"><li>How many women and men use certain services</li><li>Gender gaps in employment, health, education, safety, etc.</li><li>Program statistics and reports related to Gender and Development (GAD)</li></ul>} />
        <QABlock num={6} q="How do I find information in GRIDS?" a="You can use the Search bar and type a topic (like 'education' or 'violence') and then open the results. Some pages also show ready-made charts and dashboards." />
        <QABlock num={7} q="Can I download the data?" a="Yes. You may download public reports and aggregated datasets that are safe to share." />
        <QABlock num={8} q="How does GRIDS help improve life in Baguio?" a="GRIDS helps city officials clearly see where issues exist—for example, if women feel less safe in public transport, or if certain groups are left out of services. This helps them design better policies, budgets, and programs." />
        <QABlock num={9} q="Is GRIDS required by law?" a="Yes. GRIDS supports requirements under the Magna Carta of Women and follows the Data Privacy Act of 2012 to protect people's rights and privacy." />
        <QABlock num={10} q="Who manages GRIDS?" a="GRIDS is managed by the City Government of Baguio through the City Planning and Development Office (CPDSO) and its Data Division Unit." />
      </div>
    </div>
  );

  const CategoryBanner = ({ title, type, img, icon: Icon }: { title: string, type: HelpCategory, img: string, icon: any }) => (
    <button 
      onClick={() => setSelectedCategory(type)}
      className="group relative w-full h-48 rounded-[48px] overflow-hidden shadow-xl border border-white hover:scale-[1.02] transition-all duration-500"
    >
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-purple-900/60 transition-colors duration-500"></div>
      <div className="absolute inset-0 flex items-center justify-between px-12">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
          <Icon size={32} />
        </div>
        <h3 className="text-white text-3xl font-black uppercase tracking-tighter drop-shadow-lg text-right max-w-xs">
          {title}
        </h3>
      </div>
    </button>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-12 animate-in fade-in duration-700 relative min-h-screen">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className={`text-4xl font-black mb-2 uppercase tracking-tight ${textClass}`}>Help Center</h1>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
        </div>
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-3 border px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 ${isDarkMode ? 'bg-[#2A2438] border-white/10 text-white hover:bg-white hover:text-black' : 'bg-white border-gray-100 text-gray-900 hover:bg-black hover:text-white'}`}
          >
            <ArrowLeft size={16} strokeWidth={3} />
            Back to Categories
          </button>
        )}
      </div>

      <div className={`rounded-[64px] p-10 md:p-20 shadow-2xl transition-colors duration-500 border ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'} mb-20`}>
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <CategoryBanner title="GRIDS Website UI" type="ui" icon={Layout} img="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600" />
            <CategoryBanner title="Officials & Staff" type="staff" icon={Users} img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600" />
            <CategoryBanner title="Policy & Manuals" type="policy" icon={BookOpen} img="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600" />
            <CategoryBanner title="General Citizens" type="citizens" icon={UserCircle} img="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600" />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {selectedCategory === 'ui' && renderUIHelp()}
            {selectedCategory === 'staff' && renderStaffHelp()}
            {selectedCategory === 'policy' && renderPolicyHelp()}
            {selectedCategory === 'citizens' && renderCitizensHelp()}
          </div>
        )}

        <footer className={`mt-24 w-full flex flex-col items-center pt-10 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed opacity-20 ${textClass}`}>
            Copyright © City Government of Baguio<br />CPDSO – CBMS Division<br />Developed by: Charles S. Chantioco
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Help;
