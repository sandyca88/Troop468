
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  currentView: 'home' | 'activities-archive' | 'equipment-archive';
  navigateTo: (view: 'home' | 'activities-archive' | 'equipment-archive', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (currentView === 'home') {
        const sections = ['home', 'about', 'activities', 'benefits', 'equipment', 'eagle', 'join'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks = [
    { name: 'Home', id: 'home', view: 'home' as const },
    { name: 'About Troop 468', id: 'about', view: 'home' as const },
    { name: 'Activities', id: 'activities', view: 'home' as const },
    { name: 'Benefits', id: 'benefits', view: 'home' as const },
    { name: 'Equipment Guide', id: 'equipment', view: 'home' as const },
    { name: 'Eagle court of honor', id: 'eagle', view: 'home' as const },
  ];

  const handleLinkClick = (view: 'home' | 'activities-archive' | 'equipment-archive', id: string) => {
    navigateTo(view, id);
    setMobileMenuOpen(false);
  };

  // The logo should be dark if we are NOT scrolled AND we are on a subpage (light background)
  // If we are scrolled, the navbar gets a dark background, so logo should be light.
  const isLogoDark = !isScrolled && !mobileMenuOpen && currentView !== 'home';
  const isNavTextDark = isLogoDark;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-scout-dark/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => handleLinkClick('home', 'home')}>
            <BrandLogo className="w-8 h-8 md:w-10 md:h-10" isDark={isLogoDark} />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.view, link.id)}
                className={`text-[10px] font-black tracking-[0.2em] transition-colors uppercase ${currentView === 'home' && activeSection === link.id ? 'text-scout-accent' : (isNavTextDark ? 'text-scout-dark hover:text-scout-accent' : 'text-white/80 hover:text-scout-accent')}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('home', 'join')}
              className="bg-scout-accent text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-scout-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-scout-accent/20"
            >
              JOIN NOW
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden z-50 p-2 transition-colors ${isNavTextDark ? 'text-scout-dark' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-scout-dark transition-all duration-500 flex flex-col p-12 ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="mt-8 mb-16">
          <BrandLogo className="w-12 h-12" />
        </div>
        
        <div className="flex flex-col space-y-8 overflow-y-auto pb-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.view, link.id)}
              className={`text-left text-3xl font-bold font-serif transition-colors ${currentView === 'home' && activeSection === link.id ? 'text-scout-accent' : 'text-white hover:text-scout-accent'}`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('home', 'join')}
            className="text-left text-3xl font-bold font-serif text-scout-accent"
          >
            How to join
          </button>
          <div className="border-t border-white/10 pt-8 flex flex-col space-y-6">
            <button
              onClick={() => handleLinkClick('activities-archive', '')}
              className="text-left text-xl font-bold font-serif text-white/50 uppercase tracking-widest"
            >
              Photo Archive
            </button>
            <button
              onClick={() => handleLinkClick('equipment-archive', '')}
              className="text-left text-xl font-bold font-serif text-white/50 uppercase tracking-widest"
            >
              Full Gear Guide
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
