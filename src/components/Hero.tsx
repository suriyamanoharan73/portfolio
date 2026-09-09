import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { heroTechs } from '../data/skills';

const terminalLines = [
  { text: '$ python manage.py runserver', delay: 0.8 },
  { text: 'Watching for file changes with StatReloader', delay: 1.2, dim: true },
  { text: 'Starting development server at http://127.0.0.1:8000/', delay: 1.5, dim: true },
  { text: '$ uvicorn main:app --reload --port 8001', delay: 2.0 },
  { text: 'INFO:     Application startup complete.', delay: 2.4, dim: true, accent: false },
  { text: '$ git push origin main → production', delay: 3.0 },
  { text: '✓ Deployed successfully.', delay: 3.4, dim: false, accent: true },
];

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay * 1000);
      timers.current.push(t);
    });
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute -inset-4 bg-indigo-600/6 rounded-3xl blur-3xl" />
      <div className="relative bg-[#09090f] border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0a0a12]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="ml-3 text-xs text-[#3a3a4e] tracking-wider font-mono">
            suriya@dev:~/projects
          </span>
        </div>
        {/* Terminal content */}
        <div className="p-5 space-y-2 min-h-[220px] font-mono">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.25 }}
              className={`text-xs leading-relaxed ${
                line.accent
                  ? 'text-emerald-400 font-medium'
                  : line.dim
                  ? 'text-[#3a3a4e]'
                  : 'text-[#b4b4c8]'
              }`}
            >
              {line.text}
            </motion.div>
          ))}
          {visibleLines.length >= terminalLines.length && (
            <div className="flex items-center gap-1 text-xs text-[#b4b4c8]">
              <span>$</span>
              <span className="w-2 h-3.5 bg-indigo-400/80 cursor-blink ml-0.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-20 overflow-hidden"
    >
      

      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="radial-glow-top absolute inset-0" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-600/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-72 h-72 bg-violet-600/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            {/* Label */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-indigo-400 font-medium">
                <span className="w-8 h-px bg-indigo-400/60" />
                Software Engineer · India
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="space-y-0">
              <h1 className="font-['Space_Grotesk'] text-[clamp(44px,12vw,96px)] font-bold tracking-tight leading-[0.9] text-white">
                SURIYA
              </h1>
              <h1 className="font-['Space_Grotesk'] text-[clamp(44px,12vw,96px)] font-bold tracking-tight leading-[0.9] accent-gradient-text">
                M
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={itemVariants}>
              <p className="text-lg font-light text-[#7a7a8e] leading-relaxed max-w-lg">
                Building{' '}
                <span className="text-[#d4d4e8] font-medium">scalable web applications</span>,{' '}
                <span className="text-indigo-300 font-medium">AI-powered systems</span>{' '}
                &amp; reliable backend solutions.
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-sm text-[#4e4e62] leading-relaxed max-w-md">
                1.6+ years building full-stack and backend systems with Python, FastAPI, Django,
                React, and PostgreSQL. I solve complex engineering problems and build production-ready systems.
              </p>
            </motion.div>

            {/* Tech tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {heroTechs.map((tech) => (
                <span
                  key={tech}
                  className="tech-tag text-[11px] tracking-wider font-medium px-3 py-1.5 border border-white/7 rounded-full text-[#6b6b7e]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-indigo-600/20"
              >
                View My Work
                <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <a
                href="https://drive.google.com/file/d/1HtOSLnVvqEimDJU0uQKBeuzHyxINJuBi/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/10 hover:border-white/20 hover:bg-white/4 text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-lg transition-all duration-200"
              >
                View Resume
              </a>
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 text-[#5a5a6e] hover:text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-lg transition-colors duration-200"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-5">
              <a
                href="https://github.com/suriyamanoharan73"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3a3a4e] hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <GithubIcon width={17} height={17} />
              </a>
              <a
                href="https://linkedin.com/in/suriyacardecs7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3a3a4e] hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon width={17} height={17} />
              </a>
              <a
                href="mailto:suriyacardecs@gmail.com"
                className="text-[#3a3a4e] hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
              <div className="w-px h-4 bg-white/8" />
              <span className="hidden sm:inline text-xs text-[#3a3a4e] tracking-wide">suriyacardecs@gmail.com</span>
            </motion.div>
          </motion.div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col gap-5 items-center lg:items-end"
          >
            <TerminalWindow />

            {/* Stat chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 0.5 }}
              className="flex gap-3 justify-center lg:justify-end w-full max-w-lg"
            >
              {[
                { label: '1.6+ Yrs', sub: 'Experience' },
                { label: '3 Projects', sub: 'Delivered' },
                { label: '8.36 / 10', sub: 'GPA' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 bg-white/2 border border-white/5 rounded-xl px-3 py-3 text-center hover:bg-white/4 hover:border-white/8 transition-all duration-200"
                >
                  <div className="text-sm font-semibold text-white font-['Space_Grotesk']">{stat.label}</div>
                  <div className="text-[10px] text-[#3a3a4e] mt-0.5 tracking-wider uppercase">{stat.sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex flex-col items-center gap-2 mt-10 lg:mt-8"
        >
          {/* <span className="text-[10px] tracking-[0.25em] uppercase text-[#2a2a3a]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          >
            <ArrowDown size={13} className="text-[#2a2a3a]" />
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
