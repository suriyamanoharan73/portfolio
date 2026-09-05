export interface Skill {
  name: string;
  category: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C++'],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['FastAPI', 'Django', 'REST APIs', 'WebSockets'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'database',
    label: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: ['AWS', 'Google Cloud', 'Linux', 'Nginx', 'Git', 'Firebase'],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: ['Postman', 'Mirth Connect', 'OpenAI APIs'],
  },
];

export const heroTechs = [
  'Python', 'FastAPI', 'Django', 'React', 'PostgreSQL', 'AWS', 'AI', 'WebSockets',
];

export const interests = [
  'AI APPLICATIONS',
  'REAL-TIME SYSTEMS',
  'VOICE AI',
  'BACKEND ARCHITECTURE',
  'SYSTEM DESIGN',
  'DATABASE OPTIMIZATION',
  'CLOUD COMPUTING',
  'DISTRIBUTED SYSTEMS',
];
