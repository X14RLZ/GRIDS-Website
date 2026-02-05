
import React from 'react';
import { Submission } from '../types';
import { Link } from 'react-router-dom';

const CBMS: React.FC = () => {
  const data: Submission[] = [
    { id: '1', formName: 'CBMS Section A.xls', submittedBy: 'by CMO Staff 1', response: 'Approved', reviewedBy: 'by CMO Head', date: '10 October, 2025', created: '5 minutes ago', fileSize: '5 MB' },
    { id: '2', formName: 'CBMS Section B.xls', submittedBy: 'by CMO Staff 1', response: 'Approved', reviewedBy: 'by CMO Head', date: '10 October, 2025', created: '5 minutes ago', fileSize: '5 MB' },
  ];

  return (
    <div className="p-4 relative min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1">CBMS Table</h1>
        <div className="h-1.5 w-24 bg-purple-600 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-purple-50 mb-32">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <tr>
                <th className="px-4 py-4">Form Name</th>
                <th className="px-4 py-4"></th>
                <th className="px-4 py-4">Submitted</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">File Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((d) => (
                <tr key={d.id} className="hover:bg-purple-50/30 transition-colors group">
                  <td className="px-4 py-5 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-bold text-gray-700">{d.formName}</span>
                  </td>
                  <td className="px-4 py-5"><Link to={`/view/${d.id}`} className="text-[10px] font-black text-purple-600 uppercase hover:underline">View</Link></td>
                  <td className="px-4 py-5 text-xs text-gray-500 font-medium">{d.submittedBy}</td>
                  <td className="px-4 py-5 text-xs text-gray-500 font-medium">{d.date}</td>
                  <td className="px-4 py-5 text-xs text-gray-500 font-bold">{d.fileSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CBMS;
