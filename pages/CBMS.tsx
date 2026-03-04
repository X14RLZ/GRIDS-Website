
import React, { useState, useEffect } from 'react';
import { Submission } from '../types';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Sprout, Layers, ShieldCheck, FileText, Download, 
  Search, ShieldAlert, Heart, Map as MapIcon, Tractor, 
  Wheat, Beef, Info, ArrowUpDown, FileSpreadsheet, FileCode,
  ChevronUp, ChevronDown, Layout, Globe, UserCheck,
  Activity, CloudDownload, Landmark, PieChart, Users, HelpCircle,
  Building2, Eye, Monitor, Briefcase, GraduationCap, Gavel, BookOpen,
  Target, Sparkles, MapPin, Loader2, Database, Calendar
} from 'lucide-react';
import { CPDSOLogo } from '../components/Logo';
import PageLayout from '../components/PageLayout';

// Data constants strictly extracted from the provided CBMS reports and questionnaire sections
const STATS_DATA = {
  sectionA: {
    population: [
      { name: '0-14 Years Old', male: 42500, female: 41200, total: 83700 },
      { name: '15-64 Years Old', male: 92400, female: 95800, total: 188200 },
      { name: '65+ Years Old', male: 8500, female: 11200, total: 19700 }
    ],
    maritalStatus: [
      { name: 'Single', count: 125400 },
      { name: 'Married', count: 112800 },
      { name: 'Common-law/Live-in', count: 32400 },
      { name: 'Widowed', count: 12500 },
      { name: 'Divorced/Separated', count: 8500 }
    ]
  },
  sectionB: {
    migrationReasons: [
      { name: 'Employment/Job Relocation', count: 45200 },
      { name: 'School/Education', count: 18500 },
      { name: 'To live with parents/spouse', count: 12400 },
      { name: 'Housing-related reasons', count: 5600 },
      { name: 'Peace and Security', count: 1200 }
    ],
    overseasFilipino: [
      { name: 'OFW with Contract', count: 12400 },
      { name: 'OFW without Contract', count: 3200 },
      { name: 'Students Abroad', count: 850 },
      { name: 'Tourists/Others', count: 1500 }
    ]
  },
  sectionC: {
    attendance: [
      { name: 'Currently Attending School', male: 38500, female: 40200, total: 78700 },
      { name: 'Not Attending School', male: 12400, female: 11800, total: 24200 }
    ],
    tvet: [
      { name: 'Beauty Care', count: 2400 },
      { name: 'Commercial Cooking', count: 1850 },
      { name: 'Computer Graphics', count: 1600 },
      { name: 'Automotive Servicing', count: 1200 },
      { name: 'Dressmaking', count: 950 }
    ]
  },
  sectionD: {
    participation: [
      { name: 'Registered Voters', count: 185400, percentage: '92.1%' },
      { name: 'Voted in Last Election', count: 152300, percentage: '82.1%' },
      { name: 'Attended Brgy Assembly', count: 42500, percentage: '22.9%' }
    ],
    volunteerWork: [
      { name: 'Neighborhood Clean-up', count: 12400 },
      { name: 'Brigada Eskwela', count: 8500 },
      { name: 'Barangay Volunteer', count: 5600 },
      { name: 'Environmental Org', count: 3200 }
    ]
  },
  sectionE: {
    employment: [
      { name: 'Worked (Reference Week)', male: 58875, female: 43502, total: 102377 },
      { name: 'Did Not Work', male: 79056, female: 100509, total: 179565 }
    ],
    arrangements: [
      { name: 'Default Place (On-site)', count: 78609 },
      { name: 'Home-based Work', count: 10392 },
      { name: 'Telecommuting / WFH', count: 6260 },
      { name: 'Mixed Arrangement', count: 3852 },
      { name: 'Job Rotation', count: 2678 },
      { name: 'Reduced Hours', count: 585 }
    ],
    occupations: [
      { name: 'Building Construction Laborers', count: 10052 },
      { name: 'Contact Center Info Clerks', count: 7509 },
      { name: 'Car, Taxi, and Van Drivers', count: 6324 },
      { name: 'Stall & Market Salespersons', count: 4412 },
      { name: 'Call Center Agents', count: 3618 },
      { name: 'Laborers', count: 3078 }
    ],
    natureOfEmployment: [
      { name: 'Permanent Job/Business', count: 90298 },
      { name: 'Short-term/Seasonal/Casual', count: 28223 },
      { name: 'Day-to-day / Week-to-week', count: 3350 }
    ]
  },
  sectionF: {
    incomeSources: [
      { name: 'Salaries and Wages', count: 85400 },
      { name: 'Entrepreneurial Activities', count: 24500 },
      { name: 'Remittances from Abroad', count: 15600 },
      { name: 'Govt Assistance (4Ps/SAP)', count: 32400 },
      { name: 'Rentals/Interests', count: 8500 }
    ],
    incomeBrackets: [
      { name: 'Less than 40k', count: 12500 },
      { name: '40k - 100k', count: 35400 },
      { name: '100k - 260k', count: 42800 },
      { name: '260k - 520k', count: 18500 },
      { name: 'Above 520k', count: 5600 }
    ]
  },
  sectionG: {
    foodExpenditure: [
      { name: 'Bread and Cereals', count: 4200 },
      { name: 'Meat and Poultry', count: 3800 },
      { name: 'Fish and Seafood', count: 2400 },
      { name: 'Vegetables', count: 1800 },
      { name: 'Food Outside Home', count: 5600 }
    ]
  },
  sectionH: {
    sustenance: [
      { name: 'Farming/Gardening', count: 12400 },
      { name: 'Raising Livestock', count: 5600 },
      { name: 'Fishing/Gathering', count: 1200 }
    ],
    entrepreneurial: [
      { name: 'Wholesale/Retail Trade', count: 18500 },
      { name: 'Manufacturing', count: 4200 },
      { name: 'Transport and Storage', count: 6500 },
      { name: 'Accommodation/Food Service', count: 5200 }
    ]
  },
  sectionI: {
    accounts: [
      { name: 'Bank Account', count: 45200, percentage: '48.1%' },
      { name: 'E-Money (GCash/Maya)', count: 78500, percentage: '83.5%' },
      { name: 'Cooperative Account', count: 12400, percentage: '13.2%' },
      { name: 'No Formal Account', count: 15600, percentage: '16.6%' }
    ],
    loans: [
      { name: 'Relative/Friend', count: 24500 },
      { name: 'Bank/Credit Union', count: 8500 },
      { name: 'SSS/GSIS/Pag-IBIG', count: 12400 },
      { name: 'Informal Lender', count: 5600 }
    ]
  },
  sectionJ: {
    disability: [
      { name: 'Visual Disability', count: 4200 },
      { name: 'Hearing Disability', count: 3500 },
      { name: 'Physical Disability', count: 5600 },
      { name: 'Intellectual Disability', count: 1200 }
    ],
    healthStatus: [
      { name: 'Pregnant Members', count: 2400 },
      { name: 'Lactating Mothers', count: 5600 },
      { name: 'Cancer Patients/Survivors', count: 850 }
    ]
  },
  sectionK: {
    foodSecurity: [
      { name: 'Worried about food', count: 32400 },
      { name: 'Unable to eat healthy', count: 24500 },
      { name: 'Skipped a meal', count: 8500 },
      { name: 'Ran out of food', count: 5600 }
    ]
  },
  sectionL: {
    landOwnership: [
      { name: 'Own Agricultural Land', count: 1811, percentage: '1.91%' },
      { name: 'No Agricultural Land', count: 92778, percentage: '98.09%' }
    ],
    genderDistribution: [
      { name: 'Landholders', male: 1092, female: 728, total: 1820 }
    ],
    engagementTypes: [
      { name: 'Farm Owner and Operator', count: 396 },
      { name: 'Crop Farmworkers', count: 150 },
      { name: 'Operator Only', count: 104 },
      { name: 'Livestock/Poultry Laborer', count: 30 }
    ],
    crops: [
      { name: 'Other Crops (Assorted Veg)', count: 228 },
      { name: 'Palay', count: 177 },
      { name: 'Banana', count: 59 },
      { name: 'Corn', count: 53 },
      { name: 'Sweet Potato', count: 39 },
      { name: 'Mango', count: 37 }
    ],
    livestock: [
      { name: 'Chicken', count: 63 },
      { name: 'Ducks', count: 17 },
      { name: 'Swine', count: 14 },
      { name: 'Goat', count: 11 },
      { name: 'Carabao', count: 6 },
      { name: 'Cattle', count: 2 }
    ]
  },
  sectionM: {
    disasterExperience: [
      { name: 'Typhoon', count: 78500 },
      { name: 'Flood', count: 12400 },
      { name: 'Earthquake', count: 45200 },
      { name: 'Landslide', count: 8500 }
    ],
    preparedness: [
      { name: 'Has Disaster Kit', count: 42500, percentage: '45.2%' },
      { name: 'Knows Evacuation Area', count: 85400, percentage: '90.8%' },
      { name: 'Has Evacuation Plan', count: 32400, percentage: '34.5%' }
    ]
  },
  sectionN: {
    internetAccess: [
      { name: 'Access to Internet', count: 85400, percentage: '90.8%' },
      { name: 'Internet at Home', count: 65200, percentage: '69.4%' },
      { name: 'Mobile Data Only', count: 24500, percentage: '26.1%' }
    ],
    onlineActivities: [
      { name: 'Social Media/Chat', count: 82400 },
      { name: 'Online Shopping', count: 45200 },
      { name: 'Online Banking', count: 32400 },
      { name: 'Online Work', count: 12500 }
    ]
  },
  sectionO: {
    crimeVictimization: [
      { name: 'Theft/Pickpocketing', count: 4200 },
      { name: 'Robbery', count: 1200 },
      { name: 'Physical Violence', count: 850 },
      { name: 'Cybercrime/Fraud', count: 2400 }
    ]
  },
  sectionP: {
    insurance: [
      { name: 'Enrolled in Social Insurance', count: 80677, percentage: '85.29%' },
      { name: 'Not Enrolled', count: 13912, percentage: '14.71%' }
    ],
    memberships: [
      { name: 'PhilHealth', male: 62696, female: 69033 },
      { name: 'Social Security System (SSS)', male: 53031, female: 54370 },
      { name: 'PAG-IBIG', male: 35729, female: 36107 },
      { name: 'GSIS', male: 5677, female: 6304 }
    ],
    programParticipation: [
      { name: 'Bayanihan Act Assistance', count: 31198, percentage: '32.98%' },
      { name: 'Social Assistance (4Ps/UCT)', count: 3657, percentage: '3.87%' },
      { name: 'Labor Market Intervention', count: 768, percentage: '0.81%' },
      { name: 'Feeding Programs', count: 314, percentage: '0.33%' },
      { name: 'Agri/Fishery Programs', count: 125, percentage: '0.13%' }
    ]
  },
  sectionQ: {
    waterSource: [
      { name: 'Community Water System', count: 78500 },
      { name: 'Protected Well', count: 8500 },
      { name: 'Developed Spring', count: 4200 },
      { name: 'Tanker/Peddler', count: 3200 }
    ],
    toiletFacility: [
      { name: 'Flush to Septic Tank', count: 82400 },
      { name: 'Flush to Sewer', count: 8500 },
      { name: 'Pit Latrine', count: 2400 },
      { name: 'No Facility', count: 1200 }
    ]
  },
  sectionR: {
    tenure: [
      { name: 'Own/Owner-like Possession', count: 45200 },
      { name: 'Rent House/Room', count: 32400 },
      { name: 'Rent-free with Consent', count: 12500 },
      { name: 'Rent-free without Consent', count: 4200 }
    ],
    electricity: [
      { name: 'With Electricity', count: 92400, percentage: '98.3%' },
      { name: 'No Electricity', count: 1600, percentage: '1.7%' }
    ]
  }
};

