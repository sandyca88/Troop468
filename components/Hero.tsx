import React from 'react';
import { Compass, ChevronRight, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditableText, EditableImage } from './Editable';

interface HeroProps {
  navigateTo?: (view: 'home' | 'activities-archive' | 'equipment-archive', sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
  const { data } = useCms();
  
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with CMS support */}
      <div className="absolute inset-0 z-0">
        <EditableImage 
          path="hero.backgroundImage" 
          src={data.hero.backgroundImage} 
          className="w-full h-full scale-105" 
        />
        <div className="absolute inset-0 bg-scout-dark/50" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-scout-dark/60 via-transparent to-scout-dark/90 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl px-6 text-center text-white">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-8 animate-in fade-in slide-in-from-bottom duration-700">
          <MapPin className="w-4 h-4 text-scout-accent" />
          <span className="text-xs font-bold uppercase tracking-widest">
            <EditableText path="troopInfo.location" value={data.troopInfo.location} />
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 font-serif leading-tight drop-shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000">
          <EditableText path="hero.title" value={data.hero.title} />
        </h1>
        
        <div className="text-xl md:text-2xl mb-10 text-white/80 max-w-4xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom duration-1200 whitespace-pre-line">
          <EditableText path="hero.subtitle" value={data.hero.subtitle} multiline />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom duration-1500">
          <button 
            onClick={() => navigateTo?.('home', 'join')}
            className="group bg-scout-accent hover:bg-white hover:text-scout-dark text-white px-10 py-5 rounded-full font-black text-lg tracking-wide transition-all duration-300 flex items-center shadow-2xl"
          >
            Start Your Journey
            <Compass className="ml-3 group-hover:rotate-45 transition-transform" />
          </button>
          <button 
            onClick={() => navigateTo?.('activities-archive')}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-12 py-5 rounded-full font-bold text-lg border border-white/40 transition-all flex items-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <span>View Our Adventures</span>
            <ChevronRight className="ml-4 w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3px]" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;