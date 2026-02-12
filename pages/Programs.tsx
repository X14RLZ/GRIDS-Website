
import React from 'react';
import { Target, Search, Filter, ArrowRight, ExternalLink, Building2, UserCircle2, HeartPulse, Accessibility, Briefcase } from 'lucide-react';

const Programs: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const offices = [
    {
      id: 'cswdo',
      name: 'City Social Welfare and Development Office (CSWDO)',
      icon: UserCircle2,
      color: 'bg-blue-600',
      desc: 'Lead office for social welfare services, child protection, and family development programs.',
      programs: [
        { title: 'VAW Support Services', stats: '24/7 Hotline Support' },
        { title: 'Women’s Livelihood Training', stats: '15 Active Workshops' },
        { title: 'Child Protection Initiatives', stats: '128 Brgy Coverage' }
      ]
    },
    {
      id: 'hso',
      name: 'Health Services Office (HSO)',
      icon: HeartPulse,
      color: 'bg-red-500',
      desc: 'Responsible for public health implementation, maternal care, and community health monitoring.',
      programs: [
        { title: 'Maternal & Child Health', stats: '95% Immunization Rate' },
        { title: 'Adolescent Reproductive Health', stats: 'School-based Seminars' },
        { title: 'Nutrition Program', stats: 'Stunting Mitigation' }
      ]
    },
    {
      id: 'pdao',
      name: 'Persons With Disability Affairs Office (PDAO)',
      icon: Accessibility,
      color: 'bg-green-600',
      desc: 'Dedicated office for the empowerment and inclusion of PWDs in city development.',
      programs: [
        { title: 'PWD Employment Advocacy', stats: '50+ Partner Establishments' },
        { title: 'Accessibility Audits', stats: 'Public Infrastructure Review' },
        { title: 'Assistive Device Distribution', stats: 'Yearly Allocation' }
      ]
    },
    {
      id: 'peso',
      name: 'Public Employment and Services Office (PESO)',
      icon: Briefcase,
      color: 'bg-orange-500',
      desc: 'Linking Baguio citizens to local and international employment opportunities.',
      programs: [
        { title: 'Baguio Jobs Fair', stats: 'Quarterly Events' },
        { title: 'Special Program for Employment of Students', stats: 'Summer/Christmas Slots' },
        { title: 'Skills Mapping Registry', stats: 'Digital Database' }
      ]
    }
  ];

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="p-4 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      <header className="mb-16">
        <h1 className={`text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 ${textClass}`}>Programs & Services</h1>
        <p className={`text-sm md:text-lg font-medium max-w-3xl leading-relaxed ${subTextClass}`}>
          A comprehensive directory of GAD programs, projects, and services categorized by their primary implementing city offices.
        </p>
      </header>

      <div className="space-y-16 mb-32">
        {offices.map((office) => (
          <div key={office.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6 mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${office.color}`}>
                <office.icon size={32} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${textClass}`}>{office.name}</h2>
                <div className={`h-1 w-24 rounded-full mt-1 ${office.color}`}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>{office.desc}</p>
                <button className={`mt-8 px-8 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all flex items-center gap-3`}>
                  Visit Office Hub <ExternalLink size={14} />
                </button>
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {office.programs.map((prog, idx) => (
                  <div key={idx} className={`p-8 rounded-[36px] border flex flex-col justify-between group hover:shadow-xl transition-all
                    ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-purple-50'}`}>
                    <div>
                      <span className="text-[9px] font-black uppercase text-purple-600 tracking-widest block mb-4">Program Detail</span>
                      <h4 className={`text-xl font-black uppercase leading-tight group-hover:text-purple-600 transition-colors ${textClass}`}>{prog.title}</h4>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{prog.stats}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                        <ArrowRight size={16} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className={`p-8 rounded-[36px] border border-dashed flex flex-col items-center justify-center text-center opacity-40
                  ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <Building2 size={32} className="mb-4 text-gray-300" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 leading-tight">And other departmental initiatives</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-auto py-10 flex flex-col items-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center leading-loose">
          Copyright © City Government of Baguio<br />
          City Planning Development Service Office – CBMS Division
        </p>
      </footer>
    </div>
  );
};

export default Programs;
