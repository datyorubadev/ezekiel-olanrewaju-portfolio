import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from './ui/FadeIn';
import { useProjects, urlFor } from '../lib/sanity';
import { ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const projects = useProjects();
  // Show only first 3 or 4 projects on the home page
  const displayedProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="py-32 md:py-48 bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Selected Work</h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedProjects.map((project, index) => {
             const imageUrl = typeof project.coverImage === 'string' 
              ? project.coverImage 
              : urlFor(project.coverImage).width(800).height(600).url();

             return (
              <FadeIn key={project.slug} delay={index * 0.1}>
                <Link to={`/projects/${project.slug}`} className="group block h-full flex flex-col">
                  <div className="aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden mb-4 relative">
                    <img 
                      src={imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-medium mb-1 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                    <p className="text-neutral-400 text-sm mb-4">{project.summary}</p>
                    <div className="flex gap-2 mt-auto">
                      {project.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-neutral-500 border border-neutral-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeIn>
             );
          })}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center">
            <Link 
              to="/projects" 
              className="px-8 py-3 border border-neutral-700 rounded-full text-white hover:bg-white hover:text-neutral-900 transition-all font-medium text-sm"
            >
              View all projects
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
