import { type ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Properties from '../../components/sections/Properties';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

const sectionMap: Record<string, ReactNode> = {
  Breadcrumb: <Breadcrumb data={pages.properties.breadcrumb!} />,
  Properties: <Properties data={sections.properties} />,
};

export const metadata = { title: pages.properties.metadata.title };

export default function PropertiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pages.properties.components.map((item) => (
          <div key={item.key}>{sectionMap[item.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
