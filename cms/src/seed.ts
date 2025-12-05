import 'dotenv/config';
import payload from 'payload';
import config from './payload.config.js';

// Import data
const PROFILE = {
  name: "Ezekiel Olanrewaju",
  role: "AI & Automation Specialist",
  headline: "Building LLM-powered workflows, RAG systems, and automations that actually ship.",
  subheadline: "I help startups and agencies integrate robust AI operations, moving beyond hype to measurable efficiency.",
  email: "hello@ezekiel.ai",
  social: {
    linkedin: "#",
    twitter: "#",
    github: "#"
  }
};

const SERVICES = [
  {
    title: "RAG & Knowledge Systems",
    description: "Designing semantic search pipelines that allow your AI to answer questions based on your specific company data with high accuracy.",
    tags: [{ tag: "Pinecone" }, { tag: "LangChain" }, { tag: "Vector DB" }]
  },
  {
    title: "LLM Orchestration & Agents",
    description: "Building autonomous agents that can plan, execute tools, and handle complex multi-step workflows without constant human oversight.",
    tags: [{ tag: "OpenAI" }, { tag: "Anthropic" }, { tag: "Custom Tools" }]
  },
  {
    title: "Automation Architecture",
    description: "Connecting your disparate SaaS tools into a cohesive operating system using low-code orchestration platforms.",
    tags: [{ tag: "n8n" }, { tag: "Zapier" }, { tag: "Make" }]
  },
  {
    title: "MVP Prototyping",
    description: "Rapidly deploying proof-of-concept AI applications to validate market fit before heavy engineering investment.",
    tags: [{ tag: "Flowise" }, { tag: "Langflow" }, { tag: "Next.js" }]
  }
];

const PROJECTS = [
  {
    slug: "fintech-customer-support-rag",
    title: "FinTech Support RAG",
    client: "FinTech Scale-up",
    year: "2023",
    summary: "Reducing support ticket volume by 45% with a context-aware answer engine.",
    coverImage: null, // Will be uploaded separately
    tags: [{ tag: "RAG" }, { tag: "Python" }, { tag: "OpenAI" }],
    description: "A high-growth FinTech company was overwhelmed by repetitive support queries. I architected a RAG system that ingests their help center and internal docs to draft answers for agents.",
    problem: "Support costs were ballooning linearly with user growth. Agents spent 60% of time searching for policy documents.",
    solution: "Implemented a hybrid search (semantic + keyword) pipeline using Pinecone and GPT-4. Built a custom frontend for agents to verify and edit AI responses before sending.",
    metrics: [
      { label: "45%", value: "Reduction in Tickets", description: "First-contact resolution rate increased significantly." },
      { label: "2.5min", value: "Time Saved", description: "Average handling time reduction per ticket." }
    ],
    chartData: [
      { name: 'Avg Handling Time (min)', value: 8, type: 'before' },
      { name: 'Avg Handling Time (min)', value: 5.5, type: 'after' },
      { name: 'Ticket Deflection (%)', value: 10, type: 'before' },
      { name: 'Ticket Deflection (%)', value: 45, type: 'after' },
    ]
  },
  // Add other projects
];

const PROCESS = [
  {
    number: "01",
    title: "Discovery & Audit",
    description: "I start by analyzing your current workflows and data infrastructure to identify high-impact automation opportunities."
  },
  {
    number: "02",
    title: "Strategy & Architecture",
    description: "Designing the blueprint. We select the right LLMs, vector stores, and integration patterns for scalability and cost."
  },
  {
    number: "03",
    title: "Implementation",
    description: "Building the pipelines using robust code or low-code tools. I focus on error handling and evaluation frameworks."
  },
  {
    number: "04",
    title: "Handoff & Training",
    description: "I don't just ship code; I ensure your team knows how to operate, monitor, and maintain the new systems."
  }
];

const TECH_STACK = [
  "OpenAI GPT-4", "Anthropic Claude", "LangChain", "LlamaIndex",
  "Pinecone", "Supabase", "n8n", "Zapier", "Flowise",
  "Next.js", "TypeScript", "Python", "FastAPI"
];

const FAQS = [
  {
    question: "Do you work with non-technical founders?",
    answer: "Absolutely. I specialize in translating complex AI capabilities into clear business value. You focus on the 'what' and 'why', and I handle the 'how'. My goal is to empower you to own the technology, not be confused by it."
  },
  // Add others
];

const TESTIMONIALS = [
  {
    quote: "Ezekiel transformed our manual support process into a streamlined AI workflow. The results were immediate and measurable, cutting response times by half.",
    author: "Sarah Jenkings",
    role: "COO",
    company: "FinTech Scale-up"
  },
  // Add others
];

async function seed() {
  await payload.init({ config });

  // Seed Profile
  await payload.create({
    collection: 'profile',
    data: PROFILE,
  });

  // Seed Services
  for (const service of SERVICES) {
    await payload.create({
      collection: 'services',
      data: service,
    });
  }

  // Seed Process
  for (const step of PROCESS) {
    await payload.create({
      collection: 'process-steps',
      data: step,
    });
  }

  // Seed Tech Stack
  await payload.create({
    collection: 'tech-stack',
    data: {
      tools: TECH_STACK.map(tool => ({ tool })),
    },
  });

  // Seed FAQs
  for (const faq of FAQS) {
    await payload.create({
      collection: 'faqs',
      data: faq,
    });
  }

  // Seed Testimonials
  for (const testimonial of TESTIMONIALS) {
    await payload.create({
      collection: 'testimonials',
      data: testimonial,
    });
  }

  console.log('Seeded data successfully');
  process.exit(0);
}

seed().catch(console.error);
