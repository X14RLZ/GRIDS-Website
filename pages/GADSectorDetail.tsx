
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, TrendingUp, Heart, ShieldAlert, 
  UserCheck, Globe, Briefcase, Sun, HelpCircle, 
  ChevronRight, Building2, BookOpen
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

interface Indicator {
  id: string;
  slug: string;
  title: string;
  office: string;
  definition: string;
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
      { id: "1", slug: "literacy-rate", title: "Basic and Functional Literacy Rate, by Sex", office: "DEPED / PSA FLEMMS", definition: "The ability of a person to read, write, and compute with understanding basic or functional messages in any language." },
      { id: "1a", slug: "simple-literacy", title: "Basic/Simple Literacy - Percentage of the population 10 years old and over, who can read, write and understand simple messages in any language or dialect.", office: "DEPED / PSA FLEMMS", definition: "Basic or simple literacy – is the ability of a person to read and write with understanding a simple message in any language or dialect." },
      { id: "1b", slug: "functional-literacy", title: "Functional Literacy - Percentage of population aged 10 years and over, who can read, write and compute and/ or comprehend.", office: "DEPED / PSA FLEMMS", definition: "Functional literacy – is a significantly higher level of literacy which includes not only reading and writing skills but also numeracy skills." },
      { id: "2", slug: "completion-rate", title: "Elementary and Highschool/Secondary Completion Rate, by Sex", office: "DEPED", definition: "The percentage of first grade/year entrants in a level of education who complete/finish the level in accordance with the required number of years of study." },
      { id: "3", slug: "dropout-rate", title: "Elementary and Secondary Dropout Rate, by Sex", office: "DEPED", definition: "The percentage of pupils/students who leave school during the year for any reason as well as those who complete the previous grade/year level but fail to enroll in the next grade/year level." },
      { id: "4", slug: "enrolment-rate", title: "Net Enrolment Rate for Primary and Secondary Education, by Sex", office: "DEPED", definition: "The ratio of the enrolment for the age group corresponding to the official school age in the primary and in the secondary level to the population of the same age group in a given year." },
      { id: "5", slug: "tertiary-enrolment", title: "Enrolment in Tertiary Education and STEAM Discipline, by Sex", office: "DEPED", definition: "Total number of students who register/enlist in a schoolyear for post-secondary non-degree, TVET, or higher education programs." },
      { id: "6", slug: "college-graduates", title: "Percent Distribution of College Graduates, by Cluster Program and Sex", office: "DEPED", definition: "Students or trainees who are enrolled in a particular course/program and have completed the requirements set for that course/program." },
      { id: "7", slug: "tvet-graduates", title: "Number of TVET Graduates, by Sex and Cluster Program", office: "DEPED", definition: "Graduates of Technical and Vocational Education and Training involving acquisition of practical skills relating to occupations." },
      { id: "8", slug: "mean-schooling", title: "Mean Years of Schooling, by Sex", office: "DEPED", definition: "Average number of completed years of education of a country's population aged 25 years and older." }
    ]
  },
  'economy': {
    title: 'Economy',
    icon: TrendingUp,
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "9", slug: "labor-participation", title: "Labor Force Participation Rate, by Sex and Age Group", office: "PSA", definition: "The proportion of total labor force to the total household population 15 years old and over." },
      { id: "10", slug: "employment-rate", title: "Employment and Unemployment Rate, by Sex", office: "PSA", definition: "The proportion of employed and unemployed persons over the total labor force aged 15 years old and over." },
      { id: "11", slug: "women-employment-share", title: "Share of Women to Total Employment, by Major Occupation Group and Class of Worker", office: "PSA", definition: "The distribution of female workers across major occupation groups and class of worker categories." },
      { id: "12", slug: "underemployment", title: "Underemployment Rate, by Sex", office: "PSA", definition: "Percentage of the total number of underemployed persons to the total number of employed persons." },
      { id: "13", slug: "family-income", title: "Average Annual Family Income, Expenditure and Savings, by Sex of Family Head", office: "CBMS", definition: "The primary income and receipts from other sources received by all family members during the reference period." },
      { id: "14", slug: "unpaid-work", title: "Average Time Spent on Unpaid Domestic and Care Work, by Sex", office: "CBMS", definition: "The proportion of time spent in a day on unpaid domestic and care work, referring to services for own final use." }
    ]
  },
  'health': {
    title: 'Health',
    icon: Heart,
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "15", slug: "stunting", title: "Prevalence of Stunting Among Children Under 5, by Sex", office: "CHSO", definition: "A condition where the child's height is lower than that of a normal person of the same age." },
      { id: "16", slug: "overweight", title: "Prevalence of Overweight Among Children Under 5, by Sex", office: "CHSO", definition: "A condition where the child's weight is higher than that of a normal person of the same age." },
      { id: "17", slug: "wasting", title: "Prevalence of Wasting Among Children Under 5, by Sex", office: "CHSO", definition: "A condition where the child's weight is lower relative to his/her height or length than that of a normal child." },
      { id: "18", slug: "life-expectancy", title: "Life Expectancy at Birth, by Sex", office: "CHSO", definition: "The number of years a newborn child can be expected to live under a given mortality condition of an area in a given year." },
      { id: "19", slug: "contraceptive-rate", title: "Modern Contraceptive Prevalence Rate (%)", office: "CHSO", definition: "Percentage of women of reproductive age who use any modern contraceptive method." },
      { id: "20", slug: "unmet-need", title: "Proportion of Women of Reproductive Age with Unmet Need for Modern Family Planning", office: "CHSO", definition: "Number of fecund women who are married/in union and do not want more children but are not using family planning." },
      { id: "21", slug: "maternal-mortality", title: "Maternal Mortality Ratio", office: "CHSO", definition: "The ratio between the number of women who died for reasons related to pregnancy/childbirth to the number of live births." },
      { id: "22", slug: "birth-attendance", title: "Proportion of Births Attended by Skilled Health Personnel", office: "CHSO", definition: "The number of deliveries attended by skilled health personnel as a percentage of all livebirths." },
      { id: "23", slug: "child-mortality", title: "Child Mortality Rate (Under-five Mortality Rate, by Sex)", office: "CHSO", definition: "The probability of dying between birth and exact age five, per 1,000 live births." },
      { id: "24", slug: "neonatal-mortality", title: "Neonatal Mortality Rate, by Sex", office: "CHSO", definition: "The number of deaths within the first month of life per 1,000 live births." },
      { id: "25", slug: "mortality-causes", title: "Mortality Rate, by Leading Causes, Sex and Age", office: "CHSO", definition: "Death registration and official recording of causes of death across different demographic groups." },
      { id: "26", slug: "adolescent-birth", title: "Adolescent Birth Rate, by Background Characteristics", office: "CHSO", definition: "The number of births to women aged 15-19 per 1,000 women in that age group." },
      { id: "27", slug: "teenage-pregnancy", title: "Teenage Pregnancy Rate", office: "CHSO", definition: "Percentage of women aged 15-19 who have had a live birth or who are pregnant with their first child." },
      { id: "28", slug: "hiv-new", title: "Number of Newly-Diagnosed HIV Cases, by Sex and Age (monthly)", office: "CHSO", definition: "The number of newly diagnosed individuals with HIV infection per year as recorded by the DOH." },
      { id: "29", slug: "hiv-total", title: "Number of Reported HIV-AIDS Cases, by Sex and Age (annual and cumulative)", office: "CHSO", definition: "The cumulative total number of HIV-AID cases in the registry of the Department of Health." }
    ]
  },
  'poverty': {
    title: 'Poverty',
    icon: HelpCircle,
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "30", slug: "poverty-women", title: "Poverty Incidence Among Women and Children", office: "CBMS", definition: "Proportion of women/children belonging to families with per capita income less than the per capita poverty threshold." },
      { id: "31", slug: "poverty-families", title: "Poverty Incidence Among Families, by Sex of Family Head", office: "CBMS", definition: "Proportion of families with per capita income less than the poverty threshold, by sex of the head of the family." },
      { id: "50", slug: "social-protection", title: "Proportion of Women and Men with Access to or Covered by Social Protection Programs", office: "CSWDO", definition: "Access to essential health care and basic income security guarantees defined at the national level." }
    ]
  },
  'power': {
    title: 'Power and Decision-Making',
    icon: UserCheck,
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "32", slug: "govt-seats", title: "Proportion of Seats Held by Women in National and Local Governments", office: "CHRMO", definition: "Number of seats held by women in national and local governments as a percentage of all occupied seats." },
      { id: "33", slug: "managerial-positions", title: "Proportion of Women in Managerial Positions", office: "CHRMO", definition: "Proportion of women occupying managerial positions in government or private enterprises." },
      { id: "34", slug: "third-level-positions", title: "Proportion of Women in Third-Level Positions in Government Agencies", office: "CHRMO", definition: "Proportion of women in the third level positions (Career Executive Service) in government agencies." },
      { id: "35", slug: "govt-personnel", title: "Number of Government Personnel, by Major Subdivision and Sex", office: "CHRMO", definition: "Total number of personnel in National Agencies, GOCCs, and Local Government Units." },
      { id: "36", slug: "female-police", title: "Percentage of Female Police Officers", office: "BCPO", definition: "Proportion of police officers who are women to the total number of police officers." },
      { id: "37", slug: "female-judges", title: "Percentage of Female Judges", office: "MTC-RTC", definition: "The proportion of women judges to the total number of judges appointed to courts of law." },
      { id: "38", slug: "agrarian-beneficiaries", title: "Number of Agrarian Reform Beneficiaries (ARBs), by Sex", office: "CHRMO", definition: "Number of individuals awarded emancipation patents or certificates of land ownership agreement." },
      { id: "42", slug: "child-marriage", title: "Percentage of Women Aged 20-24 Married or in a Union Before Age 15 and 18", office: "CCRO", definition: "The proportion of women aged 20-24 who were married or in union before reaching the age of 15 and 18." }
    ]
  },
  'violence': {
    title: 'Violence Against Women',
    icon: ShieldAlert,
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "39", slug: "intimate-partner-violence", title: "Proportion of Ever-Partnered Women and Girls Subjected to Physical and/or Sexual Violence by a Current or Former Intimate Partner", office: "CSWDO", definition: "Percentage of ever partnered women and girls (aged 15-49) who experienced violence in the last 12 months." },
      { id: "39a", slug: "non-intimate-violence", title: "Proportion of Women and Girls Subjected to Sexual Violence by Persons Other Than An Intimate Partner Since Age 15", office: "CSWDO", definition: "Percentage of women who have experienced sexual violence by anyone other than a partner ever." },
      { id: "40", slug: "abuse-cases", title: "Number of Reported Abuse Cases for Women and Children", office: "CSWDO", definition: "Actual VAW/GBV related cases reported to PNP Women and Children Protection Desks." },
      { id: "41", slug: "dswd-cases", title: "Number of Cases Served by DSWD on Violence Against Women and Child Abuse", office: "CSWDO", definition: "Total cases served including abandoned, neglected, and sexually/physically abused individuals." },
      { id: "45", slug: "vaw-desks", title: "Proportion of Barangays with VAW Desks", office: "CSWDO", definition: "Establishment of Violence Against Women Desks in every barangay for gender-responsive handling of cases." }
    ]
  },
  'institutional': {
    title: 'Enabling Mechanism',
    icon: Briefcase,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { 
        id: "A", 
        slug: "siged-awards", 
        title: "The Sustaining Initiatives on Gender Equality and Development (SIGED) GAD Awards", 
        office: "CPDSO / GFPS", 
        definition: "Recognition program for outstanding GAD initiatives and practices within the city government and partner organizations." 
      },
      { 
        id: "B", 
        slug: "gad-database", 
        title: "The GAD Database", 
        office: "CPDSO", 
        definition: "Centralized repository for gender data including: 1. Resolution No. 8 Approval and Adoption of the Updated Philippine Core GAD Indicators; 2. Metadata of the Updated Core GAD Indicators; 3. Annex B: GAD Indicators (PCW-DILG-DBM-NEDA JMC 2013-01)." 
      },
      { 
        id: "C", 
        slug: "gad-planning-budgeting", 
        title: "Local GAD Planning and Budgeting", 
        office: "CPDSO / CBO", 
        definition: "Strategic planning and financial allocation for gender programs: 1. Baguio City GAD Agenda (2025-2030); 2. Annual GAD Plan and Budgets (2022-2025); 3. Annual GAD Accomplishment Reports (2022-2024); 4. Gender Analysis Tools (GMEF, GeRL, GFAsT, HGDG)." 
      },
      { 
        id: "D", 
        slug: "gender-mainstreaming-plans", 
        title: "Mainstreaming Gender Perspectives in Local Development Plans", 
        office: "CPDSO", 
        definition: "Integration of gender lenses into city-wide development frameworks such as the Comprehensive Development Plan (CDP)." 
      },
      { 
        id: "E", 
        slug: "gad-code", 
        title: "Enhancement and Implementation of the GAD Code", 
        office: "CPDSO / SP", 
        definition: "Legislative framework for gender equality: 1. 2020 Amended GAD Code; 2. Draft Proposed Amendments of Baguio City GAD Code." 
      },
      { 
        id: "F", 
        slug: "mcw-monitoring", 
        title: "Monitoring and Evaluating the Implementation of the Magna Carta of Women (MCW)", 
        office: "CPDSO / M&E Team", 
        definition: "Oversight mechanisms including: 1. The Baguio City GAD Monitoring and Evaluation Team; 2. COA MC 2021-008 on GAD Responsibility Centers; 3. The GAD Responsibility Codes of Baguio City." 
      }
    ]
  },
  'environment': {
    title: 'Environment',
    icon: Sun,
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    indicators: [
      { id: "48", slug: "disaster-deaths", title: "Number of Deaths, Missing Persons and Directly Affected Persons Attributed to Disasters, by Sex", office: "CDRRMO / CSWDO", definition: "Measures the number of people who died, went missing or were directly affected by disasters." },
      { id: "49", slug: "water-borne-mortality", title: "Mortality Due to Water-borne Diseases and Conditions, by Sex", office: "CHSO", definition: "Mortality caused by the ingestion of chemicals and micro-organisms through contaminated water." },
      { id: "49a", slug: "vector-borne-mortality", title: "Mortality Due to Vector-borne Diseases, by Sex", office: "CHSO", definition: "Deaths from human illnesses caused by parasites, viruses and bacteria transmitted by vectors." }
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

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title={currentSector.title}
      subtitle="Sectoral Record Registry"
    >
      <div className={`rounded-[48px] p-6 lg:p-10 shadow-2xl border transition-colors duration-500
        ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
        
        <div className="relative h-48 lg:h-64 rounded-[40px] overflow-hidden mb-8 shadow-xl group">
          <img 
            src={currentSector.img} 
            alt={currentSector.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] linear"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[24px] border border-white/20 flex items-center justify-center text-white">
                <SectorIcon size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-white text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                {currentSector.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {currentSector.indicators.map((indicator) => (
            <div key={indicator.id} className={`group border-b pb-6 last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="bg-purple-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-200">
                      Indicator {indicator.id}
                    </span>
                    <div className={`flex items-center gap-2 px-4 py-1 rounded-full border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                      <Building2 size={12} className="text-gray-400" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        {indicator.office}
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-3xl font-black leading-tight tracking-tight group-hover:text-purple-600 transition-colors ${textClass}`}>
                    {indicator.title}
                  </h3>
                  <div className={`p-6 rounded-[24px] border ${isDarkMode ? 'bg-purple-900/10 border-purple-500/20' : 'bg-purple-50/30 border-purple-100/50'}`}>
                    <div className="flex items-start gap-3">
                      <BookOpen size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                      <div className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 block mb-1">Definition / Scope</span>
                        {indicator.definition}
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="lg:pt-2">
                    <button 
                      onClick={() => navigate(`/gad-data/${sectorId}/${indicator.slug}`)}
                      className={`w-full lg:w-auto px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2
                        ${isDarkMode ? 'bg-white text-black border-2 border-white hover:bg-purple-600 hover:text-white hover:border-purple-600' : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'}`}
                    >
                      Access Analysis <ChevronRight size={14} />
                    </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default GADSectorDetail;
