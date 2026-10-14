import { type ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Gallery from '../../components/sections/Gallery';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

const sectionMap: Record<string, ReactNode> = {
  Breadcrumb: <Breadcrumb data={pages.gallery.breadcrumb!} />,
  Gallery: <Gallery data={sections.gallery} />,
};

export const metadata = { title: pages.gallery.metadata.title };

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pages.gallery.components.map((item) => (
          <div key={item.key}>{sectionMap[item.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
