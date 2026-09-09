import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Education() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="education" className="relative py-10 sm:py-16 border-t border-white/5">
      <div className="absolute inset-0 bg-[#030306]" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* <span className="section-number">07 / Education & Achievement</span> */}
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none mt-4">
            EDUCATION &amp;
            <br />
            <span className="text-[#3a3a4e]">ACHIEVEMENT</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-white/2 border border-white/6 rounded-2xl p-8 hover:border-white/10 hover:bg-white/3 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/15">
                <GraduationCap size={20} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-[#4a4a5e] tracking-widest uppercase mb-1">Education</p>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                  B.E. Mechanical Engineering
                </h3>
              </div>
            </div>

            <div className="space-y-3 border-t border-white/5 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6b6b7e]">Institution</span>
                <span className="text-sm text-white font-medium text-right">
                  Anna University Regional Campus
                  <br />
                  <span className="text-xs text-[#4a4a5e] font-normal">Coimbatore</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6b6b7e]">Duration</span>
                <span className="text-sm text-white">2020 – 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6b6b7e]">GPA</span>
                <span className="font-['Space_Grotesk'] text-xl font-bold text-indigo-300">
                  8.36 <span className="text-sm text-[#4a4a5e] font-normal">/ 10</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Achievement card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-gradient-to-br from-amber-500/8 to-orange-500/4 border border-amber-500/15 rounded-2xl p-8 hover:border-amber-500/25 hover:from-amber-500/12 hover:to-orange-500/6 transition-all duration-300 overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-amber-500/15 rounded-xl border border-amber-500/20">
                  <Award size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-amber-400/70 tracking-widest uppercase mb-1">Achievement</p>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                    Rising Star Award
                  </h3>
                </div>
              </div>

              <div className="space-y-4 border-t border-amber-500/10 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b6b7e]">Year</span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-amber-300">2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b6b7e]">Company</span>
                  <span className="text-sm text-white">ApplogiQ</span>
                </div>
                <p className="text-sm text-[#6b6b7e] leading-relaxed pt-2">
                  Recognized for outstanding performance and contributions to engineering excellence at ApplogiQ.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
