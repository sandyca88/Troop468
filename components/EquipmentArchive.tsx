
import React from 'react';
import { ArrowLeft, CheckCircle2, Package, ShieldCheck, Shirt, ThermometerSnowflake, Info } from 'lucide-react';
import { TEN_ESSENTIALS, PERSONAL_GEAR, UNIFORM_ITEMS } from '../constants';

interface EquipmentArchiveProps {
  onBack: () => void;
}

const EquipmentArchive: React.FC<EquipmentArchiveProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-scout-light animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-scout-dark/40 hover:text-scout-accent transition-colors font-black uppercase tracking-[0.2em] text-xs mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <header className="mb-20">
          <span className="text-scout-accent font-black tracking-widest uppercase text-sm mb-4 block">Preparation Guide</span>
          <h1 className="text-6xl md:text-8xl font-black text-scout-dark font-serif leading-tight">
            The Master <br /> <span className="italic text-scout-accent">Gear List</span>
          </h1>
          <p className="mt-8 text-xl text-scout-dark/60 max-w-2xl font-light leading-relaxed">
            Every great adventure starts with proper preparation. This guide outlines everything a Troop 468 scout needs for a successful season.
          </p>
        </header>

        {/* Section 1: The Ten Essentials */}
        <section className="mb-32">
          <div className="flex items-center space-x-4 mb-12">
            <div className="bg-scout-accent p-4 rounded-3xl text-white shadow-xl">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-scout-dark font-serif">The Ten Essentials</h2>
              <p className="text-scout-dark/40 font-bold uppercase tracking-widest text-[10px]">Mandatory for every outdoor activity</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {TEN_ESSENTIALS.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-scout-khaki shadow-sm hover:shadow-2xl transition-all group">
                <div className="w-12 h-12 bg-scout-light rounded-2xl flex items-center justify-center text-scout-accent mb-6 group-hover:bg-scout-accent group-hover:text-white transition-all">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-black text-xl text-scout-dark mb-3 leading-tight">{item.name}</h4>
                <p className="text-sm text-scout-dark/50 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Personal Gear */}
        <section className="mb-32">
          <div className="flex items-center space-x-4 mb-12">
            <div className="bg-scout-green p-4 rounded-3xl text-white shadow-xl">
              <Package size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-scout-dark font-serif">Personal Gear</h2>
              <p className="text-scout-dark/40 font-bold uppercase tracking-widest text-[10px]">Basic needs for overnight camping</p>
            </div>
          </div>

          <div className="bg-white rounded-[4rem] border border-scout-khaki overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-scout-khaki">
              <div className="p-12">
                <h3 className="text-2xl font-black text-scout-dark mb-8 flex items-center">
                  <span className="w-8 h-1 bg-scout-accent mr-4" />
                  Sleep & Travel
                </h3>
                <div className="space-y-8">
                  {PERSONAL_GEAR.filter(g => g.category === 'Sleep & Pack').map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-6">
                      <div className="w-2 h-2 rounded-full bg-scout-accent mt-3 shrink-0" />
                      <div>
                        <h5 className="font-bold text-scout-dark text-lg">{item.name}</h5>
                        <p className="text-sm text-scout-dark/50 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-12 bg-scout-light/30">
                <h3 className="text-2xl font-black text-scout-dark mb-8 flex items-center">
                  <span className="w-8 h-1 bg-scout-green mr-4" />
                  Clothing & Hygiene
                </h3>
                <div className="space-y-8">
                  {PERSONAL_GEAR.filter(g => g.category !== 'Sleep & Pack').map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-6">
                      <div className="w-2 h-2 rounded-full bg-scout-green mt-3 shrink-0" />
                      <div>
                        <h5 className="font-bold text-scout-dark text-lg">{item.name}</h5>
                        <p className="text-sm text-scout-dark/50 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Uniforms */}
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:max-w-md">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-scout-dark p-4 rounded-3xl text-white shadow-xl">
                  <Shirt size={32} />
                </div>
                <h2 className="text-4xl font-black text-scout-dark font-serif">Uniform Standards</h2>
              </div>
              <p className="text-lg text-scout-dark/60 leading-relaxed font-light mb-10">
                The uniform identifies the scout as a member of a worldwide movement and shows their accomplishments through rank and merit badge patches.
              </p>
              <div className="p-8 bg-white rounded-[2.5rem] border border-scout-khaki shadow-sm">
                <div className="flex items-center space-x-3 mb-4 text-scout-accent">
                  <Info size={20} />
                  <span className="font-black text-xs uppercase tracking-widest">Scout Pro-Tip</span>
                </div>
                <p className="text-sm text-scout-dark/50 font-medium italic">
                  "Class A" is for meetings and ceremonies. "Class B" is for travel, working, and outdoor fun!
                </p>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              {UNIFORM_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-scout-khaki flex items-center justify-between group hover:border-scout-accent transition-all">
                  <div className="flex items-center space-x-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.type === 'Class A' ? 'bg-scout-accent/10 text-scout-accent' : 'bg-scout-green/10 text-scout-green'}`}>
                      {item.type}
                    </span>
                    <div>
                      <h4 className="font-black text-xl text-scout-dark">{item.name}</h4>
                      <p className="text-sm text-scout-dark/40 font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="bg-scout-dark rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <ThermometerSnowflake size={300} strokeWidth={0.5} />
          </div>
          <h3 className="text-4xl font-black font-serif mb-6">Need more help?</h3>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 font-light">
            Don't worry if you don't have everything yet. Many scouts build their kit over time. Ask a Scout Leader or our Quartermaster for advice on where to find the best gear.
          </p>
          <a href="mailto:info@troop468.org" className="inline-block bg-scout-accent text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-white hover:text-scout-dark transition-all shadow-2xl">
            Contact Troop Quartermaster
          </a>
        </div>
      </div>
    </div>
  );
};

export default EquipmentArchive;
