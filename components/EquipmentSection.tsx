
import React from 'react';
import { Package, CheckCircle, ArrowRight } from 'lucide-react';
import { TEN_ESSENTIALS } from '../constants';

interface EquipmentSectionProps {
  onViewFullList?: () => void;
}

const EquipmentSection: React.FC<EquipmentSectionProps> = ({ onViewFullList }) => {
  return (
    <section id="equipment" className="py-24 px-6 bg-scout-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-scout-accent font-black tracking-widest uppercase text-sm block mb-4">Be Prepared</span>
            <h2 className="text-5xl md:text-6xl font-black text-scout-dark font-serif leading-tight">Scout Equipment List</h2>
            <p className="text-scout-dark/50 mt-4 max-w-2xl font-medium">
              Safety and preparedness are the foundations of scouting. Every scout is expected to have the "Ten Essentials" for every outdoor activity.
            </p>
          </div>
          <button 
            onClick={onViewFullList}
            className="mt-8 md:mt-0 flex items-center space-x-3 text-scout-accent font-black uppercase tracking-[0.2em] text-xs hover:underline decoration-2 underline-offset-8 group"
          >
            <span>Explore Full Gear Guide</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TEN_ESSENTIALS.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-scout-khaki shadow-sm hover:shadow-2xl transition-all group">
              <div className="w-12 h-12 bg-scout-accent/10 rounded-2xl flex items-center justify-center text-scout-accent mb-6 group-hover:bg-scout-accent group-hover:text-white transition-all">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-scout-dark mb-2 leading-tight">{item.name}</h4>
              <p className="text-xs text-scout-dark/40 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 bg-scout-dark rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-scout-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="mb-6 md:mb-0 relative z-10">
            <h3 className="text-3xl font-black font-serif mb-3">Uniform & Personal Gear</h3>
            <p className="text-white/50 text-sm max-w-lg font-light leading-relaxed">Beyond the essentials, every scout needs personal gear for overnights and the official BSA uniform for ceremonies.</p>
          </div>
          <button 
            onClick={onViewFullList}
            className="bg-white text-scout-dark px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-scout-accent hover:text-white transition-all shadow-xl relative z-10"
          >
            Full Equipment Page
          </button>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
