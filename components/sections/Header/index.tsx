'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

/** Desktop Navigation Item with multi-level dropdown flyout support */
function DesktopNavItem({
  link,
  idx,
  active,
  isActive,
}: {
  link: NavItem;
  idx: number;
  active: boolean;
  isActive: (href: string) => boolean;
}) {
  const hasChildren = Boolean(link.children && link.children.length > 0);

  if (!hasChildren) {
    return (
      <motion.div
        key={link.name + link.href}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * idx }}
        className="relative py-2"
      >
        <Link
          href={link.href}
          className={`group relative py-1 text-[14px] font-semibold transition-colors ${
            active ? 'text-[#e11d2e]' : 'text-[#1b2a4a] hover:text-[#e11d2e]'
          }`}
        >
          {link.name}
          <span
            className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#e11d2e] transition-all duration-300 ${
              active ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </Link>
      </motion.div>
    );
  }

  // Multi-level Dropdown
  return (
    <motion.div
      key={link.name + link.href}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * idx }}
      className="group/nav relative py-2"
    >
      <Link
        href={link.href}
        className={`inline-flex items-center gap-1.5 py-1 text-[14px] font-semibold transition-colors ${
          active ? 'text-[#e11d2e]' : 'text-[#1b2a4a] group-hover/nav:text-[#e11d2e]'
        }`}
      >
        <span>{link.name}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover/nav:rotate-180 group-hover/nav:text-[#e11d2e]" />
        <span
          className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#e11d2e] transition-all duration-300 ${
            active ? 'w-full' : 'w-0 group-hover/nav:w-full'
          }`}
        />
      </Link>

      {/* Level 1 Floating Dropdown Card */}
      <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 translate-y-2 transition-all duration-200 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:translate-y-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 z-50">
        <div className="min-w-[220px] rounded-2xl border border-[#eef1f6] bg-white p-2 shadow-[0_16px_36px_-10px_rgba(15,35,70,0.14)]">
          <ul className="space-y-0.5">
            {link.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className={`block rounded-xl px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                        isSubActive
                          ? 'bg-[#fff1f2] text-[#e11d2e]'
                          : 'text-[#1b2a4a] hover:bg-[#f7f9fc] hover:text-[#e11d2e]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2: Nested flyout dropdown (Dropdown inside dropdown)
              return (
                <li key={sub.name} className="group/sub relative">
                  <Link
                    href={sub.href}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                      isSubActive
                        ? 'bg-[#fff1f2] text-[#e11d2e]'
                        : 'text-[#1b2a4a] hover:bg-[#f7f9fc] hover:text-[#e11d2e]'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover/sub:translate-x-0.5 group-hover/sub:text-[#e11d2e]" />
                  </Link>

                  {/* Level 2 Sub-Dropdown Card */}
                  <div className="pointer-events-none absolute left-full top-0 pl-2 opacity-0 translate-x-2 transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:opacity-100 group-hover/sub:translate-x-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-x-0 z-50">
                    <div className="min-w-[200px] rounded-2xl border border-[#eef1f6] bg-white p-2 shadow-[0_16px_36px_-10px_rgba(15,35,70,0.14)]">
                      <ul className="space-y-0.5">
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              className={`block rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                                isActive(nested.href)
                                  ? 'bg-[#fff1f2] text-[#e11d2e]'
                                  : 'text-[#1b2a4a] hover:bg-[#f7f9fc] hover:text-[#e11d2e]'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/** Mobile Navigation Item with multi-level accordion support */
function MobileNavItem({
  link,
  active,
  isActive,
  onClose,
}: {
  link: NavItem;
  active: boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});
  const hasChildren = Boolean(link.children && link.children.length > 0);

  const toggleSub = (name: string) => {
    setSubExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        onClick={onClose}
        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[15px] font-semibold transition ${
          active ? 'bg-[#fff1f2] text-[#e11d2e]' : 'text-[#1b2a4a] hover:bg-[#f7f9fc]'
        }`}
      >
        <span>{link.name}</span>
        {active && <span className="h-2 w-2 rounded-full bg-[#e11d2e]" />}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center justify-between rounded-xl px-3.5 py-1 text-[15px] font-semibold transition ${
          active || expanded ? 'bg-[#fff1f2]/60' : 'hover:bg-[#f7f9fc]'
        }`}
      >
        <Link
          href={link.href}
          onClick={(e) => {
            if (link.href === '#' || !link.href) {
              e.preventDefault();
              setExpanded((prev) => !prev);
            } else {
              onClose();
            }
          }}
          className={`flex-1 py-1.5 transition ${
            active || expanded ? 'text-[#e11d2e]' : 'text-[#1b2a4a]'
          }`}
        >
          {link.name}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={`Toggle ${link.name} sub-menu`}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
            expanded
              ? 'border-[#e11d2e] text-[#e11d2e] bg-[#fff1f2]'
              : 'border-[#e6ebf2] text-[#163a66] hover:border-[#e11d2e] hover:text-[#e11d2e]'
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              expanded ? 'rotate-180 text-[#e11d2e]' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden pl-3 pr-1 my-1 space-y-1 border-l-2 border-[#e11d2e]/40 ml-4"
          >
            {link.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubOpen = Boolean(subExpanded[sub.name]);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className={`block rounded-lg px-3 py-2 text-[14px] font-semibold transition ${
                        isSubActive
                          ? 'bg-[#fff1f2] text-[#e11d2e]'
                          : 'text-[#1b2a4a] hover:bg-[#f7f9fc] hover:text-[#e11d2e]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2 inside mobile drawer (Dropdown inside dropdown)
              return (
                <li key={sub.name} className="flex flex-col">
                  <div
                    className={`flex items-center justify-between rounded-lg px-3 py-1 text-[14px] font-semibold ${
                      isSubActive || isSubOpen ? 'bg-[#fff1f2]/60' : 'hover:bg-[#f7f9fc]'
                    }`}
                  >
                    <Link
                      href={sub.href}
                      onClick={(e) => {
                        if (sub.href === '#' || !sub.href) {
                          e.preventDefault();
                          toggleSub(sub.name);
                        } else {
                          onClose();
                        }
                      }}
                      className={`flex-1 py-1 transition ${
                        isSubActive || isSubOpen ? 'text-[#e11d2e]' : 'text-[#1b2a4a]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSub(sub.name)}
                      aria-expanded={isSubOpen}
                      aria-label={`Toggle ${sub.name} nested menu`}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all cursor-pointer ${
                        isSubOpen
                          ? 'border-[#e11d2e] text-[#e11d2e] bg-[#fff1f2]'
                          : 'border-[#e6ebf2] text-[#163a66] hover:border-[#e11d2e] hover:text-[#e11d2e]'
                      }`}
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180 text-[#e11d2e]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSubOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 pr-1 my-1 space-y-1 border-l border-[#e11d2e]/30 ml-3"
                      >
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              onClick={onClose}
                              className={`block rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition ${
                                isActive(nested.href)
                                  ? 'bg-[#fff1f2] text-[#e11d2e]'
                                  : 'text-[#1b2a4a]/85 hover:bg-[#f7f9fc] hover:text-[#e11d2e]'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (!href || href === '#') return false;
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-[#eef1f6] bg-white shadow-[0_8px_24px_rgba(15,35,70,0.06)]"
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-3 px-4 lg:gap-8 lg:px-6">
        <Link href="/" className="min-w-0 shrink">
          <img
            src={data.logo}
            alt={data.logo_text}
            className="h-14 w-auto max-w-[150px] object-contain object-left sm:h-[72px] sm:max-w-[190px] lg:h-[84px] lg:max-w-none"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-7 xl:flex">
          {data.links.map((link, index) => (
            <DesktopNavItem
              key={link.name + link.href}
              link={link}
              idx={index}
              active={isActive(link.href)}
              isActive={isActive}
            />
          ))}
        </nav>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="ml-auto shrink-0 xl:ml-0"
        >
          <Link
            href={data.button_link}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#e11d2e] px-3.5 py-2 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#c41625] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[14px]"
          >
            {data.button_text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6ebf2] bg-[#f7f9fc] text-[#163a66] shadow-sm xl:hidden cursor-pointer"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" strokeWidth={2.25} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#eef1f6] bg-white xl:hidden"
          >
            <div className="flex flex-col gap-1 px-3 py-3">
              {data.links.map((link) => (
                <MobileNavItem
                  key={link.name + link.href}
                  link={link}
                  active={isActive(link.href)}
                  isActive={isActive}
                  onClose={() => setOpen(false)}
                />
              ))}
              <div className="pt-2">
                <Link
                  href={data.button_link}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e11d2e] py-2.5 text-center text-[14px] font-bold text-white shadow-sm transition hover:bg-[#c41625]"
                >
                  <span>{data.button_text}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
