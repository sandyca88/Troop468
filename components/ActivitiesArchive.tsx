
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Image as ImageIcon, Film, Calendar, Plus, Trash2, Link as LinkIcon, X, Save, MapPin, AlignLeft } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const ActivitiesArchive: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { data, isAdmin, addAlbum, removeAlbum, updateContent } = useCms();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Form State
  const [formState, setFormState] = useState({
    title: '',
    year: 'Summer ' + new Date().getFullYear().toString(),
    url: '',
    count: '0+',
    image: 'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?auto=format&fit=crop&q=80&w=800',
    description: '',
    location: ''
  });

  useEffect(() => {
    if (isAdmin && data.albums.length === 0) {
      openAddModal();
    }
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setActiveIndex(null);
    setFormState({
      title: '',
      year: 'Summer ' + new Date().getFullYear().toString(),
      url: '',
      count: '0+',
      image: 'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?auto=format&fit=crop&q=80&w=800',
      description: '',
      location: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    const album = data.albums[idx];
    setModalMode('edit');
    setActiveIndex(idx);
    setFormState({
      title: album.title,
      year: album.year,
      url: album.url,
      count: album.count,
      image: album.image,
      description: album.description || '',
      location: album.location || ''
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
      updateContent(`albums.${activeIndex}.title`, formState.title);
      updateContent(`albums.${activeIndex}.year`, formState.year);
      updateContent(`albums.${activeIndex}.url`, formState.url);
      updateContent(`albums.${activeIndex}.count`, formState.count);
      updateContent(`albums.${activeIndex}.image`, formState.image);
      updateContent(`albums.${activeIndex}.description`, formState.description);
      updateContent(`albums.${activeIndex}.location`, formState.location);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    removeAlbum(idx);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-scout-light animate-in fade-in duration-700 relative">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-scout-dark/60 hover:text-scout-accent transition-colors font-black uppercase tracking-[0.2em] text-xs mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Website</span>
        </button>

        <header className="mb-20">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-scout-accent font-black tracking-widest uppercase text-sm block">Troop 468 Records</span>
            <div className="h-px w-12 bg-scout-khaki" />
            <h2 className="text-xs font-black uppercase tracking-widest text-scout-dark/30 italic">Photo & Video Archive</h2>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-scout-dark font-serif leading-tight">
            Activity <br /> <span className="italic text-scout-accent">Albums</span>
          </h1>
          <p className="mt-8 text-xl text-scout-dark/60 max-w-2xl font-light leading-relaxed">
            Manage your troop adventures. Albums added here appear instantly in the "Activities" section of the Home Page.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isAdmin && (
            <button 
              onClick={openAddModal}
              className="group flex flex-col items-center justify-center aspect-square rounded-[3rem] border-[5px] border-dashed border-scout-accent transition-all bg-scout-light/30 hover:bg-white shadow-sm hover:shadow-2xl"
            >
              <div className="w-24 h-24 bg-scout-accent rounded-[2.5rem] flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-xl shadow-scout-accent/20">
                <Plus size={56} strokeWidth={3} />
              </div>
              <span className="font-black text-xs uppercase tracking-[0.3em] text-scout-accent">CREATE NEW ALBUM</span>
            </button>
          )}

          {data.albums.map((album, idx) => (
            <div key={idx} className="group relative">
              {isAdmin && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-40 flex space-x-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-3 pointer-events-auto">
                  <button 
                    onClick={(e) => { e.preventDefault(); openEditModal(idx); }}
                    className="w-16 h-16 bg-scout-accent text-white rounded-[1.5rem] shadow-2xl hover:scale-110 transition-all border-[3px] border-white flex items-center justify-center"
                    title="Edit Details"
                  >
                    <LinkIcon size={28} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, idx)}
                    className="w-16 h-16 bg-red-500 text-white rounded-[1.5rem] shadow-2xl hover:scale-110 transition-all border-[3px] border-white flex items-center justify-center"
                    title="Delete Album"
                  >
                    <Trash2 size={28} />
                  </button>
                </div>
              )}

              <a 
                href={album.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block outline-none"
              >
                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 shadow-xl border border-scout-khaki bg-white">
                  <img src={album.image} alt={album.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-scout-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 right-8 text-white flex items-center space-x-3">
                    <div className="p-2 bg-scout-green rounded-xl">
                      <ImageIcon size={16} />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest">{album.count} ITEMS</span>
                  </div>
                </div>
              </a>
              
              <div className="px-2">
                <h3 className="text-2xl font-bold text-scout-dark font-serif mb-1 group-hover:text-scout-accent transition-colors">{album.title}</h3>
                <div className="flex items-center space-x-2">
                  <Calendar size={12} className="text-scout-accent" />
                  <p className="text-scout-dark/40 font-black text-[10px] uppercase tracking-[0.2em]">{album.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-scout-dark/70 backdrop-blur-lg p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 max-w-xl w-full shadow-2xl border border-scout-khaki relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-scout-accent" />
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-4xl font-black font-serif text-scout-dark">
                {modalMode === 'add' ? 'New Album' : 'Edit Album'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-scout-light text-scout-dark rounded-2xl hover:bg-scout-accent hover:text-white transition-all"><X size={20} /></button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-1.5 px-1">Album Name</label>
                <input type="text" value={formState.title} onChange={(e) => setFormState({...formState, title: e.target.value})} className="w-full bg-scout-light border border-scout-khaki p-4 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-1.5 px-1">Season</label>
                  <input type="text" value={formState.year} onChange={(e) => setFormState({...formState, year: e.target.value})} className="w-full bg-scout-light border border-scout-khaki p-4 rounded-2xl outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-1.5 px-1">Item Count</label>
                  <input type="text" value={formState.count} onChange={(e) => setFormState({...formState, count: e.target.value})} className="w-full bg-scout-light border border-scout-khaki p-4 rounded-2xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-1.5 px-1">Google Photos Link</label>
                <input type="text" value={formState.url} onChange={(e) => setFormState({...formState, url: e.target.value})} className="w-full bg-scout-light border border-scout-khaki p-4 rounded-2xl outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-1.5 px-1">Cover Image URL</label>
                <input type="text" value={formState.image} onChange={(e) => setFormState({...formState, image: e.target.value})} className="w-full bg-scout-light border border-scout-khaki p-4 rounded-2xl outline-none" />
              </div>
            </div>

            <button onClick={handleSave} className="w-full bg-scout-dark text-white p-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-scout-accent transition-all flex items-center justify-center space-x-3 shadow-xl">
              <Save size={18} />
              <span>Confirm</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesArchive;
