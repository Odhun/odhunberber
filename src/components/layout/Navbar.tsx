'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/services', label: 'Hizmetler' },
  { href: '/prices', label: 'Fiyatlar' },
  { href: '/about', label: 'Hakkımızda' },
  { href: '/contact', label: 'İletişim' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 z-40 w-full transition-all duration-500',
          scrolled
            ? 'bg-[#050505]/85 backdrop-blur-2xl border-b border-white/[0.04]'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-full border border-gold-400/40 flex items-center justify-center group-hover:border-gold-400/70 transition-colors duration-300">
                <span className="text-gold-400 text-xs font-mono">✦</span>
              </div>
            </div>
            <div>
              <span className="font-display text-xl font-light tracking-widest text-white uppercase">
                Odhun
              </span>
              <span className="font-display text-xl font-light tracking-widest text-gold-400 uppercase ml-2">
                Berber
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-[13px] font-medium tracking-wide transition-colors duration-200 underline-gold',
                  pathname === link.href
                    ? 'text-gold-400'
                    : 'text-dark-400 hover:text-white'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gold-400"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/appointment" className="hidden md:inline-flex">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400 text-dark-950 text-[13px] font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer"
              >
                Randevu Al
                <ArrowRight size={13} />
              </motion.button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-dark-300 hover:border-white/20 hover:text-white transition-all duration-200 cursor-pointer md:hidden"
              aria-label="Menü"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[72px] z-30 bg-[#080808]/98 backdrop-blur-2xl border-b border-white/5 md:hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3.5 text-base transition-colors',
                      pathname === link.href
                        ? 'text-gold-400 bg-gold-400/5'
                        : 'text-dark-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {pathname === link.href && <span className="text-gold-400 text-xs">✦</span>}
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5">
                <Link href="/appointment">
                  <button className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gold-400 text-dark-950 font-semibold text-sm cursor-pointer">
                    Randevu Al
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
