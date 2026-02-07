
import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Save, RefreshCw, LogOut, Lock, Settings } from 'lucide-react';

const AdminToolbar: React.FC = () => {
  const { isAdmin, login, logout, saveChanges, discardChanges } = useCms();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

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
      alert("Invalid password. Hint: It's 'admin'");
    }
  };

  if (!isAdmin) {
    return (
      <>
        <button 
          onClick={() => setShowLogin(true)}
          className="fixed bottom-6 right-6 p-3 bg-scout-dark/20 text-scout-dark/30 hover:bg-scout-dark hover:text-white rounded-full transition-all backdrop-blur-sm z-50 shadow-lg"
          title="Admin Login"
        >
          <Lock size={16} />
        </button>

        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-scout-dark/40 backdrop-blur-md p-6">
            <div className="bg-white rounded-[2.5rem] p-12 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
              <h3 className="text-3xl font-black font-serif text-scout-dark mb-6">CMS Access</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/40 mb-2">Editor Password</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-scout-light border border-scout-khaki p-4 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent"
                    placeholder="Hint: admin"
                    autoFocus
                  />
                </div>
                <div className="flex space-x-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-scout-dark text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-scout-accent transition-all"
                  >
                    Authorize
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="px-6 bg-scout-khaki/20 text-scout-dark p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-scout-khaki transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-scout-dark/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl shadow-2xl flex items-center space-x-6 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center space-x-3 pr-6 border-r border-white/10">
        <div className="bg-scout-accent p-2 rounded-xl text-white">
          <Settings size={16} />
        </div>
        <div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Editor Mode</p>
          <p className="text-xs font-bold text-white leading-none">Logged in as Admin</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={saveChanges}
          className="bg-white text-scout-dark px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-scout-accent hover:text-white transition-all flex items-center space-x-2"
        >
          <Save size={14} />
          <span>Save Changes</span>
        </button>
        <button 
          onClick={discardChanges}
          className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all flex items-center space-x-2"
        >
          <RefreshCw size={14} />
          <span>Discard Edits</span>
        </button>
        <button 
          onClick={logout}
          className="text-white/40 hover:text-white p-2 transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default AdminToolbar;
