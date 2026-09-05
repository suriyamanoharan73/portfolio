import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const highlights = [
  { word: 'SCALABLE', color: 'text-indigo-300 bg-indigo-600/10 border-indigo-500/20' },
  { word: 'BACKEND', color: 'text-violet-300 bg-violet-600/10 border-violet-500/20' },
  { word: 'AI', color: 'text-fuchsia-300 bg-fuchsia-600/10 border-fuchsia-500/20' },
  { word: 'REAL-TIME', color: 'text-cyan-300 bg-cyan-600/10 border-cyan-500/20' },
  { word: 'CLOUD', color: 'text-sky-300 bg-sky-600/10 border-sky-500/20' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function About() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start"
        >
          {/* Left */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <span className="section-number">01 / About</span>
              <h2 className="font-['Space_Grotesk'] text-[clamp(48px,7vw,80px)] font-bold tracking-tight text-white leading-none mt-4">
                ABOUT
              </h2>
              <h2 className="font-['Space_Grotesk'] text-[clamp(48px,7vw,80px)] font-bold tracking-tight text-[#1e1e2e] leading-none">
                ME
              </h2>
            </div>

            {/* Keyword highlights */}
            <div className="flex flex-wrap gap-2.5">
              {highlights.map(({ word, color }) => (
                <motion.span
                  key={word}
                  whileHover={{ scale: 1.04 }}
                  className={`inline-flex text-xs font-semibold tracking-[0.15em] px-3 py-1.5 border rounded-full cursor-default transition-all duration-200 ${color}`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Primary stack */}
            <div className="border-t border-white/5 pt-8">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a4e] mb-5">
                Primary Stack
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Backend', value: 'Python · FastAPI · Django' },
                  { label: 'Frontend', value: 'React · TypeScript · Next.js' },
                  { label: 'Database', value: 'PostgreSQL · MongoDB' },
                  { label: 'Infra', value: 'AWS · Google Cloud · Nginx' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-[10px] tracking-wider uppercase text-[#3a3a4e] w-16 shrink-0">{item.label}</span>
                    <span className="w-px h-3 bg-white/8" />
                    <span className="text-sm text-[#6b6b7e]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location + status */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-[#4a4a5e] tracking-wide">Available for opportunities · India</span>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div variants={itemVariants} className="space-y-6 lg:pt-14">
            <p className="text-xl font-light text-[#c4c4d4] leading-relaxed">
              I'm Suriya, a Software Engineer passionate about building{' '}
              <span className="text-white font-normal">scalable applications</span> and solving
              real-world engineering problems.
            </p>

            <p className="text-[#6b6b7e] leading-relaxed text-[15px]">
              With 1.6+ years of professional experience, I've worked across backend
              development, full-stack applications, API design, database optimization, cloud
              deployment,{' '}
              <span className="text-[#9a9aae]">AI integration</span>, and{' '}
              <span className="text-[#9a9aae]">real-time systems</span>.
            </p>

            <p className="text-[#6b6b7e] leading-relaxed text-[15px]">
              I primarily work with Python, FastAPI, Django, React, and PostgreSQL. I enjoy
              understanding how systems work at a deep level and building solutions that are
              performant, secure, maintainable, and genuinely scalable.
            </p>

            <p className="text-[#6b6b7e] leading-relaxed text-[15px]">
              My experience spans{' '}
              <span className="text-[#9a9aae]">healthcare platforms</span>,{' '}
              <span className="text-[#9a9aae]">AI-powered applications</span>, and{' '}
              <span className="text-[#9a9aae]">e-commerce systems</span> — each demanding
              production-grade reliability and thoughtful architectural decisions.
            </p>

            {/* Trait grid */}
            <div className="grid grid-cols-2 gap-5 pt-6 border-t border-white/5 mt-2">
              {[
                { label: 'Backend Systems', value: 'Production-ready' },
                { label: 'API Design', value: 'RESTful · Async' },
                { label: 'AI Integration', value: 'OpenAI · LLMs' },
                { label: 'Deployment', value: 'AWS · GCP · Nginx' },
              ].map(item => (
                <div key={item.label} className="group space-y-1 cursor-default">
                  <p className="text-[10px] text-[#3a3a4e] tracking-[0.15em] uppercase group-hover:text-[#5a5a6e] transition-colors">
                    {item.label}
                  </p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
