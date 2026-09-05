import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { projects, type Project } from '../data/projects';

// Architecture diagram visual for each project
function ProjectVisual({ project, size = 'default' }: { project: Project; size?: 'default' | 'large' }) {
  const h = size === 'large' ? 'min-h-[280px]' : 'min-h-[180px]';

  const configs: Record<string, {
    nodes: Array<{ x: number; y: number; r: number; label: string }>;
    connections: Array<[number, number]>;
    color: string;
    bg: string;
  }> = {
    farallon: {
      nodes: [
        { x: 50, y: 22, r: 5, label: 'HL7' },
        { x: 22, y: 52, r: 4, label: 'DB' },
        { x: 50, y: 52, r: 6, label: 'API' },
        { x: 78, y: 52, r: 4, label: 'WS' },
        { x: 50, y: 78, r: 4, label: 'UI' },
      ],
      connections: [[0,2],[1,2],[2,3],[2,4]],
      color: '#3b82f6',
      bg: 'from-blue-600/8 to-cyan-600/4',
    },
    ayushya: {
      nodes: [
        { x: 50, y: 20, r: 6, label: 'AI' },
        { x: 20, y: 50, r: 4, label: 'WS' },
        { x: 80, y: 50, r: 4, label: 'Auth' },
        { x: 35, y: 75, r: 4, label: 'DB' },
        { x: 65, y: 75, r: 4, label: 'API' },
      ],
      connections: [[0,1],[0,2],[0,4],[3,4],[1,3]],
      color: '#8b5cf6',
      bg: 'from-violet-600/8 to-purple-600/4',
    },
    shopq: {
      nodes: [
        { x: 50, y: 18, r: 5, label: 'App' },
        { x: 22, y: 45, r: 4, label: 'Pay' },
        { x: 50, y: 45, r: 5, label: 'Order' },
        { x: 78, y: 45, r: 4, label: 'Ship' },
        { x: 30, y: 75, r: 3, label: 'SMS' },
        { x: 50, y: 75, r: 3, label: 'Email' },
        { x: 70, y: 75, r: 3, label: 'Push' },
      ],
      connections: [[0,1],[0,2],[0,3],[2,4],[2,5],[2,6]],
      color: '#10b981',
      bg: 'from-emerald-600/8 to-teal-600/4',
    },
  };

  const config = configs[project.id] ?? configs.farallon;
  const c = config.color;

  return (
    <div className={`relative w-full ${h} flex items-center justify-center overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bg}`} />
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full max-w-[260px] max-h-[200px] relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection lines */}
        {config.connections.map(([a, b], i) => (
          <line
            key={i}
            x1={config.nodes[a].x} y1={config.nodes[a].y}
            x2={config.nodes[b].x} y2={config.nodes[b].y}
            stroke={c} strokeWidth="0.6" strokeOpacity="0.25"
            strokeDasharray="2 2"
          />
        ))}
        {/* Nodes */}
        {config.nodes.map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r={node.r + 3} fill={c} fillOpacity="0.04" />
            <circle cx={node.x} cy={node.y} r={node.r + 1} fill={c} fillOpacity="0.10" />
            <circle cx={node.x} cy={node.y} r={node.r} fill={c} fillOpacity="0.30" />
            <text
              x={node.x} y={node.y + node.r + 4}
              textAnchor="middle"
              fontSize="3.5"
              fill={c}
              fillOpacity="0.7"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      {/* Category badge */}
      <div className="absolute bottom-3 left-4">
        <span className="text-[10px] tracking-[0.15em] uppercase font-medium opacity-70" style={{ color: c }}>
          {project.category}
        </span>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative bg-[#080810] border border-white/8 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Visual header */}
        <div className="h-52 relative overflow-hidden rounded-t-2xl">
          <ProjectVisual project={project} size="large" />
        </div>

        {/* Content */}
        <div className="p-7 sm:p-10 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] text-indigo-400 tracking-[0.2em] uppercase font-medium">
                {project.number} / {project.category}
              </span>
              <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white mt-1.5">
                {project.name}
              </h3>
              <p className="text-sm text-[#5a5a6e] mt-1">Role: <span className="text-[#8b8b9e]">{project.role}</span></p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#3a3a4e] hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a4e] mb-3">Overview</h4>
                <p className="text-[13px] text-[#7a7a8e] leading-relaxed">{project.longDescription}</p>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a4e] mb-3">Problem</h4>
                <p className="text-[13px] text-[#7a7a8e] leading-relaxed">{project.problem}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a4e] mb-3">Solution</h4>
                <p className="text-[13px] text-[#7a7a8e] leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a4e] mb-3">My Contributions</h4>
                <ul className="space-y-2.5">
                  {project.contributions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#7a7a8e]">
                      <span className="text-indigo-500 mt-0.5 shrink-0 text-base leading-none">·</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="border-t border-white/5 pt-6">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#3a3a4e] mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(t => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 border border-white/6 rounded-full text-[#6b6b7e] hover:text-white hover:border-white/12 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/10 hover:bg-white/[0.03] transition-colors duration-300"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Project visual */}
      <div className="overflow-hidden">
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <ProjectVisual project={project} />
        </motion.div>
      </div>

      {/* Card content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-indigo-500 tracking-[0.2em]">{project.number}</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-indigo-100 transition-colors duration-200">
              {project.name}
            </h3>
            <p className="text-[11px] text-[#3a3a4e] mt-0.5 tracking-wider uppercase">{project.category}</p>
          </div>
          <motion.div
            animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0, rotate: hovered ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={17} className="text-[#2a2a3a] group-hover:text-indigo-400 transition-colors" />
          </motion.div>
        </div>

        <p className="text-[13px] text-[#5e5e72] leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-1 border border-white/5 rounded-full text-[#3a3a4e] group-hover:border-white/8 group-hover:text-[#5a5a6e] transition-all duration-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[11px] px-2 py-1 text-[#2a2a3a]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/4 flex items-center justify-between">
          <span className="text-[11px] text-[#2a2a3a] tracking-wide">{project.role}</span>
          <span className="text-[10px] text-indigo-500/60 tracking-wider uppercase group-hover:text-indigo-400 transition-colors">
            View case study →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { ref, inView } = useInView(0.05);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="section-number">04 / Work</span>
            <h2 className="font-['Space_Grotesk'] text-[clamp(48px,7vw,72px)] font-bold tracking-tight text-white leading-none mt-4">
              FEATURED
              <br />
              <span className="text-[#1e1e2e]">PROJECTS</span>
            </h2>
          </div>
          <p className="text-[13px] text-[#3a3a4e] max-w-[200px] text-right leading-relaxed hidden sm:block">
            Click any project to read the full case study
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
