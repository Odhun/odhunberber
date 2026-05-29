'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { SITE_NAME } from '@/lib/constants';

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'border-b border-white/5 bg-dark-950/90 backdrop-blur-xl shadow-2xl'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 shadow-lg shadow-gold-500/25 group-hover:bg-gold-400 transition-colors">
              <Scissors size={18} className="text-dark-900" />
            </div>
            <span className="font-serif text-xl font-bold text-white tracking-tight">
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-gold-400'
                    : 'text-dark-300 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/appointment" className="hidden md:block">
              <Button size="sm">Randevu Al</Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 text-dark-300 hover:bg-white/10 hover:text-white transition-colors md:hidden"
              aria-label="Menü"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 border-b border-white/5 bg-dark-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-gold-500/10 text-gold-400'
                      : 'text-dark-200 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-white/5">
                <Link href="/appointment">
                  <Button className="w-full">Randevu Al</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
