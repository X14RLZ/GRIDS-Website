
import React from 'react';
import { 
  Award, Database, ClipboardList, Layers, 
  Gavel, ClipboardCheck, FileText, ExternalLink,
  ChevronRight, BookOpen, Target, Calendar,
  ArrowRight, Building2, Globe, Shield, Landmark
} from 'lucide-react';
import { CPDSOLogo } from '../components/Logo';
import PageLayout from '../components/PageLayout';

const EnablingMechanisms: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';

  const SectionDivider = () => (
    <div className={`w-full max-w-lg mx-auto h-[3px] my-12 rounded-full transition-colors
      ${isDarkMode ? 'bg-white/10' : 'bg-gray-900/5'}`}></div>
  );

  const MechanismCard = ({ title, desc, stats }: { title: string, desc: string, stats: string, key?: React.Key }) => (
    <div className={`p-8 rounded-[32px] border transition-all hover:shadow-xl group
      ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-purple-900/50' : 'bg-[#FBF6FF] border-purple-50 hover:border-purple-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className={`text-xl font-black uppercase tracking-tight leading-tight group-hover:text-purple-600 transition-colors ${headingClass}`}>
          {title}
        </h4>
        <ExternalLink size={18} className="text-gray-300 group-hover:text-purple-600" />
      </div>
      <p className={`text-sm font-medium leading-relaxed mb-6 ${textClass}`}>{desc}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
        <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">{stats}</span>
        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-purple-600 transition-colors">
          <ArrowRight size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );

  const sections = [
    {
      id: 'siged',
      title: 'SIGED GAD Awards',
      fullName: 'The Sustaining Initiatives on Gender Equality and Development (SIGED) GAD Awards',
      icon: Award,
      color: 'text-amber-500',
      desc: 'Recognition program for outstanding GAD initiatives and practices among city departments and stakeholders.',
      items: [
        { title: 'The Sustaining Initiatives on Gender Equality and Development (SIGED) GAD Awards', stats: 'Excellence Recognition', desc: 'The city\'s premier recognition for GAD excellence.' }
      ]
    },
    {
      id: 'database',
      title: 'The GAD Database',
      fullName: 'The GAD Database',
      icon: Database,
      color: 'text-blue-600',
      desc: 'Centralized repository of gender-disaggregated data and core indicators for evidence-based planning.',
      items: [
        { title: 'Resolution No. 8 Approval and Adoption of the Updated Philippine Core GAD Indicators', stats: 'Policy Adoption', desc: 'Official adoption of core GAD metrics.' },
        { title: 'Metadata of the Updated Core GAD Indicators', stats: 'Indicator Definitions', desc: 'Technical definitions for all monitored indicators.' },
        { title: 'Annex B: GAD Indicators (PCW-DILG-DBM-NEDA JMC 2013-01)', stats: 'National Compliance', desc: 'Compliance with national JMC standards.' }
      ]
    },
    {
      id: 'planning',
      title: 'GAD Planning & Budgeting',
      fullName: 'Local GAD Planning and Budgeting',
      icon: ClipboardList,
      color: 'text-purple-600',
      desc: 'Strategic framework for allocating resources and defining gender-responsive goals for the city.',
      items: [
        { title: 'Baguio City GAD Agenda (2025-2030)', stats: 'Strategic Roadmap', desc: 'Six-year strategic plan for gender development.' },
        { title: 'Annual GAD Plan and Budgets (2022-2025)', stats: 'Resource Allocation', desc: 'Yearly budgetary commitments for GAD.' },
        { title: 'Annual GAD Accomplishment Reports (2022-2024)', stats: 'Performance Tracking', desc: 'Evaluation of yearly GAD implementation.' },
        { title: 'Gender Analysis Tools (PCW Links)', stats: 'GMEF, GeRL, GFAsT, HGDG', desc: 'Standardized tools for gender mainstreaming.' }
      ]
    },
    {
      id: 'mainstreaming',
      title: 'Gender Mainstreaming',
      fullName: 'Mainstreaming Gender Perspectives in Local Development Plans',
      icon: Layers,
      color: 'text-emerald-600',
      desc: 'Integration of gender perspectives into the city\'s comprehensive development and land use plans.',
      items: [
        { title: 'Comprehensive Development Plan (CDP)', stats: 'CDP Integration', desc: 'Gender-responsive local development planning.' }
      ]
    },
    {
      id: 'gad-code',
      title: 'The GAD Code',
      fullName: 'Enhancement and Implementation of the GAD Code',
      icon: Gavel,
      color: 'text-red-600',
      desc: 'The legislative backbone of gender equality in Baguio City, ensuring legal protection and mandates.',
      items: [
        { title: '2020 Amended GAD Code', stats: 'Current Legislation', desc: 'The city\'s primary gender-related ordinance.' },
        { title: 'Draft Proposed Amendments of Baguio City GAD Code', stats: 'Proposed Revisions', desc: 'Ongoing legislative enhancements.' }
      ]
    },
    {
      id: 'monitoring',
      title: 'MCW Monitoring',
      fullName: 'Monitoring and Evaluating the Implementation of the Magna Carta of Women (MCW)',
      icon: ClipboardCheck,
      color: 'text-indigo-600',
      desc: 'Systems and teams dedicated to tracking the city\'s compliance with national gender mandates.',
      items: [
        { title: 'The Baguio City GAD Monitoring and Evaluation Team', stats: 'Oversight Committee', desc: 'Dedicated team for GAD oversight.' },
        { title: 'Commission on Audit MC 2021-008', stats: 'Financial Compliance', desc: 'Financial monitoring of GAD funds.' },
        { title: 'The GAD Responsibility Codes of Baguio City', stats: 'Budget Tracking', desc: 'Systematic tracking of GAD expenditures.' }
      ]
    }
  ];

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title="Enabling Mechanisms"
      subtitle="GAD Institutional Framework Registry"
      description="The foundational structures, policies, and tools that enable effective gender mainstreaming and responsive governance in Baguio City."
    >
      <div className={`rounded-[48px] p-8 md:p-16 lg:p-20 shadow-2xl border mb-20 transition-colors duration-500
        ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'}`}>
        
        {sections.map((section, sIdx) => (
          <React.Fragment key={section.id}>
            <section id={section.id}>
              <div className="flex items-center gap-4 mb-10">
                <section.icon className={section.color} size={32} />
                <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${headingClass}`}>{section.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items.map((item, iIdx) => (
                  <MechanismCard 
                    key={iIdx}
                    title={item.title}
                    desc={item.desc}
                    stats={item.stats}
                  />
                ))}
              </div>
            </section>
            {sIdx < sections.length - 1 && <SectionDivider />}
          </React.Fragment>
        ))}
      </div>
    </PageLayout>
  );
};

export default EnablingMechanisms;
