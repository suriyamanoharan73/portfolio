import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    number: '01',
    title: 'UNDERSTAND',
    description: 'Understand the actual business problem before writing a single line of code. Requirements, constraints, and context first.',
  },
  {
    number: '02',
    title: 'DESIGN',
    description: 'Design APIs, database structures, and system architecture. Decisions made here echo through the entire product lifecycle.',
  },
  {
    number: '03',
    title: 'BUILD',
    description: 'Write clean, maintainable, and production-ready code. Readability is not optional — it is a feature.',
  },
  {
    number: '04',
    title: 'OPTIMIZE',
    description: 'Improve performance, scalability, security, and reliability. Measure before optimizing. Profile, then fix.',
  },
  {
    number: '05',
    title: 'DEPLOY',
    description: 'Deploy, monitor, and continuously improve the system. Shipping is not the finish line — it is the starting line.',
  },
];

export default function Philosophy() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="philosophy" className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute inset-0 radial-glow-top" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-xl"
        >
          <span className="section-number">06 / Philosophy</span>
          <h2 className="font-['Space_Grotesk'] text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none mt-4">
            HOW I BUILD
            <br />
            <span className="text-[#3a3a4e]">SYSTEMS</span>
          </h2>
        </motion.div>

        {/* Steps — horizontal on desktop */}
        <div className="grid md:grid-cols-5 gap-px bg-white/4 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#050508] p-6 lg:p-8 flex flex-col gap-4 hover:bg-indigo-500/5 transition-all duration-300 cursor-default"
            >
              {/* Number */}
              <div className="font-['Space_Grotesk'] text-4xl font-bold text-white/5 group-hover:text-indigo-500/20 transition-colors duration-300 leading-none">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white tracking-widest uppercase group-hover:text-indigo-200 transition-colors duration-300">
                {step.title}
              </h3>

              {/* Divider */}
              <div className="w-6 h-px bg-white/10 group-hover:bg-indigo-500/50 group-hover:w-10 transition-all duration-300" />

              {/* Description */}
              <p className="text-xs text-[#5e5e72] leading-relaxed group-hover:text-[#8b8b9e] transition-colors duration-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interests section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-24"
        >
          <p className="section-number mb-8">Currently interested in</p>
          <div className="flex flex-wrap gap-3">
            {[
              'AI APPLICATIONS', 'REAL-TIME SYSTEMS', 'VOICE AI',
              'BACKEND ARCHITECTURE', 'SYSTEM DESIGN', 'DATABASE OPTIMIZATION',
              'CLOUD COMPUTING', 'DISTRIBUTED SYSTEMS',
            ].map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.06 }}
                whileHover={{ scale: 1.05, color: '#a5b4fc' }}
                className="text-sm sm:text-base font-['Space_Grotesk'] font-semibold text-[#3a3a4e] tracking-widest cursor-default hover:text-indigo-300 transition-colors duration-200"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
