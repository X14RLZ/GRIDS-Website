
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, TrendingUp, Heart, ShieldAlert, 
  UserCheck, Globe, Briefcase, ImageIcon, 
  Sun, UserPlus, HelpCircle, ChevronRight, Building2, BookOpen,
  Award, Database as DbIcon, ClipboardList, PenTool, Layout, FileCheck, Landmark, ReceiptText
} from 'lucide-react';

interface Indicator {
  id: string;
  slug: string;
  title: string;
  office: string;
  office2?: string;
  definition: string;
  details?: string[];
  isResource?: boolean;
}

interface SectorData {
  title: string;
  icon: any;
  img: string;
  indicators: Indicator[];
  sections?: {
    id: string;
    title: string;
    icon: any;
    items: Indicator[];
  }[];
}

const SECTOR_DATA: Record<string, SectorData> = {
  'education-and-training': {
    title: 'Education and Training',
    icon: GraduationCap,
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "1", slug: "literacy-rate", title: "Basic and Functional Literacy Rate, by Sex", office: "DEPED / PSA (FLEMMS)", definition: "The ability of a person to read, write, and compute with understanding basic or functional messages in any language." },
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
  'institutional': {
    title: 'Enabling Mechanism',
    icon: Briefcase,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    indicators: [], 
    sections: [
      {
        id: 'awards',
        title: 'A. SIGED GAD Awards',
        icon: Award,
        items: [
          { id: "A1", slug: "siged-awards", title: "The Sustaining Initiatives on Gender Equality and Development (SIGED) GAD Awards", office: "CPDSO", definition: "Official awards platform recognizing excellence in gender mainstreaming among city departments and barangays." }
        ]
      },
      {
        id: 'database',
        title: 'B. The GAD Database',
        icon: DbIcon,
        items: [
          { id: "B1", slug: "res-8", title: "Resolution No. 8 Approval and Adoption of the Updated Philippine Core GAD Indicators", office: "CPDSO", definition: "Localized policy adopting standard indicators for city-wide GAD monitoring." },
          { id: "B2", slug: "metadata", title: "Metadata of the Updated Core GAD Indicators", office: "CPDSO", definition: "Technical definitions and data collection methodologies for all 51 core indicators." },
          { id: "B3", slug: "annex-b", title: "Annex B: GAD Indicators (PCW-DILG-DBM-NEDA JMC 2013-01)", office: "PSA", definition: "National indicator set required for local government GAD reporting." }
        ]
      },
      {
        id: 'planning',
        title: 'C. Local GAD Planning and Budgeting',
        icon: ClipboardList,
        items: [
          { id: "C1", slug: "agenda", title: "Baguio City GAD Agenda (2025-2030)", office: "CPDSO", definition: "Strategic plan outlining Baguio's GAD direction and priority programs for the next 6 years." },
          { id: "C2", slug: "plans", title: "Annual GAD Plan and Budgets (2022-2025)", office: "CBAO", definition: "Yearly budgetary allocations for gender-responsive programs and infrastructure." },
          { id: "C3", slug: "reports", title: "Annual GAD Accomplishment Reports (2022-2024)", office: "CPDSO", definition: "Consolidated outcomes of GAD activities and budget utilization per year." },
          { id: "C4", slug: "gmef", title: "Gender Mainstreaming Evaluation Framework (GMEF)", office: "PCW", definition: "PCW tool to assess progress in institutionalizing GAD within the LGU." },
          { id: "C5", slug: "gerl", title: "Gender-responsive LGU (GeRL) Tool", office: "PCW", definition: "Assessment tool for measuring local government gender-responsiveness." },
          { id: "C6", slug: "gfast", title: "GFPS Functionality Assessment Tool (GFAsT)", office: "PCW", definition: "Tool for evaluating the effectiveness of Focal Point Systems." },
          { id: "C7", slug: "hgdg", title: "Harmonized Gender and Development Guidelines (HGDG)", office: "PCW", definition: "Guidelines for gender analysis in development program design." }
        ]
      },
      {
        id: 'mainstreaming',
        title: 'D. Mainstreaming Gender Perspectives',
        icon: Layout,
        items: [
          { id: "D1", slug: "cdp", title: "Comprehensive Development Plan (CDP)", office: "CPDSO", definition: "Integration of GAD objectives into Baguio City's long-term multi-sectoral development roadmap." }
        ]
      },
      {
        id: 'gad-code',
        title: 'E. Implementation of the GAD Code',
        icon: FileCheck,
        items: [
          { id: "E1", slug: "gad-code-2020", title: "2020 Amended GAD Code", office: "SP", definition: "The localized legal framework for gender rights and development in Baguio City." },
          { id: "E2", slug: "gad-code-draft", title: "Draft Proposed Amendments of Baguio City GAD Code", office: "SP", definition: "Current legislative efforts to refine and strengthen the existing GAD Code." }
        ]
      },
      {
        id: 'monitoring',
        title: 'F. Monitoring and Evaluating the Implementation of MCW',
        icon: PenTool,
        items: [
          { id: "F1", slug: "me-team", title: "The Baguio City GAD Monitoring and Evaluation Team", office: "CPDSO", definition: "Team tasked with verifying the progress of Magna Carta of Women implementation." },
          { id: "F2", slug: "coa-mc", title: "COA MC 2021-008 - Responsibility Center for GAD Focal Point System", office: "COA", definition: "Guidelines on accounting and reporting GAD-related financial transactions." },
          { id: "F3", slug: "responsibility-codes", title: "The GAD Responsibility Codes of Baguio City", office: "CBAO", definition: "Unique accounting codes for tracking gender-responsive investments across offices." }
        ]
      }
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
  }
};

const GADSectorDetail: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const { sectorId } = useParams();
  const navigate = useNavigate();

  const currentSector = sectorId ? SECTOR_DATA[sectorId] : null;

  if (!currentSector) {
    return (
      <div className={`flex flex-col items-center justify-center h-full p-20 text-center ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'}`}>
        <h2 className={`text-4xl font-black uppercase mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sector Not Found</h2>
        <button onClick={() => navigate('/gad-data')} className="text-purple-600 font-bold hover:underline">Return to Sector List</button>
      </div>
    );
  }

  const SectorIcon = currentSector.icon;
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const renderItem = (indicator: Indicator) => (
    <div key={indicator.id} className={`group border-b pb-10 last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-purple-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-200">
              Ref {indicator.id}
            </span>
            <div className={`flex items-center gap-2 px-4 py-1 rounded-full border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
              <Building2 size={12} className="text-gray-400" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                {indicator.office}{indicator.office2 ? ` / ${indicator.office2}` : ''}
              </span>
            </div>
          </div>

          <h3 className={`text-3xl font-black leading-tight tracking-tight group-hover:text-purple-600 transition-colors ${textClass}`}>
            {indicator.title}
          </h3>
          
          <div className={`p-6 rounded-[24px] border ${isDarkMode ? 'bg-purple-900/10 border-purple-500/20' : 'bg-purple-50/30 border-purple-100/50'}`}>
            <div className="flex items-start gap-3">
              <BookOpen size={16} className="text-purple-400 mt-1 flex-shrink-0" />
              <p className={`text-sm font-medium leading-relaxed italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 block mb-1 not-italic">Definition / Scope</span>
                {indicator.definition}
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:pt-2">
          <button 
            onClick={() => navigate(`/analysis/${indicator.slug}`)}
            className={`w-full lg:w-auto px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2
              ${isDarkMode ? 'bg-white text-black border-2 border-white hover:bg-purple-600 hover:text-white hover:border-purple-600' : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'}`}
          >
            Access Resource <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 animate-in fade-in duration-500 relative">
      <div className="mb-12 flex items-start justify-between">
        <div>
          <h1 className={`text-4xl font-black mb-2 uppercase tracking-tight ${textClass}`}>{currentSector.title} Hub</h1>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
        </div>
      </div>

      <div className={`rounded-[48px] p-8 lg:p-16 shadow-2xl shadow-purple-950/5 border transition-colors duration-500
        ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
        
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

        {/* Indicators or Sections */}
        <div className="space-y-20 max-w-6xl mx-auto">
          {currentSector.sections ? currentSector.sections.map(section => (
            <div key={section.id} className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg">
                  <section.icon size={24} />
                </div>
                <h3 className={`text-3xl font-black uppercase tracking-tight ${textClass}`}>{section.title}</h3>
                <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
              </div>
              <div className="space-y-10">
                {section.items.map(item => renderItem(item))}
              </div>
            </div>
          )) : (
            <div className="space-y-10">
              {currentSector.indicators.map(indicator => renderItem(indicator))}
            </div>
          )}
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
