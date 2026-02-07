
import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { ACTIVITIES } from '../constants';

const Gallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="activities" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black text-scout-dark font-serif mb-6 leading-tight">
              Where We've Been
            </h2>
            <p className="text-lg text-scout-dark/60">
              Scouting is about seeing the world. From high mountain peaks to the depths of the ocean, Troop 468 explores it all.
            </p>
          </div>
          <button className="mt-8 md:mt-0 flex items-center space-x-2 text-scout-accent font-black group">
            <span>VIEW ALL PHOTOS</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACTIVITIES.map((activity) => (
            <div 
              key={activity.id}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
              onMouseEnter={() => setHoveredId(activity.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img 
                src={activity.image} 
                alt={activity.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${hoveredId === activity.id ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scout-dark via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                <div className="flex items-center space-x-2 mb-3 bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/20">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{activity.date}</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 font-serif group-hover:text-scout-khaki transition-colors">{activity.title}</h3>
                <p className={`text-white/70 text-sm leading-relaxed max-w-lg transition-all duration-500 overflow-hidden ${hoveredId === activity.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
