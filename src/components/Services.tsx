import { motion } from 'framer-motion';
import { Server, Globe, Brain, Cloud } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const services = [
  {
    number: '01',
    icon: Server,
    title: 'Backend Engineering',
    description:
      'Designing scalable APIs and backend services using Python, FastAPI and Django. Built for production — performant, secure, and maintainable.',
    focus: ['REST APIs', 'Authentication', 'Business Logic', 'Database Optimization', 'System Architecture'],
    color: 'group-hover:text-indigo-400',
    borderColor: 'group-hover:border-indigo-500/30',
    bgColor: 'group-hover:bg-indigo-500/5',
  },
  {
    number: '02',
    icon: Globe,
    title: 'Full-Stack Development',
    description:
      'Building modern web applications by connecting robust backend systems with responsive, performant interfaces.',
    focus: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    color: 'group-hover:text-violet-400',
    borderColor: 'group-hover:border-violet-500/30',
    bgColor: 'group-hover:bg-violet-500/5',
  },
  {
    number: '03',
    icon: Brain,
    title: 'AI Integration',
    description:
      'Integrating AI capabilities into real-world applications — from intelligent assistants to voice interaction systems.',
    focus: ['OpenAI APIs', 'AI Applications', 'Voice Interaction', 'Real-Time Systems'],
    color: 'group-hover:text-fuchsia-400',
    borderColor: 'group-hover:border-fuchsia-500/30',
    bgColor: 'group-hover:bg-fuchsia-500/5',
  },
  {
    number: '04',
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description:
      'Deploying and managing applications in production environments with reliability, scalability, and security.',
    focus: ['AWS', 'Google Cloud', 'Linux', 'Nginx', 'Git', 'Firebase'],
    color: 'group-hover:text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/30',
    bgColor: 'group-hover:bg-cyan-500/5',
  },
];

export default function Services() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="services" className="relative py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* <span className="section-number">02 / What I Do</span> */}
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none mt-4">
            WHAT I<br />
            <span className="text-[#3a3a4e]">BUILD</span>
          </h2>
        </motion.div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group bg-[#050508] p-6 lg:p-8 border border-transparent transition-all duration-300 cursor-default ${service.borderColor} ${service.bgColor}`}
              >
                <div className="space-y-5">
                  {/* Icon + number */}
                  <div className="flex items-start justify-between">
                    <Icon
                      size={24}
                      className={`text-[#3a3a4e] transition-colors duration-300 ${service.color}`}
                    />
                    <span className="text-xs text-[#2a2a3e] font-['Space_Grotesk'] font-bold">
                      {service.number}
                    </span>
                  </div>

                  <h3 className={`font-['Space_Grotesk'] text-lg font-semibold text-white tracking-wide transition-colors duration-300 uppercase ${service.color}`}>
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#6b6b7e] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Focus tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.focus.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-[#4a4a5e] border border-white/5 rounded-full px-3 py-1 group-hover:border-white/10 transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
