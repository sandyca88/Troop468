import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Save, RefreshCw, LogOut, Lock, Settings, Copy, Check } from 'lucide-react';

const AdminToolbar: React.FC = () => {
  const { isAdmin, login, logout, saveChanges, discardChanges, exportConfig } = useCms();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const handleOpenLogin = () => setShowLogin(true);
    window.addEventListener('open-admin-login', handleOpenLogin);
    return () => window.removeEventListener('open-admin-login', handleOpenLogin);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowLogin(false);
      setPassword('');
    } else {
      alert("Invalid password.");
    }
  };

  const handleCopyConfig = () => {
    const config = exportConfig();
    navigator.clipboard.writeText(config).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 3000);
      alert("Config copied! Send this to the developer to make your changes permanent globally.");
    });
  };

  if (!isAdmin) {
    return (
      <>
        <button 
          onClick={() => setShowLogin(true)}
          className="fixed bottom-6 right-6 p-4 bg-scout-dark/30 text-white/50 hover:bg-scout-dark hover:text-white rounded-full transition-all backdrop-blur-sm z-50 shadow-lg"
          title="Admin Login"
        >
          <Lock size={18} />
        </button>

        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-scout-dark/60 backdrop-blur-md p-6">
            <div className="bg-white rounded-[2.5rem] p-12 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
              <h3 className="text-3xl font-black font-serif text-scout-dark mb-6 text-center">Admin Access</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent"
                  placeholder="Enter Password"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="w-full bg-scout-dark text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-scout-accent transition-all"
                >
                  Unlock Editor
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowLogin(false)}
                  className="w-full text-scout-dark/40 font-bold text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  // Matches the UI from the user's screenshot
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#1A2E1F] p-4 rounded-[2.5rem] shadow-2xl flex items-center space-x-6 min-w-[500px] border border-white/5 animate-in slide-in-from-bottom duration-500">
      
      {/* Left Section: Status */}
      <div className="flex items-center space-x-4 pr-6 border-r border-white/10">
        <div className="bg-[#D97706] p-4 rounded-2xl text-white shadow-lg">
          <Settings size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Editor Mode</p>
          <p className="text-sm font-black text-white leading-none">Logged in as Admin</p>
        </div>
      </div>

      {/* Middle: Primary Actions */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={saveChanges}
          className="bg-[#D97706] text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#B45309] transition-all flex items-center space-x-3 shadow-xl"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>

        <button 
          onClick={discardChanges}
          className="bg-white/10 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center space-x-3"
        >
          <RefreshCw size={16} />
          <span>Discard Edits</span>
        </button>
      </div>

      {/* Right Section: Copy/Log out */}
      <div className="flex items-center space-x-4 pl-4">
        <button 
          onClick={handleCopyConfig}
          className="text-white/40 hover:text-white transition-colors p-2"
          title="Export Config for Global Update"
        >
          {hasCopied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
        </button>
        
        <button 
          onClick={logout}
          className="text-white/40 hover:text-white p-2 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdminToolbar;
