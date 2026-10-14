import Link from 'next/link';
import { Check } from 'lucide-react';
import type { ThankYouSectionData } from '../../types';

export default function ThankYou({ data }: { data: ThankYouSectionData }) {
  return (
    <section className="flex flex-1 items-center justify-center bg-[#f7f9fd] px-4 py-20">
      <div className="w-full max-w-lg rounded-3xl bg-white px-8 py-12 text-center shadow-sm">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e11d2e] text-white">
          <Check />
        </span>
        <h1 className="mt-5 text-4xl font-extrabold text-[#12203a]">{data.title}</h1>
        <p className="mt-3 text-sm leading-7 text-[#5c6778]">{data.description}</p>
        <Link href={data.button.href} className="mt-6 inline-flex rounded-md bg-[#e11d2e] px-5 py-3 text-sm font-bold text-white">
          {data.button.text}
        </Link>
      </div>
    </section>
  );
}
