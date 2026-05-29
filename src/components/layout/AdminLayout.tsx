'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors,
  LayoutDashboard,
  Calendar,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { SITE_NAME } from '@/lib/constants';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/appointments', icon: Calendar, label: 'Randevular' },
  { href: '/admin/schedule', icon: Clock, label: 'Çalışma Saatleri' },
  { href: '/admin/services', icon: Scissors, label: 'Hizmetler' },
  { href: '/admin/settings', icon: Settings, label: 'Ayarlar' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-dark-800 bg-dark-900">
        <SidebarContent pathname={pathname} user={user} signOut={signOut} />
      </aside>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-dark-800 bg-dark-900 lg:hidden"
            >
              <SidebarContent pathname={pathname} user={user} signOut={signOut} onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="flex h-14 items-center gap-4 border-b border-dark-800 bg-dark-900 px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-dark-400 hover:bg-dark-800 hover:text-white transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-1 text-sm text-dark-400">
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
            {pathname !== '/admin' && (
              <>
                <ChevronRight size={14} />
                <span className="text-white">
                  {navItems.find(n => pathname.startsWith(n.href) && n.href !== '/admin')?.label || ''}
                </span>
              </>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  user,
  signOut,
  onClose,
}: {
  pathname: string;
  user: ReturnType<typeof useAuth>['user'];
  signOut: () => Promise<void>;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center gap-3 border-b border-dark-800 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
          <Scissors size={16} className="text-dark-900" />
        </div>
        <span className="font-semibold text-white text-sm">{SITE_NAME} Admin</span>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-dark-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-gold-500/10 text-gold-400'
                  : 'text-dark-400 hover:bg-dark-800 hover:text-white'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-dark-800 p-3 space-y-1">
        <div className="px-3 py-2">
          <p className="text-xs text-dark-400 truncate">{user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-dark-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
