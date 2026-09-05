import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const stats = [
  {
    value: 1.6,
    display: '1.6+',
    label: 'Years Experience',
    sub: 'Full-stack & backend engineering',
    decimal: true,
    animate: true,
  },
  {
    value: 3,
    display: '3+',
    label: 'Major Projects',
    sub: 'Healthcare, AI, E-commerce',
    decimal: false,
    animate: true,
  },
  {
    value: 8.36,
    display: '8.36',
    label: 'GPA / 10',
    sub: 'B.E. Mechanical Engineering',
    decimal: true,
    animate: true,
  },
  {
    value: 2025,
    display: '2025',
    label: 'Rising Star Award',
    sub: 'ApplogiQ, Tiruppur',
    decimal: false,
    animate: false,
  },
];

function AnimatedNumber({
  value,
  display,
  decimal,
  animate: shouldAnimate,
  inView,
}: {
  value: number;
  display: string;
  decimal?: boolean;
  animate: boolean;
  inView: boolean;
}) {
  const [current, setCurrent] = useState(shouldAnimate ? 0 : value);

  useEffect(() => {
    if (!inView || !shouldAnimate) {
      setCurrent(value);
      return;
    }
    const duration = 1600;
    const steps = 55;
    const stepMs = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      const next = eased * value;
      setCurrent(decimal ? parseFloat(next.toFixed(2)) : Math.round(next));
      if (step >= steps) {
        clearInterval(timer);
        setCurrent(value);
      }
    }, stepMs);
    return () => clearInterval(timer);
  }, [inView, value, decimal, shouldAnimate]);

  const shown = !shouldAnimate
    ? display
    : decimal
    ? current.toFixed(current === value ? (display.includes('.') ? 2 : 0) : 1).replace(/\.?0+$/, '') || '0'
    : Math.round(current).toString();

  return <span>{shown}{shouldAnimate && value < 100 ? '+' : ''}</span>;
}

export default function Stats() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="relative py-0 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-1" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group px-6 py-10 lg:px-10 flex flex-col gap-2 hover:bg-white/[0.015] transition-colors duration-300 cursor-default"
            >
              <div className="font-['Space_Grotesk'] text-4xl lg:text-5xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300 tracking-tight">
                <AnimatedNumber
                  value={stat.value}
                  display={stat.display}
                  decimal={stat.decimal}
                  animate={stat.animate}
                  inView={inView}
                />
              </div>
              <p className="text-xs text-[#3a3a4e] tracking-[0.15em] uppercase font-medium mt-1">
                {stat.label}
              </p>
              <p className="text-[11px] text-[#2a2a3a] tracking-wide">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
