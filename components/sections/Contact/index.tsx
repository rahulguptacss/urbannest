'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Plus } from 'lucide-react';
import type { ContactSectionData } from '../../types';

const fieldClass = 'h-12 w-full rounded-xl border border-[#e6ebf2] bg-[#f7f9fc] px-4 text-[14px] text-[#163a66] outline-none placeholder:text-[#9aa6b5]';

export default function Contact({ data }: { data: ContactSectionData }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1100px] px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-8 max-w-2xl text-center">
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

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-3xl px-6 py-7 text-white sm:px-8">
            <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#0d2f66]/88" />
            <div className="relative">
              <h3 className="text-[26px] font-extrabold">{data.office_title}</h3>
              <p className="mt-2 max-w-[360px] text-[14px] leading-6 text-white/80">{data.office_text}</p>
              <ul className="mt-6 space-y-5">
                <motion.li initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e10600]"><MapPin className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-[15px] font-bold">{data.address_label}</span>
                    <span className="mt-0.5 block text-[14px] leading-6 text-white/80">{data.address}</span>
                  </span>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e10600]"><Phone className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-[15px] font-bold">{data.phone_label}</span>
                    <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`} className="mt-0.5 block text-[14px] text-white/80">{data.phone}</a>
                    <a href={`tel:${data.phone_secondary.replace(/[^\d+]/g, '')}`} className="block text-[14px] text-white/80">{data.phone_secondary}</a>
                  </span>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.26 }} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e10600]"><Mail className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-[15px] font-bold">{data.email_label}</span>
                    <a href={`mailto:${data.email}`} className="mt-0.5 block text-[14px] text-white/80">{data.email}</a>
                  </span>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.34 }} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e10600]"><Clock className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-[15px] font-bold">{data.hours_label}</span>
                    <span className="mt-0.5 block text-[14px] text-white/80">{data.hours}</span>
                    <span className="block text-[14px] text-white/80">{data.hours_secondary}</span>
                  </span>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={(event) => {
              event.preventDefault();
              router.push('/thank-you');
            }}
            className="rounded-3xl border border-[#e8eef6] bg-white p-6 shadow-[0_10px_30px_rgba(22,58,102,0.05)] sm:p-8"
          >
            <h3 className="text-[26px] font-extrabold text-[#163a66]">{data.form_title}</h3>
            <p className="mt-2 text-[14px] leading-6 text-[#6b778c]">{data.form_text}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[0, 1, 2, 3].map((index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * index }} className={index > 3 ? 'sm:col-span-2' : ''}>
                  {index === 0 && <input required placeholder={data.name_placeholder} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={fieldClass} />}
                  {index === 1 && <input required type="email" placeholder={data.email_placeholder} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={fieldClass} />}
                  {index === 2 && <input required placeholder={data.phone_placeholder} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value.replace(/\D/g, '') })} className={fieldClass} />}
                  {index === 3 && <input placeholder={data.subject_placeholder} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className={fieldClass} />}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.32 }} className="sm:col-span-2">
                <textarea required placeholder={data.message_placeholder} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className={`${fieldClass} h-28 py-3`} />
              </motion.div>
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="mt-4 inline-flex items-center gap-3 rounded-full bg-[#e10600] py-1.5 pl-5 pr-1.5 text-[14px] font-semibold text-white">
              {data.button_text}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#e10600]">
                <Plus className="h-4 w-4" />
              </span>
            </motion.button>
          </motion.form>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-6 overflow-hidden rounded-2xl border border-[#e8eef6]">
          <iframe title="Office map" src={data.map_embed} className="h-[280px] w-full sm:h-[360px]" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}
