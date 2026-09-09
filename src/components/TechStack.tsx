import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { skillCategories } from '../data/skills';

const techIcons: Record<string, string> = {
  Python: '🐍',
  JavaScript: '⚡',
  TypeScript: '📘',
  'C++': '⚙️',
  FastAPI: '🚀',
  Django: '🎸',
  'REST APIs': '🔗',
  WebSockets: '🔌',
  React: '⚛️',
  'Next.js': '▲',
  'Tailwind CSS': '🎨',
  PostgreSQL: '🐘',
  MongoDB: '🍃',
  MySQL: '🗄️',
  AWS: '☁️',
  'Google Cloud': '🌐',
  Linux: '🐧',
  Nginx: '🔷',
  Git: '📦',
  Firebase: '🔥',
  Postman: '📮',
  'Mirth Connect': '🏥',
  'OpenAI APIs': '🤖',
};

export default function TechStack() {
  const { ref, inView } = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState('languages');

  const active = skillCategories.find(c => c.id === activeCategory) ?? skillCategories[0];

  return (
    <section id="skills" className="relative py-10 sm:py-16 border-y border-white/5">
      <div className="absolute inset-0 bg-[#030306]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* <span className="section-number">03 / Skills</span> */}
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none mt-4">
            TECHNOLOGY
            <br />
            <span className="text-[#3a3a4e]">STACK</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="overflow-x-auto scrollbar-hide pb-1 lg:overflow-x-visible lg:pb-0"
          >
            <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/25'
                    : 'text-[#4a4a5e] hover:text-[#8b8b9e] hover:bg-white/3'
                }`}
              >
                {cat.label}
              </button>
            ))}
            </div>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              >
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="group relative bg-white/3 border border-white/6 rounded-xl p-4 cursor-default transition-all duration-200 hover:bg-indigo-500/8 hover:border-indigo-500/25"
                  >
                    <div className="text-2xl mb-3">{techIcons[skill] ?? '◆'}</div>
                    <p className="text-sm font-medium text-[#c4c4d4] group-hover:text-white transition-colors duration-200">
                      {skill}
                    </p>
                    {/* Hover tooltip glow */}
                    <div className="absolute inset-0 rounded-xl bg-indigo-400/0 group-hover:bg-indigo-400/3 transition-colors duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <p className="text-xs text-[#3a3a4e] mt-8 tracking-wider">
              {active.skills.length} technologies in {active.label}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
