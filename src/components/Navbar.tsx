import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks
      .map(l => l.href.replace('#', ''))
      .filter(id => id !== 'home');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Wrapper: full-width when not scrolled, centered pill when scrolled */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            // when scrolled: float with top margin; when not: flush to top
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: 'auto' }}
          className={`transition-all duration-500 ${
            scrolled
              ? // Floating centered rectangle
                'mt-4 mx-4 rounded-2xl border border-white/10 bg-[#0a0a14]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-5xl px-6 py-3'
              : // Full-width flush bar
                'w-full px-8 py-5 bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveSection('home'); }}
              className="flex items-center gap-2.5 shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="16 18 22 12 16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="8 6 2 12 8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[15px] font-bold tracking-tight">
                <span className="text-white">suriya</span>
                <span className="text-blue-500">M</span>
              </span>
            </a>

            {/* Desktop Nav links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 cursor-pointer rounded-md group ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {/* Active blue underline */}
                    <span
                      className={`absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full bg-blue-500 transition-all duration-300 origin-center ${
                        isActive
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* CTA button */}
            <div className="hidden lg:block shrink-0">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 hover:shadow-lg"
              >
                Get Started
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white/70 hover:text-white p-1 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-4 right-4 z-40 rounded-2xl border border-white/10 bg-[#0a0a14]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] lg:hidden overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-white/8'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 mb-0.5" />
                    )}
                    {link.label}
                  </motion.button>
                );
              })}
              <div className="pt-2 mt-1 border-t border-white/8">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full transition-colors w-full"
                >
                  Get Started
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
