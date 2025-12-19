import { Project, ServiceItem, ProcessStep, Testimonial, FAQ } from './types';

export const PROFILE = {
  name: "Ezekiel Olanrewaju",
  role: "AI & Automation Specialist",
  headline: "Building LLM-powered workflows, RAG systems, and automations that actually ship.",
  subheadline: "I help startups and agencies integrate robust AI operations, moving beyond hype to measurable efficiency.",
  email: "hello@ezekiel.ai", // Mock
  social: {
    linkedin: "#",
    twitter: "#",
    github: "#"
  }
};

export const SERVICES: ServiceItem[] = [
  {
    title: "RAG & Knowledge Systems",
    description: "Designing semantic search pipelines that allow your AI to answer questions based on your specific company data with high accuracy.",
    tags: ["Pinecone", "LangChain", "Vector DB"]
  },
  {
    title: "LLM Orchestration & Agents",
    description: "Building autonomous agents that can plan, execute tools, and handle complex multi-step workflows without constant human oversight.",
    tags: ["OpenAI", "Anthropic", "Custom Tools"]
  },
  {
    title: "Automation Architecture",
    description: "Connecting your disparate SaaS tools into a cohesive operating system using low-code orchestration platforms.",
    tags: ["n8n", "Zapier", "Make"]
  },
  {
    title: "MVP Prototyping",
    description: "Rapidly deploying proof-of-concept AI applications to validate market fit before heavy engineering investment.",
    tags: ["Flowise", "Langflow", "Next.js"]
  }
];

// Helper to generate Lexical JSON structure
const generateLexicalParagraph = (text: string) => ({
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    children: [
      {
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            format: 0,
            detail: 0,
            style: "",
            mode: "normal",
            text: text,
            version: 1
          }
        ],
        direction: "ltr"
      }
    ],
    direction: "ltr"
  }
});

export const PROJECTS: Project[] = [
  {
    slug: "fintech-customer-support-rag",
    title: "FinTech Support RAG",
    client: "FinTech Scale-up",
    year: "2023",
    summary: "Reducing support ticket volume by 45% with a context-aware answer engine.",
    coverImage: "https://picsum.photos/800/600?random=1",
    tags: ["RAG", "Python", "OpenAI"],
    description: "A high-growth FinTech company was overwhelmed by repetitive support queries. I architected a RAG system that ingests their help center and internal docs to draft answers for agents.",
    problem: generateLexicalParagraph("Support costs were ballooning linearly with user growth. Agents spent 60% of time searching for policy documents."),
    solution: generateLexicalParagraph("Implemented a hybrid search (semantic + keyword) pipeline using Pinecone and GPT-4. Built a custom frontend for agents to verify and edit AI responses before sending."),
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
  {
    slug: "marketing-asset-generator",
    title: "Agency Asset Pipeline",
    client: "Digital Agency",
    year: "2024",
    summary: "Automating SEO blog post and social media image generation.",
    coverImage: "https://picsum.photos/800/600?random=2",
    tags: ["n8n", "Stable Diffusion", "SEO"],
    description: "An SEO agency needed to scale content production without sacrificing quality constraints.",
    problem: generateLexicalParagraph("Writers were bottlenecked by drafting initial outlines and sourcing stock images."),
    solution: generateLexicalParagraph("Created an n8n workflow that takes a keyword, researches top competitors, drafts an outline, writes the content, and generates a branded header image using SDXL."),
    metrics: [
      { label: "10x", value: "Output Scale", description: "Content pieces produced per week." },
      { label: "$4k", value: "Monthly Savings", description: "Reduced reliance on external stock image subscriptions and junior copywriters." }
    ],
    chartData: [
      { name: 'Weekly Output', value: 5, type: 'before' },
      { name: 'Weekly Output', value: 50, type: 'after' },
    ]
  },
  {
    slug: "legal-doc-analyzer",
    title: "Legal Contract Audit",
    client: "Legal Tech MVP",
    year: "2023",
    summary: "Extracting key clauses and risks from PDFs automatically.",
    coverImage: "https://picsum.photos/800/600?random=3",
    tags: ["LangChain", "OCR", "Anthropic"],
    description: "Validating a product concept for a Legal Tech startup targeting boutique firms.",
    problem: generateLexicalParagraph("Lawyers spend hours reviewing standard NDAs and MSAs for non-standard clauses."),
    solution: generateLexicalParagraph("Built a document parsing pipeline using unstructured.io and Claude 3 Opus to flag high-risk clauses against a playbok."),
    metrics: [
      { label: "90%", value: "Accuracy", description: "Recall rate on critical risk clauses." },
      { label: "Instant", value: "Analysis", description: "Reduced review time from hours to seconds." }
    ],
    chartData: [
      { name: 'Review Time (hrs)', value: 4, type: 'before' },
      { name: 'Review Time (hrs)', value: 0.1, type: 'after' },
    ]
  }
];

export const PROCESS: ProcessStep[] = [
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

export const TECH_STACK = [
  "OpenAI GPT-4", "Anthropic Claude", "LangChain", "LlamaIndex",
  "Pinecone", "Supabase", "n8n", "Zapier", "Flowise",
  "Next.js", "TypeScript", "Python", "FastAPI"
];

export const FAQS: FAQ[] = [
  {
    question: "Do you work with non-technical founders?",
    answer: "Absolutely. I specialize in translating complex AI capabilities into clear business value. You focus on the 'what' and 'why', and I handle the 'how'. My goal is to empower you to own the technology, not be confused by it."
  },
  {
    question: "What is the typical engagement timeline?",
    answer: "Strategy audits typically take 1-2 weeks. MVP prototypes can be shipped in 2-4 weeks. Full production-grade implementations usually range from 4-12 weeks depending on complexity and the availability of data."
  },
  {
    question: "Do you offer maintenance after handoff?",
    answer: "Yes. I offer retainer packages for ongoing monitoring, prompt tuning, and model updates to ensure your system remains performant as new models are released."
  },
  {
    question: "Can you integrate with my existing software?",
    answer: "Yes. Whether it's Salesforce, HubSpot, Notion, or a custom Postgres database, I build integrations that fit seamlessly into your existing stack using APIs and middleware."
  },
  {
    question: "What happens if the AI models hallucinate?",
    answer: "I implement rigorous RAG (Retrieval-Augmented Generation) architectures with citation and grounding mechanisms. This forces the model to rely on your data, not its training set, significantly reducing hallucinations."
  },
  {
    question: "Do I need to hire a full engineering team afterwards?",
    answer: "Not necessarily. I build systems that are low-maintenance. However, for scaling products, I can help interview and vet key hires or train your existing junior developers to manage the stack."
  },
  {
    question: "What is your pricing structure?",
    answer: "I typically work on a project basis with fixed deliverables. For ongoing advisory or fractional CTO roles, I work on a monthly retainer. Contact me for a specific quote based on your needs."
  },
  {
    question: "Do you handle data privacy and security?",
    answer: "Security is a priority. I can deploy local LLMs or use enterprise-grade APIs (Azure OpenAI, AWS Bedrock) that guarantee zero data retention for training. I ensure all data pipelines comply with standard encryption practices."
  },
  {
    question: "Can you build custom AI Agents?",
    answer: "Yes, I specialize in building agentic workflows where the AI can autonomously plan tasks, browse the web, and use tools to achieve a goal, rather than just answering questions."
  },
  {
    question: "Which industries do you specialize in?",
    answer: "I have deep experience in FinTech, LegalTech, and Agency Operations (Marketing/SEO). However, the principles of automation and RAG apply to almost any knowledge-heavy sector."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Ezekiel transformed our manual support process into a streamlined AI workflow. The results were immediate and measurable, cutting response times by half.",
    author: "Sarah Jenkings",
    role: "COO",
    company: "FinTech Scale-up",
    authorImage: "/images/testimonials/user-2.png"
  },
  {
    quote: "The strategic clarity Ezekiel brought to our RAG implementation saved us months of trial and error. He understands the nuance between a demo and a product.",
    author: "David Chen",
    role: "CTO",
    company: "Legal Tech MVP",
    authorImage: "/images/testimonials/user-1.png"
  },
  {
    quote: "We were drowning in content demands. Ezekiel's automation pipeline didn't just save us time; it improved our consistency and SEO performance overnight.",
    author: "Marcus Thorne",
    role: "Founder",
    company: "Growth Agency",
    authorImage: "/images/testimonials/user-3.png"
  },
  {
    quote: "Hiring Ezekiel was the highest ROI decision we made this year. He doesn't just write code; he thinks about the business impact of every automation.",
    author: "Elena Rodriguez",
    role: "Product Lead",
    company: "SaaS Startup",
    authorImage: "/images/testimonials/user-2.png"
  }
];
