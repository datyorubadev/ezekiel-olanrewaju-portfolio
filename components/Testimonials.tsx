import React, { useState } from 'react';
import { FadeIn } from './ui/FadeIn';
import { useTestimonials } from '../lib/payload';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const testimonials = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-[1px] bg-neutral-900"></span>
            <span className="text-sm font-semibold uppercase tracking-widest text-neutral-900">Client Stories</span>
          </div>
        </FadeIn>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[300px] md:min-h-[400px]"
            >
              {/* Left: Brand/Context/Image */}
              <div className="flex flex-col justify-center items-center p-6 md:p-12 bg-neutral-50 h-full w-full text-center border border-neutral-100">
                {currentTestimonial.authorImage ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-white shadow-sm">
                    <img
                      src={currentTestimonial.authorImage}
                      alt={currentTestimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-neutral-200 rounded-full mb-6 flex items-center justify-center text-2xl font-bold text-neutral-500">
                    {currentTestimonial.company.charAt(0)}
                  </div>
                )}
                <h3 className="text-2xl font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  {currentTestimonial.company}
                </h3>
                <div className="w-8 h-[2px] bg-neutral-300 mt-4 mb-4"></div>
                <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
                  Success Story {currentIndex + 1} / {testimonials.length}
                </p>
              </div>

              {/* Right: Quote */}
              <div className="md:pl-8 flex flex-col justify-center h-full">
                <div className="text-4xl md:text-6xl text-neutral-200 font-serif leading-none mb-6">”</div>
                <blockquote className="text-lg md:text-3xl font-medium leading-tight text-neutral-900 mb-6 md:mb-10">
                  {currentTestimonial.quote}
                </blockquote>
                <div className="flex flex-col">
                  <cite className="not-italic font-semibold text-lg text-neutral-900">
                    {currentTestimonial.author}
                  </cite>
                  <span className="text-neutral-500 text-sm mt-1">
                    {currentTestimonial.role} @ {currentTestimonial.company}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex gap-4 mt-12 md:absolute md:bottom-0 md:right-0 md:mt-0">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
