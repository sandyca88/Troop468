
import React from 'react';
import { Award, Star, ShieldCheck } from 'lucide-react';

const EagleSection: React.FC = () => {
  return (
    <section id="eagle" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Badge Ornament */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.05] pointer-events-none select-none">
        <svg viewBox="0 0 400 600" className="w-full h-full text-scout-dark fill-none stroke-current">
          <circle cx="300" cy="150" r="120" strokeWidth="2" />
          <path d="M220 250 L220 500 L300 450 L380 500 L380 250" strokeWidth="2" strokeLinejoin="round" />
          <path d="M240 240 L240 450 L300 410 L360 450 L360 240" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-scout-accent font-black tracking-widest uppercase text-sm mb-6 block">A Legacy of Excellence</span>
            <h2 className="text-6xl md:text-8xl font-black text-scout-dark font-serif mb-8 leading-none">
              The Eagle <br /> <span className="italic text-scout-accent">Court of Honor</span>
            </h2>
            <p className="text-xl text-scout-dark/60 mb-12 leading-relaxed font-light max-w-xl">
              Achieving the rank of Eagle Scout is a monumental feat, representing years of dedication, service, and leadership. At Troop 468, we celebrate this milestone with a formal Court of Honor, honoring the scout's journey and commitment to the Scout Oath and Law.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start space-x-5 group">
                <div className="mt-1 bg-scout-accent/5 p-3 rounded-2xl text-scout-accent group-hover:bg-scout-accent group-hover:text-white transition-all duration-300">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-xl text-scout-dark mb-1">85+ Eagle Scouts</h4>
                  <p className="text-sm text-scout-dark/40 leading-relaxed font-medium">Since our founding in 1968, we have guided dozens to the highest rank.</p>
                </div>
              </div>
              <div className="flex items-start space-x-5 group">
                <div className="mt-1 bg-scout-accent/5 p-3 rounded-2xl text-scout-accent group-hover:bg-scout-accent group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-xl text-scout-dark mb-1">Community Impact</h4>
                  <p className="text-sm text-scout-dark/40 leading-relaxed font-medium">Every Eagle project leaves a lasting mark on Fremont and beyond.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Main Image Container */}
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1200" 
                alt="Scout Group Achievement" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Quote Box */}
            <div className="absolute -bottom-12 -left-12 bg-scout-dark p-12 rounded-[3rem] shadow-2xl text-white max-w-xs animate-in slide-in-from-bottom duration-1000">
              <p className="text-4xl font-black mb-4 leading-tight">
                Once an Eagle, <br />
                <span className="text-scout-accent">Always an Eagle.</span>
              </p>
              <div className="h-px w-12 bg-white/20 mb-4" />
              <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">
                The Scout's Lifelong Commitment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EagleSection;
