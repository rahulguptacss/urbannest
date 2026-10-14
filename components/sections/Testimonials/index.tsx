'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { TestimonialsSectionData } from '../../types';

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const total = data.items.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [perView, setPerView] = useState(3);

  const move = (step: number) => {
    if (!total) return;
    setDirection(step > 0 ? 1 : -1);
    setIndex((current) => (current + step + total * 20) % total);
  };

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const apply = () => setPerView(media.matches ? 3 : 1);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => move(1), 4000);
    return () => clearInterval(timer);
  }, [total]);

  const slots = perView === 1 ? [0] : [-1, 0, 1];
  const shift = `${direction * (100 / perView)}%`;

  return (
    <section className="relative overflow-x-hidden bg-[#f7fbff] py-6 sm:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-60"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 160' preserveAspectRatio='none'%3E%3Cpath fill='%23d7e4f5' d='M0 160V90l40-30 50 20 70-50 60 30 80-40 50 25 90-55 70 35 60-20 80 40 70-45 90 30 80-25 70 20 80-40 80 35V160z'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat-x',
          backgroundSize: '900px 120px',
          backgroundPosition: 'bottom',
        }}
      />
      <div className="relative mx-auto max-w-[1180px] px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-5 max-w-3xl text-center">
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

        <div className="relative sm:px-12">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => move(-1)}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#163a66] shadow-[0_8px_24px_rgba(22,58,102,0.12)] sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => move(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#163a66] shadow-[0_8px_24px_rgba(22,58,102,0.12)] sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="relative overflow-hidden py-4">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: shift }}
                animate={{ x: 0 }}
                exit={{ x: direction > 0 ? `-${100 / perView}%` : shift }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center"
              >
                {slots.map((slot) => {
                  const item = data.items[(index + slot + total) % total];
                  const center = slot === 0;
                  return (
                    <article
                      key={item.name}
                      className="shrink-0 px-1.5"
                      style={{ width: `${100 / perView}%`, transform: center ? 'scale(1.05)' : 'scale(0.96)' }}
                    >
                      <div className="relative rounded-[22px] border border-[#eef2f7] bg-white px-6 py-6">
                        <Quote className="absolute bottom-16 right-5 h-16 w-16 rotate-180 text-[#f6d5d8]" strokeWidth={1.5} />
                        <div className="flex items-start justify-between">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff1f2] text-[#e10600]">
                            <Quote className="h-4 w-4" />
                          </span>
                          <p className="text-[15px] tracking-wide text-[#f5b400]">{'★'.repeat(item.rating)}</p>
                        </div>
                        <h3 className="mt-4 text-[18px] font-extrabold text-[#163a66]">{item.title}</h3>
                        <p className="mt-2 text-[14px] leading-6 text-[#5b6b80]">{item.text}</p>
                        <div className="mt-5 flex items-center gap-3">
                          <img src={item.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                          <div>
                            <p className="text-[14px] font-bold text-[#163a66]">{item.name}</p>
                            <p className="text-[12px] text-[#8b97a8]">{item.role}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          {data.items.map((item, dot) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial ${dot + 1}`}
              onClick={() => {
                setDirection(dot >= index ? 1 : -1);
                setIndex(dot);
              }}
              className={`h-2.5 w-2.5 rounded-full transition ${dot === index ? 'bg-[#e10600]' : 'bg-[#c5d0de]'}`}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-3 sm:hidden">
          <button type="button" aria-label="Previous testimonials" onClick={() => move(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Next testimonials" onClick={() => move(1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
