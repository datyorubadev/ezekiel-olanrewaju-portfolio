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

// Payload API Configuration
const apiUrl = process.env.PAYLOAD_API_URL || 'http://localhost:3000';

// Helper to safely generate image URLs
export function urlFor(source: any) {
  if (!source) return '';
  return source.url || '';
}

// Generic Hook for fetching data from Payload
function usePayloadQuery<T>(endpoint: string, fallback: T, transform?: (data: any) => T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const transformed = transform ? transform(result) : result.docs;
        if (transformed && (Array.isArray(transformed) ? transformed.length > 0 : Object.keys(transformed).length > 0)) {
          setData(transformed);
        } else {
          console.info(`Payload query returned empty. Keeping fallback data.`);
        }
      } catch (error: any) {
        if (error?.message?.includes('NetworkError') || error?.message?.includes('Failed to fetch') || error?.message?.includes('Request error')) {
          console.warn("Unable to connect to Payload (CORS/Network). Using fallback data.");
        } else {
          console.error("Payload fetch failed:", error);
        }
      }
    };

    fetchData();
  }, [endpoint]);

  return data;
}

// Specific Hooks using the generic one
export const useProfile = () => usePayloadQuery<Profile>('/api/profile', FALLBACK_PROFILE, (result) => result.docs[0]);
export const useServices = () => usePayloadQuery<ServiceItem[]>('/api/services', FALLBACK_SERVICES);
export const useProjects = () => usePayloadQuery<Project[]>('/api/projects?sort=-year', FALLBACK_PROJECTS);
export const useProcess = () => usePayloadQuery<ProcessStep[]>('/api/process-steps?sort=number', FALLBACK_PROCESS);
export const useTechStack = () => usePayloadQuery<string[]>('/api/tech-stack', FALLBACK_STACK, (result) => result.docs[0]?.tools?.map((t: any) => t.tool) || []);
export const useFAQs = () => usePayloadQuery<FAQ[]>('/api/faqs', FALLBACK_FAQS);
export const useTestimonials = () => usePayloadQuery<Testimonial[]>('/api/testimonials', FALLBACK_TESTIMONIALS);

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
        const response = await fetch(`${apiUrl}/api/projects?where[slug][equals]=${slug}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const payloadProject = result.docs[0];
        if (payloadProject) {
          setProject(payloadProject);
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
