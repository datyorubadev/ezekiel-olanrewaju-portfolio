export interface Project {
  slug: string;
  title: string;
  summary: string;
  client: string;
  year: string | number;
  coverImage: any; // Can be string URL (fallback) or Sanity Image Object
  tags: (string | { tag: string })[];
  description: string;
  problem: any;
  solution: any;
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  chartData?: { name: string; value: number; type: 'before' | 'after' }[];
}

export interface ServiceItem {
  title: string;
  description: string;
  tags: (string | { tag: string })[];
}

export interface ProcessStep {
  number?: string | number; // Fallback
  stepNumber?: number; // From Payload
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  authorImage?: string;
  logo?: any;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  email: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export interface About {
  content: string;
  expertise: {
    title: string;
    description: string;
  }[];
}
