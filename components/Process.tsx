import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { useProcess } from '../lib/payload';

export const Process: React.FC = () => {
  const processSteps = useProcess();

  return (
    <section id="process" className="py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16">How I Work</h2>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-8 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-neutral-200 -z-10" />
           
           {processSteps.map((step, index) => (
             <FadeIn key={index} delay={index * 0.2}>
               <div className="bg-white pr-4">
                 <div className="w-12 h-12 bg-white border border-neutral-200 rounded-full flex items-center justify-center font-mono text-sm text-neutral-500 mb-6 shadow-sm">
                   {step.number}
                 </div>
                 <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                 <p className="text-sm text-neutral-500 leading-relaxed">
                   {step.description}
                 </p>
               </div>
             </FadeIn>
           ))}
        </div>
      </div>
    </section>
  );
};
