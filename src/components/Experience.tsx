import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { experiences } from '../data/experience';

export default function Experience() {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="experience" className="relative py-10 sm:py-16 border-t border-white/5">
      <div className="absolute inset-0 bg-[#030306]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-10"
        >
          {/* <span className="section-number">05 / Experience</span> */}
          <h2 className="font-['Space_Grotesk'] text-[clamp(36px,8vw,72px)] font-bold tracking-tight text-white leading-none mt-4">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl">
          {/* Vertical accent line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/60 via-indigo-500/15 to-transparent origin-top hidden sm:block"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative sm:pl-20"
            >
              {/* Dot on timeline */}
              <div className="absolute left-6 top-8 hidden sm:block">
                <div className="w-3 h-3 rounded-full bg-indigo-500 -translate-x-1/2 border-2 border-[#030306]" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-indigo-500/40 -translate-x-1/2 animate-ping" style={{ animationDuration: '3s' }} />
              </div>

              {/* Card */}
              <div className="bg-white/[0.025] border border-white/6 rounded-2xl p-5 sm:p-7 hover:border-white/10 hover:bg-white/[0.035] transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/15 rounded-xl shrink-0">
                      <Briefcase size={16} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-indigo-300 font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-[#4a4a5e] sm:text-right shrink-0">
                    <span className="flex items-center gap-1.5 sm:justify-end">
                      <Calendar size={11} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 sm:justify-end">
                      <MapPin size={11} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 + j * 0.05 }}
                      className="flex items-start gap-2.5 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 mt-1.5 shrink-0 group-hover:bg-indigo-400 transition-colors" />
                      <p className="text-[13px] text-[#5e5e72] leading-relaxed group-hover:text-[#8b8b9e] transition-colors">
                        {resp}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
