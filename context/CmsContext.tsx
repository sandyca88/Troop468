import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
  updateAlbum: (index: number, updatedAlbum: Album) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (index: number) => void;
  saveChanges: () => void;
  discardChanges: () => void;
  exportConfig: () => string;
}

const STORAGE_KEY = 'troop468_cms_data_v12';

const INITIAL_ALBUMS: Album[] = [
  { 
    title: "Snow Camp at Sugar Pine Point State Park", 
    year: "Winter 2024", 
    count: "45 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczOqbi-wKXNMR77zTMHsK3F51_GTAw00p-jEapBH7cLV8B0TJoTiNVo1e47w5E7TOjXeeSTAHm5vgW66IeX8NwO1PaQSLm-yHJP5nHiVi3MDI2-1jVjIBHXqySOVAPoE9h4ajBx4ficatGz1lShhzaQxYg=w2496-h1664-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/qu1WcjM3hRG2Yttn8",
    location: "Sugar Pine Point State Park"
  },
  { 
    title: "Sausalito City Tour", 
    year: "Spring 2024", 
    count: "32 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczOsY__ObLuKTSYyWJ_sAXCwMP1aywxRf4TzZ0eyp1ewsJK88gqdulR9W6WRlYPgP1nhk2wtqiy-ZkA9YtzO8gLtP60m-94X7waMZbsGwN9ELDHfuP-TFULW4gJ5jmVVPr1wZFS9XNTXnQISwrQO6s1Wcw=w2940-h1654-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/6y5Sv1C5AJmp2jA96",
    location: "Sausalito, CA"
  },
  { 
    title: "Rim of Bay Garin-Dry Creek Regional Park", 
    year: "2024", 
    count: "28 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczPvKgtCbrJ3v68w8l0vO-370Mec1jOxoeqpn4XeYL58v6yiaQ5YiRpUXs_Pq9bapnQ8zxlKztS9T5G9ZJTyiZhCybbu2ZWg4pG-atvU2Jt3IkIZADKxrje6pACfV88-STLYcY_NTD5OCJhLFu2QkAjLCg=w2218-h1664-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/pSNRSXmFHc2o5Uc76",
    location: "Garin Regional Park"
  },
  { 
    title: "District Camporee", 
    year: "2024", 
    count: "60 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczNcC16zpS6dxT6PrY-mzmCMDmtu9BIB72wS9L8Tkapd6ZrpZWG2LTdSnIZT2DupACu4GHlfFSmscDGZb5qKHMncW8L2sYnQHn-qgxGomnkT9Ez7ciUuNgabrYuGShdUVZ_rt2waJRSFHhKNZfh_-MXZ_w=w2370-h1580-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/8J4atRX82TYhfeCj7",
    location: "District Level"
  },
  { 
    title: "Scout-O-Rama", 
    year: "2024", 
    count: "40 Photos", 
    type: 'photo', 
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800",
    url: "https://photos.app.goo.gl/FFioo4ZWqhKe9A2A6",
    location: "Regional Event"
  },
  { 
    title: "Sacramento City Hike", 
    year: "2024", 
    count: "35 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczMrvWA2rVu_oaPLp4Tw5fyjCmAwx2j8RUu0vSRFv65wKf19QVkrOtvWqLvDW9j0wCQ9wXHsmsAQ1R5RhAOwflVbiJQtrQiC9k5G5NWU1aymq_L4V72xCx7DMOiln1NRs9_JYp4EPeQQwt31xCVVJWkcyg=w2940-h1654-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/yaPhfMXfew6U5sao7",
    location: "Sacramento, CA"
  },
  { 
    title: "Rafting at American River", 
    year: "Summer 2024", 
    count: "55 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczMP-sObEP226PHTlBCc3KKrLt0fKaHvNRZV41x0G6PhL2oihrhhoamzwwepy-sQJQJjnFViC2gYCqD3BD_6tTstoC0oCFK_7FAQ-WTDj6dv89SvcDnpWeDv4xurWCHTCmnpi18UzSrwQtH2wGPNZmSz3g=w2496-h1664-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/Zg7fArb9bJVpKrBi6",
    location: "American River"
  },
  { 
    title: "30 Miler at Crabtree", 
    year: "Summer 2024", 
    count: "48 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczMMc4SDIIzWdzJrUBjZiujxko1FOPji46X85FpS4vxD6kD1bzvdD7VdN_x-jcxIx3BETf2sMynPpI21BuqVoqFCbjkAr4-BXxeh75b1GQ2c_YFnn8d_DYh7bbMitjGKDyHpo8A33U_HEWztDZn47Cjkaw=w2106-h1580-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/yoACCmL4sEgcHy2W7",
    location: "Crabtree Trailhead"
  },
  { 
    title: "Popcorn Sales", 
    year: "Fall 2023", 
    count: "20 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczPkHsxBhYIZVrLhgYJiJ3vVZQXvGsx7HTsZEFaKykImCDwdOqVMlFgGak0p30_CKNWSMFkU1iQygm5NtI5xsJvVkQs7HEW8RgWQE3-f6fOldsp1UkBO0PG-ATu0iZISyG09BuhM8xejIdrT80FmlZS4vA=w2106-h1580-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/LGgvMGJkTveVRupF8",
    location: "Fremont, CA"
  },
  { 
    title: "CASA Camporee", 
    year: "2023", 
    count: "42 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczN1jrAeRRxSNaGD2O7V9XgAl_nDSYKI-5RT_rC6O6LIXxPtfIL5I0YFlqe2zvHsE6K7PL6p3mBQiFtEkTtRRdGkEaSx4uFWAm5Xd6bqcNVta-ppn5ItVCbbGXjlwXeF7WlUvuosmTNj7AF-G11RzQZFmA=w2218-h1664-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/nFgau8yAJqRkwa2s7",
    location: "CASA District"
  },
  { 
    title: "ILST at Coyote Hills", 
    year: "2023", 
    count: "25 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczO6c_NjskCkEk1LkmH87lkZv2-g3Dd3Vh__Y6ZzkUkzMV9JdNBsb3mpIBpzfKD-oCO705N0F0FnYU6izuW4HIOQ15sVY7Dx1cgdFbpbXWvlmdKTVNjA_2vsLSMIEZBWhb0A8rpXvC18wtaNXpzyXH-O_Q=w2496-h1664-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/EGC63t1iQXAq2pf76",
    location: "Coyote Hills Regional Park"
  },
  { 
    title: "50 Miler Cycling", 
    year: "Summer 2023", 
    count: "38 Photos", 
    type: 'photo', 
    image: "https://lh3.googleusercontent.com/pw/AP1GczOZXIvUssaS_7QHnKCvEfR70BM05qbXb3ay8eYmIZZOjAIrVRMbTaLiHyb8Lb_kVBGK7RbIne66LiPfUZBfckotmNmstL9kgWH_QvNQJbmux9q3gcgsIO7OdOOakqcmjPsCpvZLgV5NIhKYkWoSffacag=w2496-h1664-s-no-gm?authuser=0",
    url: "https://photos.app.goo.gl/NxTJjYK1Z6WTiwmk6",
    location: "Bay Area Trails"
  }
];

