import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { useTechStack } from '../lib/payload';

export const TechStack: React.FC = () => {
  const techStack = useTechStack();

  return (
    <section className="py-32 md:py-48 bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-8">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <span 
                key={index} 
                className="px-6 py-3 bg-white border border-neutral-200 rounded-full text-neutral-600 font-medium hover:border-neutral-400 hover:scale-105 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
