
import React from 'react';

const BrandLogo: React.FC<{ className?: string, isDark?: boolean }> = ({ className = "w-10 h-10", isDark = false }) => {
  return (
    <div className={`flex items-center space-x-3 group cursor-pointer`}>
      <div className={`${className} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current transition-transform duration-500 group-hover:rotate-12">
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="45" strokeWidth="6" className="text-scout-accent" />
          {/* Mountain Peak */}
          <path d="M20 75 L50 25 L80 75" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="text-scout-green" />
          <path d="M40 75 L55 50 L70 75" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-scout-green/50" />
          {/* Compass Needle */}
          <path d="M50 15 L55 35 L50 40 L45 35 Z" fill="currentColor" className="text-scout-accent" />
        </svg>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className={`text-2xl font-black leading-none tracking-tighter ${isDark ? 'text-scout-dark' : 'text-white'}`}>TROOP</span>
        <span className="text-2xl font-black leading-none tracking-tighter text-scout-accent">468</span>
      </div>
    </div>
  );
};

export default BrandLogo;
