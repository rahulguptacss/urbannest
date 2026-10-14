'use client';

import { useEffect, useRef, useState } from 'react';
import { Award, FileText, Home, Users } from 'lucide-react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import type { StatsSectionData } from '../../types';

const icons = { Users, Home, Award, FileText };

function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(target);
  }, [inView, motionValue, target]);

  useEffect(() => spring.on('change', (latest) => setDisplay(Math.round(latest))), [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats({ data }: { data: StatsSectionData }) {
  return (
    <section className="relative overflow-hidden bg-[#f7f8fc] py-7 sm:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(30deg, transparent 46%, #eef1f6 47%, #eef1f6 53%, transparent 54%), linear-gradient(150deg, transparent 46%, #eef1f6 47%, #eef1f6 53%, transparent 54%)',
          backgroundSize: '42px 72px',
        }}
      />
      <div className="relative mx-auto max-w-[1100px] px-4 text-center">
        <h2 className="text-[32px] font-extrabold text-[#101828] sm:text-[40px]">{data.title}</h2>
        <div className="mt-6 grid grid-cols-2 gap-y-6 lg:mt-7 lg:grid-cols-4 lg:gap-0">
          {data.items.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons] || Award;
            return (
              <div
                key={item.label}
                className={`flex items-center justify-center gap-3 px-3 ${index > 0 ? 'lg:border-l lg:border-[#d5dbe3]' : ''}`}
              >
                <Icon className="h-10 w-10 shrink-0 text-[#e24b4b] sm:h-12 sm:w-12" strokeWidth={1.4} />
                <div className="text-left">
                  <p className="text-[28px] font-extrabold leading-none text-[#1d4ed8] sm:text-[34px]">
                    <Counter value={item.value} />
                  </p>
                  <p className="mt-1 text-[13px] text-[#667085] sm:text-[14px]">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
