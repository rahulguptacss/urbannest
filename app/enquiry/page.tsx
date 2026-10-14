import { type ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Enquiry from '../../components/sections/Enquiry';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

const sectionMap: Record<string, ReactNode> = {
  Breadcrumb: <Breadcrumb data={pages.enquiry.breadcrumb!} />,
  Enquiry: <Enquiry data={sections.enquiry} />,
};

export const metadata = { title: pages.enquiry.metadata.title };

export default function EnquiryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pages.enquiry.components.map((item) => (
          <div key={item.key}>{sectionMap[item.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
