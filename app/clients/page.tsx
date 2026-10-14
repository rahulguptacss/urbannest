import { type ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Clients from '../../components/sections/Clients';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

const sectionMap: Record<string, ReactNode> = {
  Breadcrumb: <Breadcrumb data={pages.clients.breadcrumb!} />,
  Clients: <Clients data={sections.clients} />,
};

export const metadata = { title: pages.clients.metadata.title };

export default function ClientsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pages.clients.components.map((item) => (
          <div key={item.key}>{sectionMap[item.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
