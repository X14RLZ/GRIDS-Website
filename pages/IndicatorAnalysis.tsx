
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BarChart2, TrendingUp, Info, Target, AlertTriangle, ChevronRight, BookOpen, Brain, 
  Sparkles, FileText, Activity, ArrowLeft, Users, GraduationCap, Accessibility
} from 'lucide-react';

const INDICATOR_MAP: Record<string, { id: string, title: string, sector: string }> = {
  'literacy-rate': { id: '1', title: 'Basic and Functional Literacy Rate, By Sex', sector: 'Education and Training' },
  'completion-rate': { id: '2', title: 'School Completion Rate', sector: 'Education and Training' },
  'labor-participation': { id: '9', title: 'Labor Force Participation Rate', sector: 'Economy' },
  'stunting': { id: '15', title: 'Prevalence of Stunting', sector: 'Health' },
  'govt-seats': { id: '32', title: 'Seats Held by Women in Govt', sector: 'Power and Decision-Making' },
};

const SectionTitle: React.FC<{ children: React.ReactNode; id: string; subtitle?: string; isDarkMode?: boolean }> = ({ children, id, subtitle, isDarkMode }) => (
  <div id={id} className="mb-8 md:mb-12 scroll-mt-32">
    <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{children}</h3>
    <div className="flex items-center gap-4">
      <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">{subtitle || 'Data Source: 2021 Pilot Community-Based Monitoring System (CBMS)'}</p>
      <div className={`h-0.5 flex-1 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
    </div>
  </div>
);

const AnalysisTextSection = ({ title, items, isDarkMode }: { title: string, items: { label?: string, text: string }[] | string, isDarkMode: boolean }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  
  return (
    <div className="mb-12">
      <h4 className={`text-xl font-black uppercase mb-4 ${textClass}`}>{title}:</h4>
      {typeof items === 'string' ? (
        <p className={`text-sm font-medium leading-relaxed ${subTextClass}`}>{items}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className={`text-sm leading-relaxed ${subTextClass}`}>
                {item.label && <strong className={`font-black uppercase text-xs mr-1 ${textClass}`}>{i + 1}. {item.label} –</strong>}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const LiteracyAnalysis: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="space-y-32">
      {/* 1. GENERAL */}
      <section id="general">
        <SectionTitle id="general" isDarkMode={isDarkMode}>1a. Basic Literacy Rate</SectionTitle>
        <div className="space-y-12">
          <div className="space-y-6">
            <h4 className={`text-2xl font-black uppercase tracking-tight ${textClass}`}>General.</h4>
            <p className={`text-[11px] font-black text-gray-400 uppercase tracking-widest italic`}>* All statistical tests were performed with a 99.5% confidence level.</p>
            
            <div className={`table-container rounded-3xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
              <table className="w-full text-center min-w-[600px]">
                <thead className={`${isDarkMode ? 'bg-white/5 text-purple-300' : 'bg-gray-50/50 text-gray-400'} text-[9px] font-black uppercase tracking-widest`}>
                  <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                    <th className="py-4 px-4">total_population</th>
                    <th className="py-4 px-4">literate_count</th>
                    <th className="py-4 px-4">illiterate_count</th>
                    <th className="py-4 px-4">literacy_rate</th>
                    <th className="py-4 px-4">illiteracy_rate</th>
                  </tr>
                </thead>
                <tbody className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <tr>
                    <td className="py-8 px-4">260,203</td>
                    <td className="py-8 px-4">258,793</td>
                    <td className="py-8 px-4">1,410</td>
                    <td className="py-8 px-4">99.45812</td>
                    <td className="py-8 px-4">0.541846</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie Chart SVG Placeholder */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-white/5 p-10 rounded-[48px] border border-gray-100 dark:border-white/5">
            <h4 className={`text-lg font-black uppercase tracking-widest mb-4 text-center ${textClass}`}>Basic Literacy Proportion for 10 Years Old and Above</h4>
            <p className="text-[8px] font-bold text-gray-400 mb-10 text-center uppercase tracking-widest">χ²(1) = 2.55e+05, p = 0.00, Cramér's V = 0.70, CI99.5% [0.70, 0.70], n_obs = 260,203</p>
            <div className="relative w-80 h-80 flex flex-col items-center justify-center">
               <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                 <circle cx="50" cy="50" r="40" fill="#8B44AF" />
                 <path d="M 50 50 L 50 10 A 40 40 0 0 1 54 10.2 Z" fill="#4B1261" />
                 <text x="50" y="45" textAnchor="middle" className="text-[6px] font-black fill-white">258,793</text>
                 <text x="50" y="52" textAnchor="middle" className="text-[5px] font-black fill-white">(99%)</text>
                 <text x="55" y="15" textAnchor="start" className="text-[4px] font-black fill-[#4B1261]">1,410 (1%)</text>
               </svg>
               <div className="mt-8 flex gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#4B1261] rounded-sm"></div>
                    <span className="text-[9px] font-black uppercase text-gray-500">Cannot</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#8B44AF] rounded-sm"></div>
                    <span className="text-[9px] font-black uppercase text-gray-500">Can</span>
                 </div>
               </div>
            </div>
            <p className="mt-10 text-[9px] font-black text-purple-600 uppercase tracking-[0.3em]">Read / Write Simple Messages</p>
          </div>

          <div className="max-w-3xl">
            <AnalysisTextSection 
              title="Current Situation" 
              isDarkMode={isDarkMode}
              items="In 2021, out of a total population of 260,203 individuals aged 10 and above, 258,793 (99.46%) are literate, meaning they could read and write simple messages in any language or dialect. Meanwhile, 1,410 individuals (0.54%) were classified as illiterate." 
            />
            <AnalysisTextSection 
              title="Challenges" 
              isDarkMode={isDarkMode}
              items={[
                { label: "Quality of Literacy", text: "This does not account for functional literacy, which includes comprehension, critical thinking, and numeracy skills needed for daily life and work." },
                { label: "Limited Access to Opportunities", text: "Illiterate individuals may struggle to find stable employment, as most jobs require basic reading and writing skills. This can contribute to economic hardship and reliance on informal or low-paying work." },
                { label: "Barriers to Education and Lifelong Learning", text: "Without literacy, individuals may find it difficult to access further education, vocational training, or skill development programs, limiting their personal and professional growth." },
                { label: "Healthcare Challenges", text: "Illiterate individuals may have difficulty understanding medical instructions, prescriptions, and health information, increasing the risk of poor health outcomes." },
                { label: "Reduced Civic Participation", text: "Low literacy can hinder engagement in civic activities such as voting, accessing legal services, or understanding government policies, leading to social exclusion." },
                { label: "Intergenerational Effects", text: "Parents who struggle with literacy may find it difficult to support their children's education, potentially perpetuating the cycle of low literacy across generations." },
                { label: "Limited Use of Technology", text: "Digital literacy is often tied to basic reading and writing skills. Illiterate individuals may struggle to use smartphones, computers, or online services, which are increasingly essential for communication, banking, and accessing information." },
                { label: "Vulnerability to Exploitation", text: "Without literacy, individuals may be more susceptible to fraud, misinformation, and unfair contracts, as they cannot fully understand written agreements or official documents." }
              ]} 
            />
            <AnalysisTextSection 
              title="Strategies" 
              isDarkMode={isDarkMode}
              items={[
                { label: "Enhance Basic and Functional Literacy", text: "Education programs should go beyond basic reading and writing to include comprehension, numeracy, and critical thinking skills essential for daily life and work." },
                { label: "Expanding Access to Education and Training", text: "Community-based learning centers, adult education programs, and vocational training should be widely available, ensuring that literacy education is accessible to all, regardless of age or background." },
                { label: "Integrating Literacy into Employment and Skills Training", text: "Combining literacy education with vocational training can help individuals develop the reading and writing skills needed for stable jobs and career growth." },
                { label: "Improving Health and Digital Literacy", text: "Simplifying health information and offering digital literacy programs can help individuals navigate healthcare systems, access online services, and use technology effectively in everyday life." },
                { label: "Encouraging Civic Engagement and Legal Awareness", text: "Providing voter education, simplifying government documents, and offering community-based legal assistance can empower individuals to participate in civic life and protect themselves from exploitation." },
                { label: "Promoting Intergenerational Learning", text: "Support family literacy programs where parents and children learn together, reducing the risk of literacy challenges persisting across generations." }
              ]} 
            />
            <AnalysisTextSection 
              title="Data Requirements for Future Analysis" 
              isDarkMode={isDarkMode}
              items={[
                { label: "Granular Literacy Data", text: "Beyond basic literacy rates, data on functional literacy (reading comprehension, numeracy, and digital skills) should be gathered to assess real-world literacy levels." },
                { label: "Employment and Economic Data", text: "Information on job types, income levels, and employment stability among literate and illiterate individuals can reveal the economic impact of literacy." },
                { label: "Education and Learning Access", text: "Data on school attendance, dropout rates, participation in adult education programs, and access to learning resources can highlight gaps in education." },
                { label: "Health Literacy Indicators", text: "Tracking how well individuals understand medical information, prescription instructions, and public health messages can help assess the link between literacy and health outcomes." },
                { label: "Civic Participation Metrics", text: "Data on voter turnout, awareness of legal rights, and engagement in community activities among different literacy levels can show how literacy affects civic involvement." },
                { label: "Technology and Digital Skills", text: "Information on internet access, smartphone usage, and digital literacy levels can help assess whether people can effectively navigate online services and information." }
              ]} 
            />
            <AnalysisTextSection 
              title="Areas of Improvement" 
              isDarkMode={isDarkMode}
              items={[
                { label: "Enhancing Functional Literacy Programs", text: "Develop targeted interventions that focus on comprehension, numeracy, and problem-solving skills to ensure that literacy translates into real-world applications." },
                { label: "Promoting Lifelong Learning", text: "Support family literacy programs where parents and children learn together, reducing the risk of literacy challenges persisting across generations." },
                { label: "Expanding Accessible Learning Platforms", text: "Increase community-based and flexible learning options, catering to individuals with different needs, including adults, working individuals, and various demographic demographics." },
                { label: "Improving Health and Legal Literacy", text: "Ensure that healthcare and legal documents are simplified and accessible and provide workshops to help individuals better understand their rights and responsibilities." },
                { label: "Strengthening Digital Inclusion", text: "Promote digital literacy initiatives alongside basic literacy programs to ensure individuals can navigate online services, financial transactions, and communication tools." },
                { label: "Targeting High-Risk Groups", text: "Identify and prioritize literacy support for populations most affected by illiteracy, such as older adults, rural communities, and those in informal employment." },
                { label: "Encouraging Intergenerational Learning", text: "Support family literacy programs where parents and children learn together, reducing the risk of literacy challenges persisting across generations." },
                { label: "Enhancing Data Collection and Policy Alignment", text: "Improve tracking of literacy trends and their societal impacts to inform policy decisions and allocate resources more effectively." }
              ]} 
            />
          </div>
        </div>
      </section>

      {/* 2. BY SEX */}
      <section id="by-sex">
        <SectionTitle id="by-sex" isDarkMode={isDarkMode}>By Sex.</SectionTitle>
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[40px] border border-gray-100 dark:border-white/5 flex flex-col items-center">
                 <h5 className="text-[10px] font-black uppercase text-center mb-4 text-gray-900 dark:text-white">Basic Literacy Proportion for 10 Years Old and Above by Sex</h5>
                 <p className="text-[7px] font-bold text-gray-400 mb-6 uppercase tracking-widest">χ²(1) = 3.34, p = 0.06, Cramér's V = 0.04, CI99.5% [0.04, 0.04], n_obs = 260,203</p>
                 <div className="w-full h-48 flex items-end gap-10 px-10 pb-4">
                    <div className="flex-1 flex flex-col items-center gap-2">
                       <div className="w-full h-full relative bg-purple-100 rounded-lg overflow-hidden flex flex-col-reverse">
                          <div className="h-[99%] bg-purple-600"></div>
                          <div className="h-[1%] bg-[#4B1261]"></div>
                          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-white">125,821 (99%)</span>
                          <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-black text-[#4B1261]">658 (1%)</span>
                       </div>
                       <span className="text-[10px] font-black uppercase text-gray-500">Male</span>
                       <span className="text-[8px] font-bold text-gray-400">(n = 126,479)</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                       <div className="w-full h-full relative bg-purple-100 rounded-lg overflow-hidden flex flex-col-reverse">
                          <div className="h-[99%] bg-purple-600"></div>
                          <div className="h-[1%] bg-[#4B1261]"></div>
                          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-white">132,972 (99%)</span>
                          <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-black text-[#4B1261]">752 (1%)</span>
                       </div>
                       <span className="text-[10px] font-black uppercase text-gray-500">Female</span>
                       <span className="text-[8px] font-bold text-gray-400">(n = 133,724)</span>
                    </div>
                 </div>
                 <div className="mt-6 flex gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-[#4B1261] rounded-sm"></div>
                       <span className="text-[8px] font-black text-gray-500">Cannot</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
                       <span className="text-[8px] font-black text-gray-500">Can</span>
                    </div>
                 </div>
                 <p className="mt-8 text-[8px] font-black text-purple-600 uppercase tracking-widest">Read/Write Simple Messages</p>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[40px] border border-gray-100 dark:border-white/5 flex flex-col items-center">
                 <h5 className="text-[10px] font-black uppercase text-center mb-4 text-gray-900 dark:text-white">Basic Literacy Proportion for 10 Years Old and Above by Sex</h5>
                 <p className="text-[7px] font-bold text-gray-400 mb-6 uppercase tracking-widest">χ²(1) = 2.14, p = 0.14, Cramér's V = 0.04, CI99.5% [0.00, 0.13], n_obs = 260,203</p>
                 <div className="w-full h-48 flex items-end gap-10 px-10 pb-4">
                    <div className="flex-1 flex flex-col items-center gap-2">
                       <div className="w-full h-full relative bg-purple-100 rounded-lg overflow-hidden flex flex-col-reverse">
                          <div className="h-[51%] bg-[#E0218A]"></div>
                          <div className="h-[49%] bg-[#00A1E4]"></div>
                          <span className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white">132,972 (51%)</span>
                          <span className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white">125,821 (49%)</span>
                       </div>
                       <span className="text-[10px] font-black uppercase text-gray-500">Can</span>
                       <span className="text-[8px] font-bold text-gray-400">(n = 258,793)</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                       <div className="w-full h-full relative bg-purple-100 rounded-lg overflow-hidden flex flex-col-reverse">
                          <div className="h-[53%] bg-[#E0218A]"></div>
                          <div className="h-[47%] bg-[#00A1E4]"></div>
                          <span className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white">752 (53%)</span>
                          <span className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white">658 (47%)</span>
                       </div>
                       <span className="text-[10px] font-black uppercase text-gray-500">Cannot</span>
                       <span className="text-[8px] font-bold text-gray-400">(n = 1,410)</span>
                    </div>
                 </div>
                 <div className="mt-6 flex gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-[#E0218A] rounded-sm"></div>
                       <span className="text-[8px] font-black text-gray-500">Female</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-[#00A1E4] rounded-sm"></div>
                       <span className="text-[8px] font-black text-gray-500">Male</span>
                    </div>
                 </div>
                 <p className="mt-8 text-[8px] font-black text-purple-600 uppercase tracking-widest">Read/Write Simple Messages</p>
              </div>
            </div>

            <div className="max-w-3xl">
              <AnalysisTextSection 
                title="Current Situation" 
                isDarkMode={isDarkMode}
                items="Among the 258,793 literate individuals, 132,972 (51%) are female, while 125,821 (49%) are male. Statistical tests indicate a significant difference between the number of literate males and females, showing that literacy is significantly higher proportion of individuals who can read or write simple messages. For the 1,410 individuals classified as illiterate, 752 (53.3%) are female, and 658 (46.7%) are male. However, statistical analysis shows that this difference is not significant, meaning that sex is not a determining factor among those who cannot read or write simple messages. However, when considering the entire population aged 10 and above, there is no statistically significant difference in overall literacy rates between males and females (p = 0.14). This suggests that sex does not influence basic literacy levels across the population." 
              />
              <AnalysisTextSection 
                title="Challenges" 
                isDarkMode={isDarkMode}
                items={[
                  { label: "Educational Barriers for Males", text: "The lower proportion of literate males may reflect early workforce entry, where they may prioritize work over school." },
                  { label: "Persistent Workplace Literacy", text: "Despite more literate females, societal norms and economic roles may still limit their access to higher education and skilled employment." },
                  { label: "Limited Impact of Sex on Illiteracy", text: "Since literacy rates do not significantly differ, interventions should address broader socioeconomic factors rather than sex alone." }
                ]} 
              />
              <AnalysisTextSection 
                title="Strategies" 
                isDarkMode={isDarkMode}
                items={[
                  { label: "Support male literacy", text: "Offer flexible education programs to accommodate early workforce entry." },
                  { label: "Enhance female opportunities", text: "Bridge gaps in higher education and skilled employment access." },
                  { label: "Promote sex-inclusive education", text: "Ensure equal learning environments and resources for both sexes." },
                  { label: "Address societal norms", text: "Encourage literacy for all through awareness campaigns and policy reforms." }
                ]} 
              />
              <AnalysisTextSection 
                title="Data Requirements for Future Analysis" 
                isDarkMode={isDarkMode}
                items={[
                  { label: "Sex-Disaggregated Literacy Trends", text: "Longitudinal data on literacy rates by sex to track progress and identify emerging gaps." },
                  { label: "Policy Impact", text: "Evaluation of gender-targeted literacy initiatives and their effectiveness over time." }
                ]} 
              />
              <AnalysisTextSection 
                title="Areas of Improvement" 
                isDarkMode={isDarkMode}
                items={[
                  { label: "Strengthening Adult Literacy Programs", text: "Expand community-based literacy initiatives targeting males with lower literacy rates and females with limited access to literacy resources." },
                  { label: "Localized Literacy Support", text: "Provide tailored literacy resources in areas with higher literacy rates, ensuring accessibility for both males and females." },
                  { label: "Enhanced Data and Evaluation", text: "Strengthen monitoring of sex-disaggregated literacy trends to assess program effectiveness and refine future interventions." }
                ]} 
              />
            </div>
        </div>
      </section>

      {/* 3. ASSOCIATION */}
      <section id="association">
        <SectionTitle id="association" isDarkMode={isDarkMode}>Association with Other Demographic Characteristics.</SectionTitle>
        <div className="space-y-12">
            <div className={`table-container rounded-3xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-white border-purple-50'}`}>
              <table className="w-full text-center min-w-[700px]">
                <thead className={`${isDarkMode ? 'bg-white/5 text-purple-300' : 'bg-gray-50/50 text-gray-400'} text-[8px] font-black uppercase tracking-widest`}>
                  <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                    <th className="py-4 px-4 text-left">Variable</th>
                    <th className="py-4 px-4">General_P</th>
                    <th className="py-4 px-4">Male_P</th>
                    <th className="py-4 px-4">Female_P</th>
                    <th className="py-4 px-4">Assoc_Measure</th>
                    <th className="py-4 px-4 text-right">Interpretation</th>
                  </tr>
                </thead>
                <tbody className={`text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <tr className="border-b dark:border-white/5">
                    <td className="py-4 px-4 text-left italic">age</td>
                    <td className="py-4 px-4">4.418278e-42</td>
                    <td className="py-4 px-4">8.147285e-02</td>
                    <td className="py-4 px-4">3.996681e-64</td>
                    <td className="py-4 px-4">0.02655926</td>
                    <td className="py-4 px-4 text-right uppercase text-gray-400">Very Weak</td>
                  </tr>
                  <tr className="border-b dark:border-white/5 bg-gray-50 dark:bg-white/5">
                    <td className="py-4 px-4 text-left font-black">Cramér's V_walking</td>
                    <td className="py-4 px-4">1.562381e-218</td>
                    <td className="py-4 px-4">5.041145e-47</td>
                    <td className="py-4 px-4">1.988162e-181</td>
                    <td className="py-4 px-4">0.06229900</td>
                    <td className="py-4 px-4 text-right uppercase text-gray-400">Very Weak</td>
                  </tr>
                  <tr className="border-b dark:border-white/5">
                    <td className="py-4 px-4 text-left font-black">Cramér's V_hearing</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">7.318215e-206</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.10828000</td>
                    <td className="py-4 px-4 text-right uppercase">Weak</td>
                  </tr>
                  <tr className="border-b dark:border-white/5 bg-gray-50 dark:bg-white/5">
                    <td className="py-4 px-4 text-left font-black">Cramér's V_remembering</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">2.446386e-229</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.12328000</td>
                    <td className="py-4 px-4 text-right uppercase">Weak</td>
                  </tr>
                  <tr className="border-b dark:border-white/5">
                    <td className="py-4 px-4 text-left font-black">Cramér's V_seeing</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.18930000</td>
                    <td className="py-4 px-4 text-right uppercase">Weak</td>
                  </tr>
                  <tr className="border-b dark:border-white/5 bg-gray-50 dark:bg-white/5">
                    <td className="py-4 px-4 text-left font-black">Cramér's V_selfcaring</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.17300000</td>
                    <td className="py-4 px-4 text-right uppercase">Weak</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-left font-black">Cramér's V_communicating</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.000000e+00</td>
                    <td className="py-4 px-4">0.21150000</td>
                    <td className="py-4 px-4 text-right uppercase text-purple-600">Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={`text-sm font-medium leading-relaxed ${subTextClass} max-w-3xl`}>
              Besides sex, only age and all types of disabilities (seeing, hearing, walking, remembering, self-caring, and communicating) show a significant association with basic literacy among the tested demographic factors, which include marital status, ethnicity, religious affiliation, and solo-parent status. However, among these, only difficulty in communicating shows a moderate association, while the others have weak to very weak associations.
            </p>
        </div>
      </section>

      {/* 4. BY AGE A */}
      <section id="by-age-a">
        <SectionTitle id="by-age-a" isDarkMode={isDarkMode}>By Age A.</SectionTitle>
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[40px] border border-gray-100 dark:border-white/5">
                  <h5 className="text-[10px] font-black uppercase text-center mb-6 text-gray-900 dark:text-white italic underline">Age Distribution of Literate Population</h5>
                  <div className="h-64 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-black text-purple-600 uppercase mb-4">μ_median = 32.00</p>
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path d="M 0 180 Q 50 150, 100 100 T 200 40 T 300 80 T 400 180" fill="none" stroke="#8B44AF" strokeWidth="4" />
                      <line x1="120" y1="180" x2="120" y2="20" stroke="#8B44AF" strokeDasharray="4" />
                    </svg>
                    <div className="w-full flex justify-between px-2 mt-2 text-[8px] font-black text-gray-400">
                      <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
                    </div>
                  </div>
               </div>
               <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[40px] border border-gray-100 dark:border-white/5">
                  <h5 className="text-[10px] font-black uppercase text-center mb-6 text-gray-900 dark:text-white italic underline">Age Distribution of Illiterate Population</h5>
                  <div className="h-64 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-black text-purple-600 uppercase mb-4">μ_median = 45.00</p>
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path d="M 0 180 L 100 160 L 200 40 L 300 120 L 400 180" fill="none" stroke="#8B44AF" strokeWidth="4" />
                      <line x1="180" y1="180" x2="180" y2="20" stroke="#8B44AF" strokeDasharray="4" />
                    </svg>
                    <div className="w-full flex justify-between px-2 mt-2 text-[8px] font-black text-gray-400">
                      <span>0</span><span>30</span><span>60</span><span>90</span><span>120</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="max-w-3xl">
              <AnalysisTextSection title="Current Situation" isDarkMode={isDarkMode} items="The age distribution of the literate population, with a median of 32 years old, indicates that most individuals who can read/write simple messages are concentrated in younger age groups, while a smaller number of older individuals persist in the distribution. Meanwhile, the age distribution of the illiterate population, with a median of 45 years and two distinct peaks, indicates that illiteracy is concentrated in both younger and older age groups rather than being evenly spread across all ages." />
              <AnalysisTextSection title="Challenges" isDarkMode={isDarkMode} items={[
                { label: "Older Age and Literacy", text: "The higher median age of literate individuals suggests past educational barriers, limiting access to modern opportunities and essential services." },
                { label: "Youth Literacy Gaps", text: "A younger peak in illiteracy indicates ongoing educational gaps, socio-economic barriers, or early dropout risks." },
                { label: "Limited Employment Opportunities", text: "Illiteracy restricts job access, vocational training, and career growth, especially for older individuals adapting to workplace literacy demands." },
                { label: "Daily Functioning Barriers", text: "Difficulty reading instructions, forms, and digital platforms hinders access to healthcare, financial services, and civic participation." },
                { label: "Intergenerational Impacts", text: "Parents with low literacy may struggle to support their children's education, perpetuating literacy challenges." },
                { label: "Digital Divide", text: "Illiterate individuals, especially older ones, face greater challenges in using technology for essential services and communication." }
              ]} />
              <AnalysisTextSection title="Strategies" isDarkMode={isDarkMode} items={[
                { label: "Lifelong Learning Programs", text: "Implement targeted programs for adults and older individuals, integrating literacy into job training and daily life skills." },
                { label: "Early Educational Support", text: "Strengthen childhood education and prevent dropout risks through accessible early intervention programs." },
                { label: "Family and Community-Based Learning", text: "Engage parents and communities in literacy programs to break intergenerational gaps and improve overall literacy." },
                { label: "Practical Literacy for Daily Needs", text: "Develop simplified resources for health, financial, and civic participation." },
                { label: "Bridging the Digital Divide", text: "Provide digital literacy training to improve access to essential services and technology." }
              ]} />
              <AnalysisTextSection title="Data Requirements for Future Analysis" isDarkMode={isDarkMode} items={[
                { label: "Educational Attainment", text: "Examine the correlation between literacy and schooling levels." },
                { label: "Socioeconomic Factors", text: "Assess the impact of income, employment, and access to learning resources." },
                { label: "Program Impact", text: "Measure the effectiveness of literacy initiatives across age groups." }
              ]} />
              <AnalysisTextSection title="Areas of Improvement" isDarkMode={isDarkMode} items={[
                { label: "Targeted Interventions", text: "Focus on high-risk age groups." },
                { label: "Community Engagement", text: "Strengthen local literacy support networks." }
              ]} />
            </div>
        </div>
      </section>

      {/* 5. BY AGE B */}
      <section id="by-age-b">
        <SectionTitle id="by-age-b" isDarkMode={isDarkMode}>By Age B.</SectionTitle>
        <div className="space-y-12">
            <div className="bg-gray-50 dark:bg-white/5 p-10 rounded-[48px] border border-gray-100 dark:border-white/5 flex flex-col items-center">
               <div className="w-full max-w-2xl h-80 relative flex items-end gap-16 px-10 pb-10">
                  <div className="flex-1 flex flex-col items-center gap-4">
                     <div className="w-full h-full relative border-2 border-dashed border-gray-200 rounded-2xl flex flex-col-reverse p-2">
                        <div className="h-[31px] w-full bg-[#00A1E4] rounded-t-lg mb-1 flex items-center justify-center text-[8px] font-black text-white">31.00</div>
                        <div className="h-[34px] w-full bg-[#4B1261] rounded-b-lg flex items-center justify-center text-[8px] font-black text-white">34.00</div>
                     </div>
                     <span className="text-[10px] font-black uppercase text-gray-500">Male</span>
                     <span className="text-[8px] font-bold text-gray-400">(n = 126,479)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-4">
                     <div className="w-full h-full relative border-2 border-dashed border-gray-200 rounded-2xl flex flex-col-reverse p-2">
                        <div className="h-[32px] w-full bg-[#E0218A] rounded-t-lg mb-1 flex items-center justify-center text-[8px] font-black text-white">32.00</div>
                        <div className="h-[56px] w-full bg-[#4B1261] rounded-b-lg flex items-center justify-center text-[8px] font-black text-white">56.00</div>
                     </div>
                     <span className="text-[10px] font-black uppercase text-gray-500">Female</span>
                     <span className="text-[8px] font-bold text-gray-400">(n = 133,724)</span>
                  </div>
               </div>
               <div className="flex gap-10 mt-8">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-[#4B1261] rounded-sm"></div>
                     <span className="text-[8px] font-black text-gray-500 uppercase">Cannot</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-[#E0218A] rounded-sm"></div>
                     <span className="text-[8px] font-black text-gray-500 uppercase">Can (Female)</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-[#00A1E4] rounded-sm"></div>
                     <span className="text-[8px] font-black text-gray-500 uppercase">Can (Male)</span>
                  </div>
               </div>
            </div>

            <div className="max-w-3xl">
              <AnalysisTextSection title="Current Situation" isDarkMode={isDarkMode} items="For males, the median age is 31 years for literate individuals and 34 years for illiterate individuals, with no significant relationship between age and literacy. In contrast, for females, the median age is 32 years for literate individuals but much higher at 56 years for illiterate individuals. Statistical tests indicate a strong association between age and literacy among females, meaning literacy rates vary significantly across different female age groups." />
              <AnalysisTextSection title="Challenges" isDarkMode={isDarkMode} items={[
                { label: "Gender Disparity in Illiteracy", text: "Illiteracy is more prevalent among older females, suggesting barriers to education persist for women over time." },
                { label: "Limited Age Impact on Male Literacy", text: "The weak association between age and literacy among males indicates other factors aside from age may have greater influence on their literacy rates." },
                { label: "Targeting Older Female Literacy", text: "The high median age of illiterate females (56 years) highlights the need for interventions tailored to older women." }
              ]} />
              <AnalysisTextSection title="Data Requirements for Future Analysis" isDarkMode={isDarkMode} items={[
                { label: "Program Reach and Effectiveness", text: "Evaluate how existing literacy programs benefit different age and sex groups." }
              ]} />
              <AnalysisTextSection title="Areas of Improvement" isDarkMode={isDarkMode} items={[
                { label: "Age-Specific Female Literacy Programs", text: "Literacy interventions or policies might need to be more age-sensitive for females than for males. Design targeted interventions for older women with limited education." },
                { label: "Community-Based Learning for Women", text: "Strengthen local support networks to improve female literacy." },
                { label: "Holistic Male Literacy Strategies", text: "Identify additional factors affecting literacy in males beyond age." }
              ]} />
            </div>
        </div>
      </section>

      {/* 6. BY DIFFICULTY TYPE */}
      <section id="by-difficulty">
        <SectionTitle id="by-difficulty" isDarkMode={isDarkMode}>By Difficulty Type.</SectionTitle>
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[40px] border border-gray-100 dark:border-white/5 flex flex-col items-center">
                  <h5 className="text-[8px] font-black uppercase text-center mb-6 text-gray-500">Proportion of People with Difficulty Type and Above by Sex</h5>
                  <div className="w-full flex items-end justify-between px-2 gap-1 h-48 mb-8">
                     {['seeing', 'hearing', 'walking', 'remembering', 'self-caring', 'communicating'].map((type, i) => (
                        <div key={type} className="flex-1 flex flex-col items-center gap-1 h-full">
                           <div className="w-full h-full relative bg-purple-100 rounded-sm overflow-hidden flex flex-col-reverse">
                              <div className={`w-full bg-purple-600 h-[${95 + i}%]`}></div>
                              <div className={`w-full bg-[#4B1261] h-[${5 - i}%]`}></div>
                           </div>
                           <span className="text-[5px] font-black uppercase rotate-45 mt-2 truncate w-full text-center">{type}</span>
                        </div>
                     ))}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-[#4B1261] rounded-sm"></div>
                       <span className="text-[6px] font-black text-gray-500 uppercase">Cannot</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-purple-600 rounded-sm"></div>
                       <span className="text-[6px] font-black text-gray-500 uppercase">Can</span>
                    </div>
                  </div>
               </div>

               <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[40px] border border-gray-100 dark:border-white/5 flex flex-col items-center">
                  <h5 className="text-[8px] font-black uppercase text-center mb-6 text-gray-500">Proportion of People with Difficulty Type and Above by Sex</h5>
                  <div className="w-full flex items-end justify-between px-2 gap-1 h-48 mb-8">
                     {['seeing', 'hearing', 'walking', 'remembering', 'self-caring', 'communicating'].map((type, i) => (
                        <div key={type} className="flex-1 flex flex-col items-center gap-1 h-full">
                           <div className="w-full h-full relative bg-gray-200 rounded-sm overflow-hidden flex flex-col-reverse">
                              <div className="w-full bg-[#E0218A] h-[55%]"></div>
                              <div className="w-full bg-[#00A1E4] h-[45%]"></div>
                           </div>
                           <span className="text-[5px] font-black uppercase rotate-45 mt-2 truncate w-full text-center">{type}</span>
                        </div>
                     ))}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-[#E0218A] rounded-sm"></div>
                       <span className="text-[6px] font-black text-gray-500 uppercase">Female</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-[#00A1E4] rounded-sm"></div>
                       <span className="text-[6px] font-black text-gray-500 uppercase">Male</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="max-w-3xl">
              <AnalysisTextSection title="Current Situation" isDarkMode={isDarkMode} items="In the literate population, the vast majority—at least 97%—of individuals report having no difficulty in communicating, hearing, remembering, self-caring, or walking. Among them, a small proportion experiences some difficulty with vision, affecting 5% of males and 6% of females. In contrast, among the illiterate population, communication difficulties show the strongest association with literacy, affecting 72% of both males and females. Other significant challenges include seeing, hearing, and self-caring difficulties, which are more prevalent among illiterate males. Females generally report higher proportions of difficulties across all categories compared to males." />
              <AnalysisTextSection title="Challenges" isDarkMode={isDarkMode} items={[
                { label: "Gender Differences in Literacy Barriers", text: "Females with remembering difficulties have lower literacy rates, suggesting broader educational and social barriers for women with disabilities." },
                { label: "High Illiteracy Rates Among Those with Communication Difficulty", text: "Individuals struggling with communication have the highest illiteracy rates, highlighting a critical need for specialized interventions." }
              ]} />
              <AnalysisTextSection title="Strategies" isDarkMode={isDarkMode} items="..." />
              <AnalysisTextSection title="Data Requirements for Future Analysis" isDarkMode={isDarkMode} items={[
                { label: "Intersection of Disability and Socioeconomic Status", text: "Investigate how income, employment, and education levels intersect with literacy rates among individuals with disabilities." },
                { label: "Access to Literacy Programs", text: "Assess whether individuals with these difficulties have access to specialized literacy interventions or support services." },
                { label: "Effectiveness of Assistive Technologies", text: "Explore the role of assistive devices (e.g., braille, speech-to-text) in improving literacy outcomes." }
              ]} />
              <AnalysisTextSection title="Areas of Improvement" isDarkMode={isDarkMode} items={[
                { label: "Targeted Literacy Programs for Individuals with Communication Difficulties", text: "Develop customized learning strategies for individuals struggling with speech and language barriers." },
                { label: "Gender-Sensitive Interventions", text: "Address the unique challenges faced by females with cognitive impairments and memory-related difficulties." },
                { label: "Expansion of Inclusive Support Systems", text: "Strengthen the integration of assistive technologies and community-based support to enhance literacy among people with disabilities." }
              ]} />
            </div>
        </div>
      </section>
    </div>
  );
};

const GenericAnalysis: React.FC<{ title: string, isDarkMode: boolean }> = ({ title, isDarkMode }) => {
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="space-y-32">
      <section id="general">
        <SectionTitle id="general" isDarkMode={isDarkMode}>General Overview</SectionTitle>
        <div className={`p-12 rounded-[48px] border border-dashed flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
          <Activity size={48} className="text-gray-300 mb-6" />
          <h4 className={`text-2xl font-black uppercase tracking-tight mb-2 ${textClass}`}>Data Processing</h4>
          <p className={`text-sm font-medium leading-relaxed max-w-md ${subTextClass}`}>
            The detailed analytical breakdown for <strong>{title}</strong> is currently being synchronized from the city's 2021-2024 records.
          </p>
        </div>
      </section>

      <section id="by-sex">
        <SectionTitle id="by-sex" isDarkMode={isDarkMode}>By Sex Disaggregation</SectionTitle>
        <div className="h-40 bg-gray-50 dark:bg-white/5 rounded-3xl animate-pulse"></div>
      </section>

      <section id="association">
        <SectionTitle id="association" isDarkMode={isDarkMode}>Demographic Association</SectionTitle>
        <div className="h-40 bg-gray-50 dark:bg-white/5 rounded-3xl animate-pulse"></div>
      </section>
    </div>
  );
};

const IndicatorAnalysis: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const { indicatorId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('general');

  const indicatorData = indicatorId ? INDICATOR_MAP[indicatorId] : null;

  const navItems = [
    { id: 'general', title: 'General', icon: BarChart2 },
    { id: 'by-sex', title: 'By Sex', icon: TrendingUp },
    { id: 'association', title: 'Association', icon: Info },
    { id: 'by-age-a', title: 'By Age A', icon: Target },
    { id: 'by-age-b', title: 'By Age B', icon: Users },
    { id: 'by-difficulty', title: 'By Difficulty Type', icon: Accessibility },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollOffset = scrollContainerRef.current.scrollTop + (elementTop - containerTop) - 24;

      scrollContainerRef.current.scrollTo({ top: scrollOffset, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  if (!indicatorData) {
    return (
      <div className={`flex flex-col items-center justify-center h-full p-20 text-center ${isDarkMode ? 'bg-[#1A1625]' : 'bg-white'}`}>
        <AlertTriangle size={64} className="text-yellow-500 mb-6" />
        <h2 className={`text-4xl font-black uppercase mb-4 ${textClass}`}>Record Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">The indicator code provided does not match any current monitored GAD metrics in the GRIDS registry.</p>
        <button onClick={() => navigate('/gad-data')} className="px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-600 transition-all">Return to Catalog</button>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col animate-in fade-in duration-700 overflow-hidden ${isDarkMode ? 'bg-[#0F0C15]' : 'bg-white'}`}>
      <div className="flex flex-col lg:flex-row h-full min-h-0">
        <aside className={`w-full lg:w-80 border-b lg:border-b-0 lg:border-r flex lg:flex-col overflow-x-auto no-scrollbar lg:overflow-y-auto shrink-0 transition-colors duration-500
          ${isDarkMode ? 'bg-[#1A1625] border-white/5' : 'bg-[#fdfaff] border-purple-100'}`}>
          <div className="p-4 lg:p-8 flex lg:flex-col gap-2">
            <div className="flex items-center gap-3 px-5 mb-8 hidden lg:flex">
               <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
                  <GraduationCap size={24} />
               </div>
               <div>
                  <h4 className={`text-[10px] font-black uppercase leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Indicator</h4>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ref ID: {indicatorData.id}</p>
               </div>
            </div>

            <p className="hidden lg:block text-[9px] font-black text-purple-600 uppercase tracking-[0.4em] mb-4 px-5">Navigation</p>
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all whitespace-nowrap lg:w-full
                  ${activeSection === item.id 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : (isDarkMode ? 'text-gray-500 hover:text-purple-300 hover:bg-white/5' : 'bg-white lg:bg-transparent text-gray-400 hover:text-purple-600 hover:bg-white')}`}
              >
                <item.icon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto custom-scrollbar relative" ref={scrollContainerRef}>
          <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20 pb-32">
            
            {/* Standardized Page Header Block */}
            <div className="mb-16 text-center lg:text-left">
              <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${textClass}`}>
                {indicatorData.title}
              </h1>
              <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mt-3">
                Sector: {indicatorData.sector}
              </p>
              <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-6 mx-auto lg:mx-0"></div>
            </div>

            {indicatorId === 'literacy-rate' ? (
              <LiteracyAnalysis isDarkMode={isDarkMode} />
            ) : (
              <GenericAnalysis title={indicatorData.title} isDarkMode={isDarkMode} />
            )}

            <footer className="mt-40 pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col items-center opacity-30">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-center leading-loose">
                Copyright © City Government of Baguio<br />City Planning, Development, and Sustainability Office<br />Developed by: Charles S. Chantioco
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndicatorAnalysis;
