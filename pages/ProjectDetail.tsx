import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { FadeIn } from '../components/ui/FadeIn';
import { useProjectBySlug, urlFor } from '../lib/sanity';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading } = useProjectBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link to="/" className="text-blue-600 underline">Return Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const imageUrl = typeof project.coverImage === 'string' 
    ? project.coverImage 
    : urlFor(project.coverImage).width(1200).height(800).url();

  return (
    <Layout>
      <article className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <Link to="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </Link>
          <FadeIn>
            <div className="flex gap-4 text-sm text-neutral-500 mb-4 uppercase tracking-wider">
              <span>{project.client}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          </FadeIn>
        </div>

        {/* Hero Image */}
        <div className="w-full bg-neutral-100 h-[400px] md:h-[600px] mb-24 overflow-hidden">
            <img src={imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          
          {/* Main Narrative */}
          <div className="md:col-span-8 space-y-16">
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
              <p className="text-lg text-neutral-600 leading-relaxed font-light">
                {project.problem}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
              <p className="text-lg text-neutral-600 leading-relaxed font-light mb-6">
                {project.solution}
              </p>
              <p className="text-neutral-600 leading-relaxed font-light">
                {project.description}
              </p>
            </FadeIn>

            {project.chartData && project.chartData.length > 0 && (
              <FadeIn delay={0.2}>
                <h3 className="text-xl font-semibold mb-6">Impact Analysis</h3>
                <div className="h-80 w-full bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={project.chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {project.chartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.type === 'after' ? '#171717' : '#d4d4d4'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-center text-xs text-neutral-400 mt-2">Comparison: Before vs After</p>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="md:col-span-4 space-y-12">
            {project.metrics && project.metrics.length > 0 && (
              <FadeIn delay={0.2}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">
                  Key Outcomes
                </h3>
                <div className="space-y-6">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="pb-6 border-b border-neutral-100 last:border-0">
                      <div className="text-3xl font-bold text-neutral-900 mb-1">{metric.value}</div>
                      <div className="font-medium text-neutral-700 mb-1">{metric.label}</div>
                      <p className="text-sm text-neutral-500">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.3}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-6 mt-24 pt-12 border-t border-neutral-100 text-center">
            <h3 className="text-2xl font-semibold mb-6">Need similar results?</h3>
            <a href="/#contact" className="inline-block px-8 py-4 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Discuss this project
            </a>
        </div>
      </article>
    </Layout>
  );
};
