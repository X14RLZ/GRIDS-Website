
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, TrendingUp, Heart, ShieldAlert, 
  UserCheck, Globe, Briefcase, ImageIcon, 
  Sun, UserPlus, HelpCircle, ChevronRight, Building2, BookOpen
} from 'lucide-react';

interface Indicator {
  id: string;
  slug: string;
  title: string;
  office: string;
  // Fix: Added office2 as an optional property to allow for multiple agencies responsible for an indicator.
  office2?: string;
  definition: string;
  details?: string[];
}

interface SectorData {
  title: string;
  icon: any;
  img: string;
  indicators: Indicator[];
}

const SECTOR_DATA: Record<string, SectorData> = {
  'education-and-training': {
    title: 'Education and Training',
    icon: GraduationCap,
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      {
        id: "1",
        slug: "literacy-rate",
        title: "Basic and Functional Literacy Rate, by Sex",
        office: "DEPED / PSA (FLEMMS)",
        definition: "The ability of a person to read, write, and compute with understanding basic or functional messages in any language.",
        details: [
          "Basic/Simple Literacy - Percentage of the population 10 years old and over, who can read, write and understand simple messages in any language or dialect.",
          "Functional Literacy - Significantly higher level including numeracy skills to participate fully in life situations."
        ]
      },
      { id: "2", slug: "completion-rate", title: "Elementary and Highschool/Secondary Completion Rate, by Sex", office: "DEPED", definition: "Percentage of first grade/year entrants who finish a level in accordance with the required number of years." },
      { id: "3", slug: "dropout-rate", title: "Elementary and Secondary Dropout Rate, by Sex", office: "DEPED", definition: "Percentage of students who leave school during the year or fail to enroll in the next grade/year level." },
      { id: "4", slug: "enrolment-rate", title: "Net Enrolment Rate for Primary and Secondary Education, by Sex", office: "DEPED", definition: "Ratio of enrolment for the official school-age group to the population of the same age group." },
      { id: "5", slug: "tertiary-enrolment", title: "Enrolment in Tertiary Education and in STEAM, by Sex", office: "DEPED", definition: "Total number of students registered in post-secondary cycles, including STEAM and higher education programs." },
      { id: "6", slug: "college-graduates", title: "Percent Distribution of College Graduates, by Cluster Program and Sex", office: "DEPED", definition: "Students or trainees who have completed the requirements for a particular degree or discipline group." },
      { id: "7", slug: "tvet-graduates", title: "Number of TVET Graduates, by Sex and Cluster Program", office: "DEPED", definition: "Graduates of education or training processes involving technologies and acquisition of practical skills." },
      { id: "8", slug: "mean-schooling", title: "Mean Years of Schooling, by Sex", office: "DEPED", definition: "Average number of completed years of education for a country's population aged 25 years and older." }
    ]
  },
  'economy': {
    title: 'Economy',
    icon: TrendingUp,
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "9", slug: "labor-participation", title: "Labor Force Participation Rate, by Sex and Age Group", office: "PSA", definition: "Proportion of the total labor force to the total household population aged 15 years old and over." },
      { id: "10", slug: "employment-rate", title: "Employment and Unemployment Rate, by Sex", office: "PSA", definition: "Proportion of employed persons (at work or with a job) to the total labor force." },
      { id: "11", slug: "women-employment-share", title: "Share of Women to Total Employment, by Major Occupation Group", office: "PSA", definition: "Major occupation groups comprising the 2012 PSOC, disaggregated by sex and class of worker." },
      { id: "12", slug: "underemployment", title: "Underemployment Rate, by Sex", office: "PSA", definition: "Percentage of employed persons who express the desire to have additional hours of work." },
      { id: "13", slug: "family-income", title: "Average Annual Family Income, Expenditure and Savings, by Sex", office: "PSA", definition: "Primary income and receipts from transfers, pensions, and other sources received by all family members." },
      { id: "14", slug: "unpaid-work", title: "Average Time Spent on Unpaid Domestic and Care Work, by Sex", office: "PSA", definition: "Proportion of time spent in a day on unpaid domestic services and caregiving for household members." }
    ]
  },
  'health': {
    title: 'Health',
    icon: Heart,
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "15", slug: "stunting", title: "Prevalence of Stunting Among Children Under 5, by Sex", office: "CHSO", definition: "Condition where a child's height is lower than that of a normal person of the same age." },
      { id: "16", slug: "overweight", title: "Prevalence of Overweight Among Children Under 5, by Sex", office: "CHSO", definition: "Condition where a child's weight is higher than normal for the same age/height." },
      { id: "17", slug: "wasting", title: "Prevalence of Wasting Among Children Under 5, by Sex", office: "CHSO", definition: "Condition where the child's weight is lower relative to his/her height or length." },
      { id: "18", slug: "life-expectancy", title: "Life Expectancy at Birth, by Sex", office: "CHSO", definition: "Number of years a newborn child can be expected to live under given mortality conditions." },
      { id: "19", slug: "contraceptive-rate", title: "Modern Contraceptive Prevalence Rate (%)", office: "CHSO", definition: "Percentage of women of reproductive age who use any modern contraceptive method." },
      { id: "20", slug: "unmet-need", title: "Unmet Need for Modern Family Planning, by Sex", office: "CHSO", definition: "Percentage of women who do not want more children but are not using family planning." },
      { id: "21", slug: "maternal-mortality", title: "Maternal Mortality Ratio", office: "CHSO", definition: "Ratio between maternal deaths and reported live births per 100,000 in a given year." },
      { id: "22", slug: "birth-attendance", title: "Proportion of Births Attended by Skilled Health Personnel", office: "CHSO", definition: "Number of deliveries attended by skilled health personnel as a percentage of all livebirths." },
      { id: "23", slug: "child-mortality", title: "Child Mortality Rate (Under-five Mortality Rate, by Sex)", office: "CHSO", definition: "Probability of dying between exact age one and age five per 1,000 survivors to age 12 months." },
      { id: "24", slug: "neonatal-mortality", title: "Neonatal Mortality Rate, by Sex", office: "CHSO", definition: "Number of deaths within the first month of life per 1,000 live births." },
      { id: "25", slug: "mortality-causes", title: "Mortality Rate, by Leading Causes, Sex and Age", office: "CHSO", definition: "Permanent disappearance of life evidence after live birth, categorized by primary causes like heart disease." },
      { id: "26", slug: "adolescent-birth", title: "Adolescent Birth Rate, by Background Characteristics", office: "CHSO", definition: "Number of births to women aged 15-19 per 1,000 women in that age group." },
      { id: "27", slug: "teenage-pregnancy", title: "Teenage Pregnancy Rate", office: "CHSO", definition: "Percentage of women aged 15-19 who have had a live birth or are pregnant with their first child." },
      { id: "28", slug: "hiv-new", title: "Number of Newly-Diagnosed HIV Cases, by Sex and Age", office: "CHSO", definition: "Number of individuals newly diagnosed with HIV infection per year as recorded by DOH." },
      { id: "29", slug: "hiv-total", title: "Number of Reported HIV-AIDS Cases (Annual and Cumulative)", office: "CHSO", definition: "Cumulative total number of HIV and AIDS cases in the Philippine registry." }
    ]
  },
  'poverty': {
    title: 'Poverty',
    icon: HelpCircle,
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "30", slug: "poverty-women", title: "Poverty Incidence Among Women and Children", office: "CBMS", definition: "Proportion of women/children belonging to families with per capita income less than the poverty threshold." },
      { id: "31", slug: "poverty-families", title: "Poverty Incidence Among Families, by Sex of Family Head", office: "CBMS", definition: "Proportion of families with per capita income less than the threshold, categorized by head of family sex." }
    ]
  },
  'power': {
    title: 'Power and Decision-Making',
    icon: UserCheck,
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "32", slug: "govt-seats", title: "Proportion of Seats Held by Women in National and Local Governments", office: "CHRMO", definition: "Number of seats held by women expressed as a percentage of all occupied seats in government." },
      { id: "33", slug: "managerial-positions", title: "Proportion of Women in Managerial Positions", office: "CHRMO", definition: "Proportion of women occupying positions that plan, direct, and coordinate enterprise activities." },
      { id: "34", slug: "third-level-positions", title: "Proportion of Women in Third-Level Positions in Govt Agencies", office: "CHRMO", definition: "Proportion of women in the Career Executive Service (CES) and other third-level positions." },
      { id: "35", slug: "govt-personnel", title: "Number of Government Personnel, by Major Subdivision and Sex", office: "CHRMO", office2: "CSC", definition: "Total number of personnel in national and local agencies, GOCCs, and LGUs." },
      { id: "36", slug: "female-police", title: "Percentage of Female Police Officers", office: "BCPO", definition: "Proportion of female police officers to the total number of officers in the police force." },
      { id: "37", slug: "female-judges", title: "Percentage of Female Judges", office: "MTC-RTC", definition: "The proportion of women judges appointed to decide cases in courts of law to the total judges." },
      { id: "38", slug: "agrarian-beneficiaries", title: "Number of Agrarian Reform Beneficiaries (ARBs), by Sex", office: "CHRMO", office2: "DAR", definition: "Number of individuals awarded emancipation patents or certificates of land ownership agreement." }
    ]
  },
  'violence': {
    title: 'Violence Against Women',
    icon: ShieldAlert,
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "39", slug: "intimate-violence", title: "Physical and/or Sexual Violence by an Intimate Partner", office: "CSWDO", definition: "Percentage of women who experienced physical or sexual violence by a partner in the last 12 months." },
      { id: "40", slug: "non-intimate-violence", title: "Sexual Violence by Persons Other Than An Intimate Partner", office: "CSWDO", definition: "Percentage of women subjected to sexual violence by someone other than a partner since age 15." },
      { id: "41", slug: "abuse-cases", title: "Number of Reported Abuse Cases for Women and Children", office: "CSWDO", definition: "Gender-based violence results recorded in the Crime Incident Reporting and Analysis System." },
      { id: "42", slug: "dswd-cases", title: "Cases Served by DSWD on Violence Against Women and Child Abuse", office: "CSWDO", definition: "Number of abuse cases (abandoned, neglected, exploited) served by social welfare departments." }
    ]
  },
  'human-rights': {
    title: 'Human Rights',
    icon: Globe,
    img: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "43", slug: "child-marriage", title: "Percentage of Women Married or in Union Before Age 15 or 18", office: "CCRO", definition: "The proportion of women aged 20-24 who entered a union before reaching legal adulthood." }
    ]
  },
  'institutional': {
    title: 'Institutional Mechanism',
    icon: Briefcase,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "44", slug: "gad-plans", title: "Proportion of Agencies with Approved GAD Plans and Budget", office: "CPDSO", office2: "PCW", definition: "Percentage of government units that formulate endorsed annual Gender and Development plans." },
      { id: "45", slug: "gad-allocation", title: "Annual GAD Budget Allocation and Utilization", office: "CPDSO", definition: "Total budget allocated and actual amount utilized by agencies for GAD programs." },
      { id: "46", slug: "vaw-desks", title: "Proportion of Barangays with VAW Desks", office: "CSWDO", definition: "Percentage of local communities with functional facilities to address violence against women." },
      { id: "47", slug: "focal-points", title: "Number of Agencies with Established GAD Focal Point Systems", office: "CPDSO", definition: "Mechanism established to catalyze gender mainstreaming and coordinate GAD development." }
    ]
  },
  'media': {
    title: 'Media',
    icon: ImageIcon,
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "48", slug: "mtrcb-complaints", title: "Complaints on Abuse or Derogatory Portrayal of Women via MTRCB", office: "PIO", definition: "Number of complaints regarding derogatory media content recorded by the classification board." }
    ]
  },
  'environment': {
    title: 'Environment',
    icon: Sun,
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "49", slug: "disaster-deaths", title: "Deaths, Missing, and Affected Persons Attributed to Disasters", office: "CDRRMO / CSWDO", definition: "Measure of people impacted per 100,000 population following natural or man-made disasters." },
      { id: "50", slug: "waterborne-diseases", title: "Mortality Due to Water-borne and Vector-borne Diseases", office: "CHSO", definition: "Mortality rates attributed to bacteria, viruses, or pathogens transmitted via water or organisms like insects." }
    ]
  },
  'social-protection': {
    title: 'Social Protection',
    icon: UserPlus,
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "51", slug: "social-access", title: "Proportion of Women and Men with Access to Social Protection", office: "CSWDO", definition: "Proportion of the population covered by basic social security guarantees and essential healthcare." }
    ]
  }
};

