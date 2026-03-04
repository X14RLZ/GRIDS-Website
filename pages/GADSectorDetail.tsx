
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';

const GADSectorDetail: React.FC = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const isFromSearch = localStorage.getItem('grids_is_searching') === 'true';

  const indicators = [
    {
      id: 1,
      slug: "basic-literacy-rate",
      title: "Basic and Functional Literacy Rate, By Sex",
      details: [
        "Basic/Simple Literacy - Percentage of the population 10 years old and over, who can read, write and understand simple messages in any language and dialect.",
        "Functional Literacy - Percentage of population aged 10 years and over, who can read, write and compute and/or comprehend."
      ],
      expanded: true
    },
    { id: 2, slug: "completion-rate", title: "Elementary and Highschool/Secondary Completion Rate, by Sex" },
    { id: 3, slug: "dropout-rate", title: "Elementary and Secondary Dropout Rate, by Sex" },
    { id: 4, slug: "enrolment-rate", title: "Net Enrolment Rate for Primary and Secondary Education, by Sex" },
    { id: 5, slug: "steam-discipline", title: "Enrolment in Tertiary Education and in Science, Technology, Engineering, Arts and Mathematics (STEAM) Discipline, by Sex." },
    { id: 6, slug: "graduates-cluster", title: "Percent Distribution of College Graduates, by Cluster Program and Sex" },
    { id: 7, slug: "tvet-graduates", title: "Number of Technical and Vocational Education and Training (TVET) Graduates, by Sex and Cluster Program" },
    { id: 8, slug: "mean-years-schooling", title: "Mean Years of Schooling, by Sex" }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto p-4 animate-in fade-in duration-500 relative">
      <div className="mb-12 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">GAD Data and Analysis</h1>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white rounded-[48px] p-8 lg:p-16 shadow-2xl shadow-purple-950/5 border border-purple-50">
        
        {/* Sector Hero Banner */}
        <div className="relative h-64 lg:h-80 rounded-[40px] overflow-hidden mb-16 shadow-xl group">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200" 
            alt="Education Background" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] linear"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[24px] border border-white/20 flex items-center justify-center">
                <GraduationCap size={48} className="text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-white text-5xl lg:text-7xl font-black uppercase tracking-tighter">
                Education and Training
              </h2>
            </div>
          </div>
        </div>

        {/* Indicators List */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {indicators.map((indicator) => (
            <div key={indicator.id} className="group">
              <div className="flex items-start gap-4">
                <h3 className="text-2xl font-bold text-gray-800 hover:text-purple-600 cursor-pointer transition-colors border-b-2 border-transparent hover:border-purple-200 pb-1">
                  {indicator.id}. {indicator.title}
                </h3>
              </div>
              
              {indicator.expanded && (
                <div className="mt-8 ml-8 flex flex-col lg:flex-row items-start justify-between gap-8 animate-in slide-in-from-top-4 duration-500">
                  <ul className="space-y-6 flex-1">
                    {indicator.details?.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 flex-shrink-0"></div>
                        <p className="text-xl font-medium text-gray-700 leading-relaxed underline decoration-gray-200 underline-offset-4 decoration-1">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => navigate(`/analysis/${indicator.slug}`)}
                    className="px-10 py-3 border-2 border-gray-900 rounded-full font-black text-lg text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-md active:scale-95"
                  >
                    View
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-32 w-full flex flex-col items-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] text-center leading-loose">
            Copyright © City Government of Baguio<br />
            City Planning, Development, and Sustainability Office<br />
            Developed by: Charles S. Chantioco
          </p>
        </footer>
      </div>

      {/* Floating Dynamic Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed bottom-10 right-10 flex items-center gap-4 px-8 py-5 bg-black text-white rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all z-50 group border border-white/10"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform duration-300" />
        <span className="hidden md:inline font-black text-xs uppercase tracking-[0.2em]">
          {isFromSearch ? "Search Results" : "Previous Page"}
        </span>
      </button>
    </div>
  );
};

export default GADSectorDetail;
