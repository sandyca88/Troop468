
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ACHIEVEMENTS } from '../constants';

const BenefitsSection: React.FC = () => {
  const data = ACHIEVEMENTS;

  return (
    <section id="benefits" className="py-24 px-6 bg-scout-dark text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-scout-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-scout-green/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-scout-accent font-black tracking-widest uppercase text-sm block mb-4">The Benefits of Scouting</span>
          <h2 className="text-5xl font-black font-serif">Building Life-Long Value</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-xl text-white/60 font-light leading-relaxed">
              Scouting is more than just outdoor fun. It's a proven method for building character, citizenship, and personal fitness. Our youth-led troop provides the perfect environment for growth.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {ACHIEVEMENTS.map((stat) => (
                <div key={stat.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-4xl font-black text-scout-accent mb-2">{stat.value}+</div>
                  <div className="text-white/60 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-scout-accent rounded-3xl text-scout-dark">
              <h4 className="font-black text-lg mb-2 uppercase tracking-wide">Character Development</h4>
              <p className="text-sm font-medium">Scouts develop confidence, self-reliance, and a sense of duty to others that lasts a lifetime.</p>
            </div>
          </div>

          <div className="h-[400px] bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-8">Troop Growth & Reach</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={data}>
                <XAxis dataKey="label" stroke="#ffffff60" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1A2E1F', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#D97706' : '#2D4B33'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-[10px] text-white/40 mt-4 uppercase tracking-[0.2em]">Our Impact Over 50+ Years</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
