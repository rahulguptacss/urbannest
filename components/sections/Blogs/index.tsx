'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogsSectionData } from '../../types';

export default function Blogs({ data, limit, showButton = true }: { data: BlogsSectionData; limit?: number; showButton?: boolean }) {
  const items = limit ? data.items.slice(0, limit) : data.items;

  return (
    <section className="relative overflow-hidden bg-[#f7fbff] py-8 sm:py-10">
      <div aria-hidden className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full bg-[#e10600]/10 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-10 bottom-10 h-44 w-44 rounded-full bg-[#163a66]/10 blur-2xl" />
      <div className="relative mx-auto max-w-[1180px] px-4">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <div className="mb-1 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
            <p className="text-[13px] font-extrabold tracking-[0.22em] text-[#e10600]">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
          </div>
          <h2 className="text-[36px] font-black leading-none tracking-[-0.03em] text-[#163a66] sm:text-[46px]">
            {data.title_line1} <span className="text-[#e10600]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-7 text-[#5b6b80]">{data.description}</p>
        </div>

        <div className="mx-auto grid max-w-[1040px] gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-[20px] border border-[#e8eef6] bg-white"
            >
              <div className="relative overflow-hidden">
                <motion.img src={item.image} alt={item.title} whileHover={{ scale: 1.06 }} transition={{ duration: 0.45 }} className="h-[160px] w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-md bg-[#e10600] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
                  {item.category}
                </span>
              </div>
              <div className="px-4 pb-3 pt-3">
                <h3 className="text-[16px] font-extrabold leading-snug text-[#163a66]">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-5 text-[#5b6b80]">{item.excerpt}</p>
                <div className="mt-3 flex items-center justify-between border-t border-[#eef3f8] pt-2.5">
                  <p className="inline-flex items-center gap-2 text-[12px] text-[#8b97a8]">
                    <Calendar className="h-4 w-4 text-[#e10600]" />
                    {item.date}
                  </p>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link
                      href={`/blog/${item.slug}`}
                      aria-label={`Read ${item.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e10600] text-white"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {showButton && (
          <div className="mt-7 flex justify-center">
            <Link href={data.button.href} className="inline-flex items-center gap-3 rounded-full border border-[#d5deea] bg-white py-1.5 pl-5 pr-1.5 text-[14px] font-semibold text-[#163a66] transition hover:border-[#e10600]">
              {data.button.text}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e10600] text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
