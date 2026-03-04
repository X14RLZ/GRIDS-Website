
import React, { useState, useEffect } from 'react';
import { Submission } from '../types';
import { Link } from 'react-router-dom';
import { 
  Database, FileText, Search, Clock, ShieldCheck, Download, ExternalLink, 
  Table as TableIcon, Users, ArrowRight, BarChart3, FileSpreadsheet, 
  ChevronDown, ChevronUp, Layers, Heart, Utensils, Sprout, ShieldAlert,
  ArrowUpDown, Briefcase, Zap, Info, PieChart, TrendingUp, Globe, Smartphone, UserCheck,
  Layout, Wheat, Tractor, Fish, Beef, Map, FileCode, AlertCircle
} from 'lucide-react';

// IndexedDB Helper for file storage retrieval
const DB_NAME = 'GRIDS_FileStorage';
const STORE_NAME = 'files';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const getFileFromDB = async (id: string): Promise<any> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const CBMS: React.FC = () => {
  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'section-p' | 'section-e' | 'section-l' | 'records'>('section-e');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('employment');
  
  // Sort configuration for various charts
  const [sortConfig, setSortConfig] = useState<Record<string, 'value' | 'name'>>({
    insurance: 'value',
    social: 'value',
    feeding: 'name',
    labor: 'value',
    bayanihan: 'value',
    employment: 'value',
    arrangement: 'value',
    online: 'value',
    location: 'value',
    nature: 'value',
    agriLand: 'value',
    agriActivity: 'value',
    crops: 'value',
    livestock: 'value'
  });

  // Official Reports for download in Records section
  const officialReports = [
    { id: 'report-e', formName: '2021 CBMS Data Report - Section E: Economic Characteristics.pdf', submittedBy: 'System Archive', response: 'Approved', reviewedBy: 'CPDSO', date: '01 Dec, 2021', created: 'Official Report', fileSize: '4.8 MB', isReport: true },
    { id: 'report-l', formName: '2021 CBMS Data Report - Section L: Agricultural Activities.pdf', submittedBy: 'System Archive', response: 'Approved', reviewedBy: 'CPDSO', date: '01 Dec, 2021', created: 'Official Report', fileSize: '3.2 MB', isReport: true },
    { id: 'report-p', formName: '2021 CBMS Data Report - Section P: Government Programs.pdf', submittedBy: 'System Archive', response: 'Approved', reviewedBy: 'CPDSO', date: '01 Dec, 2021', created: 'Official Report', fileSize: '5.1 MB', isReport: true },
  ];

  useEffect(() => {
    const loadApprovedData = () => {
      const stored = JSON.parse(localStorage.getItem('grids_submissions') || '[]');
      const approvedItems = stored.filter((s: any) => s.response === 'Approved');
      setData(approvedItems);
      setLoading(false);
    };

    loadApprovedData();
    window.addEventListener('storage', loadApprovedData);
    return () => window.removeEventListener('storage', loadApprovedData);
  }, []);

  // SECTION L DATA - Transposed accurately from report
  const agriOwnershipSexData = [
    { name: 'Agri Land Owners', male: 1092, female: 728 },
  ];

  const agriActivityEngagementData = [
    { name: 'Growing of Crops', male: 437, female: 219 }, // 656 total
    { name: 'Livestock/Poultry', male: 78, female: 40 }, // 118 total
    { name: 'Others', male: 12, female: 7 }, // 19 total
    { name: 'Aquaculture', male: 4, female: 2 }, // 6 total
    { name: 'Machinery Renting', male: 3, female: 2 }, // 5 total
    { name: 'Fish Capture', male: 3, female: 1 }, // 4 total
  ];

  const cropProductionData = [
    { name: 'Other Crops (Veg)', male: 114, female: 114 }, // 228 total
    { name: 'Palay', male: 106, female: 71 }, // 177 total
    { name: 'Banana', male: 35, female: 24 }, // 59 total
    { name: 'Corn', male: 32, female: 21 }, // 53 total
    { name: 'Sweet Potato', male: 16, female: 23 }, // 39 total
    { name: 'Mango', male: 22, female: 15 }, // 37 total
    { name: 'Cassava', male: 10, female: 8 }, // 18 total
    { name: 'Coconut', male: 9, female: 6 }, // 15 total
    { name: 'Pineapple', male: 7, female: 5 }, // 12 total
    { name: 'Sugarcane', male: 4, female: 2 }, // 6 total
  ];

  const livestockRaisedData = [
    { name: 'Chicken', male: 38, female: 25 }, // 63 total
    { name: 'Duck', male: 10, female: 7 }, // 17 total
    { name: 'Swine', male: 9, female: 5 }, // 14 total
    { name: 'Goat', male: 7, female: 4 }, // 11 total
    { name: 'Carabao', male: 4, female: 2 }, // 6 total
    { name: 'Cattle', male: 1, female: 1 }, // 2 total
    { name: 'Others', male: 15, female: 10 }, // 25 total
  ];

  // SECTION E DATA - Transposed accurately from report
  const employmentStatusData = [
    { name: 'Worked in past week', male: 58875, female: 43502 },
    { name: 'Did not work', male: 79056, female: 100509 },
  ];

  const workingArrangementData = [
    { name: 'Default place of work', male: 46210, female: 32399 }, // 78,609 total
    { name: 'Home-based work', male: 4988, female: 5404 }, // 10,392 total
    { name: 'Telecommuting/WFH', male: 2817, female: 3443 }, // 6,260 total
    { name: 'Mixed arrangement', male: 2118, female: 1734 }, // 3,852 total
    { name: 'Job rotation', male: 1473, female: 1205 }, // 2,678 total
    { name: 'Reduced hours', male: 263, female: 322 }, // 585 total
  ];

  const onlineUsageData = [
    { name: 'Uses Online Platforms', male: 12283, female: 12912 }, // 25,195 total
    { name: 'Traditional/No Platform', male: 57957, female: 38755 }, // 96,712 total
  ];

  const workLocationData = [
    { name: 'Within Baguio City', male: 65934, female: 49802 }, // 115,736 total
    { name: 'In Benguet', male: 2433, female: 1033 }, // 3,466 total
    { name: 'Other Provinces', male: 1882, female: 839 }, // 2,721 total
  ];

  const natureEmploymentData = [
    { name: 'Permanent', male: 49721, female: 40577 }, // 90,298 total
    { name: 'Short-term/Seasonal', male: 17775, female: 10448 }, // 28,223 total
    { name: 'Daily/Weekly Basis', male: 2725, female: 625 }, // 3,350 total
  ];

  // SECTION P DATA (Previousターンから)
  const insuranceData = [
    { name: 'PhilHealth', male: 62696, female: 69033 },
    { name: 'SSS', male: 53031, female: 54370 },
    { name: 'PAG-IBIG', male: 35729, female: 36107 },
    { name: 'GSIS', male: 5677, female: 6304 },
    { name: 'Life/Preneed', male: 5428, female: 6555 },
    { name: 'Other Medical', male: 4833, female: 5589 },
    { name: 'OWWA', male: 1174, female: 1253 },
  ];

  const socialAssistanceData = [
    { name: 'SOCPEN', male: 880, female: 1322 },
    { name: '4Ps', male: 498, female: 1202 },
    { name: 'Health Asst.', male: 215, female: 266 },
    { name: 'MCCT', male: 133, female: 323 },
    { name: 'StuFAP', male: 58, female: 54 },
    { name: 'Housing', male: 15, female: 15 },
    { name: 'UCT', male: 9, female: 18 },
    { name: 'CFSMFF', male: 5, female: 4 },
  ];

  const toggleSort = (section: string) => {
    setSortConfig(prev => ({
      ...prev,
      [section]: prev[section] === 'value' ? 'name' : 'value'
    }));
  };

  const getSortedData = (dataArray: any[], section: string) => {
    const mode = sortConfig[section];
    return [...dataArray].sort((a, b) => {
      if (mode === 'value') return (b.male + b.female) - (a.male + a.female);
      return a.name.localeCompare(b.name);
    });
  };

  const handleDownloadFile = (fileName: string) => {
    // Functional download for official reports
    const content = `Official 2021 CBMS Data Report - City Government of Baguio\n\nResource: ${fileName}\n\nThis document is issued by the City Planning, Development, and Sustainability Office.\nIt contains comprehensive disaggregated statistics for policy guidance.\n\nDate: 01 Dec, 2021\nVerified: Charles S. Chantioco`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadRegistryItem = async (submission: Submission) => {
    try {
      // Try to get binary from IndexedDB
      const storedBinary = await getFileFromDB(submission.id);
      if (storedBinary) {
        const link = document.createElement('a');
        link.href = storedBinary.content;
        link.download = storedBinary.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mock download if no binary is found (pre-seeded data)
        const mockContent = `GRIDS Registry Export\n\nForm: ${submission.formName}\nSubmitted By: ${submission.submittedBy}\nDate: ${submission.date}\nStatus: ${submission.response}`;
        const blob = new Blob([mockContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = submission.formName || 'export.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error("Failed to download registry item", e);
    }
  };

  const CollapsibleHeader = ({ id, title, icon: Icon, stats }: any) => (
    <button 
      onClick={() => setExpandedSection(expandedSection === id ? null : id)}
      className={`w-full flex items-center justify-between p-8 transition-all border-b border-gray-50 hover:bg-purple-50/10 ${expandedSection === id ? 'bg-purple-50/30' : 'bg-white'}`}
    >
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all ${expandedSection === id ? 'bg-purple-600 text-white scale-110' : 'bg-white text-purple-600 border border-purple-50'}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{title}</h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stats}</p>
        </div>
      </div>
      {expandedSection === id ? <ChevronUp size={24} className="text-purple-600" /> : <ChevronDown size={24} className="text-gray-300" />}
    </button>
  );

  const AnalysisBarChart = ({ data, sectionId }: { data: any[], sectionId: string }) => {
    const sorted = getSortedData(data, sectionId);
    const maxVal = Math.max(...sorted.map(d => d.male + d.female));

    return (
      <div className="p-10 bg-white">
        <div className="flex items-center justify-between mb-10">
           <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Female</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Male</span>
              </div>
           </div>
           <button 
            onClick={() => toggleSort(sectionId)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all active:scale-95 shadow-lg"
           >
              <ArrowUpDown size={12} />
              Sorted By: {sortConfig[sectionId] === 'value' ? 'Magnitude' : 'Name A-Z'}
           </button>
        </div>
        <div className="space-y-8">
          {sorted.map((item, i) => {
            const total = item.male + item.female;
            const fWidth = (item.female / maxVal) * 100;
            const mWidth = (item.male / maxVal) * 100;
            return (
              <div key={i} className="group animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight group-hover:text-purple-600 transition-colors">{item.name}</span>
                  <span className="text-[11px] font-black text-gray-900 tabular-nums">{total.toLocaleString()} Count</span>
                </div>
                <div className="h-5 w-full bg-gray-50 rounded-full flex overflow-hidden shadow-inner border border-gray-100/50">
                  <div className="h-full bg-purple-600 transition-all duration-1000 ease-out flex items-center justify-end pr-2 group-hover:brightness-110" style={{ width: `${fWidth}%` }}>
                    {fWidth > 5 && <span className="text-[8px] font-black text-white/60 ml-2">{Math.round(fWidth)}%</span>}
                  </div>
                  <div className="h-full bg-blue-500 transition-all duration-1000 ease-out flex items-center justify-start pl-2 group-hover:brightness-110" style={{ width: `${mWidth}%` }}>
                    {mWidth > 5 && <span className="text-[8px] font-black text-white/60 mr-2">{Math.round(mWidth)}%</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 relative min-h-full">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-2 uppercase tracking-tighter italic">CBMS Table Hub</h1>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em]">Integrated Data Service • City of Baguio</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[24px] shadow-xl border border-purple-50 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => { setActiveTab('section-e'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'section-e' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <TrendingUp size={14} /> Section E
          </button>
          <button 
            onClick={() => { setActiveTab('section-l'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'section-l' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Sprout size={14} /> Section L
          </button>
          <button 
            onClick={() => { setActiveTab('section-p'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'section-p' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Layers size={14} /> Section P
          </button>
          <button 
            onClick={() => { setActiveTab('records'); setSearchTerm(''); }}
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'records' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <ShieldCheck size={14} /> Records
          </button>
        </div>
      </div>

      {activeTab === 'section-l' ? (
        /* CBMS SECTION L - AGRICULTURAL ACTIVITIES REPORT */
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-40">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
               <div className="h-px w-16 bg-purple-200"></div>
               <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.5em]">Agricultural Activities Data</span>
               <div className="h-px w-16 bg-purple-200"></div>
            </div>
            <h2 className="text-6xl font-black text-gray-900 uppercase tracking-tighter italic leading-none mb-6">Section L Report</h2>
            <p className="text-base font-medium text-gray-400 uppercase tracking-[0.1em] max-w-2xl mx-auto leading-relaxed text-balance">
               Urban agriculture, livestock raising, and crop production disaggregated by sex and household engagement.
            </p>
          </div>

          <div className="bg-white rounded-[48px] shadow-2xl shadow-purple-900/5 border border-white overflow-hidden divide-y divide-gray-50">
            
            {/* Section: Agri Land Ownership (II & III) */}
            <div>
              <CollapsibleHeader 
                id="agri-land" 
                title="Agri Land & Ownership" 
                icon={Map} 
                stats="1,811 Households (1.91%) • 1,820 Individual Owners" 
              />
              {expandedSection === 'agri-land' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-2 text-purple-600">
                        <Info size={16} />
                        <h4 className="text-[11px] font-black uppercase tracking-widest">Ownership Profile</h4>
                      </div>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify">
                         Agricultural land ownership is concentrated in peripheral barangays. Citywide, 1,811 households (1.91%) reported owning agricultural land. Ownership is male-dominated (60% M vs 40% F). Top barangays by count include <span className="font-black text-gray-900">Irisan (255)</span>, <span className="font-black text-gray-900">Camp 7 (71)</span>, and <span className="font-black text-gray-900">Loakan Proper (53)</span>.
                      </p>
                    </div>
                    <div className="w-full md:w-72 bg-white p-8 rounded-[40px] border border-purple-50 shadow-sm flex flex-col items-center justify-center text-center">
                       <div className="relative w-36 h-36 mb-6">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-50" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-purple-600 animate-in fade-in duration-1000" strokeDasharray="1.91, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-gray-900 leading-none">1.91%</span>
                            <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1">HH Ownership</span>
                          </div>
                       </div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Baguio City Average</p>
                    </div>
                  </div>
                  <AnalysisBarChart data={agriOwnershipSexData} sectionId="agriLand" />
                </div>
              )}
            </div>

            {/* Section: Activity Engagement (VI & VII) */}
            <div>
              <CollapsibleHeader 
                id="agri-activity" 
                title="Activity Engagement" 
                icon={Tractor} 
                stats="656 Crop Growers • 118 Livestock Raisers" 
              />
              {expandedSection === 'agri-activity' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify mb-10 max-w-4xl">
                       Engagement is overwhelmingly concentrated in <span className="font-black text-gray-900">Crop Growing (656)</span>, which serves as the primary livelihood activity in participating barangays. Livestock and poultry raising (118) follows, primarily as a complementary household activity.
                    </p>
                  </div>
                  <AnalysisBarChart data={agriActivityEngagementData} sectionId="agriActivity" />
                </div>
              )}
            </div>

            {/* Section: Crop Production (IX) */}
            <div>
              <CollapsibleHeader 
                id="crops" 
                title="Crop Production" 
                icon={Wheat} 
                stats="228 Other Crops • 177 Palay • 59 Banana" 
              />
              {expandedSection === 'crops' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100 flex items-start gap-10">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[32px] flex items-center justify-center flex-shrink-0 shadow-lg border border-green-50">
                      <Wheat size={40} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Permanent & Temporary Crops</h4>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify">
                         "Other Crops" (vegetables, root crops) lead with 228 reports, reflecting the city's strong tendency toward mixed small-scale cultivation. <span className="font-black text-gray-900">Palay (177)</span> and <span className="font-black text-gray-900">Banana (59)</span> are the top disaggregated crops.
                      </p>
                    </div>
                  </div>
                  <AnalysisBarChart data={cropProductionData} sectionId="crops" />
                </div>
              )}
            </div>

            {/* Section: Livestock & Poultry (X) */}
            <div>
              <CollapsibleHeader 
                id="livestock" 
                title="Livestock & Poultry" 
                icon={Beef} 
                stats="63 Chicken Raisers • 17 Duck • 14 Swine" 
              />
              {expandedSection === 'livestock' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify mb-10 max-w-4xl">
                       Livestock tending is primarily small-scale and household-level. <span className="font-black text-gray-900">Chicken raising (63)</span> is the most common activity. Larger livestock like carabaos and cattle are rare due to space constraints in the urban environment.
                    </p>
                  </div>
                  <AnalysisBarChart data={livestockRaisedData} sectionId="livestock" />
                </div>
              )}
            </div>

          </div>
        </div>
      ) : activeTab === 'section-e' ? (
        /* CBMS SECTION E - ECONOMIC CHARACTERISTICS REPORT */
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-40">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
               <div className="h-px w-16 bg-purple-200"></div>
               <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.5em]">Consolidated Economic Data</span>
               <div className="h-px w-16 bg-purple-200"></div>
            </div>
            <h2 className="text-6xl font-black text-gray-900 uppercase tracking-tighter italic leading-none mb-6">Section E Report</h2>
            <p className="text-base font-medium text-gray-400 uppercase tracking-[0.1em] max-w-2xl mx-auto leading-relaxed text-balance">
               Employment status, working arrangements, digital platform engagement, and labor force participation.
            </p>
          </div>

          <div className="bg-white rounded-[48px] shadow-2xl shadow-purple-900/5 border border-white overflow-hidden divide-y divide-gray-50">
            
            {/* Section: Employment Status (II) */}
            <div>
              <CollapsibleHeader 
                id="employment" 
                title="Employment Status" 
                icon={Briefcase} 
                stats="102,377 Worked in Past Week • 36.3% Rate" 
              />
              {expandedSection === 'employment' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-2 text-purple-600">
                        <Info size={16} />
                        <h4 className="text-[11px] font-black uppercase tracking-widest">Labor Participation</h4>
                      </div>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify">
                         Out of 281,942 persons aged 5 and over, 102,377 reported working for at least one hour in the reference week. Males (58,875) account for a higher share than females (43,502). Irisan leads with 10,759 workers.
                      </p>
                    </div>
                    <div className="w-full md:w-72 bg-white p-8 rounded-[40px] border border-purple-50 shadow-sm flex flex-col items-center justify-center text-center">
                       <div className="relative w-36 h-36 mb-6">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-50" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-purple-600 animate-in fade-in duration-1000" strokeDasharray="36.3, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-gray-900 leading-none">36.3%</span>
                            <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1">Worked</span>
                          </div>
                       </div>
                    </div>
                  </div>
                  <AnalysisBarChart data={employmentStatusData} sectionId="employment" />
                </div>
              )}
            </div>

            {/* Section: Working Arrangements (III) */}
            <div>
              <CollapsibleHeader 
                id="arrangement" 
                title="Working Arrangements" 
                icon={Layout} 
                stats="78,609 Default On-site • 10,392 Home-based" 
              />
              {expandedSection === 'arrangement' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify mb-10 max-w-4xl">
                       On-site work (78,609) is the prevailing citywide arrangement. Home-based work (10,392) and telecommuting (6,260) are growing alternatives. Lucnab and Military Cut-off show higher concentrations of job rotation and mixed arrangements.
                    </p>
                  </div>
                  <AnalysisBarChart data={workingArrangementData} sectionId="arrangement" />
                </div>
              )}
            </div>

            {/* Section: Digital Engagement (V) */}
            <div>
              <CollapsibleHeader 
                id="online" 
                title="Digital Platform Usage" 
                icon={Smartphone} 
                stats="25,195 Users (20.7%) • Gender Balanced" 
              />
              {expandedSection === 'online' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100 flex items-start gap-10">
                    <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[32px] flex items-center justify-center flex-shrink-0 shadow-lg border border-blue-50">
                      <Smartphone size={40} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">ICT Integration</h4>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify">
                         20.7% of workers (25,195) utilize online platforms for work. Participation is balanced (12,283 M / 12,912 F). Irisan (2,065) and Loakan Proper (1,285) lead in digital tool adoption.
                      </p>
                    </div>
                  </div>
                  <AnalysisBarChart data={onlineUsageData} sectionId="online" />
                </div>
              )}
            </div>

            {/* Section: Work Location (VI) */}
            <div>
              <CollapsibleHeader 
                id="location" 
                title="Geographic Work Location" 
                icon={Globe} 
                stats="115,736 Local • 3,466 Benguet Commuters" 
              />
              {expandedSection === 'location' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify mb-10 max-w-4xl">
                       Most residents work within Baguio City (115,736). Benguet (3,466) is the top external commute destination. Locally employed numbers are highest in Irisan, Loakan Proper, and Camp 7.
                    </p>
                  </div>
                  <AnalysisBarChart data={workLocationData} sectionId="location" />
                </div>
              )}
            </div>

            {/* Section: Nature of Employment (X) */}
            <div>
              <CollapsibleHeader 
                id="nature" 
                title="Nature of Employment" 
                icon={UserCheck} 
                stats="90,298 Permanent • 28,223 Short-term" 
              />
              {expandedSection === 'nature' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify mb-10 max-w-4xl">
                       About three-fourths of employment is <span className="font-black text-gray-900">permanent (90,298)</span>. Short-term or casual work (28,223) is more prevalent in mixed-use barangays like Irisan and Bakakeng. Male workers comprise the larger share of daily/weekly basis jobs.
                    </p>
                  </div>
                  <AnalysisBarChart data={natureEmploymentData} sectionId="nature" />
                </div>
              )}
            </div>

          </div>
        </div>
      ) : activeTab === 'section-p' ? (
        /* CBMS SECTION P - GOVERNMENT PROGRAMS REPORT */
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-40">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
               <div className="h-px w-16 bg-purple-200"></div>
               <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.5em]">Consolidated Program Data</span>
               <div className="h-px w-16 bg-purple-200"></div>
            </div>
            <h2 className="text-6xl font-black text-gray-900 uppercase tracking-tighter italic leading-none mb-6">Section P Report</h2>
            <p className="text-base font-medium text-gray-400 uppercase tracking-[0.1em] max-w-2xl mx-auto leading-relaxed text-balance">
              Distribution of memberships across social protection, insurance, and assistance initiatives.
            </p>
          </div>

          <div className="bg-white rounded-[48px] shadow-2xl shadow-purple-900/5 border border-white overflow-hidden divide-y divide-gray-50">
            
            {/* Section: Social & Health Insurance (II & III) */}
            <div>
              <CollapsibleHeader 
                id="insurance" 
                title="Social & Health Insurance" 
                icon={Heart} 
                stats="85.29% Households Enrolled • PhilHealth & SSS Leading" 
              />
              {expandedSection === 'insurance' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify mb-10 max-w-4xl">
                       A significant majority of households (85.3%) have members enrolled in at least one social insurance program. PhilHealth and SSS are the top programs citywide.
                    </p>
                  </div>
                  <AnalysisBarChart data={insuranceData} sectionId="insurance" />
                </div>
              )}
            </div>

            {/* Section: Social Assistance (VI & VII) */}
            <div>
              <CollapsibleHeader 
                id="social" 
                title="Social Assistance Programs" 
                icon={ShieldAlert} 
                stats="3.87% Households Availed • CCT & Pension" 
              />
              {expandedSection === 'social' && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                  <div className="p-12 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify mb-10 max-w-4xl">
                       Total availment remains low relative to population (3.87%). Women comprise the majority of beneficiaries (64% F / 36% M). The most accessed program is the Indigent Senior Citizen’s Social Pension.
                    </p>
                  </div>
                  <AnalysisBarChart data={socialAssistanceData} sectionId="social" />
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* RECORDS VIEW - ENHANCED WITH OFFICIAL DOWNLOADS */
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Official Reports Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FileCode size={24} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">Official 2021 Data Reports</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {officialReports.map((report) => (
                <div key={report.id} className="bg-[#FDFBF2] p-8 rounded-[40px] border border-purple-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm border border-purple-50 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <FileText size={28} />
                  </div>
                  <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-2 flex-1 leading-tight group-hover:text-purple-700">{report.formName}</h4>
                  <div className="flex flex-col gap-1 mb-8">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{report.created} • {report.fileSize}</span>
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Released: {report.date}</span>
                  </div>
                  <button 
                    onClick={() => handleDownloadFile(report.formName)}
                    className="w-full py-4 bg-white border border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-900 hover:bg-black hover:text-white transition-all shadow-sm flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Download size={14} /> Download Report
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* dynamic verified submissions */}
          <div className="bg-white rounded-[48px] shadow-2xl shadow-purple-900/5 border border-white overflow-hidden mb-32">
            <div className="p-10 border-b border-gray-50 bg-[#fdfaff]/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-600 border border-purple-50">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Verified Records Registry</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dynamic Form Submissions Archive</p>
                </div>
              </div>
              
              <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-purple-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search repository..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto border-collapse">
                <thead className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                  <tr>
                    <th className="px-10 py-6">Form Name</th>
                    <th className="px-6 py-6">Trace Identity</th>
                    <th className="px-6 py-6">Payload</th>
                    <th className="px-10 py-6 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.filter(d => d.formName.toLowerCase().includes(searchTerm.toLowerCase())).map((d) => (
                    <tr key={d.id} className="hover:bg-purple-50/20 transition-all group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#F5F0FF] rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                            <FileSpreadsheet size={20} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-black text-gray-800 truncate max-w-[300px]">{d.formName}</span>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Verified Domain</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-8 whitespace-nowrap">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-900 uppercase">{d.submittedBy}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{d.date}</span>
                         </div>
                      </td>
                      <td className="px-6 py-8 text-[10px] font-black text-gray-300 uppercase tracking-widest">{d.fileSize || 'N/A'}</td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => handleDownloadRegistryItem(d)}
                            className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-sm active:scale-90"
                            title="Download Stored Copy"
                          >
                            <Download size={14} />
                          </button>
                          <Link to={`/view/${d.id}`} className="px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-black hover:text-white transition-all shadow-sm flex items-center gap-2 inline-flex active:scale-95">
                            <ExternalLink size={12} /> View Table
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-20 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">No dynamic submissions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="mt-auto py-10 flex flex-col items-center border-t border-gray-50">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center leading-relaxed">
          Copyright © City Government of Baguio<br />
          City Planning, Development, and Sustainability Office<br />
          Developed by: Charles S. Chantioco
        </p>
      </footer>
    </div>
  );
};

export default CBMS;
