export interface Project {
  slug: string;
  title: string;
  summary: string;
  client: string;
  year: string;
  coverImage: any; // Can be string URL (fallback) or Sanity Image Object
  tags: string[];
  description: string;
  problem: string;
  solution: string;
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
  tags: string[];
}

export interface ProcessStep {
  number: string | number;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
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
  location: string;
  contactHeadline: string;
  contactDescription: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}
