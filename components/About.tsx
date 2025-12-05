import React from 'react';
import { FadeIn } from './ui/FadeIn';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <FadeIn>
              <h2 className="text-3xl font-semibold tracking-tight mb-6">About &<br/>Expertise</h2>
            </FadeIn>
          </div>
          <div className="md:col-span-8 space-y-8">
            <FadeIn delay={0.2}>
              <p className="text-lg text-neutral-600 leading-relaxed">
                I bridge the gap between abstract AI capabilities and concrete business value. With a background in software engineering and a deep focus on the emerging LLM stack, I help organizations move past the "demo phase" into production-grade systems.
              </p>
            </FadeIn>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-neutral-200">
              <FadeIn delay={0.3}>
                <h3 className="font-semibold mb-2">Technical Mastery</h3>
                <p className="text-neutral-500 text-sm">
                  Pro-level implementation of RAG pipelines, Vector DBs, and fine-tuning. I don't just use APIs; I architect resilient systems around them.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h3 className="font-semibold mb-2">Strategic Integration</h3>
                <p className="text-neutral-500 text-sm">
                  Understanding where AI adds value and where it adds risk. I prioritize ROI and operational stability over hype.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
