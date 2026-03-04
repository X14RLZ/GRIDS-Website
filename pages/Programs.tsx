
import React from 'react';
import { 
  Target, Search, Filter, ArrowRight, ExternalLink, 
  Building2, UserCircle2, HeartPulse, Accessibility, 
  Briefcase, ChevronRight 
} from 'lucide-react';
import { CPDSOLogo } from '../components/Logo';
import PageLayout from '../components/PageLayout';

const Programs: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const offices = [
    {
      id: 'cswdo',
      name: 'City Social Welfare and Development Office (CSWDO)',
      icon: UserCircle2,
      color: 'text-blue-600',
      desc: 'Lead office for social welfare services, child protection, and family development programs.',
      programs: [
        { title: 'VAW Support Services', stats: '24/7 Hotline Support', desc: 'Comprehensive support for victims of violence.' },
        { title: 'Women’s Livelihood Training', stats: '15 Active Workshops', desc: 'Economic empowerment through skills development.' },
        { title: 'Child Protection Initiatives', stats: '128 Brgy Coverage', desc: 'Community-based protection for children.' }
      ]
    },
    {
      id: 'hso',
      name: 'Health Services Office (HSO)',
      icon: HeartPulse,
      color: 'text-red-500',
      desc: 'Responsible for public health implementation, maternal care, and community health monitoring.',
      programs: [
        { title: 'Maternal & Child Health', stats: '95% Immunization Rate', desc: 'Healthcare services for mothers and children.' },
        { title: 'Adolescent Reproductive Health', stats: 'School-based Seminars', desc: 'Education on reproductive health for youth.' },
        { title: 'Nutrition Program', stats: 'Stunting Mitigation', desc: 'Programs to improve community nutrition.' }
      ]
    },
    {
      id: 'pdao',
      name: 'Persons With Disability Affairs Office (PDAO)',
      icon: Accessibility,
      color: 'text-green-600',
      desc: 'Dedicated office for the empowerment and inclusion of PWDs in city development.',
      programs: [
        { title: 'PWD Employment Advocacy', stats: '50+ Partner Establishments', desc: 'Promoting inclusive employment for PWDs.' },
        { title: 'Accessibility Audits', stats: 'Public Infrastructure Review', desc: 'Ensuring city spaces are accessible to all.' },
        { title: 'Assistive Device Distribution', stats: 'Yearly Allocation', desc: 'Provision of mobility and assistive aids.' }
      ]
    },
    {
      id: 'peso',
      name: 'Public Employment and Services Office (PESO)',
      icon: Briefcase,
      color: 'text-orange-500',
      desc: 'Linking Baguio citizens to local and international employment opportunities.',
      programs: [
        { title: 'Baguio Jobs Fair', stats: 'Quarterly Events', desc: 'Connecting jobseekers with employers.' },
        { title: 'Special Program for Employment of Students', stats: 'Summer/Christmas Slots', desc: 'Employment opportunities for students.' },
        { title: 'Skills Mapping Registry', stats: 'Digital Database', desc: 'Database of local workforce skills and profiles.' }
      ]
    }
  ];

  const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const headingClass = isDarkMode ? 'text-white' : 'text-gray-900';

  const SectionDivider = () => (
    <div className={`w-full max-w-lg mx-auto h-[3px] my-6 rounded-full transition-colors
      ${isDarkMode ? 'bg-white/10' : 'bg-gray-900/5'}`}></div>
  );

  const ProgramCard = ({ title, desc, stats }: { title: string, desc: string, stats: string, key?: React.Key }) => (
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

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title="Programs, Projects, Activities"
      subtitle="Citywide GAD Initiatives Registry"
      description="A comprehensive directory of GAD programs, projects, and services categorized by their primary implementing city offices."
    >
      <div className={`rounded-[48px] p-6 md:p-10 shadow-2xl border mb-8 transition-colors duration-500
        ${isDarkMode ? 'bg-[#1A1625] border-white/5 shadow-purple-950/20' : 'bg-white border-purple-50 shadow-purple-900/5'}`}>
        
        {offices.map((office, oIdx) => (
          <React.Fragment key={office.id}>
            <section id={office.id}>
              <div className="flex items-center gap-4 mb-6">
                <office.icon className={office.color} size={32} />
                <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${headingClass}`}>{office.name}</h2>
              </div>
              
              <div className="mb-10 max-w-3xl">
                <p className={`text-sm font-medium leading-relaxed ${textClass} mb-6`}>{office.desc}</p>
                <button className={`px-6 py-3 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all flex items-center gap-3`}>
                  Visit Office Hub <ExternalLink size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {office.programs.map((prog, pIdx) => (
                  <ProgramCard 
                    key={pIdx}
                    title={prog.title}
                    desc={prog.desc}
                    stats={prog.stats}
                  />
                ))}
                <div className={`p-8 rounded-[32px] border border-dashed flex flex-col items-center justify-center text-center opacity-40
                  ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <Building2 size={32} className="mb-4 text-gray-300" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 leading-tight">And other departmental initiatives</span>
                </div>
              </div>
            </section>
            {oIdx < offices.length - 1 && <SectionDivider />}
          </React.Fragment>
        ))}
      </div>
    </PageLayout>
  );
};

export default Programs;
