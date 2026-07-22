import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS, getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog-posts';
import { getArticleSchema, getFAQSchema } from '@/app/schema';
import { SITE_NAME } from '@/lib/constants';
import { formatDateTR } from '@/lib/utils';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Yazı Bulunamadı' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt,
  });
  const faqSchema = post.faq.length > 0 ? getFAQSchema(post.faq) : null;

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 mb-8">
          <ArrowLeft size={14} /> Blog&apos;a Dön
        </Link>

        <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">{post.category}</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-xs text-dark-500 mb-10">
          <span>{formatDateTR(post.publishedAt)}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readingMinutes} dk okuma
          </span>
          <span>{SITE_NAME}</span>
        </div>

        <article className="space-y-8 text-dark-300 leading-relaxed">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-serif text-xl font-semibold text-white mb-3">{section.heading}</h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="mb-3">{p}</p>
              ))}
              {section.list && (
                <ul className="space-y-2 mt-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        {post.faq.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-white mb-5">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              {post.faq.map((item) => (
                <div key={item.question} className="rounded-2xl border border-dark-700 bg-dark-800 p-5">
                  <p className="font-medium text-white mb-2">{item.question}</p>
                  <p className="text-sm text-dark-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 rounded-2xl border border-gold-500/20 bg-gold-500/5 p-6 text-center">
          <p className="text-white font-medium mb-3">Anamur merkezdeki salonumuzdan randevu alın</p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-400 text-dark-950 font-semibold text-sm hover:bg-gold-300 transition-colors"
          >
            Randevu Al
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-xl font-semibold text-white mb-4">İlginizi Çekebilir</h2>
            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block rounded-xl border border-dark-700 bg-dark-800 p-4 hover:border-gold-500/30 transition-colors"
                >
                  <p className="text-white text-sm font-medium">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
