
import React, { useState } from 'react';
import { Calendar, ArrowRight, Tag, Camera, Edit2, Plus, ArrowUpRight } from 'lucide-react';
import { UPCOMING_EVENTS } from '../constants';
import { useCms } from '../context/CmsContext';
import { EditableText } from './Editable';

interface EventsSectionProps {
  onViewMore?: () => void;
  onEditAlbum?: (index: number) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onViewMore }) => {
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('past');
  const { data, isAdmin } = useCms();

  return (
    <section id="activities" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-scout-accent font-black tracking-widest uppercase text-sm mb-4 block">Adventure Journal</span>
            <h2 className="text-6xl md:text-7xl font-black text-scout-dark font-serif mb-8 leading-tight">
              Life Outside <br /> The Ordinary
            </h2>
            
            {/* Tab Switcher */}
            <div className="flex space-x-2 bg-scout-light p-1.5 rounded-[1.5rem] w-fit border border-scout-khaki">
              <button 
                onClick={() => setActiveTab('past')}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'past' ? 'bg-scout-dark text-white shadow-xl' : 'text-scout-dark/30 hover:text-scout-dark'}`}
              >
                Photo Archives
              </button>
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'upcoming' ? 'bg-scout-dark text-white shadow-xl' : 'text-scout-dark/30 hover:text-scout-dark'}`}
              >
                Upcoming Quests
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            <p className="text-xl text-scout-dark/60 max-w-sm mb-8 text-left lg:text-right font-light leading-relaxed">
              Every trek, every summit, every campfire—documented for the next generation of scouts.
            </p>
            {activeTab === 'past' && (
              <button 
                onClick={onViewMore}
                className="flex items-center space-x-3 text-scout-accent font-black uppercase tracking-[0.2em] text-xs hover:underline decoration-2 underline-offset-8 group"
              >
                <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Explore Full Archive</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'past' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {data.albums.slice(0, 4).map((album, idx) => (
              <div key={idx} className="group cursor-pointer">
                {/* Image Container with Edit Shortcut */}
                <div className="relative aspect-[16/11] rounded-[3rem] overflow-hidden mb-8 shadow-2xl border border-scout-khaki bg-scout-light">
                  <img 
                    src={album.image} 
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onClick={() => !isAdmin && onViewMore?.()}
                  />
                  
                  {/* Edit Shortcut for Admins */}
                  {isAdmin && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onViewMore?.(); }}
                      className="absolute top-8 right-8 bg-scout-accent text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all border-2 border-white z-20"
                      title="Manage in Archive"
                    >
                      <Edit2 size={20} />
                    </button>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Content Details */}
                <div className="flex justify-between items-start px-2">
                  <div className="flex-1" onClick={() => !isAdmin && onViewMore?.()}>
                    <h3 className="text-4xl font-black text-scout-dark font-serif mb-3 group-hover:text-scout-accent transition-colors leading-tight">
                      {album.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-scout-dark/40 text-[10px] font-black uppercase tracking-[0.2em]">
                      <span>{album.year}</span>
                      <span className="w-1.5 h-1.5 bg-scout-accent rounded-full opacity-50" />
                      <span className="truncate max-w-[200px]">{album.location || 'Troop Headquarters'}</span>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => !isAdmin && onViewMore?.()}
                    className="w-16 h-16 rounded-[1.5rem] border-2 border-scout-khaki flex items-center justify-center group-hover:bg-scout-accent group-hover:border-scout-accent group-hover:text-white transition-all transform group-hover:rotate-12 shrink-0 ml-6"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}

            {/* Admin: Quick Add Placeholder if less than 4 items */}
            {isAdmin && data.albums.length < 4 && (
              <button 
                onClick={onViewMore}
                className="flex flex-col items-center justify-center aspect-[16/11] rounded-[3rem] border-4 border-dashed border-scout-khaki hover:border-scout-accent hover:bg-scout-accent/5 transition-all text-scout-khaki hover:text-scout-accent group"
              >
                <Plus size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-black text-xs uppercase tracking-widest">Add Adventure</span>
              </button>
            )}
          </div>
        ) : (
          /* Upcoming Events Tab Content */
          <div className="space-y-6">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="bg-scout-light hover:bg-white hover:shadow-2xl hover:-translate-y-1 border border-scout-khaki p-10 rounded-[3rem] transition-all flex flex-col md:flex-row items-center justify-between group">
                <div className="flex items-center space-x-10 mb-8 md:mb-0">
                  <div className="bg-white w-24 h-24 rounded-[2rem] shadow-sm flex flex-col items-center justify-center border border-scout-khaki group-hover:bg-scout-accent group-hover:text-white transition-colors">
                    <span className="text-xs font-black uppercase tracking-tighter opacity-50 mb-1">{event.date.split(' ')[0]}</span>
                    <span className="text-3xl font-black">{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <Tag className="w-4 h-4 text-scout-accent" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-scout-accent">{event.type}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-scout-dark font-serif">{event.title}</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-10">
                  <span className="text-sm font-bold text-scout-dark/30 italic uppercase tracking-widest">{event.status}</span>
                  <button className="bg-scout-dark text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-scout-accent transition-all shadow-xl shadow-scout-dark/10">
                    JOIN EVENT
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
