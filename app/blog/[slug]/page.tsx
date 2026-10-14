import { type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetails from '../../../components/sections/BlogDetails';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections } from '../../../components/types';

export function generateStaticParams() {
  return sections.blog_details.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = sections.blog_details.items.find((post) => post.slug === slug);
  return { title: item ? `${item.title} | UrbanNest` : pages.blog_details.metadata.title };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = sections.blog_details.items.find((post) => post.slug === slug);
  if (!item) notFound();

  const breadcrumb = pages.blog_details.breadcrumb!;
  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={{
          ...breadcrumb,
          items: breadcrumb.items.map((link, index) => (index === breadcrumb.items.length - 1 ? { ...link, href: `/blog/${item.slug}` } : link)),
        }}
      />
    ),
    BlogDetails: <BlogDetails post={item} blogs={sections.blog_details} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pages.blog_details.components.map((block) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
