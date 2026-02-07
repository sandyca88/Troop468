import React, { useState } from 'react';
import { Mail, MapPin, ExternalLink, Compass, Lock } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useCms } from '../context/CmsContext';

interface FooterProps {
  navigateTo: (view: 'home' | 'activities-archive' | 'equipment-archive', sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const { isAdmin } = useCms();

  return (
    <footer className="bg-scout-dark text-white pt-32 pb-8 px-6 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <Compass className="w-[400px] h-[400px]" strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <BrandLogo className="w-14 h-14 mb-10" />
            <p className="text-white/40 max-w-md mb-10 text-lg leading-relaxed">
              Troop 468 is a youth-led scouting community in Fremont, CA. We meet every other week on Thursdays and Saturdays to build character and leadership.
            </p>
            <div className="flex space-x-6">
              <a href="mailto:info@troop468.org" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-scout-accent transition-all hover:-translate-y-1">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://maps.google.com/?q=Fremont+CA+Scouting" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-scout-accent transition-all hover:-translate-y-1">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-10 text-scout-accent">The Troop</h4>
            <ul className="space-y-5 text-white/50 font-bold uppercase text-xs tracking-[0.15em]">
              <li><button onClick={() => navigateTo('home', 'home')} className="hover:text-white transition-colors text-left w-full uppercase">Home</button></li>
              <li><button onClick={() => navigateTo('home', 'about')} className="hover:text-white transition-colors text-left w-full uppercase">About Us</button></li>
              <li><button onClick={() => navigateTo('home', 'activities')} className="hover:text-white transition-colors text-left w-full uppercase">Activities</button></li>
              <li><button onClick={() => navigateTo('home', 'benefits')} className="hover:text-white transition-colors text-left w-full uppercase">Benefits</button></li>
              <li><button onClick={() => navigateTo('home', 'join')} className="hover:text-white transition-colors text-left w-full uppercase">How to Join</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-10 text-scout-accent">Excellence</h4>
            <ul className="space-y-5 text-white/50 font-bold uppercase text-xs tracking-[0.15em]">
              <li><button onClick={() => navigateTo('home', 'equipment')} className="hover:text-white transition-colors text-left w-full uppercase">Equipment List</button></li>
              <li><button onClick={() => navigateTo('home', 'eagle')} className="hover:text-white transition-colors text-left w-full uppercase">Eagle Legacy</button></li>
              <li><button onClick={() => navigateTo('activities-archive', '')} className="hover:text-white transition-colors text-left w-full uppercase">Photo Archive</button></li>
              <li>
                <a href="https://scoutbook.scouting.org/" target="_blank" className="flex items-center space-x-2 hover:text-white transition-colors">
                  <span>Scoutbook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.scouting.org/" target="_blank" className="flex items-center space-x-2 hover:text-white transition-colors">
                  <span>BSA National</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          <div className="flex flex-col items-start space-y-2">
            <p>© 2024 TROOP 468 FREMONT.</p>
            {!isAdmin && (
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-admin-login'));
                }}
                className="flex items-center space-x-1 hover:text-white transition-colors opacity-50 hover:opacity-100"
              >
                <Lock size={10} />
                <span>Admin Access</span>
              </button>
            )}
          </div>
          <div className="flex space-x-12">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
        
        {/* Subtle Designer Credit */}
        <div className="mt-12 text-center">
          <a 
            href="mailto:tosandy@gmail.com" 
            className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/10 hover:text-white/40 transition-colors select-none"
          >
            Design by Sandy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;