const DEFAULT_DATA: CmsData = {
  troopInfo: { ...TROOP_INFO, location: "Fremont, CA" },
  activities: ACTIVITIES,
  upcomingEvents: UPCOMING_EVENTS,
  achievements: ACHIEVEMENTS,
  equipment: TEN_ESSENTIALS,
  albums: INITIAL_ALBUMS,
  hero: {
    title: "Scout-Led. Value Driven.",
    subtitle: "童子軍著重於 - 德, 智, 體, 羣, 勇 及 領 袖 訓 練。\nAt Troop 468, we believe that the best way to learn leadership is to lead.",
    backgroundImage: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2000"
  }
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(DEFAULT_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const dataRef = useRef(data);

  // Sync ref with state to ensure saveChanges always has the newest data
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load CMS data", e);
      }
    } else {
      // Clear old versions if they exist to force the new INITIAL_ALBUMS update
      ['troop468_cms_data_v2', 'troop468_cms_data_v3', 'troop468_cms_data_v4', 'troop468_cms_data_v5', 'troop468_cms_data_v6', 'troop468_cms_data_v7', 'troop468_cms_data_v8', 'troop468_cms_data_v9', 'troop468_cms_data_v10', 'troop468_cms_data_v11'].forEach(k => {
        localStorage.removeItem(k);
      });
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
    setData(prev => {
      const keys = path.split('.');
      const newData = JSON.parse(JSON.stringify(prev));
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const updateAlbum = (index: number, updatedAlbum: Album) => {
    setData(prev => {
      const newAlbums = [...prev.albums];
      newAlbums[index] = updatedAlbum;
      return { ...prev, albums: newAlbums };
    });
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataRef.current));
    alert("Changes saved to browser database! Note: To make these changes permanent for all users, click 'COPY CONFIG' and send that code to the developer.");
  };

  const discardChanges = () => {
    if (!confirm("Discard all unsaved edits? This will reset to the last saved version.")) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    setData(saved ? JSON.parse(saved) : DEFAULT_DATA);
  };

  const exportConfig = () => {
    return JSON.stringify(dataRef.current, null, 2);
  };

  return (
    <div className="min-h-screen font-sans bg-scout-light">
      <CmsContext.Provider value={{ 
        data, isAdmin, login, logout, updateContent, 
        updateAlbum, addAlbum, removeAlbum, saveChanges, discardChanges, exportConfig 
      }}>
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