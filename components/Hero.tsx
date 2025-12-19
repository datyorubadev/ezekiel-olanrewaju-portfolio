import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProfile } from '../lib/sanity';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const profile = useProfile();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-neutral-50 to-transparent -z-10 opacity-50" />
      
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-10 lg:col-span-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 font-medium mb-6 tracking-wide text-sm uppercase flex items-center gap-2"
          >
            <span className="w-8 h-[1px] bg-neutral-400 inline-block"></span>
            {profile.role}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-neutral-900 leading-[1.1] mb-8"
          >
            {profile.headline}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-neutral-500 max-w-2xl leading-relaxed mb-10 font-light"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <a 
              href="#contact" 
              className="px-8 py-4 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-neutral-200"
            >
              Book a working session
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link 
              to="/projects" 
              className="px-8 py-4 border border-neutral-200 text-neutral-700 font-medium rounded-full hover:border-neutral-900 hover:text-neutral-900 transition-all flex items-center justify-center bg-white"
            >
              View all projects
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
