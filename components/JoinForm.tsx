
import React, { useState } from 'react';
import { Send, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { getScoutAssistantResponse } from '../services/geminiService';

const JoinForm: React.FC = () => {
  const [isAsking, setIsAsking] = useState(false);
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleAskScout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsAsking(true);
    const answer = await getScoutAssistantResponse(question);
    setAiAnswer(answer || "Error getting response.");
    setIsAsking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <section id="join" className="py-24 px-6 bg-scout-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          
          {/* AI Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-scout-khaki sticky top-32">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-scout-accent p-3 rounded-2xl shadow-lg animate-bounce">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-scout-dark text-xl leading-none">Scout Assistant</h3>
                  <span className="text-[10px] text-scout-accent font-bold uppercase tracking-widest">Powered by Gemini AI</span>
                </div>
              </div>

              <div className="mb-8 p-6 bg-scout-light rounded-3xl min-h-[160px] border border-scout-khaki/30">
                {isAsking ? (
                  <div className="flex items-center space-x-2 text-scout-dark/40 animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm italic">Searching our records...</span>
                  </div>
                ) : aiAnswer ? (
                  <p className="text-sm text-scout-dark leading-relaxed font-medium">
                    {aiAnswer}
                  </p>
                ) : (
                  <p className="text-sm text-scout-dark/40 italic">
                    "Hi! Have questions about camping, rank requirements, or our troop culture? Ask me anything!"
                  </p>
                )}
              </div>

              <form onSubmit={handleAskScout} className="relative group">
                <input 
                  type="text" 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-scout-light border border-scout-khaki rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-scout-accent transition-all pr-12"
                />
                <button 
                  type="submit"
                  disabled={isAsking}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-scout-accent hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="mb-12">
              <span className="text-scout-accent font-black tracking-widest uppercase text-sm mb-4 block">Begin the adventure</span>
              <h2 className="text-6xl font-black text-scout-dark font-serif mb-6">Join Troop 468</h2>
              <p className="text-lg text-scout-dark/60">
                Ready to take the first step? Fill out the form below and one of our leaders will reach out to schedule your first visit to a Thursday or Saturday meeting.
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="bg-scout-green/10 border border-scout-green p-12 rounded-[40px] text-center">
                <div className="w-20 h-20 bg-scout-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-scout-green mb-4">Message Sent!</h3>
                <p className="text-scout-dark/70">A Scout Leader will email you shortly regarding our next bi-weekly meeting.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-8 text-scout-accent font-bold uppercase tracking-widest text-sm">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Scout's Name</label>
                  <input type="text" required className="w-full bg-white border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Age / Grade</label>
                  <input type="text" required className="w-full bg-white border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none" placeholder="e.g. 12 / 7th Grade" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Parent/Guardian Email</label>
                  <input type="email" required className="w-full bg-white border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none" placeholder="email@example.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-black text-scout-dark uppercase tracking-widest px-2">Message (Optional)</label>
                  <textarea rows={4} className="w-full bg-white border border-scout-khaki rounded-2xl px-6 py-4 focus:ring-2 focus:ring-scout-accent outline-none resize-none" placeholder="Tell us about your interests..."></textarea>
                </div>
                <div className="sm:col-span-2">
                  <button 
                    type="submit" 
                    className="w-full bg-scout-dark text-white py-5 rounded-2xl font-black text-lg hover:bg-scout-accent transition-colors shadow-xl"
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? 'SENDING...' : 'SEND INQUIRY'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinForm;
