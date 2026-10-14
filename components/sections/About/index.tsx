'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AboutSectionData } from '../../types';

export default function About({ data, hideButton = false }: { data: AboutSectionData; hideButton?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-[#f5f8fd] py-8 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#e7eef8]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#e9f0f8]" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-4 lg:grid-cols-[150px_minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 text-center lg:order-1 lg:text-left">
          <p className="text-[13px] font-bold tracking-[0.14em] text-[#163a66]">{data.badge_label}</p>
          <p className="mt-1 text-6xl font-extrabold leading-none text-[#e10600]">{data.badge_value}</p>
          <p className="mt-2 text-[13px] font-bold tracking-[0.12em] text-[#163a66]">{data.badge_note}</p>
          <span className="mx-auto mt-3 block h-[3px] w-10 rounded-full bg-[#e10600] lg:mx-0" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative order-1 mx-auto w-full max-w-[380px] lg:order-2">
          <svg viewBox="0 0 480 420" className="pointer-events-none absolute -left-8 -top-6 h-[115%] w-[115%] text-[#e10600]" fill="none" aria-hidden>
            <path d="M40 360C120 300 80 80 250 40" stroke="currentColor" strokeWidth="2" />
            <path d="M300 390C420 340 460 180 390 70" stroke="currentColor" strokeWidth="2" />
          </svg>
          <img src={data.image} alt="" className="relative h-[340px] w-full -rotate-6 rounded-[28px] object-cover shadow-[0_18px_40px_rgba(16,40,80,0.18)] sm:h-[440px]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-3">
          <h2 className="text-[26px] font-extrabold leading-[1.15] text-[#163a66] sm:text-[32px]">
            {data.title_line1}
            <span className="mt-1 block text-[#e10600]">{data.title_highlight}</span>
          </h2>
          <span className="mt-3 block h-[3px] w-14 rounded-full bg-[#e10600]" />
          <p className="mt-4 text-[15px] leading-7 text-[#31445f]">{data.description}</p>
          <p className="mt-3 text-[15px] leading-7 text-[#31445f]">{data.description_secondary}</p>
          {!hideButton && (
            <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-6 w-fit">
              <Link href={data.button.href} className="group inline-flex items-center gap-3 rounded-full bg-[#e10600] py-2 pl-6 pr-2 text-sm font-bold text-white shadow-md">
                {data.button.text}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#e10600] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
