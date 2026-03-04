
import React from 'react';
import { CPDSOLogo } from './Logo';

interface FooterProps {
  isDarkMode?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer className="w-full flex flex-col items-center pb-4">
      <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity mb-2">
        <CPDSOLogo size="md" />
      </div>
      <p className={`text-[10px] font-black uppercase tracking-[0.3em] text-center leading-relaxed transition-colors
        ${isDarkMode ? 'text-gray-700' : 'text-gray-900 opacity-20'}`}>
        Copyright © City Government of Baguio<br />
        City Planning, Development, and Sustainability Office – Data Division<br />
        Developed by: Charles S. Chantioco
      </p>
    </footer>
  );
};

export default Footer;
