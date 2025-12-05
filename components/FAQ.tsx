import React, { useState } from 'react';
import { FadeIn } from './ui/FadeIn';
import { Plus, Minus } from 'lucide-react';
import { useFAQs } from '../lib/payload';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ: React.FC = () => {
  const faqs = useFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 md:py-48 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left Column: Heading & CTA */}
          <div className="md:col-span-5">
            <FadeIn>
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full mb-6">
                FAQ
              </span>
              <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 mb-8 leading-tight">
                What would you like to know about my process?
              </h2>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-neutral-200 rounded-full text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all text-sm font-medium"
              >
                Let's talk specifically
              </a>
            </FadeIn>
          </div>

          {/* Right Column: Accordion */}
          <div className="md:col-span-7 space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div 
                  className={`bg-neutral-50 rounded-xl overflow-hidden cursor-pointer transition-colors duration-300 ${openIndex === index ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center p-6">
                    <h3 className="text-lg font-medium text-neutral-900 pr-8">
                      {faq.question}
                    </h3>
                    <span className="text-neutral-500 flex-shrink-0">
                      {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-neutral-600 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
