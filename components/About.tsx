import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { useAbout } from '../lib/payload';

export const About: React.FC = () => {
  const aboutData = useAbout();

  return (
    <section id="about" className="py-32 md:py-48 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">About &<br />Expertise</h2>
            </FadeIn>
          </div>
          <div className="md:col-span-8 space-y-8">
            <FadeIn delay={0.2}>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {aboutData.content || 'Loading...'}
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-neutral-200">
              {aboutData.expertise && aboutData.expertise.map((item: any, index: number) => (
                <FadeIn key={index} delay={0.3 + (index * 0.1)}>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">
                    {item.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
