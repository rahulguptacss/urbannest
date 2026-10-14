import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import Stats from '../../components/sections/Stats';
import Mission from '../../components/sections/Mission';
import WhyChoose from '../../components/sections/WhyChoose';
import Testimonials from '../../components/sections/Testimonials';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '../../components/types';

export const metadata = { title: pages.about.metadata.title };

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={pages.about.breadcrumb!} />
        <About data={sections.about} hideButton />
        <Stats data={sections.stats} />
        <Mission data={sections.mission} />
        <WhyChoose data={sections.why_choose} />
        <Testimonials data={sections.testimonials} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
