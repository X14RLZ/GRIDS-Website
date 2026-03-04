
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Logo component representing the GRIDS (Gender-Responsive Integrated Database System)
 * visual identity.
 */
export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', isDarkMode?: boolean }> = ({ size = 'md', isDarkMode = false }) => {
  const logoSrc = "https://trello.com/1/cards/698d1c8d17be3891f45d9727/attachments/698d1da4c2b23845063374b0/download/GRIDS_LOGO_(No_BG).png";
  
  const height = size === 'sm' ? 'h-12' : size === 'lg' ? 'h-32' : 'h-20';
  
  return (
    <Link 
      to="/" 
      className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer no-underline group"
    >
      <img 
        src={logoSrc} 
        alt="GRIDS Logo" 
        className={`${height} object-contain drop-shadow-md`}
        referrerPolicy="no-referrer"
      />
      
      {size !== 'sm' && (
        <div className="mt-2 text-center">
          <h1 className={`font-black tracking-tighter leading-none transition-colors duration-500 ${size === 'lg' ? 'text-5xl' : 'text-4xl'} ${isDarkMode ? 'text-white' : 'text-black'}`}>GRIDS</h1>
          <div className={`font-bold tracking-tight mt-1 ${size === 'lg' ? 'text-xl' : 'text-[12px]'}`}>
            <span className="text-[#8B44AF]">it</span> <span className="text-[#5D921C]">connects</span>
          </div>
        </div>
      )}
    </Link>
  );
};

/**
 * BaguioLogo component used in the Header, displaying the Baguio City Seal.
 */
export const BaguioLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const height = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-16' : 'h-10';
  return (
    <div className="flex items-center group cursor-pointer">
      <div className="relative">
        <img 
          src="https://new.baguio.gov.ph/assets/baguio-logo.676e0ef7.png" 
          alt="Baguio Seal" 
          className={`${height} object-contain relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-300`} 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

/**
 * CPDSOLogo component displaying the CPDSO logo.
 */
export const CPDSOLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const height = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-16' : 'h-10';
  return (
    <div className="flex items-center group cursor-pointer">
      <div className="relative">
        <img 
          src="https://new.baguio.gov.ph/api/preview_image/aZVBzyEdJJsvIxfn_image.png" 
          alt="CPDSO Logo" 
          className={`${height} object-contain relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-300`} 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

/**
 * LogoWithMotto component displaying the GRIDS logo with its motto.
 */
export const LogoWithMotto: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const height = size === 'sm' ? 'h-16' : size === 'lg' ? 'h-48' : 'h-32';
  return (
    <div className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer no-underline group">
      <img 
        src="https://trello.com/1/cards/698d1c8d17be3891f45d9727/attachments/698d1da2af3b332bd7d25335/download/GRIDS_LOGO-MOTTO_V1.png" 
        alt="GRIDS Logo with Motto" 
        className={`${height} object-contain drop-shadow-md`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
