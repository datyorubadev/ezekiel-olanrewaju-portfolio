import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { Project, ServiceItem, ProcessStep, Profile, FAQ, Testimonial } from '../types';
import {
  PROFILE as FALLBACK_PROFILE,
  PROJECTS as FALLBACK_PROJECTS,
  SERVICES as FALLBACK_SERVICES,
  PROCESS as FALLBACK_PROCESS,
  TECH_STACK as FALLBACK_STACK,
  FAQS as FALLBACK_FAQS,
  TESTIMONIALS as FALLBACK_TESTIMONIALS
} from '../constants';

// Sanity Client Configuration
export const client = createClient({
  projectId: 'xbbmpyzi', // Provided by user
  dataset: 'production',
  useCdn: false, // Changed to false to bypass cache for fresh projects and avoid staleness
  apiVersion: '2024-03-01',
});

// Image URL Builder
const builder = imageUrlBuilder(client);

// Helper to safely generate image URLs with chaining support even if source is missing
export function urlFor(source: any) {
  // Mock builder pattern to prevent crashes when chaining methods like .width().url() on undefined source
  const mockBuilder = {
    width: () => mockBuilder,
    height: () => mockBuilder,
    fit: () => mockBuilder,
    url: () => ''
  };

  if (!source) return mockBuilder as any;

  try {
    return builder.image(source);
  } catch (error) {
    return mockBuilder as any;
  }
}

// GROQ Queries
const QUERIES = {
  PROFILE: `*[_type == "profile"][0] {
    name, role, headline, subheadline, email,
    social { linkedin, twitter, github }
  }`,
  SERVICES: `*[_type == "service"] | order(order asc) {
    title, description, tags
  }`,
  PROJECTS: `*[_type == "project"] | order(year desc) {
    title, "slug": slug.current, summary, client, year, coverImage, tags,
    description, problem, solution, metrics, chartData
  }`,
  PROCESS: `*[_type == "processStep"] | order(stepNumber asc) {
    "number": stepNumber, title, description
  }`,
  TECH_STACK: `*[_type == "techStack"][0].tools`,
  FAQS: `*[_type == "faq"] { question, answer }`,
  TESTIMONIALS: `*[_type == "testimonial"] { quote, author, role, company, logo }`,
  PROJECT_BY_SLUG: `*[_type == "project" && slug.current == $slug][0] {
    title, "slug": slug.current, summary, client, year, coverImage, tags,
    description, problem, solution, metrics, chartData
  }`
};

// Generic Hook for fetching data
function useSanityQuery<T>(query: string, fallback: T, params: Record<string, any> = {}): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(query, params);
        if (result && (Array.isArray(result) ? result.length > 0 : Object.keys(result).length > 0)) {
          setData(result);
        } else {
          console.info(`Sanity query returned empty. Keeping fallback data.`);
        }
      } catch (error: any) {
        if (error?.message?.includes('NetworkError') || error?.message?.includes('Failed to fetch') || error?.message?.includes('Request error')) {
          console.warn("Unable to connect to Sanity (CORS/Network). Using fallback data.");
        } else {
          console.error("Sanity fetch failed:", error);
        }
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return data;
}

// Specific Hooks using the generic one
export const useProfile = () => useSanityQuery<Profile>(QUERIES.PROFILE, FALLBACK_PROFILE);
export const useServices = () => useSanityQuery<ServiceItem[]>(QUERIES.SERVICES, FALLBACK_SERVICES);
export const useProjects = () => useSanityQuery<Project[]>(QUERIES.PROJECTS, FALLBACK_PROJECTS);
export const useProcess = () => useSanityQuery<ProcessStep[]>(QUERIES.PROCESS, FALLBACK_PROCESS);
export const useTechStack = () => useSanityQuery<string[]>(QUERIES.TECH_STACK, FALLBACK_STACK);
export const useFAQs = () => useSanityQuery<FAQ[]>(QUERIES.FAQS, FALLBACK_FAQS);
export const useTestimonials = () => useSanityQuery<Testimonial[]>(QUERIES.TESTIMONIALS, FALLBACK_TESTIMONIALS);

export const useProjectBySlug = (slug: string) => {
  // Initialize state with fallback data if available to prevent loading flash
  const [project, setProject] = useState<Project | null>(() => {
    return FALLBACK_PROJECTS.find(p => p.slug === slug) || null;
  });

  // Only start in loading state if we DON'T have a fallback
  const [loading, setLoading] = useState<boolean>(() => {
    return !FALLBACK_PROJECTS.find(p => p.slug === slug);
  });

  useEffect(() => {
    const fetchProject = async () => {
      // Find fallback again to handle slug changes dynamically
      const fallback = FALLBACK_PROJECTS.find(p => p.slug === slug) || null;

      // If we switched projects, immediately show the new fallback if available
      if (fallback) {
        setProject(fallback);
        setLoading(false);
      } else {
        setLoading(true);
      }

      try {
        const sanityProject = await client.fetch(QUERIES.PROJECT_BY_SLUG, { slug });
        if (sanityProject) {
          setProject(sanityProject);
        }
      } catch (error: any) {
        if (error?.message?.includes('NetworkError') || error?.message?.includes('Failed to fetch') || error?.message?.includes('Request error')) {
           console.warn("Unable to connect to Sanity (CORS/Network). Using fallback data.");
        } else {
           console.error("Error fetching project:", error);
        }
        // Fallback is already set if available
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProject();
  }, [slug]);

  return { project, loading };
};
