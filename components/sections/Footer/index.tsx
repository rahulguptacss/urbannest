'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { FooterData } from '../../types';

function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === 'Linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6.5 9H4V20h2.5V9zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20z" />
      </svg>
    );
  }
  if (name === 'Youtube') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}
const socialColors: Record<string, string> = {
  Facebook: 'bg-[#1877f2]',
  Instagram: 'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
  Linkedin: 'bg-[#0a66c2]',
  Youtube: 'bg-[#ff0000]',
};

function Column({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="border-t border-white/15 lg:border-0">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between py-2.5 text-left lg:cursor-default lg:py-0" aria-expanded={open}>
        <span>
          <span className="text-[18px] font-bold">{title}</span>
          <span className={`mt-2 h-[3px] w-8 rounded-full bg-[#e10600] ${open ? 'block' : 'hidden'} lg:block`} />
        </span>
        <ChevronDown className={`h-5 w-5 transition duration-300 lg:hidden ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} lg:grid-rows-[1fr]`}>
        <div className="overflow-hidden">
          <div className="pb-1 lg:pb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (key: string) => setOpen((current) => (current === key ? null : key));

  return (
    <footer className="relative overflow-hidden text-white">
      <img src={data.background} alt="" className="pointer-events-none absolute left-0 top-0 h-[920px] w-full object-cover object-top sm:h-[560px]" />
      <div className="absolute inset-0 bg-[#071a3a]/82" />
      <div className="relative mx-auto grid max-w-[1180px] gap-8 px-4 py-8 lg:grid-cols-[1.45fr_0.85fr_1fr_1.05fr] lg:gap-10">
        <div>
          <img src={data.logo} alt={data.logo_text} className="h-16 w-auto object-contain" />
          <p className="mt-4 max-w-[280px] text-[14px] leading-7 text-white/80">{data.description}</p>
          <div className="mt-5 flex gap-2.5">
            {data.socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-label={item.name}
                target="_blank"
                rel="noreferrer"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${socialColors[item.name] || 'bg-white/20'}`}
              >
                <SocialIcon name={item.name} />
              </a>
            ))}
          </div>
        </div>

        <Column title={data.headings.quick_links} open={open === 'links'} onToggle={() => toggle('links')}>
          <ul className="mt-3 space-y-1.5 text-[14px] text-white/85">
            {data.quick_links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="inline-flex items-center gap-2 hover:text-white">
                  <ChevronRight className="h-3.5 w-3.5 text-white/70" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title={data.headings.our_services} open={open === 'services'} onToggle={() => toggle('services')}>
          <ul className="mt-3 space-y-1.5 text-[14px] text-white/85">
            {data.our_services.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="inline-flex items-center gap-2 hover:text-white">
                  <ChevronRight className="h-3.5 w-3.5 text-white/70" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title={data.headings.contact} open={open === 'contact'} onToggle={() => toggle('contact')}>
          <ul className="mt-3 space-y-2 text-[14px] leading-6 text-white/85">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#e10600]" />
              <span>{data.contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-[#e10600]" />
              <span>
                <a href={`tel:${data.contact.phone.replace(/[^\d+]/g, '')}`} className="block hover:text-white">{data.contact.phone}</a>
                <a href={`tel:${data.contact.phone_secondary.replace(/[^\d+]/g, '')}`} className="block hover:text-white">{data.contact.phone_secondary}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-[#e10600]" />
              <a href={`mailto:${data.contact.email}`} className="hover:text-white">{data.contact.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-[#e10600]" />
              <span>
                {data.contact.hours}
                <br />
                {data.contact.hours_secondary}
              </span>
            </li>
          </ul>
        </Column>
      </div>
      <div className="relative border-t border-white/15">
        <p className="px-4 py-3 text-center text-[13px] text-white/75">{data.copyright}</p>
      </div>
    </footer>
  );
}