const GADSectorDetail: React.FC = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();

  const currentSector = sectorId ? SECTOR_DATA[sectorId] : null;

  if (!currentSector) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-20 text-center">
        <h2 className="text-4xl font-black text-gray-900 uppercase mb-4">Sector Not Found</h2>
        <button onClick={() => navigate('/gad-data')} className="text-purple-600 font-bold hover:underline">Return to Sector List</button>
      </div>
    );
  }

  const SectorIcon = currentSector.icon;

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
            src={currentSector.img} 
            alt={currentSector.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] linear"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[24px] border border-white/20 flex items-center justify-center">
                <SectorIcon size={48} className="text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-white text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                {currentSector.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Indicators List */}
        <div className="space-y-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">List of Indicators</span>
            <div className="h-px flex-1 bg-gray-100"></div>
          </div>
          
          {currentSector.indicators.map((indicator) => (
            <div key={indicator.id} className="group border-b border-gray-100 pb-10 last:border-0">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="bg-purple-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-200">
                      Indicator {indicator.id}
                    </span>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-1 rounded-full border border-gray-100">
                      <Building2 size={12} className="text-gray-400" />
                      {/* Fix: Display both office and office2 if the latter is provided. */}
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        {indicator.office}{indicator.office2 ? ` / ${indicator.office2}` : ''}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-gray-900 leading-tight tracking-tight group-hover:text-purple-600 transition-colors">
                    {indicator.title}
                  </h3>
                  
                  <div className="bg-purple-50/30 p-6 rounded-[24px] border border-purple-100/50">
                    <div className="flex items-start gap-3">
                      <BookOpen size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 block mb-1 not-italic">Definition</span>
                        {indicator.definition}
                      </p>
                    </div>
                  </div>

                  {indicator.details && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {indicator.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs font-bold text-gray-500 leading-relaxed">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="lg:pt-2">
                  <button 
                    onClick={() => navigate(`/analysis/${indicator.slug}`)}
                    className="w-full lg:w-auto px-10 py-4 bg-white border-2 border-gray-900 rounded-full font-black text-xs uppercase tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    View Analysis <ChevronRight size={14} />
                  </button>
                </div>
              </div>
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
    </div>
  );
};

export default GADSectorDetail;
