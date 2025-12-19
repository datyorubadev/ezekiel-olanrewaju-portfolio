import React, { useState } from 'react';
import { FadeIn } from './ui/FadeIn';
import { useProfile } from '../lib/sanity';

export const Contact: React.FC = () => {
  const profile = useProfile();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of submission
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <section id="contact" className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Let's build something intelligent.</h2>
            <p className="text-neutral-500 mb-8 leading-relaxed">
              Whether you need a strategy audit or a full-scale RAG implementation, I'm ready to help you ship.
            </p>
            <div className="space-y-4 text-sm font-medium">
              <p>Email: <a href={`mailto:${profile.email}`} className="text-neutral-900 underline">{profile.email}</a></p>
              <p>Location: Remote / London, UK</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {isSubmitted ? (
              <div className="h-full flex flex-col justify-center items-center bg-neutral-50 rounded-2xl p-8 text-center">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                   ✓
                 </div>
                 <h3 className="font-semibold text-lg">Message Sent</h3>
                 <p className="text-neutral-500 mt-2">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border-b border-neutral-300 focus:border-neutral-900 focus:bg-white outline-none transition-all placeholder:text-neutral-400 rounded-none"
                    placeholder="Jane Doe"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border-b border-neutral-300 focus:border-neutral-900 focus:bg-white outline-none transition-all placeholder:text-neutral-400 rounded-none"
                    placeholder="jane@company.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-neutral-50 border-b border-neutral-300 focus:border-neutral-900 focus:bg-white outline-none transition-all resize-none placeholder:text-neutral-400 rounded-none"
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-neutral-900 text-white font-medium py-4 rounded-sm hover:bg-neutral-800 transition-colors mt-2"
                >
                  Send Message
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
