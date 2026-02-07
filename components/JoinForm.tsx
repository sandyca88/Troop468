import React, { useState } from 'react';
import { Send, MapPin, Mail, ArrowRight, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

const JoinForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/xwvnkrdw", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          subject: `New Scout Inquiry: ${formData.name}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', age: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="join" className="py-32 px-6 bg-white flex items-center justify-center min-h-[600px]">
        <div className="text-center animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-scout-green text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-scout-green/20">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-5xl font-black text-scout-dark font-serif mb-6">Inquiry Received</h2>
          <p className="text-xl text-scout-dark/60 max-w-md mx-auto leading-relaxed mb-10">
            Thank you for reaching out. Your adventure has already begun—our leadership team will be in touch with you shortly.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="text-scout-accent font-black tracking-[0.2em] text-xs uppercase underline underline-offset-8 hover:text-scout-dark transition-colors"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="join" className="py-32 px-6 bg-scout-light border-t border-scout-khaki">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left: Content Area */}
          <div className="space-y-12">
            <div>
              <span className="inline-flex items-center space-x-2 text-scout-accent font-black tracking-widest uppercase text-xs mb-6">
                <Sparkles size={14} />
                <span>Begin the adventure</span>
              </span>
              <h2 className="text-7xl md:text-8xl font-black text-scout-dark font-serif leading-[0.9] mb-8">
                Ready for the <br /> <span className="italic text-scout-accent">Next Step?</span>
              </h2>
              <p className="text-xl text-scout-dark/60 max-w-lg leading-relaxed font-light">
                Whether you're ready to join or just have a few questions, we'd love to hear from you. Drop us a line and let's start the journey together.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-scout-accent shadow-sm border border-scout-khaki">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-black text-scout-dark uppercase tracking-widest text-[10px] mb-1">Basecamp</h4>
                  <p className="text-lg font-bold text-scout-dark/80">Fremont, California</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-scout-green shadow-sm border border-scout-khaki">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-black text-scout-dark uppercase tracking-widest text-[10px] mb-1">Inquiries</h4>
                  <p className="text-lg font-bold text-scout-dark/80">Leadership Team 468</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Modern Form Area */}
          <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-scout-dark/5 border border-scout-khaki">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="group relative">
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/30 mb-2 px-1 transition-colors group-focus-within:text-scout-accent">
                  Full Name
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Scout or Parent Name"
                  className="w-full bg-transparent border-b-2 border-scout-khaki py-4 outline-none focus:border-scout-accent transition-colors font-bold text-lg placeholder:text-scout-dark/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/30 mb-2 px-1 transition-colors group-focus-within:text-scout-accent">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="hello@example.com"
                    className="w-full bg-transparent border-b-2 border-scout-khaki py-4 outline-none focus:border-scout-accent transition-colors font-bold text-lg placeholder:text-scout-dark/10"
                  />
                </div>
                <div className="group relative">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/30 mb-2 px-1 transition-colors group-focus-within:text-scout-accent">
                    Age / Grade
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="e.g. 12 / 7th Grade"
                    className="w-full bg-transparent border-b-2 border-scout-khaki py-4 outline-none focus:border-scout-accent transition-colors font-bold text-lg placeholder:text-scout-dark/10"
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="block text-[10px] font-black uppercase tracking-widest text-scout-dark/30 mb-2 px-1 transition-colors group-focus-within:text-scout-accent">
                  Message
                </label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we help you?"
                  className="w-full bg-transparent border-b-2 border-scout-khaki py-4 outline-none focus:border-scout-accent transition-colors font-bold text-lg resize-none placeholder:text-scout-dark/10"
                ></textarea>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-scout-dark text-white p-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-scout-accent transition-all flex items-center justify-center space-x-4 shadow-xl disabled:opacity-50 group"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
                
                {status === 'error' && (
                  <p className="text-red-500 text-center mt-6 text-xs font-bold uppercase tracking-widest animate-pulse">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinForm;