export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  role: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  architecture: string;
  contributions: string[];
  technologies: string[];
  color: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 'farallon',
    number: '01',
    name: 'FARALLON',
    category: 'Healthcare Insurance Platform',
    role: 'Full-Stack Developer',
    description: 'A multi-tenant healthcare platform designed to manage insurance claims and healthcare data efficiently at scale.',
    longDescription: 'Farallon is a sophisticated multi-tenant healthcare platform built to handle insurance claims processing, medical data management, and cross-system healthcare communications. The platform supports multiple healthcare organizations with isolated data environments while maintaining a shared infrastructure for cost efficiency.',
    problem: 'Healthcare organizations needed a unified platform to manage complex insurance claims workflows across multiple tenants, with strict data isolation requirements, real-time communication capabilities, and integration with existing HL7-based healthcare systems.',
    solution: 'Built a robust multi-tenant architecture using Django that enforces strict data boundaries between tenants. Implemented HL7 messaging integration via Mirth Connect for interoperability with legacy healthcare systems. Added real-time communication layers using WebSockets for instant updates on claim status changes.',
    architecture: 'Multi-tenant Django backend with PostgreSQL row-level security, Mirth Connect middleware for HL7 translation, WebSocket server for real-time events, and a React frontend for claims management dashboards.',
    contributions: [
      'Built a multi-tenant healthcare system using Django with strict data isolation',
      'Optimized PostgreSQL for large-scale medical data processing and complex queries',
      'Automated healthcare workflows reducing manual processing overhead',
      'Integrated HL7 messaging using Mirth Connect for system interoperability',
      'Implemented real-time claim status communication using WebSockets',
    ],
    technologies: ['Django', 'PostgreSQL', 'Mirth Connect', 'WebSockets', 'Python', 'React'],
    color: 'from-blue-500/10 to-cyan-500/5',
    accentColor: '#3b82f6',
  },
  {
    id: 'ayushya',
    number: '02',
    name: 'AYUSHYA',
    category: 'AI-Powered Medical Platform',
    role: 'Backend Developer',
    description: 'An AI-powered application combining backend services, medical assistance intelligence, and real-time voice interaction.',
    longDescription: 'Ayushya is an advanced AI-powered medical assistance platform that combines the power of large language models with real-time voice interaction, making healthcare guidance more accessible. The system uses FastAPI for high-performance async backend services and integrates OpenAI APIs for intelligent medical information processing.',
    problem: 'Patients needed accessible medical guidance outside of clinical settings. Traditional chatbots lacked the sophistication to handle medical queries accurately, and there was no real-time voice interaction capability in existing solutions.',
    solution: 'Designed a high-performance async backend with FastAPI that integrates OpenAI APIs for intelligent medical assistance. Implemented bidirectional WebSocket connections for real-time voice interaction, with robust authentication and validation ensuring data security.',
    architecture: 'FastAPI async backend with PostgreSQL for structured medical data, WebSocket server for real-time voice streaming, OpenAI API integration for intelligence, JWT-based authentication, and a secure API gateway.',
    contributions: [
      'Developed high-performance async backend services using FastAPI',
      'Designed scalable PostgreSQL data architecture for medical records',
      'Integrated OpenAI APIs for intelligent medical assistance',
      'Implemented real-time voice interaction using WebSockets',
      'Designed secure API architecture with authentication and validation',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'OpenAI', 'WebSockets', 'JWT'],
    color: 'from-violet-500/10 to-purple-500/5',
    accentColor: '#8b5cf6',
  },
  {
    id: 'shopq',
    number: '03',
    name: 'SHOPQ',
    category: 'E-Commerce Backend Platform',
    role: 'Backend Developer',
    description: 'A comprehensive backend system supporting users, orders, payments, delivery, notifications, and post-purchase workflows.',
    longDescription: 'ShopQ is a full-featured e-commerce backend platform engineered to handle the complete lifecycle of online retail operations. From user management to order processing, payment integration, delivery tracking, and complex post-purchase scenarios like returns, replacements, and cancellations — ShopQ provides a reliable foundation for e-commerce applications.',
    problem: 'E-commerce platforms require complex orchestration across multiple third-party services (payments, logistics, notifications) while maintaining data consistency and supporting complex workflows for returns, cancellations, and replacements.',
    solution: 'Built a modular backend architecture with clean separation between user management, order processing, payment integration, and delivery tracking. Implemented event-driven workflows for post-purchase scenarios and a unified notification system across multiple channels.',
    architecture: 'Python/REST API backend with PostgreSQL for transactional data, Razorpay integration for payments, Shiprocket for logistics, multi-channel notification service (SMS/WhatsApp/Email/Push), and workflow engine for order lifecycle management.',
    contributions: [
      'Built comprehensive user and order management systems',
      'Integrated Razorpay payment gateway with webhook handling',
      'Integrated Shiprocket delivery API for logistics management',
      'Built unified SMS, WhatsApp, Email, and Push notification systems',
      'Implemented return, replacement, and cancellation workflows',
    ],
    technologies: ['Python', 'PostgreSQL', 'Razorpay', 'Shiprocket', 'REST APIs', 'FastAPI'],
    color: 'from-emerald-500/10 to-teal-500/5',
    accentColor: '#10b981',
  },
];
