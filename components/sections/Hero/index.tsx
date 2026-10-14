'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Award, Home, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { HeroSectionData } from '../../types';

const icons = { Home, Award, Users, Shield };
const CARD_WIDTH = 800;

export default function Hero({ data }: { data: HeroSectionData }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 1, height: 480 });

  useEffect(() => {
    const frame = frameRef.current;
    const card = cardRef.current;
    if (!frame || !card) return;

    const fit = () => {
      const available = frame.clientWidth;
      const next = Math.min(1, available / CARD_WIDTH);
      setBox({ scale: next, height: card.offsetHeight * next });
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(card);
    window.addEventListener('resize', fit);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <section className="relative flex items-end overflow-hidden md:h-[calc(100svh-72px)] md:min-h-[560px] md:items-center">
      <motion.img
        src={data.image}
        alt=""
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#071433]/25" />

      <div className="relative z-10 mx-auto flex w-full max-w-[420px] items-end px-4 pb-4 pt-16 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full rounded-[28px] border border-white/80 bg-white/55 px-4 py-5 text-center shadow-[0_16px_40px_rgba(7,20,51,0.16)] backdrop-blur-md"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-[#1b3a6b]/40" />
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#1b3a6b]">{data.eyebrow}</p>
            <span className="h-px w-6 bg-[#1b3a6b]/40" />
          </div>
          <h1 className="text-[28px] font-extrabold leading-[1.08] text-[#163a66]">
            {data.title_line1}
            <span className="mt-0.5 block text-[#e10600]">{data.title_highlight}</span>
          </h1>
          <p className="mx-auto mt-2 max-w-[320px] text-[12px] leading-5 text-[#2c415c]">{data.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {data.features.map((feature) => {
              const Icon = icons[feature.icon as keyof typeof icons] || Home;
              return (
                <div key={feature.label} className="flex items-center gap-2 rounded-2xl bg-white/80 px-2.5 py-2 text-left shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d5e2f3] bg-white text-[#1d4f8a]">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="text-[12px] font-semibold leading-4 text-[#163a66]">{feature.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            <Link href={data.primary_button.href} className="grid grid-cols-[1fr_auto_1fr] items-center rounded-full bg-[#e10600] py-1.5 pl-4 pr-1.5 text-[15px] font-bold text-white">
              <span />
              {data.primary_button.text}
              <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#e10600]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href={data.secondary_button.href} className="grid grid-cols-[1fr_auto_1fr] items-center rounded-full border border-[#163a66] bg-white/70 py-1.5 pl-4 pr-1.5 text-[15px] font-bold text-[#163a66]">
              <span />
              {data.secondary_button.text}
              <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#163a66] text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div ref={frameRef} className="relative z-10 mx-auto hidden w-full max-w-[800px] md:block" style={{ height: box.height }}>
        <div className="absolute left-0 top-0" style={{ width: CARD_WIDTH, transform: `scale(${box.scale})`, transformOrigin: 'top left' }}>
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-[800px] rounded-[32px] border border-white/80 bg-white/45 px-10 py-9 text-center shadow-[0_20px_60px_rgba(7,20,51,0.16)] backdrop-blur-md"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#1b3a6b]/40 sm:w-12" />
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#1b3a6b] sm:text-xs">{data.eyebrow}</p>
            <span className="h-px w-8 bg-[#1b3a6b]/40 sm:w-12" />
          </div>

          <h1 className="text-[52px] font-extrabold leading-[1.05] text-[#163a66]">
            {data.title_line1}
            <span className="mt-1 block text-[#e10600]">{data.title_highlight}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-6 text-[#2c415c]">{data.description}</p>

          <div className="mx-auto mt-6 flex max-w-[720px] flex-nowrap items-center justify-center gap-x-5">
            {data.features.map((feature, index) => {
              const Icon = icons[feature.icon as keyof typeof icons] || Home;
              return (
                <motion.div key={feature.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.08 }} className="flex items-center">
                  {index === 2 && <span className="mr-5 h-8 w-px bg-[#163a66]/25" />}
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d5e2f3] bg-white text-[#1d4f8a] shadow-sm">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="max-w-[72px] text-left text-[12px] font-semibold leading-4 text-[#163a66]">{feature.label}</span>
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 18 }}>
              <Link href={data.primary_button.href} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#e10600] py-2 pl-6 pr-2 text-sm font-bold text-white shadow-md transition-shadow hover:shadow-[0_12px_28px_rgba(225,6,0,0.35)]">
                {data.primary_button.text}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#e10600] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 18 }}>
              <Link href={data.secondary_button.href} className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#163a66] bg-white/40 py-2 pl-6 pr-2 text-sm font-bold text-[#163a66] transition-colors hover:bg-white">
                {data.secondary_button.text}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#163a66] text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
