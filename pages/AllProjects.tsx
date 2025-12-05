import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { FadeIn } from '../components/ui/FadeIn';
import { useProjects, urlFor } from '../lib/payload';

export const AllProjects: React.FC = () => {
  const projects = useProjects();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="pt-32 md:pt-48 pb-24 bg-neutral-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <Link to="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors group">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back home
            </Link>
            <FadeIn>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">All Work</h1>
              <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
                A complete archive of strategies, automations, and RAG pipelines shipped for startups and enterprises.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16">
            {projects.map((project, index) => {
               const imageUrl = typeof project.coverImage === 'string' 
                ? project.coverImage 
                : urlFor(project.coverImage).width(1000).height(750).url();

               return (
                <FadeIn key={project.slug} delay={index * 0.1}>
                  <Link to={`/projects/${project.slug}`} className="group block">
                    <div className="aspect-[16/10] bg-neutral-200 rounded-lg overflow-hidden mb-6 relative shadow-sm">
                      <img 
                        src={imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-500" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        <ArrowUpRight size={20} className="text-neutral-900" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="max-w-md">
                        <div className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-2">
                            {project.client} — {project.year}
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                        <p className="text-neutral-600 leading-relaxed mb-4">{project.summary}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map(tag => (
                        <span key={tag} className="text-xs font-medium text-neutral-500 bg-white border border-neutral-200 px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </FadeIn>
               );
            })}
          </div>
          
          <div className="mt-24 pt-12 border-t border-neutral-200 text-center">
             <p className="text-neutral-500 mb-6">Looking for something specific?</p>
             <a href="/#contact" className="inline-block border-b border-neutral-300 pb-1 text-neutral-900 hover:border-neutral-900 transition-all">
                Ask me about a custom implementation
             </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};
