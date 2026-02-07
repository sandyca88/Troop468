import React, { useState } from 'react';
import { Calendar, Tag, Camera, Edit2, Plus, ArrowUpRight, Image as ImageIcon, X, MapPin, Link as LinkIcon, AlignLeft, AlertCircle, Save } from 'lucide-react';
import { UPCOMING_EVENTS } from '../constants';
import { useCms } from '../context/CmsContext';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523540939399-141cbff6a8d7?auto=format&fit=crop&q=80&w=1200";

interface EventsSectionProps {
  onViewMore?: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onViewMore }) => {
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('past');
  const { data, isAdmin, updateAlbum, addAlbum, saveChanges } = useCms();

  // Modal State for Home Page Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formState, setFormState] = useState({
    title: '',
    year: 'Summer ' + new Date().getFullYear().toString(),
    url: '',
    count: '0+',
    image: FALLBACK_IMAGE,
    description: '',
    location: ''
  });

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openEditModal = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    const album = data.albums[idx];
    setModalMode('edit');
    setActiveIndex(idx);
    setFormState({
      title: album.title,
      year: album.year,
      url: album.url,
      count: album.count,
      image: album.image || FALLBACK_IMAGE,
      description: album.description || '',
      location: album.location || ''
    });
    setIsModalOpen(true);
  };

  const openAddModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalMode('add');
    setActiveIndex(null);
    setFormState({
      title: '',
      year: 'Summer ' + new Date().getFullYear().toString(),
      url: '',
      count: '0+',
      image: FALLBACK_IMAGE,
      description: '',
      location: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formState.title || !formState.url) {
      alert("Please provide a Title and a Link to the gallery.");
      return;
    }

    const albumData = {
      title: formState.title,
      year: formState.year,
      url: formState.url,
      count: formState.count,
      image: formState.image,
      description: formState.description,
      location: formState.location,
      type: 'photo' as const
    };

    if (modalMode === 'add') {
      addAlbum(albumData);
    } else if (activeIndex !== null) {
      updateAlbum(activeIndex, albumData);
    }

    // Explicitly trigger a persist check
    setTimeout(() => saveChanges(), 50);
    setIsModalOpen(false);
  };

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
              <div key={idx} className="group cursor-pointer" onClick={() => handleCardClick(album.url)}>
                <div className="relative aspect-[16/11] rounded-[3rem] overflow-hidden mb-8 shadow-2xl border border-scout-khaki bg-scout-light transition-all group-hover:shadow-scout-accent/20">
                  <img 
                    src={album.image} 
                    alt={album.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {isAdmin && (
                    <button 
                      onClick={(e) => openEditModal(e, idx)}
                      className="absolute top-8 right-8 bg-scout-accent text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all border-2 border-white z-20"
                      title="Edit Directly"
                    >
                      <Edit2 size={20} />
                    </button>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                <div className="flex justify-between items-start px-2">
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-scout-dark font-serif mb-3 group-hover:text-scout-accent transition-colors leading-tight">
                      {album.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-scout-dark/40 text-[10px] font-black uppercase tracking-[0.2em]">
                      <span>{album.year}</span>
                      <span className="w-1.5 h-1.5 bg-scout-accent rounded-full opacity-50" />
                      <span className="truncate max-w-[200px]">{album.location || 'Troop Headquarters'}</span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 rounded-[1.5rem] border-2 border-scout-khaki flex items-center justify-center group-hover:bg-scout-accent group-hover:border-scout-accent group-hover:text-white transition-all transform group-hover:rotate-12 shrink-0 ml-6">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}

            {isAdmin && (
              <button 
                onClick={openAddModal}
                className="flex flex-col items-center justify-center aspect-[16/11] rounded-[3rem] border-4 border-dashed border-scout-khaki hover:border-scout-accent hover:bg-scout-accent/5 transition-all text-scout-khaki hover:text-scout-accent group"
              >
                <Plus size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-black text-xs uppercase tracking-widest">Add Adventure</span>
              </button>
            )}
          </div>
        ) : (
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

      {/* Editor Modal for Home Page */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-scout-dark/70 backdrop-blur-lg p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-8 max-w-2xl w-full shadow-2xl border border-scout-khaki relative overflow-hidden overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 w-full h-2 bg-scout-accent" />
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black font-serif text-scout-dark">
                {modalMode === 'add' ? 'New Album' : 'Edit Album'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-scout-light text-scout-dark rounded-2xl flex items-center justify-center hover:bg-scout-khaki/20 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="mb-8">
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-3 px-1">Live Cover Preview</label>
                <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-scout-light border-2 border-scout-khaki shadow-inner">
                  <img 
                    src={formState.image} 
                    alt="Preview" 
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">
                  Album Title <span className="text-scout-accent ml-1 font-bold">(Required)</span>
                </label>
                <input 
                  type="text" 
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                  placeholder="e.g. Summer Camp 2024"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">Season / Year</label>
                  <input 
                    type="text" 
                    value={formState.year}
                    onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                    className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">Item Count</label>
                  <input 
                    type="text" 
                    value={formState.count}
                    onChange={(e) => setFormState({ ...formState, count: e.target.value })}
                    className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">Cover Image URL</label>
                <input 
                  type="text" 
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">
                  Gallery URL <span className="text-scout-accent ml-1 font-bold">(Required)</span>
                </label>
                <input 
                  type="text" 
                  value={formState.url}
                  onChange={(e) => setFormState({ ...formState, url: e.target.value })}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                  placeholder="Paste Google Photos link here..."
                />
              </div>
            </div>

            <div className="mt-10 flex space-x-4">
              <button 
                onClick={handleSave}
                className="flex-1 bg-scout-dark text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-scout-accent transition-all flex items-center justify-center space-x-3 shadow-xl"
              >
                <Save size={18} />
                <span>{modalMode === 'add' ? 'Publish Album' : 'Update Album'}</span>
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-10 bg-scout-khaki/20 text-scout-dark py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-scout-khaki transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
