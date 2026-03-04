
import React from 'react';

const Programs: React.FC = () => {
  const programs = [
    { title: 'CSWDO', bg: 'https://picsum.photos/seed/cswdo/1200/400' },
  ];

  return (
    <div className="p-4 relative min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Programs, Projects, Services and Activities</h1>
        <div className="h-1.5 w-24 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-purple-50 mb-32">
        {programs.map((p, i) => (
          <div key={i} className="relative h-48 rounded-[32px] overflow-hidden group shadow-md mb-6">
            <img src={p.bg} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-5xl font-black text-white">{p.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
