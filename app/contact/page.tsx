import { type ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Contact from '../../components/sections/Contact';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

const sectionMap: Record<string, ReactNode> = {
  Breadcrumb: <Breadcrumb data={pages.contact.breadcrumb!} />,
  Contact: <Contact data={sections.contact} />,
};

export const metadata = { title: pages.contact.metadata.title };

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pages.contact.components.map((item) => (
          <div key={item.key}>{sectionMap[item.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
