import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, GeeksForGeeksIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="absolute inset-0 bg-[#030306]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-['Space_Grotesk'] text-sm font-semibold tracking-widest uppercase text-white">
              SURIYA M
            </p>
            <p className="text-xs text-[#3a3a4e] mt-1 tracking-wide">
              Backend · Full Stack · AI · Cloud
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/suriyamanoharan73"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3a3a4e] hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <GithubIcon width={16} height={16} />
            </a>
            <a
              href="https://linkedin.com/in/suriyacardecs7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3a3a4e] hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon width={16} height={16} />
            </a>
            <a
              href="https://leetcode.com/u/Suriyacardecs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3a3a4e] hover:text-[#FFA116] transition-colors duration-200"
              aria-label="LeetCode"
            >
              <LeetCodeIcon width={16} height={16} />
            </a>
            <a
              href="https://www.geeksforgeeks.org/user/suriyacx9vy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3a3a4e] hover:text-[#2F8D46] transition-colors duration-200"
              aria-label="GeeksforGeeks"
            >
              <GeeksForGeeksIcon width={16} height={16} />
            </a>
            <a
              href="mailto:suriyacardecs@gmail.com"
              className="text-[#3a3a4e] hover:text-white transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#2a2a3a] tracking-wide">
            © 2026 Suriya M. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
