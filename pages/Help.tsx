
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Search, ShieldCheck, HelpCircle, FileText, UserCircle, Users, Layout, BookOpen, UserCheck, ShieldAlert, Monitor, ClipboardList, Info } from 'lucide-react';

type HelpCategory = 'ui' | 'policy' | 'citizens' | 'staff' | null;

const Help: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory>(null);
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';

  const SectionDivider = () => (
    <div className={`w-3/4 mx-auto h-[3px] my-12 rounded-full transition-colors ${isDarkMode ? 'bg-white/10' : 'bg-gray-900'}`}></div>
  );

  const QABlock = ({ q, a, num }: { q: string, a: React.ReactNode, num?: string | number }) => (
    <div className="space-y-4 text-left">
      <h4 className={`text-xl font-black leading-tight ${headingClass}`}>
        {num ? `Q${num}. ` : ''}{q}
      </h4>
      <div className={`text-base font-medium leading-relaxed pl-8 border-l-4 border-transparent text-gray-600 dark:text-gray-400`}>
        {a}
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <h3 className={`text-3xl font-black uppercase tracking-tight mb-8 mt-16 first:mt-0 ${headingClass}`}>{title}</h3>
  );

  const HelpCategoryCard = ({ id, title, img, icon: Icon }: { id: HelpCategory, title: string, img: string, icon: any }) => (
    <button 
      onClick={() => setSelectedCategory(id)}
      className="group relative w-full h-56 rounded-[48px] overflow-hidden shadow-2xl border-4 border-white transition-all hover:scale-[1.02] active:scale-95"
    >
      <img src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt={title} />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-purple-900/60 transition-colors"></div>
      <div className="absolute inset-0 flex items-center justify-between px-12">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
          <Icon size={32} />
        </div>
        <h3 className="text-white text-3xl font-black uppercase tracking-tighter text-right drop-shadow-xl max-w-[250px]">
          {title}
        </h3>
      </div>
    </button>
  );

  const renderUIHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-12 py-10">
      <div className="text-left mb-16">
        <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>for the GRIDS website UI</h2>
        <p className="text-sm md:text-base font-bold mt-2 text-gray-500">Stuck on something? We're here to help with all your questions and answers in one place.</p>
      </div>

      <div className="space-y-6">
        <SectionHeader title="General" />
        <QABlock num={1} q="What is GRIDS?" a="GRIDS (Gender-Responsive Integrated Database System) is Baguio City's centralized database for Gender and Development (GAD) data. It supports evidence-based, gender-responsive planning and policy-making." />
        <QABlock num={2} q="Who can use GRIDS?" a={
          <ul className="list-disc space-y-2">
            <li>Public officials and government staff</li>
            <li>Members of the Gender Focal Point System (GFPS)</li>
            <li>The general public (for viewing public data)</li>
          </ul>
        } />
        
        <SectionDivider />

        <SectionHeader title="Access & Accounts" />
        <QABlock num={3} q="Do I need an account to use GRIDS?" a={
          <ul className="list-disc space-y-2">
            <li>No account needed to view public statistics and reports.</li>
            <li>Accounts are required for data providers, reviewers, analysts, and admins.</li>
          </ul>
        } />
        <QABlock num={4} q="How do I log in?" a="Go to the GRIDS website, click Login, and enter your username and password." />
        <QABlock num={5} q="What if I forget my password?" a="Use the Forgot Password option or contact the GRIDS administrator for assistance." />

        <SectionDivider />

        <SectionHeader title="Searching & Viewing Data" />
        <QABlock num={6} q="How do I search for data?" a="Use the Search bar, type a keyword (e.g., 'education', 'transport', 'employment'), and open a result to view details." />
        <QABlock num={7} q="Can I download the data?" a="Yes. Public users can download anonymized and aggregated datasets and reports." />

        <SectionDivider />

        <SectionHeader title="Data Submission (for Offices / GFPS)" />
        <QABlock num={8} q="Who can submit data to GRIDS?" a="Authorized Data Providers from city departments, offices, and GFPS units." />
        <QABlock num={9} q="How do I submit data?" a={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Log in</li>
            <li>Go to Data Submission</li>
            <li>Upload your file using the official template</li>
            <li>Add details (title, description)</li>
            <li>Click Submit</li>
          </ol>
        } />
        <QABlock num={10} q="How do I know the status of my submission?" a="Go to My Submissions to see if it is Pending, Under Review, Approved, or Denied." />

        <SectionDivider />

        <SectionHeader title="Review & Approval (for Reviewers)" />
        <QABlock num={11} q="How do I review submitted data?" a={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Log in</li>
            <li>Go to Review Submissions</li>
            <li>Open an entry</li>
            <li>Approve or deny, and add comments if needed</li>
          </ol>
        } />
        <QABlock num={12} q="Will the provider see my remarks?" a="Yes. GRIDS notifies the provider and shows your comments." />

        <SectionDivider />

        <SectionHeader title="Privacy & Security" />
        <QABlock num={13} q="Is personal information shown in GRIDS?" a="No. GRIDS publishes aggregated, anonymized data only, in line with the Data Privacy Act of 2012." />
        <QABlock num={14} q="Who can see detailed or raw data?" a="Only authorized users such as GFPS, Department Heads, CPDSO/CBMS, and system admins." />

        <SectionDivider />

        <SectionHeader title="Help & Support" />
        <QABlock num={15} q="How do I report an issue with the system?" a="Use the Feedback / Report Issue link on the GRIDS website or contact the designated GRIDS coordinator." />
      </div>
    </div>
  );

  const renderStaffHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-12 py-10">
      <div className="text-left mb-16">
        <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>for Officials, GFPS, Staff</h2>
        <p className="text-sm md:text-base font-bold mt-2 text-gray-500">Stuck on something? We're here to help with all your questions and answers in one place.</p>
      </div>

      <div className="space-y-6">
        <SectionHeader title="A. For Data Providers (Offices / GFPS)" />
        <QABlock num={1} q="I am a Data Provider. What is my main task in GRIDS?" a="Your main task is to submit accurate GAD-related data from your office using the standard templates and timelines." />
        <QABlock num={2} q="How do I submit data?" a={
          <ul className="list-disc space-y-1">
            <li>Log in to GRIDS</li>
            <li>Go to Data Submission</li>
            <li>Upload your file using the official template</li>
            <li>Fill in required fields (title, period, office, etc.)</li>
            <li>Click Submit</li>
          </ul>
        } />
        <QABlock num={3} q="I am a Data Provider. What is my main task in GRIDS?" a="Check the remarks from the reviewer, correct the data, and resubmit through the same module." />
        <QABlock num={4} q="I am a Data Provider. What is my main task in GRIDS?" a="At a minimum, yearly, or as required in the guidelines for your office or indicator." />

        <SectionDivider />

        <SectionHeader title="B. For Data Reviewers (GFPS Focals / Department Heads)" />
        <QABlock num={1} q="What is my role as a Data Reviewer?" a="You validate and approve or deny submitted data from offices under your scope, ensuring accuracy, completeness, and alignment with GAD standards." />
        <QABlock num={4} q="How do I log in?" a="Go to the GRIDS website, click Login, and enter your username and password." />
        <QABlock num={5} q="What if I forget my password?" a="Use the Forgot Password option or contact the GRIDS administrator for assistance." />

        <SectionDivider />

        {/* Content for Q6-Q15 as shown in Image 3 matches UI categories */}
        <SectionHeader title="Searching & Viewing Data" />
        <QABlock num={6} q="How do I search for data?" a="Use the Search bar, type a keyword (e.g., 'education', 'transport', 'employment'), and open a result to view details." />
        <QABlock num={7} q="Can I download the data?" a="Yes. Public users can download anonymized and aggregated datasets and reports." />

        <SectionDivider />

        <SectionHeader title="Data Submission (for Offices / GFPS)" />
        <QABlock num={8} q="Who can submit data to GRIDS?" a="Authorized Data Providers from city departments, offices, and GFPS units." />
        <QABlock num={9} q="How do I submit data?" a="Log in, go to Data Submission, upload file via template, add details, and click Submit." />
        <QABlock num={10} q="How do I know the status of my submission?" a="Go to My Submissions to see if it is Pending, Under Review, Approved, or Denied." />

        <SectionDivider />

        <SectionHeader title="Review & Approval (for Reviewers)" />
        <QABlock num={11} q="How do I review submitted data?" a="Log in, go to Review Submissions, open an entry, and approve or deny with remarks." />
        <QABlock num={12} q="Will the provider see my remarks?" a="Yes. GRIDS notifies the provider and shows your comments." />

        <SectionDivider />

        <SectionHeader title="Privacy & Security" />
        <QABlock num={13} q="Is personal information shown in GRIDS?" a="No. GRIDS publishes aggregated, anonymized data only, in line with the Data Privacy Act of 2012." />
        <QABlock num={14} q="Who can see detailed or raw data?" a="Only authorized users such as GFPS, Department Heads, CPDSO/CBMS, and system admins." />

        <SectionDivider />

        <SectionHeader title="Help & Support" />
        <QABlock num={15} q="How do I report an issue with the system?" a="Use the Feedback / Report Issue link on the GRIDS website or contact the designated GRIDS coordinator." />
      </div>
    </div>
  );

  const renderPolicyHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-12 py-10">
      <div className="text-left mb-16">
        <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>for Policy Docs, Manuals, Attachments</h2>
        <p className="text-sm md:text-base font-bold mt-2 text-gray-400">Frequently Asked Questions (FAQ) on GRIDS Usage</p>
      </div>

      <div className="space-y-12">
        <QABlock num={1} q="What is the Gender-Responsive Integrated Database System (GRIDS)?" a="The Gender-Responsive Integrated Database System (GRIDS) is a centralized GAD database of the City Government of Baguio. It consolidates gender-related data from various offices to support gender-responsive planning, policy-making, monitoring, and reporting, in line with the Magna Carta of Women and the Data Privacy Act of 2012." />
        <SectionDivider />
        <QABlock num={2} q="Who are the primary users of GRIDS?" a="Primary users include policymakers, members of the Gender Focal Point System (GFPS), department and office personnel acting as data providers or reviewers, the CPDSO and CBMS teams as data analysts, IT administrators, and the general public (for viewing non-sensitive data)." />
        <SectionDivider />
        <QABlock num={3} q="Is a user account required to access GRIDS?" a="Public users may access aggregated and anonymized information without an account. User accounts are required for internal roles, specifically: Admin, Data Provider, Data Reviewer, and Data Analyst, in order to submit, review, analyze, or manage data." />
        <SectionDivider />
        <QABlock num={4} q="How do users log in to GRIDS?" a={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Navigate to the GRIDS website;</li>
            <li>Click the Login button;</li>
            <li>Enter their assigned username and password; and</li>
            <li>Proceed to the GRIDS Dashboard after successful authentication.</li>
          </ol>
        } />
        <SectionDivider />
        <QABlock num={5} q="What should a user do if they forget their password?" a="Users may utilize the Forgot Password feature, where available, or coordinate with the system administrator/IT support for password reset, subject to identity verification." />
        <SectionDivider />
        <QABlock num={6} q="How can users search for data within GRIDS?" a="Users may use the built-in Search function to query datasets, indicators, or reports by keyword and, where applicable, filter results by category, office, year, or other available criteria." />
        <SectionDivider />
        <QABlock num={7} q="Are users allowed to download data from GRIDS?" a="Yes. Public and internal users may download aggregated, non-identifiable data, subject to their role permissions. Access to detailed or raw datasets is restricted to authorized personnel only." />
        <SectionDivider />
        <QABlock num={8} q="How do Data Providers submit GAD-related data?" a={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Log in to GRIDS;</li>
            <li>Navigate to the Data Submission section;</li>
            <li>Upload data using approved templates and file formats;</li>
            <li>Provide the required metadata (e.g., title, period covered, office); and</li>
            <li>Click Submit to send the data for review.</li>
          </ol>
        } />
        <SectionDivider />
        <QABlock num={9} q="How is submitted data reviewed and validated?" a="Data Reviewers (GFPS focal persons and Department Heads) access the Review Submissions module, examine the submitted data, and either approve or deny the submission. They may also provide comments or justifications, especially when returning data for correction." />
        <SectionDivider />
        <QABlock num={10} q="How can a Data Provider monitor the status of their submissions?" a="Data Providers can view the status of their submissions (e.g., Pending, Under Review, Approved, Denied) in the My Submissions section of GRIDS. The system may also send automated notifications for status changes." />
        <SectionDivider />
        <QABlock num={11} q="How is data privacy ensured within GRIDS?" a="GRIDS enforces role-based access control, anonymization of sensitive data, secure authentication, and detailed audit trails. Only aggregated, non-identifiable information is exposed to the public, consistent with the Data Privacy Act of 2012, its IRR, and relevant city policies." />
        <SectionDivider />
        <QABlock num={12} q="Where is GRIDS hosted and how is data stored?" a="GRIDS is hosted on the official servers of the City Government of Baguio, with data stored in secure network storage solutions in coordination with the Management Information and Technology Division (MITD)." />
        <SectionDivider />
        <QABlock num={13} q="How should issues or technical problems be reported?" a="Users may report issues through the Feedback/Report Issue feature on the GRIDS website or by directly contacting the designated GRIDS system administrator or IT support team." />
      </div>
    </div>
  );

  const renderCitizensHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-12 py-10">
      <div className="text-left mb-16">
        <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${headingClass}`}>for General Citizens</h2>
        <p className="text-sm md:text-base font-bold mt-2 text-gray-400">Frequently Asked Questions (FAQ) on GRIDS Usage</p>
      </div>

      <div className="space-y-12">
        <QABlock num={1} q="What exactly is GRIDS?" a="GRIDS is a city database that collects and organizes information about women, men, girls, and boys in Baguio. It helps the city see where there are gaps or inequalities so that programs and budgets can better respond to everyone's needs." />
        <SectionDivider />
        <QABlock num={2} q="Why does the city need a system like this?" a="Before GRIDS, information was scattered in different files, folders, and offices. It was hard to get a full picture. GRIDS brings these data together in one place, so decisions are based on facts, not guesses." />
        <SectionDivider />
        <QABlock num={3} q="Can I access GRIDS as an ordinary citizen?" a="Yes. The public can view summaries, charts, and reports that do not show any personal information. Only overall numbers and trends are shown." />
        <SectionDivider />
        <QABlock num={4} q="Does GRIDS show names or personal data?" a="No. GRIDS does not display names or identifying details. Data is anonymized and shown in totals or percentages. This is to protect people's privacy." />
        <SectionDivider />
        <QABlock num={5} q="What kinds of information can I see?" a={
          <div>
            <p className="mb-2">You may see information like:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>How many women and men use certain services</li>
              <li>Gender gaps in employment, health, education, safety, etc.</li>
              <li>Program statistics and reports related to Gender and Development (GAD)</li>
            </ul>
          </div>
        } />
        <SectionDivider />
        <QABlock num={6} q="How do I find information in GRIDS?" a="You can use the Search bar and type a topic (like 'education' or 'violence') and then open the results. Some pages also show ready-made charts and dashboards." />
        <SectionDivider />
        <QABlock num={7} q="Can I download the data?" a="Yes. You may download public reports and aggregated datasets that are safe to share." />
        <SectionDivider />
        <QABlock num={8} q="How does GRIDS help improve life in Baguio?" a="GRIDS helps city officials clearly see where issues exist—for example, if women feel less safe in public transport, or if certain groups are left out of services. This helps them design better policies, budgets, and programs." />
        <SectionDivider />
        <QABlock num={9} q="Is GRIDS required by law?" a="Yes. GRIDS supports requirements under the Magna Carta of Women and follows the Data Privacy Act of 2012 to protect people's rights and privacy." />
        <SectionDivider />
        <QABlock num={10} q="Who manages GRIDS?" a="GRIDS is managed by the City Government of Baguio through the City Planning and Development Office (CPDSO) and its Data Division Unit." />
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-12 animate-in fade-in duration-700 relative min-h-screen">
      {/* Standardized Header */}
      <div className="mb-16 text-center lg:text-left">
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${headingClass}`}>Help - FAQs</h1>
        <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">Community Support Hub</p>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
      </div>

      <div className={`rounded-[64px] p-8 md:p-16 shadow-2xl transition-colors duration-500 border ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-[#FFFBF5] border-purple-50 shadow-purple-900/5'} mb-20`}>
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)} 
            className={`mb-16 flex items-center gap-3 border px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 ${isDarkMode ? 'bg-[#2A2438] border-white/10 text-white hover:bg-white hover:text-black' : 'bg-white border-gray-100 text-gray-900 hover:bg-black hover:text-white'}`}
          >
            <ArrowLeft size={18} strokeWidth={3} /> Back to FAQ categories
          </button>
        )}

        {!selectedCategory ? (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center mb-16">
              <h2 className={`text-6xl md:text-7xl font-black uppercase tracking-tighter ${headingClass}`}>Frequently asked questions</h2>
              <p className="text-lg md:text-xl font-bold mt-4 text-gray-500">Stuck on something? We're here to help with all your questions and answers in one place.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <HelpCategoryCard 
                id="ui" 
                title="for the GRIDS website UI" 
                img="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200" 
                icon={Layout} 
              />
              <HelpCategoryCard 
                id="policy" 
                title="for Policy Docs, Manuals, Attachments" 
                img="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200" 
                icon={FileText} 
              />
              <HelpCategoryCard 
                id="citizens" 
                title="for general citizens" 
                img="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200" 
                icon={Users} 
              />
              <HelpCategoryCard 
                id="staff" 
                title="for Officials, GFPS, Staff" 
                img="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200" 
                icon={UserCheck} 
              />
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {selectedCategory === 'ui' && renderUIHelp()}
            {selectedCategory === 'policy' && renderPolicyHelp()}
            {selectedCategory === 'citizens' && renderCitizensHelp()}
            {selectedCategory === 'staff' && renderStaffHelp()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
