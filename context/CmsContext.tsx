
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TROOP_INFO, ACTIVITIES, UPCOMING_EVENTS, ACHIEVEMENTS, TEN_ESSENTIALS } from '../constants';

interface Album {
  title: string;
  year: string;
  count: string;
  image: string;
  type: 'photo' | 'video';
  url: string;
  description?: string;
  location?: string;
}

interface CmsData {
  troopInfo: typeof TROOP_INFO;
  activities: typeof ACTIVITIES;
  upcomingEvents: typeof UPCOMING_EVENTS;
  achievements: typeof ACHIEVEMENTS;
  equipment: typeof TEN_ESSENTIALS;
  albums: Album[];
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
}

interface CmsContextType {
  data: CmsData;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateContent: (path: string, value: any) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (index: number) => void;
  saveChanges: () => void;
  discardChanges: () => void;
}

const STORAGE_KEY = 'troop468_cms_data_v2';

const INITIAL_ALBUMS: Album[] = [
  { 
    title: "High Sierra Backpacking", 
    year: "Summer 2024", 
    count: "150+", 
    type: 'photo', 
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800",
    url: "https://photos.google.com/share/...",
    description: "Our annual 50-mile trek through the wilderness. Scouts plan the route, manage supplies, and lead the group through challenging terrain.",
    location: "Yosemite National Park"
  },
  { 
    title: "Camp Cherry Valley", 
    year: "June 2024", 
    count: "200+", 
    type: 'photo', 
    image: "https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?auto=format&fit=crop&q=80&w=800",
    url: "https://photos.google.com/share/...",
    description: "A coastal adventure at Catalina Island. Scouts participate in snorkeling, kayaking, and earn various maritime merit badges.",
    location: "Catalina Island, CA"
  },
  { 
    title: "Snow Sports: Lake Tahoe", 
    year: "February 2024", 
    count: "45", 
    type: 'video', 
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800",
    url: "https://photos.google.com/share/...",
    description: "Cold-weather survival training. Scouts build sleds and compete in team challenges across snowy landscapes.",
    location: "Lake Tahoe, CA"
  }
];

const DEFAULT_DATA: CmsData = {
  troopInfo: {
    ...TROOP_INFO,
    location: "Fremont, CA"
  },
  activities: ACTIVITIES,
  upcomingEvents: UPCOMING_EVENTS,
  achievements: ACHIEVEMENTS,
  equipment: TEN_ESSENTIALS,
  albums: INITIAL_ALBUMS,
  hero: {
    title: "Scout-Led. Value Driven.",
    subtitle: "At Troop 468, we believe that the best way to learn leadership is to lead. Since 1968, we've been building character through high adventure and community service.",
    backgroundImage: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2000"
  }
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(DEFAULT_DATA);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load CMS data", e);
      }
    }
  }, []);

  const login = (password: string) => {
    if (password === 'admin' || password === 'troop468') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  const updateContent = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const addAlbum = (album: Album) => {
    setData(prev => ({
      ...prev,
      albums: [album, ...prev.albums]
    }));
  };

  const removeAlbum = (index: number) => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    setData(prev => ({
      ...prev,
      albums: prev.albums.filter((_, i) => i !== index)
    }));
  };

  const saveChanges = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert("System updated! Your changes are now live.");
  };

  const discardChanges = () => {
    if (!confirm("Discard all unsaved edits?")) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    setData(saved ? JSON.parse(saved) : DEFAULT_DATA);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-scout-accent selection:text-white antialiased bg-scout-light">
      <CmsContext.Provider value={{ data, isAdmin, login, logout, updateContent, addAlbum, removeAlbum, saveChanges, discardChanges }}>
        {children}
      </CmsContext.Provider>
    </div>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error('useCms must be used within CmsProvider');
  return context;
};