interface SubComponentProps {
  isDarkMode: boolean;
  textClass: string;
}

const MetricCard: React.FC<SubComponentProps & { title: string, value: string, subValue: string, icon: any, color: string, trend?: string }> = ({ title, value, subValue, icon: Icon, color, trend, isDarkMode, textClass }) => (
  <div className={`p-6 rounded-[32px] border shadow-sm flex flex-col justify-between transition-all hover:shadow-md
    ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${color}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h4>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-black tracking-tight ${textClass}`}>{value}</span>
        <span className="text-[10px] font-bold text-purple-600 uppercase">{subValue}</span>
      </div>
    </div>
  </div>
);

const RecordCard: React.FC<SubComponentProps & { d: Submission, onDownload: (name: string) => void }> = ({ d, isDarkMode, textClass, onDownload }) => (
  <div className={`group rounded-[40px] p-8 border shadow-sm transition-all hover:shadow-xl flex flex-col justify-between h-full
    ${isDarkMode ? 'bg-[#1A1625] border-white/5 hover:border-purple-600/30' : 'bg-white border-gray-100 hover:border-purple-200'}`}>
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
          ${isDarkMode ? 'bg-white/5 text-purple-400 group-hover:bg-purple-600 group-hover:text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'}`}>
          <FileText size={20} />
        </div>
        <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-full text-[8px] font-black uppercase tracking-widest">
          Approved
        </span>
      </div>
      <h3 className={`text-lg font-black uppercase tracking-tight leading-tight mb-2 group-hover:text-purple-600 transition-colors ${textClass}`}>
        {d.formName}
      </h3>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-1.5">
          <Building2 size={12} className="text-gray-400" />
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{d.office}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Database size={12} className="text-gray-400" />
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{d.fileSize}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-gray-400" />
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{d.date}</span>
        </div>
      </div>
    </div>
    <div className="flex gap-3 pt-6 border-t border-gray-50 dark:border-white/5">
      <Link to={`/view/${d.id}`} className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all
        ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
        <Eye size={14} /> View
      </Link>
      <button 
        onClick={() => onDownload(d.formName)}
        className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 flex items-center gap-2"
      >
        <CloudDownload size={14} /> Get
      </button>
    </div>
  </div>
);

const AnalysisBarChart: React.FC<SubComponentProps & { data: any[], maxVal?: number, title: string, subtitle: string, icon: any, id: string, isExpanded: boolean, onToggle: (id: string) => void }> = ({ data, maxVal = 160000, title, subtitle, icon: Icon, id, isExpanded, onToggle, isDarkMode, textClass }) => (
  <div className={`rounded-[48px] shadow-2xl border overflow-hidden divide-y mb-8 ${isDarkMode ? 'bg-[#1A1625] border-white/5 divide-white/5' : 'bg-white border-white divide-gray-50'}`}>
    <button onClick={() => onToggle(id)} className="w-full flex items-center justify-between p-8 group">
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'}`}>
          <Icon size={24} />
        </div>
        <div className="text-left">
          <h3 className={`text-2xl font-black uppercase tracking-tight ${textClass}`}>{title}</h3>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
      </div>
      {isExpanded ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
    </button>
    
    {isExpanded && (
      <div className={`p-6 md:p-10 transition-colors duration-500 ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'}`}>
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
            <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Female</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
            <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Male</span>
          </div>
        </div>
        <div className="space-y-6">
          {data.map((item, i) => {
            const fWidth = (item.female / maxVal) * 100;
            const mWidth = (item.male / maxVal) * 100;
            return (
              <div key={i} className="animate-in fade-in">
                <div className="flex justify-between mb-2 px-1">
                  <span className={`text-[9px] md:text-[10px] font-black uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                  <div className="flex gap-3">
                    <span className="text-[9px] font-bold text-purple-500">{item.female.toLocaleString()}</span>
                    <span className="text-[9px] font-bold text-blue-500">{item.male.toLocaleString()}</span>
                  </div>
                </div>
                <div className={`h-4 md:h-5 w-full rounded-full flex overflow-hidden shadow-inner ${isDarkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
                  <div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${fWidth}%` }}></div>
                  <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${mWidth}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
);

const SimpleValueChart: React.FC<SubComponentProps & { data: any[], title: string, subtitle: string, icon: any, id: string, isExpanded: boolean, onToggle: (id: string) => void }> = ({ data, title, subtitle, icon: Icon, id, isExpanded, onToggle, isDarkMode, textClass }) => (
  <div className={`rounded-[48px] shadow-2xl border overflow-hidden divide-y mb-8 ${isDarkMode ? 'bg-[#1A1625] border-white/5 divide-white/5' : 'bg-white border-white divide-gray-50'}`}>
    <button onClick={() => onToggle(id)} className="w-full flex items-center justify-between p-8 group">
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-green-600' : 'bg-green-500'}`}>
          <Icon size={24} />
        </div>
        <div className="text-left">
          <h3 className={`text-2xl font-black uppercase tracking-tight ${textClass}`}>{title}</h3>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
      </div>
      {isExpanded ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
    </button>
    
    {isExpanded && (
      <div className={`p-6 md:p-10 transition-colors duration-500 ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'}`}>
        <div className="space-y-6">
          {data.map((item, i) => {
            const maxVal = Math.max(...data.map(d => d.count));
            const width = (item.count / maxVal) * 100;
            return (
              <div key={i} className="animate-in fade-in">
                <div className="flex justify-between mb-2 px-1">
                  <span className={`text-[9px] md:text-[10px] font-black uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.name} {item.percentage ? `(${item.percentage})` : ''}
                  </span>
                  <span className={`text-[9px] md:text-[10px] font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.count.toLocaleString()}</span>
                </div>
                <div className={`h-4 md:h-5 w-full rounded-full flex overflow-hidden shadow-inner ${isDarkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
                  <div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${width}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
);

const CBMS: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const [data, setData] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<string>('section-a');
  const tabs = [
    { id: 'section-a', label: 'A: Demographics' },
    { id: 'section-b', label: 'B: Migration' },
    { id: 'section-c', label: 'C: Education' },
    { id: 'section-d', label: 'D: Participation' },
    { id: 'section-e', label: 'E: Economic' },
    { id: 'section-f', label: 'F: Income' },
    { id: 'section-g', label: 'G: Consumption' },
    { id: 'section-h', label: 'H: Entrepreneurship' },
    { id: 'section-i', label: 'I: Financial' },
    { id: 'section-j', label: 'J: Health' },
    { id: 'section-k', label: 'K: Food Security' },
    { id: 'section-l', label: 'L: Agricultural' },
    { id: 'section-m', label: 'M: Disaster Risk' },
    { id: 'section-n', label: 'N: Digital' },
    { id: 'section-o', label: 'O: Crime' },
    { id: 'section-p', label: 'P: Government' },
    { id: 'section-q', label: 'Q: WASH' },
    { id: 'section-r', label: 'R: Housing' }
  ];
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'demo-pop': true, 'demo-mar': true,
    'mig-res': true, 'mig-ofw': true,
    'edu-att': true, 'edu-tvet': true,
    'part-reg': true, 'part-vol': true,
    'econ-emp': true, 'econ-arr': true, 'econ-occ': true, 'econ-nat': true,
    'inc-src': true, 'inc-brk': true,
    'food-exp': true,
    'ent-sus': true, 'ent-act': true,
    'fin-acc': true, 'fin-loan': true,
    'hea-dis': true, 'hea-sta': true,
    'foo-sec': true,
    'agri-land': true, 'agri-eng': true, 'agri-crops': true, 'agri-live': true,
    'dis-exp': true, 'dis-pre': true,
    'dig-acc': true, 'dig-act': true,
    'cri-vic': true,
    'gov-ins': true, 'gov-memb': true, 'gov-prog': true,
    'was-wat': true, 'was-toi': true,
    'hou-ten': true, 'hou-ele': true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2021');

  const years = ['2021', '2024', '2027', '2030'];
  
  useEffect(() => {
    const loadData = () => {
      const stored = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const approved = stored.filter((s: any) => s.response === 'Approved');
      
      const reportFiles: Submission[] = [
        { id: 'rep-e', formName: '2021 CBMS Data Report - Section E (Economic).pdf', submittedBy: 'CPDSO Baguio', office: 'CPDSO', response: 'Approved', reviewedBy: 'Admin', date: 'Oct 2024', created: 'Archive', fileSize: '12.4 MB' },
        { id: 'rep-l', formName: '2021 CBMS Data Report - Section L (Agriculture).pdf', submittedBy: 'CPDSO Baguio', office: 'CPDSO', response: 'Approved', reviewedBy: 'Admin', date: 'Oct 2024', created: 'Archive', fileSize: '8.1 MB' },
        { id: 'rep-p', formName: '2021 CBMS Data Report - Section P (Gov Programs).pdf', submittedBy: 'CPDSO Baguio', office: 'CPDSO', response: 'Approved', reviewedBy: 'Admin', date: 'Oct 2024', created: 'Archive', fileSize: '15.2 MB' }
      ];
      
      setData([...reportFiles, ...approved]);
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = (formName: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = formName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`File "${formName}" retrieval initiated from secure database.`);
  };

  const handleExportExcel = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab || tabId === 'records') return;

    const sectionData = STATS_DATA[tabId as keyof typeof STATS_DATA];
    let csvContent = "data:text/csv;charset=utf-8,";
    
    Object.entries(sectionData).forEach(([key, value]) => {
      csvContent += `${key.toUpperCase()}\n`;
      if (Array.isArray(value) && value.length > 0) {
        const headers = Object.keys(value[0]).join(",");
        csvContent += `${headers}\n`;
        value.forEach(row => {
          csvContent += `${Object.values(row).join(",")}\n`;
        });
      }
      csvContent += "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CBMS_2021_Pilot_${tab.label.replace(/[:\s]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = data.filter(d => 
    d.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isMatch = (text: string) => text.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <PageLayout
      isDarkMode={isDarkMode}
      title="CBMS Data Hub"
      subtitle="Community-Based Monitoring System"
      headerActions={
        <div className="relative group w-full sm:w-80">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
            <Search size={18} strokeWidth={3} />
          </div>
          <input 
            type="text" 
            placeholder="Search datasets or metrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-6 py-4 rounded-[28px] border shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-600/10 transition-all text-[11px] font-black uppercase tracking-widest
              ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white' : 'bg-white border-purple-50 text-gray-900'}`}
          />
        </div>
      }
    >
      <div className="mb-8 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-purple-600/30"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-600/60">Data Filters</span>
            <div className="h-px w-8 bg-purple-600/30"></div>
          </div>
          
          <div className="relative w-full max-w-lg">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between px-8 py-4 rounded-[24px] shadow-2xl border transition-all duration-300 group
                ${isDarkMode ? 'bg-[#2A2438] border-white/5 text-white hover:border-purple-500/50' : 'bg-white border-purple-50 text-gray-900 hover:border-purple-200'}`}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Layout size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-purple-600 uppercase tracking-widest">Active Section</p>
                    <h3 className="text-sm font-black uppercase tracking-tight">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </h3>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg">
                    <Calendar size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Year</p>
                    <h3 className="text-sm font-black uppercase tracking-tight">{selectedYear}</h3>
                  </div>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-gray-400 group-hover:text-purple-600" />
              </div>
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                <div className={`absolute top-full left-0 right-0 mt-3 z-50 rounded-[32px] shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200
                  ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
                  
                  {/* Year Selection Header */}
                  <div className={`px-8 py-5 border-b ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-purple-50 bg-purple-50/30'}`}>
                    <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-3">Select Census Year</p>
                    <div className="flex gap-2">
                      {years.map(year => (
                        <button 
                          key={year}
                          disabled={year !== '2021'}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedYear(year);
                          }}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all
                            ${selectedYear === year 
                              ? 'bg-blue-600 text-white shadow-lg' 
                              : (year === '2021' 
                                  ? (isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-white text-gray-400 hover:text-gray-600')
                                  : 'bg-transparent text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-40')}`}
                        >
                          {year}
                          {year !== '2021' && <span className="ml-1 text-[7px] opacity-50 italic">Soon</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto no-scrollbar py-3">
                    <p className="px-8 py-2 text-[8px] font-black text-purple-600 uppercase tracking-widest">Select Section</p>
                    {tabs.map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSearchTerm('');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-8 py-4 flex items-center justify-between transition-all group
                          ${activeTab === tab.id 
                            ? 'bg-purple-600 text-white' 
                            : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600')}`}
                      >
                        <div className="flex items-center gap-4">
                          {tab.id.startsWith('section-') && (
                            <span className={`text-[10px] font-black uppercase tracking-widest w-6
                              ${activeTab === tab.id ? 'text-white/60' : 'text-purple-600/40'}`}>
                              {tab.id.split('-')[1].toUpperCase()}
                            </span>
                          )}
                          <span className="text-[11px] font-black uppercase tracking-tight">
                            {tab.label.split(': ')[1] || tab.label}
                          </span>
                        </div>
                        {activeTab === tab.id && <div className="w-2 h-2 rounded-full bg-white shadow-glow"></div>}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pb-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
                <Layout size={20} />
              </div>
              <h2 className={`text-4xl font-black uppercase tracking-tighter ${textClass}`}>
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-13">
              2021 Pilot Community-Based Monitoring System • Statistical Summary
            </p>
          </div>
          <button 
            onClick={() => handleExportExcel(activeTab)}
            className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all shadow-lg active:scale-95
              ${isDarkMode 
                ? 'bg-white text-black hover:bg-purple-600 hover:text-white' 
                : 'bg-gray-900 text-white hover:bg-purple-600'}`}
          >
            <FileSpreadsheet size={16} />
            Export Section Data
          </button>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* SECTION A: Demographic Characteristics */}
            {activeTab === 'section-a' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Total Population" value="291.6K" subValue="Census" icon={Users} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Working Age" value="188.2K" subValue="15-64" icon={Activity} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Senior Citizens" value="19.7K" subValue="65+" icon={UserCheck} color="bg-green-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Sex Ratio" value="102" subValue="M per 100 F" icon={Users} color="bg-orange-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AnalysisBarChart isDarkMode={isDarkMode} textClass={textClass} id="demo-pop" title="Population Distribution" subtitle="By Age Group and Sex" icon={Users} data={STATS_DATA.sectionA.population} maxVal={100000} isExpanded={expandedSections['demo-pop']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="demo-mar" title="Marital Status" subtitle="Civil Status Registry" icon={Heart} data={STATS_DATA.sectionA.maritalStatus} isExpanded={expandedSections['demo-mar']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION B: Migration */}
            {activeTab === 'section-b' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Total Migrants" value="82.9K" subValue="5 Years" icon={Globe} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Overseas Filipinos" value="17.9K" subValue="Active" icon={Globe} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="OFW Contract" value="69.3%" subValue="Rate" icon={ShieldCheck} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="mig-res" title="Reasons for Moving" subtitle="Top Migration Drivers" icon={TrendingUp} data={STATS_DATA.sectionB.migrationReasons} isExpanded={expandedSections['mig-res']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="mig-ofw" title="Overseas Status" subtitle="OFW and Student Registry" icon={Globe} data={STATS_DATA.sectionB.overseasFilipino} isExpanded={expandedSections['mig-ofw']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION C: Education and Literacy */}
            {activeTab === 'section-c' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="School Attendance" value="76.5%" subValue="Rate" icon={GraduationCap} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Literacy Rate" value="99.5%" subValue="Functional" icon={BookOpen} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="TVET Graduates" value="7.1K" subValue="Annual" icon={Briefcase} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AnalysisBarChart isDarkMode={isDarkMode} textClass={textClass} id="edu-att" title="Attendance Distribution" subtitle="By Sex and Status" icon={GraduationCap} data={STATS_DATA.sectionC.attendance} maxVal={50000} isExpanded={expandedSections['edu-att']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="edu-tvet" title="TVET Specializations" subtitle="Top Skills Training Programs" icon={Briefcase} data={STATS_DATA.sectionC.tvet} isExpanded={expandedSections['edu-tvet']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION D: Community Participation */}
            {activeTab === 'section-d' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Voter Reg" value="92.1%" subValue="Active" icon={UserCheck} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Voter Turnout" value="82.1%" subValue="Last Election" icon={Activity} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Assembly Attendance" value="22.9%" subValue="Barangay" icon={Users} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="part-reg" title="Political Participation" subtitle="Voter and Assembly Metrics" icon={UserCheck} data={STATS_DATA.sectionD.participation} isExpanded={expandedSections['part-reg']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="part-vol" title="Volunteer Work" subtitle="Community Service Registry" icon={Heart} data={STATS_DATA.sectionD.volunteerWork} isExpanded={expandedSections['part-vol']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION E: Economic Characteristics */}
            {activeTab === 'section-e' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Labor Force" value="102.4K" subValue="Active" icon={Users} color="bg-purple-600" trend="+4.2%" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Unemployment" value="179.6K" subValue="Total" icon={ShieldAlert} color="bg-red-500" trend="-1.5%" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="WFH Adoption" value="6.3K" subValue="Workers" icon={Monitor} color="bg-blue-500" trend="+12%" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Permanent" value="88.2%" subValue="Rate" icon={UserCheck} color="bg-green-500" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {isMatch('Employment Distribution') && (
                    <AnalysisBarChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="econ-emp"
                      title="Employment Distribution"
                      subtitle="Worked vs Did Not Work (Age 15+)"
                      icon={Activity}
                      data={STATS_DATA.sectionE.employment}
                      maxVal={160000}
                      isExpanded={expandedSections['econ-emp']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Working Arrangements') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="econ-arr"
                      title="Working Arrangements"
                      subtitle="Default Site vs Telecommuting vs Home-based"
                      icon={Monitor}
                      data={STATS_DATA.sectionE.arrangements}
                      isExpanded={expandedSections['econ-arr']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Top Occupations') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="econ-occ"
                      title="Primary Occupations"
                      subtitle="Major Occupational Groups by Census"
                      icon={Briefcase}
                      data={STATS_DATA.sectionE.occupations}
                      isExpanded={expandedSections['econ-occ']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Nature of Employment') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="econ-nat"
                      title="Nature of Employment"
                      subtitle="Permanence and Regularity Status"
                      icon={Layout}
                      data={STATS_DATA.sectionE.natureOfEmployment}
                      isExpanded={expandedSections['econ-nat']}
                      onToggle={toggleSection}
                    />
                  )}
                </div>
              </div>
            )}

            {/* SECTION F: Family Income */}
            {activeTab === 'section-f' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Avg Annual Income" value="₱185.4K" subValue="Per HH" icon={TrendingUp} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Wages Share" value="68.5%" subValue="Total" icon={Briefcase} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Remittances" value="₱15.6M" subValue="Annual" icon={Globe} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="inc-src" title="Income Sources" subtitle="Primary Revenue Streams" icon={TrendingUp} data={STATS_DATA.sectionF.incomeSources} isExpanded={expandedSections['inc-src']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="inc-brk" title="Income Brackets" subtitle="HH Distribution by Income" icon={Activity} data={STATS_DATA.sectionF.incomeBrackets} isExpanded={expandedSections['inc-brk']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION G: Food Consumption */}
            {activeTab === 'section-g' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Weekly Food Exp" value="₱4.2K" subValue="Avg per HH" icon={Activity} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Home Cooked" value="82.1%" subValue="Share" icon={Heart} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Outside Food" value="₱5.6M" subValue="City Total" icon={TrendingUp} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 max-w-2xl mx-auto w-full">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="food-exp" title="Food Expenditure" subtitle="Weekly Consumption by Category" icon={Activity} data={STATS_DATA.sectionG.foodExpenditure} isExpanded={expandedSections['food-exp']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION H: Entrepreneurship */}
            {activeTab === 'section-h' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Active Enterprises" value="18.5K" subValue="Registered" icon={Briefcase} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Sustenance Activities" value="12.4K" subValue="HHs" icon={Activity} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Retail Share" value="45.2%" subValue="Total" icon={TrendingUp} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="ent-sus" title="Sustenance Activities" subtitle="Main Family Sustenance" icon={Activity} data={STATS_DATA.sectionH.sustenance} isExpanded={expandedSections['ent-sus']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="ent-act" title="Entrepreneurial Activities" subtitle="Top Business Sectors" icon={Briefcase} data={STATS_DATA.sectionH.entrepreneurial} isExpanded={expandedSections['ent-act']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION I: Financial Inclusion */}
            {activeTab === 'section-i' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="E-Money Usage" value="83.5%" subValue="Active" icon={Monitor} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Bank Accounts" value="48.1%" subValue="Rate" icon={TrendingUp} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Loan Access" value="24.5K" subValue="HHs" icon={Activity} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="fin-acc" title="Financial Accounts" subtitle="Ownership by Type" icon={Monitor} data={STATS_DATA.sectionI.accounts} isExpanded={expandedSections['fin-acc']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="fin-loan" title="Loan Sources" subtitle="Where HHs Acquire Credit" icon={TrendingUp} data={STATS_DATA.sectionI.loans} isExpanded={expandedSections['fin-loan']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION J: Health */}
            {activeTab === 'section-j' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Disability Rate" value="4.2%" subValue="Prevalence" icon={Activity} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Maternal Care" value="8.0K" subValue="Members" icon={Heart} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Health Coverage" value="92.4%" subValue="PhilHealth" icon={ShieldCheck} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="hea-dis" title="Disability Types" subtitle="Reported Health Challenges" icon={Activity} data={STATS_DATA.sectionJ.disability} isExpanded={expandedSections['hea-dis']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="hea-sta" title="Health Status" subtitle="Maternal and Critical Care" icon={Heart} data={STATS_DATA.sectionJ.healthStatus} isExpanded={expandedSections['hea-sta']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION K: Food Security */}
            {activeTab === 'section-k' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Food Worry" value="34.5%" subValue="HH Rate" icon={ShieldAlert} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Skipped Meals" value="9.1%" subValue="Prevalence" icon={Activity} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Severe Insecurity" value="5.9%" subValue="Rate" icon={ShieldAlert} color="bg-red-500" />
                </div>
                <div className="grid grid-cols-1 max-w-2xl mx-auto w-full">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="foo-sec" title="Food Insecurity Experience" subtitle="HHs Reporting Difficulties" icon={ShieldAlert} data={STATS_DATA.sectionK.foodSecurity} isExpanded={expandedSections['foo-sec']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION L: Agricultural Activities */}
            {activeTab === 'section-l' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Agri Land" value="1.91%" subValue="Citywide" icon={MapIcon} color="bg-green-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Total Farmers" value="1,820" subValue="Persons" icon={Users} color="bg-amber-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Livestock" value="122" subValue="Holders" icon={Beef} color="bg-red-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Crop Variety" value="24" subValue="Types" icon={Sprout} color="bg-emerald-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {isMatch('Land Ownership') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="agri-land"
                      title="Agricultural Land Ownership"
                      subtitle="Household Level Participation (1.91% Citywide)"
                      icon={Tractor}
                      data={STATS_DATA.sectionL.landOwnership}
                      isExpanded={expandedSections['agri-land']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Engagement Types') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="agri-eng"
                      title="Engagement Types"
                      subtitle="Roles in Agricultural Production"
                      icon={Users}
                      data={STATS_DATA.sectionL.engagementTypes}
                      isExpanded={expandedSections['agri-eng']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Crops Planted') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="agri-crops"
                      title="Crops Planted"
                      subtitle="Permanent and Temporary Crop Distribution"
                      icon={Wheat}
                      data={STATS_DATA.sectionL.crops}
                      isExpanded={expandedSections['agri-crops']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Livestock and Poultry') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="agri-live"
                      title="Livestock and Poultry"
                      subtitle="Household Level Animal Tending"
                      icon={Beef}
                      data={STATS_DATA.sectionL.livestock}
                      isExpanded={expandedSections['agri-live']}
                      onToggle={toggleSection}
                    />
                  )}
                </div>
              </div>
            )}

            {/* SECTION M: Disaster Risk */}
            {activeTab === 'section-m' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Disaster Exp" value="83.5%" subValue="Typhoon" icon={ShieldAlert} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Preparedness" value="45.2%" subValue="Has Kit" icon={ShieldCheck} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Awareness" value="90.8%" subValue="Evac Area" icon={Users} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="dis-exp" title="Disaster Experience" subtitle="Reported Natural Calamities" icon={ShieldAlert} data={STATS_DATA.sectionM.disasterExperience} isExpanded={expandedSections['dis-exp']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="dis-pre" title="Preparedness Metrics" subtitle="HH Readiness Indicators" icon={ShieldCheck} data={STATS_DATA.sectionM.preparedness} isExpanded={expandedSections['dis-pre']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION N: Digital Economy */}
            {activeTab === 'section-n' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Internet Access" value="90.8%" subValue="Rate" icon={Globe} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Online Shopping" value="48.1%" subValue="Active" icon={Monitor} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Online Work" value="13.3%" subValue="Rate" icon={Briefcase} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="dig-acc" title="Internet Access" subtitle="Connectivity by Type" icon={Globe} data={STATS_DATA.sectionN.internetAccess} isExpanded={expandedSections['dig-acc']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="dig-act" title="Online Activities" subtitle="Top Digital Behaviors" icon={Monitor} data={STATS_DATA.sectionN.onlineActivities} isExpanded={expandedSections['dig-act']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION O: Crime Victimization */}
            {activeTab === 'section-o' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Victimization Rate" value="3.2%" subValue="Annual" icon={ShieldAlert} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Theft Prevalence" value="4.2K" subValue="Cases" icon={Activity} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Reporting Rate" value="62.5%" subValue="To Police" icon={UserCheck} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 max-w-2xl mx-auto w-full">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="cri-vic" title="Crime Victimization" subtitle="Reported Incidents by Type" icon={ShieldAlert} data={STATS_DATA.sectionO.crimeVictimization} isExpanded={expandedSections['cri-vic']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION P: Government Programs */}
            {activeTab === 'section-p' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Insurance" value="85.3%" subValue="Enrolled" icon={ShieldCheck} color="bg-blue-600" trend="+2.1%" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Bayanihan" value="31.2K" subValue="Beneficiaries" icon={Heart} color="bg-red-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="4Ps/UCT" value="3.7K" subValue="Households" icon={Landmark} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="PhilHealth" value="131.7K" subValue="Members" icon={UserCheck} color="bg-green-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {isMatch('Social Insurance Enrolment') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="gov-ins"
                      title="Social Insurance Enrolment"
                      subtitle="Household Coverage Level (85.29%)"
                      icon={ShieldCheck}
                      data={STATS_DATA.sectionP.insurance}
                      isExpanded={expandedSections['gov-ins']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Insurance Memberships') && (
                    <AnalysisBarChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="gov-memb"
                      title="Insurance Memberships"
                      subtitle="PhilHealth, SSS, and PAG-IBIG by Sex"
                      icon={Landmark}
                      data={STATS_DATA.sectionP.memberships}
                      maxVal={100000}
                      isExpanded={expandedSections['gov-memb']}
                      onToggle={toggleSection}
                    />
                  )}
                  {isMatch('Program Participation') && (
                    <SimpleValueChart 
                      isDarkMode={isDarkMode}
                      textClass={textClass}
                      id="gov-prog"
                      title="Government Program Uptake"
                      subtitle="Participation in Social and Technical Programs"
                      icon={Target}
                      data={STATS_DATA.sectionP.programParticipation}
                      isExpanded={expandedSections['gov-prog']}
                      onToggle={toggleSection}
                    />
                  )}
                </div>
              </div>
            )}
            
            {/* SECTION Q: WASH */}
            {activeTab === 'section-q' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Safe Water" value="92.4%" subValue="Access" icon={Activity} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Sanitary Toilet" value="96.8%" subValue="Rate" icon={ShieldCheck} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Handwashing" value="98.5%" subValue="Facility" icon={UserCheck} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="was-wat" title="Water Sources" subtitle="Primary Drinking Water Supply" icon={Activity} data={STATS_DATA.sectionQ.waterSource} isExpanded={expandedSections['was-wat']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="was-toi" title="Toilet Facilities" subtitle="Sanitation Infrastructure" icon={ShieldCheck} data={STATS_DATA.sectionQ.toiletFacility} isExpanded={expandedSections['was-toi']} onToggle={toggleSection} />
                </div>
              </div>
            )}

            {/* SECTION R: Housing */}
            {activeTab === 'section-r' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Electricity" value="98.3%" subValue="Access" icon={Monitor} color="bg-purple-600" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Home Ownership" value="48.1%" subValue="Own/Owner-like" icon={TrendingUp} color="bg-blue-500" />
                  <MetricCard isDarkMode={isDarkMode} textClass={textClass} title="Rental Rate" value="34.5%" subValue="HHs" icon={Activity} color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="hou-ten" title="Housing Tenure" subtitle="Ownership and Rental Status" icon={TrendingUp} data={STATS_DATA.sectionR.tenure} isExpanded={expandedSections['hou-ten']} onToggle={toggleSection} />
                  <SimpleValueChart isDarkMode={isDarkMode} textClass={textClass} id="hou-ele" title="Electricity Access" subtitle="Power Supply Coverage" icon={Monitor} data={STATS_DATA.sectionR.electricity} isExpanded={expandedSections['hou-ele']} onToggle={toggleSection} />
                </div>
              </div>
            )}
            
            {/* Empty search state for sections */}
            {searchTerm && Object.values(STATS_DATA[activeTab as keyof typeof STATS_DATA]).every(arr => 
              !Array.isArray(arr) || !arr.some(item => isMatch(item.name))
            ) && (
              <div className="py-40 flex flex-col items-center opacity-30 text-center">
                 <Search size={64} className="text-gray-300 mb-6" />
                 <h3 className={`text-2xl font-black uppercase tracking-tighter ${textClass}`}>No data results for "{searchTerm}"</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Try searching for broader terms like "employment" or "crops"</p>
              </div>
            )}
          </div>
      </div>
    </PageLayout>
  );
};

export default CBMS;
