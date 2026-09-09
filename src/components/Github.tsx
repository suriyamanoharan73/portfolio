import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useInView } from '../hooks/useInView';

// Contribution grid visualization (decorative)
function ContributionGrid() {
  const weeks = 52;
  const days = 7;

  // Generate a realistic-looking contribution pattern
  const getLevel = (week: number, day: number): number => {
    const seed = (week * 7 + day) * 13 + week;
    const pseudo = (seed * 1664525 + 1013904223) & 0xffffffff;
    const norm = Math.abs(pseudo) / 0xffffffff;
    if (norm < 0.45) return 0;
    if (norm < 0.65) return 1;
    if (norm < 0.8) return 2;
    if (norm < 0.92) return 3;
    return 4;
  };

  const colors = [
    'bg-white/3',
    'bg-indigo-500/20',
    'bg-indigo-500/40',
    'bg-indigo-500/65',
    'bg-indigo-500',
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {Array.from({ length: weeks }).map((_, week) => (
          <div key={week} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, day) => {
              const level = getLevel(week, day);
              return (
                <div
                  key={day}
                  className={`w-2.5 h-2.5 rounded-sm ${colors[level]} transition-colors duration-200`}
                  title={`Level ${level}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GithubSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="github" className="relative py-10 sm:py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div>
              {/* <span className="section-number">08 / Code</span> */}
              <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none mt-4">
                CODE IS WHERE
                <br />
                <span className="text-[#3a3a4e]">I BUILD</span>
              </h2>
            </div>

            <p className="text-[#6b6b7e] leading-relaxed max-w-md">
              I enjoy exploring backend architecture, AI integrations, data structures, APIs, and
              real-world software engineering problems. My GitHub is where ideas take shape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/suriyamanoharan73"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200"
              >
                <GithubIcon width={18} height={18} />
                <span className="text-sm font-medium truncate">github.com/suriyamanoharan73</span>
                <ExternalLink size={13} className="text-[#4a4a5e] group-hover:text-white transition-colors ml-auto" />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 pt-2">
              {[
                { label: 'Backend', value: 'Focused' },
                { label: 'Primary Lang', value: 'Python' },
                { label: 'Open Source', value: 'Contributor' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-xs text-[#3a3a4e] tracking-wider uppercase">{item.label}</p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — contribution grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <p className="text-xs text-[#3a3a4e] tracking-widest uppercase">
              Contribution activity
            </p>
            <div className="bg-white/2 border border-white/5 rounded-2xl p-6 overflow-hidden">
              <ContributionGrid />
              <p className="text-xs text-[#2a2a3a] mt-4 text-center">
                * Visualization is decorative — visit GitHub for actual activity
              </p>
            </div>

            {/* Interest areas */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {['Backend APIs', 'AI Integration', 'Real-Time Systems', 'Database Design'].map(area => (
                <div key={area} className="bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-xs text-[#6b6b7e]">
                  {area}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
