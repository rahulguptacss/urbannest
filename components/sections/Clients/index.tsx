'use client';

import { motion } from 'framer-motion';
import type { ClientsSectionData } from '../../types';

export default function Clients({ data }: { data: ClientsSectionData }) {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1100px] px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-1 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
            <p className="text-[13px] font-extrabold tracking-[0.18em] text-[#e10600]">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
          </div>
          <h2 className="text-[32px] font-black leading-none tracking-[-0.03em] text-[#163a66] sm:text-[42px]">
            {data.title_line1} <span className="text-[#e10600]">{data.title_highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[15px] leading-7 text-[#5b6b80]">{data.description}</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {data.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex h-[88px] items-center justify-center rounded-2xl border border-[#e8eef6] bg-white px-3 shadow-[0_8px_20px_rgba(22,58,102,0.04)]"
            >
              <img src={item.image} alt={item.name} className="max-h-[68px] w-auto max-w-[92%] object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
