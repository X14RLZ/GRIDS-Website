
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Logo component representing the GRIDS (Gender-Responsive Integrated Database System)
 * visual identity - a leaf with a tree-branch structure, divided into purple and green halves.
 */
export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const scale = size === 'sm' ? 0.5 : size === 'lg' ? 1.5 : 1;
  const logoWidth = 120 * scale;
  const logoHeight = 150 * scale;
  
  return (
    <Link 
      to="/" 
      className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer no-underline group"
    >
      <svg 
        width={logoWidth} 
        height={logoHeight} 
        viewBox="0 0 200 250" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Leaf Shape Base */}
        <path d="M100 20C40 20 10 80 10 140C10 200 100 240 100 240V20Z" fill="#8B44AF" /> {/* Purple Left */}
        <path d="M100 20C160 20 190 80 190 140C190 200 100 240 100 240V20Z" fill="#5D921C" /> {/* Green Right */}
        
        {/* Tree Branch Structure - Center Trunk */}
        <path d="M100 50V210" stroke="white" strokeWidth="8" strokeLinecap="round" />
        
        {/* Left Branches */}
        <path d="M100 80L50 40" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M100 120L40 90" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M100 160L30 140" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M50 40V30" stroke="white" strokeWidth="4" strokeLinecap="round" />
        
        {/* Right Branches */}
        <path d="M100 80L150 40" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M100 120L160 90" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M100 160L170 140" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M150 40V30" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
      
      {size !== 'sm' && (
        <div className="mt-1 text-center">
          <h1 className={`font-bold text-black tracking-tighter leading-none ${size === 'lg' ? 'text-4xl' : 'text-2xl'}`}>GRIDS</h1>
          <div className={`font-semibold tracking-tight ${size === 'lg' ? 'text-lg' : 'text-[10px]'}`}>
            <span className="text-[#8B44AF]">it</span> <span className="text-[#5D921C]">connects</span>
          </div>
        </div>
      )}
    </Link>
  );
};

/**
 * BaguioLogo component used in the Header, displaying the Baguio City Seal.
 * Updated to be larger and more prominent to match the reference.
 */
export const BaguioLogo: React.FC = () => (
  <div className="flex items-center group cursor-pointer">
    <div className="relative">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Baguio_City_Seal.png/1200px-Baguio_City_Seal.png" 
        alt="Baguio Seal" 
        className="h-12 w-12 object-contain relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
      />
    </div>
  </div>
);
