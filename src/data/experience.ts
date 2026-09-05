export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    company: 'ApplogiQ',
    role: 'Software Engineer',
    location: 'Tiruppur, India',
    period: 'October 2024 – March 2026',
    startDate: 'Oct 2024',
    endDate: 'Mar 2026',
    responsibilities: [
      'Developed scalable full-stack applications using FastAPI, Django, React and Next.js.',
      'Designed and maintained RESTful APIs for production systems.',
      'Optimized PostgreSQL queries for improved performance and scalability.',
      'Implemented secure data handling and authentication systems.',
      'Deployed applications on AWS and Google Cloud platforms.',
      'Configured Nginx-based load balancing and reverse proxy setups.',
      'Implemented authentication and input validation systems.',
      'Worked on reliable and scalable application architectures.',
    ],
  },
];
