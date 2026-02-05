
import React from 'react';
import { 
  GraduationCap, TrendingUp, Heart, ShieldAlert, 
  UserCheck, Globe, Briefcase, ImageIcon, 
  Sun, UserPlus, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const GADData: React.FC = () => {
  const sectors = [
    { id: 'education-and-training', title: 'Education and Training', icon: GraduationCap, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600' },
    { id: 'economy', title: 'Economy', icon: TrendingUp, img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600' },
    { id: 'health', title: 'Health', icon: Heart, img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600' },
    { id: 'poverty', title: 'Poverty', icon: HelpCircle, img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600' },
    { id: 'power', title: 'Power and Decision-Making', icon: UserCheck, img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600' },
    { id: 'violence', title: 'Violence Against Women', icon: ShieldAlert, img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600' },
    { id: 'human-rights', title: 'Human Rights', icon: Globe, img: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=80&w=600' },
    { id: 'institutional', title: 'Institutional Mechanism', icon: Briefcase, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600' },
    { id: 'media', title: 'Media', icon: ImageIcon, img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600' },
    { id: 'environment', title: 'Environment', icon: Sun, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600' },
    { id: 'social-protection', title: 'Social Protection', icon: UserPlus, img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto p-4 relative">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">GAD Data and Analysis</h1>
        <div className="h-1.5 w-32 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[48px] p-16 shadow-2xl shadow-purple-950/5 border border-purple-50">
        <h2 className="text-center text-5xl font-black text-gray-900 mb-20 uppercase tracking-tighter">
          CORE GENDER AND DEVELOPMENT (GAD) INDICATORS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((s, idx) => (
            <Link 
              key={idx}
              to={`/gad-data/${s.id}`} 
              className={`group relative h-64 rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              <img 
                src={s.img} 
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-purple-900/40 transition-colors duration-500"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                    <s.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-white font-black text-sm uppercase leading-tight tracking-widest group-hover:translate-x-1 transition-transform">{s.title}</h3>
                </div>
              </div>
            </Link>
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

export default GADData;
