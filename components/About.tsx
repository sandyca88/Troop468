
import React from 'react';
import { Mountain, Users, Shield, History, MapPin, Target } from 'lucide-react';
import { TROOP_INFO } from '../constants';

const AboutCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="p-10 rounded-[2.5rem] bg-white border border-scout-khaki shadow-sm hover:shadow-2xl transition-all duration-500 group">
    <div className="w-16 h-16 bg-scout-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-scout-accent group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-scout-dark font-serif">{title}</h3>
    <p className="text-scout-dark/60 leading-relaxed text-base">{text}</p>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-scout-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start mb-24">
          <div className="lg:col-span-7">
            <span className="text-scout-accent font-black tracking-widest uppercase text-sm mb-6 block">Est. 1968</span>
            <h2 className="text-5xl md:text-7xl font-black mb-10 text-scout-dark font-serif leading-tight">
              A Tradition of <br />
              <span className="italic text-scout-accent font-normal">Youth-Led</span> Leadership
            </h2>
            <div className="space-y-6 text-xl text-scout-dark/70 leading-relaxed font-light">
              <p>
                Troop 468 was chartered in 1968 and is a cornerstone of the <strong>Fremont community</strong>. For over five decades, we have provided a safe and challenging environment for scouts to grow and lead.
              </p>
              <p>
                Our philosophy is simple: <strong>Scouting is a youth-led program.</strong> The scouts themselves, through the Patrol Leaders Council (PLC), plan the activities, run the meetings, and lead the treks. Adult leaders provide the framework of safety and mentorship, but the direction comes from the youth.
              </p>
            </div>
            
            <div className="mt-12 p-8 bg-white rounded-[2rem] border border-scout-khaki shadow-sm flex items-start space-x-6">
              <div className="bg-scout-green/10 p-4 rounded-2xl text-scout-green">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-scout-dark mb-1">Our Basecamp</h4>
                <p className="text-scout-dark/60">We meet at Weibel Elementary School or Old Mission Park in Fremont every other Thursday evening and Saturday afternoon. We are proud to be part of this vibrant community and its rich scouting history.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 bg-scout-khaki/20">
              <img 
                src="https://images.unsplash.com/photo-1510672854261-7bb3978d2347?auto=format&fit=crop&q=80&w=1200" 
                alt="Troop 468 Scouts Group Outing" 
                className="w-full h-full object-cover transition-opacity duration-500"
                onError={(e) => {
                  // Fallback to a another reliable ID if this one fails
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523540939399-141cbff6a8d7?auto=format&fit=crop&q=80&w=1200";
                }}
              />
            </div>
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-full h-full border-2 border-scout-accent/20 rounded-[3rem] -z-0" />
            <div className="absolute -bottom-6 -right-6 bg-scout-dark text-white p-8 rounded-3xl shadow-xl z-20 max-w-[240px]">
              <History className="text-scout-accent w-8 h-8 mb-4" />
              <p className="text-sm font-bold leading-tight">Founded on the principles of the Scout Oath and Law since day one.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AboutCard 
            icon={<Users className="w-8 h-8" />}
            title="The Patrol Method"
            text="Scouts are organized into small patrols, fostering close-knit teamwork and providing every scout a chance to hold a leadership position."
          />
          <AboutCard 
            icon={<Target className="w-8 h-8" />}
            title="Active Learning"
            text="We believe in 'learning by doing.' Whether it's fire building, first aid, or high-altitude navigation, our scouts take the lead in instruction."
          />
          <AboutCard 
            icon={<Shield className="w-8 h-8" />}
            title="Character First"
            text="Rank advancement is a by-product of our program, not the primary goal. We focus on building moral strength and personal responsibility."
          />
        </div>
      </div>
    </section>
  );
};

export default About;
