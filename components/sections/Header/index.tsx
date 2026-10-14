'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-[#eef1f6] bg-white shadow-[0_8px_24px_rgba(15,35,70,0.06)]"
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-3 px-4 lg:gap-8 lg:px-6">
        <Link href="/" className="min-w-0 shrink">
          <img src={data.logo} alt={data.logo_text} className="h-14 w-auto max-w-[150px] object-contain object-left sm:h-[72px] sm:max-w-[190px] lg:h-[84px] lg:max-w-none" />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 xl:flex">
          {data.links.map((link, index) => {
            const active = pathname === link.href;
            return (
              <motion.div key={link.name + link.href} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
                <Link href={link.href} className={`group relative py-2 text-[14px] font-semibold ${active ? 'text-[#e11d2e]' : 'text-[#1b2a4a] hover:text-[#e11d2e]'}`}>
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#e11d2e] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="ml-auto shrink-0 xl:ml-0">
          <Link href={data.button_link} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#e11d2e] px-3.5 py-2 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#c41625] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[14px]">
            {data.button_text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6ebf2] bg-[#f7f9fc] text-[#163a66] shadow-sm xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" strokeWidth={2.25} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#eef1f6] bg-white xl:hidden"
          >
            <div className="flex flex-col gap-1 px-3 py-3">
              {data.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name + link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-2.5 text-[15px] font-semibold ${active ? 'bg-[#fff1f2] text-[#e11d2e]' : 'text-[#1b2a4a] hover:bg-[#f7f9fc]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
