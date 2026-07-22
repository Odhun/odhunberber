import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { SITE_NAME } from '@/lib/constants';
import { formatDateTR } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog — Berber Rehberi',
  description: `${SITE_NAME} berber rehberi: Anamur ve Bozyazı için saç, sakal ve cilt bakımı önerileri, sıkça sorulan sorular.`,
};

const categoryColor: Record<string, string> = {
  Anamur: 'text-gold-400 bg-gold-500/10 border-gold-500/20',
  Bozyazı: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Bakım Rehberi': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Berber Rehberi</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-dark-400 max-w-xl mx-auto">
            Anamur ve Bozyazı&apos;da saç, sakal ve cilt bakımı üzerine öneriler, yerel rehberler ve
            sıkça sorulan sorular.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-dark-700 bg-dark-800 p-6 hover:border-gold-500/30 transition-all flex flex-col"
            >
              <span
                className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium mb-3 ${categoryColor[post.category]}`}
              >
                {post.category}
              </span>
              <h2 className="font-semibold text-white text-lg mb-2 group-hover:text-gold-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-dark-400 mb-4 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-dark-500">
                <span>{formatDateTR(post.publishedAt)}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readingMinutes} dk okuma
                  </span>
                  <ArrowRight size={14} className="text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
