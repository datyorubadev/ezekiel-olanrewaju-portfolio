import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Projects } from '../components/Projects';
import { Process } from '../components/Process';
import { TechStack } from '../components/TechStack';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Layout } from '../components/Layout';

export const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Process />
      <TechStack />
      <Testimonials />
      <FAQ />
      <Contact />
    </Layout>
  );
};
