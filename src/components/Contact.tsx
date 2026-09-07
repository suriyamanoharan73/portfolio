import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, ArrowUpRight, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useInView } from '../hooks/useInView';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const socialLinks = [
  {
    icon: <Mail size={16} />,
    label: 'Email',
    value: 'suriyacardecs@gmail.com',
    href: 'mailto:suriyacardecs@gmail.com',
  },
  {
    icon: <Phone size={16} />,
    label: 'Phone',
    value: '+91 9597540125',
    href: 'tel:+919597540125',
  },
  {
    icon: <LinkedinIcon width={16} height={16} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/suriyacardecs7',
    href: 'https://linkedin.com/in/suriyacardecs7',
  },
  {
    icon: <GithubIcon width={16} height={16} />,
    label: 'GitHub',
    value: 'github.com/suriyamanoharan73',
    href: 'https://github.com/suriyamanoharan73',
  },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email address';
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
}

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (sendError) setSendError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSending(true);
    setSendError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-white/3 border rounded-xl px-4 py-3 text-sm text-white placeholder-[#3a3a4e] outline-none transition-all duration-200 focus:bg-white/5 ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500/70'
        : 'border-white/8 focus:border-indigo-500/40'
    }`;

  return (
    <section id="contact" className="relative py-32 border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030306]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Large heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="section-number">09 / Contact</span>
          <h2 className="font-['Space_Grotesk'] text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mt-6">
            <span className="text-white">LET'S BUILD</span>
            <br />
            <span className="text-white">SOMETHING</span>
            <br />
            <span className="accent-gradient-text">USEFUL.</span>
          </h2>
          <p className="text-[#6b6b7e] mt-8 max-w-md leading-relaxed">
            Have an idea, project, opportunity, or interesting engineering problem?
            <br />
            Let's talk about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-6"
          >
            {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="group flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/12 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500/15 transition-colors text-[#6b6b7e] group-hover:text-indigo-400 transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[#3a3a4e] tracking-wide uppercase">{link.label}</p>
                      <p className="text-sm text-[#8b8b9e] group-hover:text-white transition-colors mt-0.5">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-[#2a2a3a] group-hover:text-white transition-colors" />
                </motion.a>
            ))}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="mailto:suriyacardecs@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-widest uppercase rounded-lg transition-colors duration-200"
              >
                <Mail size={13} />
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/suriyacardecs7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-200"
              >
                <LinkedinIcon width={13} height={13} />
                LinkedIn
              </a>
              <a
                href="https://github.com/suriyamanoharan73"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-200"
              >
                <GithubIcon width={13} height={13} />
                GitHub
              </a>
              <a
                href="https://drive.google.com/file/d/1HtOSLnVvqEimDJU0uQKBeuzHyxINJuBi/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-200"
              >
                <Download size={13} />
                Resume
              </a>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-6 text-center py-16">
                <div className="w-16 h-16 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                  <Send size={24} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-[#6b6b7e]">
                    Your message has been delivered. I'll reply as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 tracking-widest uppercase transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={inputClass('subject')}
                  />
                  {errors.subject && <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.subject}</p>}
                </div>
                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.message}</p>}
                </div>
                {sendError && (
                  <p className="text-xs text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {sendError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="group flex items-center gap-3 w-full justify-center px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-widest uppercase rounded-xl transition-all duration-200"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
