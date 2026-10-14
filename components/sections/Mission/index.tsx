
'use client';

import { Eye, Home, Leaf, Shield, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MissionSectionData } from '../../types';

const cardIcons = { Target, Eye };
const highlightIcons = { Shield, Home, Leaf, Users };

export default function Mission({
  data,
}: {
  data: MissionSectionData;
}) {
  return (
    <section className="overflow-hidden bg-white py-4 sm:py-6">
      <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 lg:grid-cols-[1.05fr_0.95fr]">

        {/* LEFT CONTENT */}
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
            <p className="text-[13px] font-extrabold tracking-[0.16em] text-[#e10600]">
              {data.subtitle}
            </p>
          </div>

          <h2 className="text-[34px] font-black leading-[0.95] tracking-[-0.03em] text-[#163a66] sm:text-[46px]">
            {data.title_line1}
            <span className="block text-[#e10600]">
              {data.title_highlight}
            </span>
          </h2>

          <p className="mt-3 max-w-[520px] text-[15px] leading-7 text-[#5b6b80]">
            {data.description}
          </p>

          {/* MISSION / VISION CARDS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.cards.map((card) => {
              const Icon =
                cardIcons[card.icon as keyof typeof cardIcons] || Target;
              const vision = card.icon === 'Eye';

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: vision ? 0.15 : 0.05, duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  className={`rounded-[22px] p-5 ${vision ? 'bg-[#eef4fb]' : 'bg-white shadow-[0_8px_24px_rgba(22,58,102,0.04)]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white ${
                        vision ? 'bg-[#e10600]' : 'bg-[#163a66]'
                      }`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-[12px] font-bold tracking-[0.12em] text-[#163a66]">{card.eyebrow}</p>
                      <p className="text-[22px] font-extrabold leading-none text-[#163a66]">{card.title}</p>
                      <span className="mt-1.5 block h-[3px] w-8 rounded-full bg-[#e10600]" />
                    </div>
                  </div>
                  <p className="mt-4 text-[13.5px] leading-6 text-[#3d5678]">{card.description}</p>
                </motion.article>
              );
            })}
          </div>

          {/* HIGHLIGHTS */}
          <div className="mt-6 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
            {data.highlights.map((item, index) => {
              const Icon = highlightIcons[item.icon as keyof typeof highlightIcons] || Shield;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -3 }}
                  className={`flex items-center gap-2.5 px-2 ${index % 2 === 1 ? 'border-l border-[#d7e0ea]' : ''} ${index > 0 ? 'sm:border-l sm:border-[#d7e0ea]' : ''}`}
                >
                  <Icon className="h-7 w-7 shrink-0 text-[#163a66]" strokeWidth={1.6} />
                  <div>
                    <p className="text-[13px] font-semibold leading-4 text-[#163a66]">{item.title}</p>
                    <span className="mt-1.5 block h-[3px] w-7 rounded-full bg-[#e10600]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT IMAGE - SCREENSHOT STYLE CLIP PATH */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[600px] px-3 py-2 sm:px-5"
        >

          {/* Angled image */}
          <div
            className="relative z-10 overflow-hidden"
            style={{
              clipPath:
                'polygon(23% 0%, 100% 3%, 100% 91%, 88% 100%, 8% 91%, 0% 80%, 8% 17%)',
              transform: 'rotate(-1deg)',
            }}
          >
            <img
              src={data.image}
              alt=""
              className="block aspect-square w-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
