import React, { useState, useEffect } from 'react';
import { ArrowLeft, Image as ImageIcon, Calendar, Plus, Trash2, Link as LinkIcon, X, Save, MapPin, AlignLeft, AlertCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523540939399-141cbff6a8d7?auto=format&fit=crop&q=80&w=1200";

const ActivitiesArchive: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { data, isAdmin, addAlbum, removeAlbum, updateAlbum, saveChanges } = useCms();
  
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
    image: FALLBACK_IMAGE,
    description: '',
    location: ''
  });

  const openAddModal = () => {
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

  const openEditModal = (idx: number) => {
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

    setTimeout(() => saveChanges(), 50);
    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    removeAlbum(idx);
    setTimeout(() => saveChanges(), 50);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-scout-light animate-in fade-in duration-700 relative">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center space-x-2 text-scout-dark/60 hover:text-scout-accent font-black uppercase tracking-[0.2em] text-xs mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Website</span>
        </button>

        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-scout-dark font-serif leading-tight">
            Activity <br /> <span className="italic text-scout-accent">Archives</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isAdmin && (
            <button onClick={openAddModal} className="group flex flex-col items-center justify-center aspect-square rounded-[3rem] border-[5px] border-dashed border-scout-accent transition-all bg-scout-light/30 hover:bg-white shadow-sm hover:shadow-2xl">
              <Plus size={56} className="text-scout-accent" />
              <span className="font-black text-xs uppercase tracking-[0.3em] text-scout-accent mt-4">NEW ALBUM</span>
            </button>
          )}

          {data.albums.map((album, idx) => (
            <div key={idx} className="group relative">
              {isAdmin && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-40 flex space-x-5 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => openEditModal(idx)} className="w-16 h-16 bg-scout-accent text-white rounded-[1.5rem] flex items-center justify-center border-[3px] border-white"><LinkIcon size={24} /></button>
                  <button onClick={(e) => handleDelete(e, idx)} className="w-16 h-16 bg-red-500 text-white rounded-[1.5rem] flex items-center justify-center border-[3px] border-white"><Trash2 size={24} /></button>
                </div>
              )}
              <a href={album.url} target="_blank" className="block">
                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 shadow-xl bg-white transition-all group-hover:shadow-2xl">
                  <img src={album.image} alt={album.title} onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold font-serif">{album.title}</h3>
                <p className="text-xs uppercase font-black text-scout-dark/40">{album.year}</p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-scout-dark/70 backdrop-blur-lg p-6">
          <div className="bg-white rounded-[3rem] p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black font-serif">{modalMode === 'add' ? 'New Album' : 'Edit Album'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-scout-light rounded-2xl"><X size={24} /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">
                  Album Title <span className="text-scout-accent ml-1 font-bold">(Required)</span>
                </label>
                <input type="text" value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full bg-scout-light p-5 rounded-2xl outline-none font-bold" placeholder="Album Title" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">
                  Gallery Link <span className="text-scout-accent ml-1 font-bold">(Required)</span>
                </label>
                <input type="text" value={formState.url} onChange={e => setFormState({...formState, url: e.target.value})} className="w-full bg-scout-light p-5 rounded-2xl outline-none font-bold" placeholder="Gallery Link" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">Cover Image URL</label>
                <input type="text" value={formState.image} onChange={e => setFormState({...formState, image: e.target.value})} className="w-full bg-scout-light p-5 rounded-2xl outline-none font-bold" placeholder="Cover Image URL" />
              </div>

              <div className="flex space-x-4">
                 <div className="flex-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">Year</label>
                    <input type="text" value={formState.year} onChange={e => setFormState({...formState, year: e.target.value})} className="w-full bg-scout-light p-5 rounded-2xl outline-none font-bold" placeholder="Year" />
                 </div>
                 <div className="flex-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2 px-1">Item Count</label>
                    <input type="text" value={formState.count} onChange={e => setFormState({...formState, count: e.target.value})} className="w-full bg-scout-light p-5 rounded-2xl outline-none font-bold" placeholder="Item Count" />
                 </div>
              </div>
            </div>
            <button onClick={handleSave} className="w-full bg-scout-dark text-white py-6 rounded-2xl font-black uppercase tracking-widest mt-8 flex items-center justify-center space-x-3 shadow-xl hover:bg-scout-accent transition-colors">
              <Save size={18} />
              <span>{modalMode === 'add' ? 'Publish' : 'Update'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesArchive;
