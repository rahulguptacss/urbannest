'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bath, BedDouble, Heart, MapPin, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PropertiesSectionData } from '../../types';

export default function Properties({ data, limit }: { data: PropertiesSectionData; limit?: number }) {
  const items = limit ? data.items.slice(0, limit) : data.items;
  const [saved, setSaved] = useState<string[]>([]);

  return (
    <section className="bg-[#f7fbff] py-12 sm:py-14">
      <div className="mx-auto max-w-[1180px] px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-1 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
            <p className="text-[13px] font-extrabold tracking-[0.22em] text-[#e10600]">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
          </div>
          <h2 className="text-[36px] font-black leading-none tracking-[-0.03em] text-[#163a66] sm:text-[46px]">
            {data.title_line1} <span className="text-[#e10600]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-7 text-[#5b6b80]">{data.description}</p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const liked = saved.includes(item.slug);
            const forRent = item.status === 'For Rent';
            return (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[22px] border border-[#e6eef6] bg-white shadow-[0_10px_30px_rgba(22,58,102,0.06)]"
              >
                <div className="relative">
                  <img src={item.image} alt={item.title} className="h-[210px] w-full object-cover transition duration-500 hover:scale-105" />
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold text-white ${forRent ? 'bg-[#e10600]' : 'bg-[#1d4f9c]'}`}>
                    {item.status}
                  </span>
                  <button
                    type="button"
                    aria-label="Save property"
                    onClick={() => setSaved((current) => (current.includes(item.slug) ? current.filter((slug) => slug !== item.slug) : [...current, item.slug]))}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#163a66] shadow-sm"
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-[#e10600] text-[#e10600]' : ''}`} />
                  </button>
                </div>
                <div className="px-4 pb-4 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[16px] font-extrabold text-[#163a66]">{item.title}</h3>
                    <div className="text-right">
                      <p className="text-[16px] font-extrabold text-[#e10600]">{item.price}</p>
                      <p className="text-[11px] leading-none text-[#8b97a8]">{item.price_note}</p>
                    </div>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-[13px] leading-none text-[#5b6b80]">
                    <MapPin className="h-3.5 w-3.5 text-[#e10600]" /> {item.location}
                  </p>
                  <div className="mt-2 flex items-center gap-3 border-t border-[#eef3f8] pt-2.5 text-[12px] font-semibold text-[#163a66]">
                    <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{item.beds}</span>
                    <span className="inline-flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{item.baths}</span>
                    <span className="inline-flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{item.area}</span>
                    <motion.div whileHover={{ x: 3 }} className="ml-auto">
                      <Link href={`/properties/${item.slug}`} aria-label={`View ${item.title}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e10600] text-white">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
