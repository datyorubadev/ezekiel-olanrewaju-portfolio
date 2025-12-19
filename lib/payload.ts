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

const PAYLOAD_URL = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3002/api';

// Generic Hook for fetching data from Payload
function usePayloadQuery<T>(endpoint: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`[usePayloadQuery] Fetching: ${PAYLOAD_URL}/${endpoint}`);
      try {
        const response = await fetch(`${PAYLOAD_URL}/${endpoint}`, { cache: 'no-store' });
        console.log(`[usePayloadQuery] Response status: ${response.status}`);

        if (response.ok) {
          const result = await response.json();
          console.log(`[usePayloadQuery] Data received for ${endpoint}:`, result);

          if (result.docs && result.docs.length > 0) {
            if (endpoint === 'profile' || endpoint === 'hero' || endpoint === 'about') {
              setData(result.docs[0]);
            } else {
              setData(result.docs);
            }
          } else {
            console.info(`[usePayloadQuery] Payload query returned empty for ${endpoint}. Keeping fallback data.`);
          }
        } else {
          console.warn(`[usePayloadQuery] Unable to connect to Payload for ${endpoint}. Status: ${response.status}. Using fallback data.`);
        }
      } catch (error) {
        console.warn(`[usePayloadQuery] Payload fetch failed for ${endpoint}:`, error);
      }
    };

    fetchData();

    // Poll every 3 seconds for real-time updates
    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, [endpoint]);

  return data;
}

// Specific Hooks
// Specific Hooks
export const useProfile = () => usePayloadQuery<Profile>('profile', FALLBACK_PROFILE);
export const useAbout = () => usePayloadQuery<any>('about', {
  content: '',
  expertise: []
});
export const useHero = () => usePayloadQuery<any>('hero', { role: '', headline: '', subheadline: '' });
export const useServices = () => usePayloadQuery<ServiceItem[]>('services?sort=order&limit=20', FALLBACK_SERVICES);
export const useProjects = () => usePayloadQuery<Project[]>('projects?sort=-year&limit=20', FALLBACK_PROJECTS);
export const useProcess = () => usePayloadQuery<ProcessStep[]>('process-steps?sort=stepNumber&limit=20', FALLBACK_PROCESS);
export const useTechStack = () => {
  const [stack, setStack] = useState<string[]>(FALLBACK_STACK);

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const response = await fetch(`${PAYLOAD_URL}/tech-stack`, { cache: 'no-store' });
        if (response.ok) {
          const result = await response.json();
          if (result.docs && result.docs.length > 0) {
            setStack(result.docs[0].tools.map((t: any) => t.tool));
          }
        }
      } catch (error) {
        console.warn("Tech stack fetch failed:", error);
      }
    };

    fetchStack();

    // Poll every 3 seconds
    const intervalId = setInterval(fetchStack, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return stack;
};
export const useFAQs = () => usePayloadQuery<FAQ[]>('faqs?limit=20', FALLBACK_FAQS);
export const useTestimonials = () => usePayloadQuery<Testimonial[]>('testimonials?limit=20', FALLBACK_TESTIMONIALS);

export const useProjectBySlug = (slug: string) => {
  const [project, setProject] = useState<Project | null>(() => {
    return FALLBACK_PROJECTS.find(p => p.slug === slug) || null;
  });

  const [loading, setLoading] = useState<boolean>(() => {
    return !FALLBACK_PROJECTS.find(p => p.slug === slug);
  });

  useEffect(() => {
    // Reset/Initialize state based on current slug
    const fallback = FALLBACK_PROJECTS.find(p => p.slug === slug) || null;
    if (fallback) {
      setProject(fallback);
      setLoading(false);
    } else {
      setProject(null);
      setLoading(true);
    }

    const fetchProject = async () => {
      try {
        const response = await fetch(`${PAYLOAD_URL}/projects?where[slug][equals]=${slug}`, { cache: 'no-store' });
        if (response.ok) {
          const result = await response.json();
          if (result.docs && result.docs.length > 0) {
            const projectData = result.docs[0];
            // Transform metrics to match frontend interface (name -> label)
            if (projectData.metrics) {
              projectData.metrics = projectData.metrics.map((m: any) => ({
                ...m,
                label: m.name || m.label
              }));
            }
            setProject(projectData);
          }
        }
      } catch (error) {
        console.warn("Project fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
      // Poll every 3 seconds
      const intervalId = setInterval(fetchProject, 3000);
      return () => clearInterval(intervalId);
    }
  }, [slug]);

  return { project, loading };
};
