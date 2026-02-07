import React, { useState, useEffect } from 'react';
import { CmsProvider } from './context/CmsContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventsSection from './components/EventsSection';
import BenefitsSection from './components/Stats';
import EquipmentSection from './components/EquipmentSection';
import EquipmentArchive from './components/EquipmentArchive';
import EagleSection from './components/EagleSection';
import JoinForm from './components/JoinForm';
import Footer from './components/Footer';
import ActivitiesArchive from './components/ActivitiesArchive';
import AdminToolbar from './components/AdminToolbar';

const AppContent: React.FC = () => {
  const [view, setView] = useState<'home' | 'activities-archive' | 'equipment-archive'>('home');

  const navigateTo = (newView: 'home' | 'activities-archive' | 'equipment-archive', sectionId?: string) => {
    setView(newView);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-scout-accent selection:text-white antialiased bg-scout-light">
      <Navbar currentView={view} navigateTo={navigateTo} />
      
      <main className="transition-opacity duration-500">
        {view === 'home' ? (
          <>
            <div id="home">
              <Hero navigateTo={navigateTo} />
            </div>
            
            <div className="relative z-30 -mt-16 max-w-5xl mx-auto px-6 hidden lg:block">
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-scout-khaki flex justify-around items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-scout-accent/10 rounded-2xl flex items-center justify-center text-scout-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-scout-accent tracking-widest">Next Meeting</p>
                    <p className="font-bold text-scout-dark">Alt Thu & Sat</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-scout-khaki" />
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-scout-green/10 rounded-2xl flex items-center justify-center text-scout-green">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-scout-accent tracking-widest">Basecamp</p>
                    <p className="font-bold text-scout-dark">Weibel / Old Mission</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-scout-khaki" />
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-scout-accent tracking-widest">Availability</p>
                    <p className="font-bold text-scout-dark">Recruiting Now</p>
                  </div>
                </div>
              </div>
            </div>

            <About />
            <EventsSection onViewMore={() => navigateTo('activities-archive')} />
            <BenefitsSection />
            <EquipmentSection onViewFullList={() => navigateTo('equipment-archive')} />
            <EagleSection />
            
            <div id="join">
              <JoinForm />
            </div>
          </>
        ) : view === 'activities-archive' ? (
          <ActivitiesArchive onBack={() => navigateTo('home')} />
        ) : (
          <EquipmentArchive onBack={() => navigateTo('home')} />
        )}
      </main>

      <Footer navigateTo={navigateTo} />
      <AdminToolbar />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
};

export default App;