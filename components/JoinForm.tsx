
import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { processRegistration } from '../services/geminiService';

const JoinForm: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    scoutName: '',
    age: '',
    parentEmail: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Call the service which triggers mailto:tosandy@gmail.com
    const result = await processRegistration(formData);
    
    if (result.success) {
      setFormStatus('success');
    } else {
      setFormStatus('idle');
      alert(result.message);
    }
  };

  return (
    <section id="join" className="py-24 px-6 bg-scout-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-scout-accent font-black tracking-widest uppercase text-sm mb-4 block">Begin the adventure</span>
          <h2 className="text-6xl font-black text-scout-dark font-serif mb-6">Join Troop 468</h2>
          <p className="text-lg text-scout-dark/60 max-w-2xl mx-auto">
            Ready to take the first step? Fill out the form below to draft an email to our Scoutmaster.
          </p>
        </div>

        <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-scout-khaki">
          {formStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-scout-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-scout-green mb-4">Email Client Opened!</h3>
              <p className="text-scout-dark/70">We've pre-filled an email to <b>tosandy@gmail.com</b>. Please switch to your mail app and hit 'Send' to finish.</p>
              <button onClick={() => setFormStatus('idle')} className="mt-8 text-scout-accent font-bold uppercase tracking-widest text-sm underline decoration-2 underline-offset-4">Reset Form</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Scout's Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.scoutName}
                  onChange={(e) => setFormData({...formData, scoutName: e.target.value})}
                  className="w-full bg-scout-light border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none font-bold" 
                  placeholder="Enter name" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Age / Grade</label>
                <input 
                  type="text" 
                  required 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-scout-light border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none font-bold" 
                  placeholder="e.g. 12 / 7th Grade" 
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Parent/Guardian Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                  className="w-full bg-scout-light border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none font-bold" 
                  placeholder="email@example.com" 
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Message (Optional)</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-scout-light border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none resize-none font-medium" 
                  placeholder="Tell us about your interests..."
                ></textarea>
              </div>
              <div className="sm:col-span-2 mt-4">
                <button 
                  type="submit" 
                  className="w-full bg-scout-dark text-white py-6 rounded-2xl font-black text-lg hover:bg-scout-accent transition-colors shadow-xl tracking-widest flex items-center justify-center space-x-3"
                  disabled={formStatus === 'sending'}
                >
                  <Mail className="w-5 h-5" />
                  <span>{formStatus === 'sending' ? 'OPENING EMAIL...' : 'SEND VIA EMAIL'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
