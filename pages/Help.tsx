import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

type HelpCategory = 'ui' | 'policy' | 'citizens' | 'staff' | null;

const Help: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory>(null);

  const SectionDivider = () => (
    <div className="w-full h-[3px] bg-black my-8 rounded-full opacity-100"></div>
  );

  const CategoryBanner = ({ title, type, img }: { title: string, type: HelpCategory, img: string }) => (
    <button 
      onClick={() => setSelectedCategory(type)}
      className="group relative w-full h-40 lg:h-48 rounded-[40px] overflow-hidden shadow-xl border border-white hover:scale-[1.02] transition-all duration-500"
    >
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-purple-900/60 transition-colors duration-500"></div>
      <div className="absolute inset-0 flex items-center justify-end px-12">
        <h3 className="text-white text-3xl font-black uppercase tracking-tighter drop-shadow-lg text-right">
          {title}
        </h3>
      </div>
    </button>
  );

  const FAQSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-12">
      <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">{title}</h2>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );

  // Added optional education prop to fix type errors where this prop is being passed to QABlock
  const QABlock = ({ q, a, num, education }: { q: string, a: React.ReactNode, num?: string | number, education?: boolean }) => (
    <div className="space-y-2">
      <h4 className="text-lg font-black text-gray-900 leading-tight">
        {num ? `Q${num}. ` : ''}{q}
        {education && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-600 uppercase tracking-widest">Education</span>}
      </h4>
      <div className="text-sm text-gray-600 font-medium leading-relaxed pl-4">
        {a}
      </div>
    </div>
  );

  const renderUIHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">for the GRIDS website UI</h2>
        <p className="text-sm font-bold text-gray-400 mt-1">Stuck on something? We're here to help with all your questions and answers in one place.</p>
      </div>

      <FAQSection title="General">
        <QABlock num={1} q="What is GRIDS?" a="GRIDS (Gender-Responsive Integrated Database System) is Baguio City's centralized database for Gender and Development (GAD) data. It supports evidence-based, gender-responsive planning and policy-making." />
        <QABlock num={2} q="Who can use GRIDS?" a={
          <ul className="list-disc space-y-1">
            <li>Public officials and government staff</li>
            <li>Members of the Gender Focal Point System (GFPS)</li>
            <li>The general public (for viewing public data)</li>
          </ul>
        } />
      </FAQSection>
      <SectionDivider />

      <FAQSection title="Access & Accounts">
        <QABlock num={3} q="Do I need an account to use GRIDS?" a={
          <ul className="list-disc space-y-1">
            <li>No account needed to view public statistics and reports.</li>
            <li>Accounts are required for data providers, reviewers, analysts, and admins.</li>
          </ul>
        } />
        <QABlock num={4} q="How do I log in?" a="Go to the GRIDS website, click Login, and enter your username and password." />
        <QABlock num={5} q="What if I forget my password?" a="Use the Forgot Password option or contact the GRIDS administrator for assistance." />
      </FAQSection>
      <SectionDivider />

      <FAQSection title="Searching & Viewing Data">
        <QABlock num={6} q="How do I search for data?" a="Use the Search bar, type a keyword (e.g., 'education', 'transport', 'employment'), and open a result to view details." />
        <QABlock num={7} q="Can I download the data?" a="Yes. Public users can download anonymized and aggregated datasets and reports." />
      </FAQSection>
      <SectionDivider />

      <FAQSection title="Data Submission (for Offices / GFPS)">
        <QABlock num={8} q="Who can submit data to GRIDS?" a="Authorized Data Providers from city departments, offices, and GFPS units." />
        <QABlock num={9} q="How do I submit data?" a={
          <ol className="list-[lower-alpha] space-y-1 pl-4">
            <li>Log in</li>
            <li>Go to Data Submission</li>
            <li>Upload your file using the official template</li>
            <li>Add details (title, description)</li>
            <li>Click Submit</li>
          </ol>
        } />
        <QABlock num={10} q="How do I know the status of my submission?" a="Go to My Submissions to see if it is Pending, Under Review, Approved, or Denied." />
      </FAQSection>
      <SectionDivider />

      <FAQSection title="Review & Approval (for Reviewers)">
        <QABlock num={11} q="How do I review submitted data?" a={
          <ol className="list-[lower-alpha] space-y-1 pl-4">
            <li>Log in</li>
            <li>Go to Review Submissions</li>
            <li>Open an entry</li>
            <li>Approve or deny, and add comments if needed</li>
          </ol>
        } />
        <QABlock num={12} q="Will the provider see my remarks?" a="Yes. GRIDS notifies the provider and shows your comments." />
      </FAQSection>
      <SectionDivider />

      <FAQSection title="Privacy & Security">
        <QABlock num={13} q="Is personal information shown in GRIDS?" a="No. GRIDS publishes aggregated, anonymized data only, in line with the Data Privacy Act of 2012." />
        <QABlock num={14} q="Who can see detailed or raw data?" a="Only authorized users such as GFPS, Department Heads, CPDSO/CBMS, and system admins." />
      </FAQSection>
      <SectionDivider />

      <FAQSection title="Help & Support">
        <QABlock num={15} q="How do I report an issue with the system?" a="Use the Feedback / Report Issue link on the GRIDS website or contact the designated GRIDS coordinator." />
      </FAQSection>
    </div>
  );

  const renderPolicyHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">for Policy Docs, Manuals, Attachments</h2>
        <p className="text-sm font-bold text-gray-400 mt-1 italic">Frequently Asked Questions (FAQ) on GRIDS Usage</p>
      </div>

      <div className="space-y-12">
        {[
          { q: "What is the Gender-Responsive Integrated Database System (GRIDS)?", a: "The Gender-Responsive Integrated Database System (GRIDS) is a centralized GAD database of the City Government of Baguio. It consolidates gender-related data from various offices to support gender-responsive planning, policy-making, monitoring, and reporting, in line with the Magna Carta of Women and the Data Privacy Act of 2012." },
          { q: "Who are the primary users of GRIDS?", a: "Primary users include policymakers, members of the Gender Focal Point System (GFPS) & department and office personnel acting as data providers or reviewers, the CPDSO and CBMS teams as data analysts, IT administrators, and the general public (for viewing non-sensitive data)." },
          { q: "Is a user account required to access GRIDS?", a: "Public users may access aggregated and anonymized information without an account. User accounts are required for internal roles, specifically: Admin, Data Provider, Data Reviewer, and Data Analyst, in order to submit, review, analyze, or manage data." },
          { q: "How do users log in to GRIDS?", a: "Authorized users shall: 1. Navigate to the GRIDS website; 2. Click the Login button; 3. Enter their assigned username and password; and 4. Proceed to the GRIDS Dashboard after successful authentication." },
          { q: "What should a user do if they forget their password?", a: "Users may utilize the Forgot Password feature, where available, or coordinate with the system administrator/IT support for password reset, subject to identity verification." },
          { q: "How can users search for data within GRIDS?", a: "Users may use the built-in Search function to query datasets, indicators, or reports by keyword and, where applicable, filter results by category, office, year, or other available criteria." },
          { q: "Are users allowed to download data from GRIDS?", a: "Yes. Public and internal users may download aggregated, non-identifiable data, subject to their role permissions. Access to detailed or raw datasets is restricted to authorized personnel only." },
          { q: "How do Data Providers submit GAD-related data?", a: "Data Providers shall: 1. Log in to GRIDS; 2. Navigate to the Data Submission section; 3. Upload data using approved templates and file formats; 4. Provide the required metadata (e.g., title, period covered, office); and 5. Click Submit to send the data for review." },
          { q: "How is submitted data reviewed and validated?", a: "Data Reviewers (GFPS focal persons and Department Heads) access the Review Submissions module, examine the submitted data, and either approve or deny the submission. They may also provide comments or justifications, especially when returning data for correction." },
          { q: "How can a Data Provider monitor the status of their submissions?", a: "Data Providers can view the status of their submissions (e.g., Pending, Under Review, Approved, Denied) in the My Submissions section of GRIDS. The system may also send automated notifications for status changes." },
          { q: "How is data privacy ensured within GRIDS?", a: "GRIDS enforces role-based access control, anonymization of sensitive data, secure authentication, and detailed audit trails. Only aggregated, non-identifiable information is exposed to the public, consistent with the Data Privacy Act of 2012, its IRR, and relevant city policies." },
          { q: "Where is GRIDS hosted and how is data stored?", a: "GRIDS is hosted on the official servers of the City Government of Baguio, with data stored in secure network storage solutions in coordination with the Management Information and Technology Division (MITD)." },
          { q: "How should issues or technical problems be reported?", a: "Users may report issues through the Feedback/Report Issue feature on the GRIDS website or by directly contacting the designated GRIDS system administrator or IT support team." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-3">
             <h4 className="text-2xl font-black text-gray-900 leading-tight">{idx + 1}. {item.q}</h4>
             <p className="text-base text-gray-600 font-medium leading-relaxed border-l-4 border-purple-100 pl-6">{item.a}</p>
             <SectionDivider />
          </div>
        ))}
      </div>
    </div>
  );

  const renderCitizensHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">for General Citizens</h2>
        <p className="text-sm font-bold text-gray-400 mt-1 italic">Frequently Asked Questions (FAQ) on GRIDS Usage</p>
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
          <div className="space-y-2">
            <p>You may see information like:</p>
            <ul className="list-disc pl-5">
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

  const renderStaffHelp = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">for Officials, GFPS, Staff</h2>
        <p className="text-sm font-bold text-gray-400 mt-1 italic">Stuck on something? We're here to help with all your questions and answers in one place.</p>
      </div>

      <FAQSection title="A. For Data Providers (Offices / GFPS)">
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
        <QABlock num={3} q="How do I check my submissions?" a="Check the remarks from the reviewer, correct the data, and resubmit through the same module." />
        <QABlock num={4} q="How often should I submit data?" a="At a minimum, yearly, or as required in the guidelines for your office or indicator." />
      </FAQSection>
      <SectionDivider />

      <FAQSection title="B. For Data Reviewers (GFPS Focals / Department Heads)">
        <QABlock num={1} q="What is my role as a Data Reviewer?" a="You validate and approve or deny submitted data from offices under your scope, ensuring accuracy, completeness, and alignment with GAD standards." />
        <QABlock num={2} q="How do I log in?" a="Go to the GRIDS website, click Login, and enter your username and password." />
        <QABlock num={3} q="What if I forget my password?" a="Use the Forgot Password option or contact the GRIDS administrator for assistance." />
      </FAQSection>
      <SectionDivider />

      <div className="mt-10 opacity-60">
        <p className="text-xs font-bold text-gray-400">NOTE: Other sections (Searching, Submission Status, Privacy) follow the same protocols as the General UI Guide.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-8 animate-in fade-in duration-700 relative min-h-screen">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">Help</h1>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
        </div>
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-3 bg-white border border-gray-100 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md active:scale-95"
          >
            <ArrowLeft size={16} strokeWidth={3} />
            Back to categories
          </button>
        )}
      </div>

      <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-2xl shadow-purple-900/5 border border-purple-50 mb-20">
        {!selectedCategory ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-16 text-center">
              <h2 className="text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Frequently asked questions</h2>
              <p className="text-lg font-bold text-gray-400 uppercase tracking-widest opacity-60">Stuck on something? We're here to help with all your questions and answers in one place.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
              <CategoryBanner 
                title="for the GRIDS website UI" 
                type="ui" 
                img="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop" 
              />
              <CategoryBanner 
                title="for Policy Docs, Manuals, Attachments" 
                type="policy" 
                img="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" 
              />
              <CategoryBanner 
                title="for general citizens" 
                type="citizens" 
                img="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
              />
              <CategoryBanner 
                title="for Officials, GFPS, Staff" 
                type="staff" 
                img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
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

        <footer className="mt-24 w-full flex flex-col items-center pt-10 border-t border-gray-50">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed text-gray-900 opacity-20">
            Copyright © City Government of Baguio<br />
            City Planning Development Service Office – CBMS<br />
            Developed by: Charles S. Chantioco
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Help;
