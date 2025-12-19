import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { useServices } from '../lib/sanity';

export const Services: React.FC = () => {
  const services = useServices();

  return (
    <section id="services" className="py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          {/* 
            flex-col items-start = Mobile: Column direction, aligned left.
            md:flex-row md:items-end = Desktop: Row direction, aligned bottom.
          */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-left">Services</h2>
            <p className="text-neutral-500 mt-4 md:mt-0 max-w-md text-left">
              Tailored engagements from strategy sprints to full-stack implementation.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1} className="h-full">
              <div className="p-8 border border-neutral-100 rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all h-full bg-white group cursor-default text-left">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-600 transition-colors">{service.title}</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags?.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-neutral-50 text-neutral-500 text-xs rounded-full border border-neutral-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
