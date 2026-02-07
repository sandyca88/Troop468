
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Send, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { processRegistration } from '../services/geminiService';

const RegistrationFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    interests: [] as string[],
    scoutName: '',
    age: '',
    parentEmail: '',
    message: ''
  });

  const totalSteps = 3;
  const interests = ['Camping', 'Backpacking', 'Science', 'Leadership', 'Aquatics', 'Service'];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const result = await processRegistration(formData);
    setIsSubmitting(false);
    if (result.success) {
      setStep(4); // Success step
    } else {
      alert("Something went wrong. Please try again or email us directly at tosandy@gmail.com");
    }
  };

  const nextStep = () => {
    if (step === totalSteps) {
      handleFinalSubmit();
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-right duration-500">
            <h3 className="text-3xl font-black text-scout-dark font-serif mb-6">What excites you most?</h3>
            <p className="text-scout-dark/60 mb-8">Select the adventures you're looking forward to. This helps us tailor your first visit!</p>
            <div className="grid grid-cols-2 gap-4">
              {interests.map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleInterest(i)}
                  className={`p-6 rounded-3xl border-2 transition-all text-left font-bold ${formData.interests.includes(i) ? 'border-scout-accent bg-scout-accent/5 text-scout-accent' : 'border-scout-khaki hover:border-scout-accent/50 text-scout-dark/40'}`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right duration-500">
            <h3 className="text-3xl font-black text-scout-dark font-serif mb-6">About the Scout</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-scout-dark mb-2 px-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.scoutName}
                  onChange={e => setFormData({...formData, scoutName: e.target.value})}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-scout-dark mb-2 px-1">Age / Grade</label>
                <input 
                  type="text" 
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                  placeholder="e.g. 12 / 7th Grade"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right duration-500">
            <h3 className="text-3xl font-black text-scout-dark font-serif mb-6">Parent Connection</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-scout-dark mb-2 px-1">Parent/Guardian Email</label>
                <input 
                  type="email" 
                  value={formData.parentEmail}
                  onChange={e => setFormData({...formData, parentEmail: e.target.value})}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent font-bold"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-scout-dark mb-2 px-1">Anything else we should know?</label>
                <textarea 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  rows={3}
                  className="w-full bg-scout-light border border-scout-khaki p-5 rounded-2xl outline-none focus:ring-2 focus:ring-scout-accent resize-none font-medium"
                  placeholder="Questions or special requirements..."
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-16 animate-in zoom-in duration-700 flex flex-col items-center">
            <div className="w-24 h-24 bg-scout-accent text-white rounded-full flex items-center justify-center mb-10 shadow-[0_20px_50px_rgba(217,119,6,0.3)] transform transition-transform hover:scale-105">
              <Check className="w-12 h-12 stroke-[4px]" />
            </div>
            <h3 className="text-5xl font-black text-scout-dark font-serif mb-6 leading-tight">Adventure Confirmed!</h3>
            <p className="text-xl text-scout-dark/60 max-w-sm mx-auto mb-12 leading-relaxed font-light">
              We've received your inquiry. A Scout Leader will reach out shortly to welcome you to our next Thursday evening or Saturday afternoon meeting!
            </p>
            <button 
              onClick={() => {
                setFormData({
                  interests: [],
                  scoutName: '',
                  age: '',
                  parentEmail: '',
                  message: ''
                });
                setStep(1);
              }} 
              className="text-scout-accent font-black uppercase tracking-[0.3em] text-xs underline decoration-2 underline-offset-8 hover:text-scout-dark transition-colors"
            >
              START OVER
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="join" className="py-32 px-6 bg-scout-light relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-scout-khaki overflow-hidden transition-all duration-500">
          {/* Progress Bar */}
          {step <= totalSteps && (
            <div className="h-2 bg-scout-khaki/30 w-full overflow-hidden">
              <div 
                className="h-full bg-scout-accent transition-all duration-700 ease-out shadow-[0_0_10px_rgba(217,119,6,0.5)]" 
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          )}

          <div className={`p-12 md:p-24 ${step === 4 ? 'bg-white' : ''}`}>
            {renderStep()}

            {step <= totalSteps && (
              <div className="mt-16 flex items-center justify-between">
                <button 
                  onClick={prevStep}
                  disabled={step === 1 || isSubmitting}
                  className={`flex items-center space-x-2 font-black uppercase tracking-widest text-xs transition-all ${step === 1 || isSubmitting ? 'opacity-0 pointer-events-none' : 'text-scout-dark/30 hover:text-scout-dark'}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button 
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="bg-scout-dark text-white px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-scout-accent transition-all flex items-center group shadow-2xl shadow-scout-dark/10 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-3">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>SENDING...</span>
                    </span>
                  ) : (
                    <>
                      <span>{step === totalSteps ? 'SEND INQUIRY' : 'CONTINUE'}</span>
                      <ChevronRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-3 text-scout-dark/30 italic">
          <Sparkles className="w-4 h-4 text-scout-accent opacity-50" />
          <span className="text-sm font-medium">Joining Troop 468 is the beginning of a lifelong brotherhood.</span>
        </div>
      </div>
    </section>
  );
};

export default RegistrationFlow;
