'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import './article.css';
import { getResource, resources } from '../data';

export default function LibraryArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = getResource(params.slug);
  if (!article) notFound();

  const related = resources.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 3);

  return (
    <main className="section page library-article-page">
      <Link href="/library" className="article-back">← Back to Clinical Library</Link>
      <header className="article-hero">
        <div>
          <div className="article-badges"><span>{article.type}</span><span>{article.category}</span><span>{article.level}</span><span>{article.read}</span></div>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </div>
      </header>

      <div className="article-layout">
        <article className="article-content">
          <section className="article-callout"><strong>Clinical summary</strong><p>{article.summary}</p></section>
          <ArticleSection title="Key points" items={article.keyPoints} />
          <ArticleSection title="Assessment" items={article.assessment} />
          <ArticleSection title="Investigation" items={article.investigation} />
          <ArticleSection title="Management" items={article.management} />
          <ArticleSection title="Red flags" items={article.redFlags} danger />
          <section className="article-reference">
            <h2>How to use this resource</h2>
            <p>Gunakan halaman ini sebagai quick reference untuk clinical reasoning. Untuk keputusan pasien nyata, verifikasi guideline terbaru, dosis, kontraindikasi, local protocol, dan kondisi individual pasien.</p>
          </section>
        </article>

        <aside className="article-sidebar">
          <Related title="Related tools" items={article.tools} />
          <Related title="Related cases" items={article.cases} />
          {related.length > 0 && <div className="article-side-card"><span className="article-kicker">MORE IN {article.category.toUpperCase()}</span>{related.map((item) => <Link href={`/library/${item.slug}`} key={item.slug}>{item.title}<span>→</span></Link>)}</div>}
          <div className="article-side-card article-note-card"><span className="article-kicker">NEXT STEP</span><h3>Turn knowledge into action.</h3><p>Lanjutkan ke clinical case atau gunakan clinical tool terkait untuk melatih decision-making.</p><Link href="/cases" className="article-primary">Open Clinical Cases →</Link></div>
        </aside>
      </div>
    </main>
  );
}

function ArticleSection({ title, items, danger = false }: { title: string; items: readonly string[]; danger?: boolean }) {
  return <section className={danger ? 'article-section article-redflags' : 'article-section'}><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

function Related({ title, items }: { title: string; items: readonly (readonly [string, string])[] }) {
  return <div className="article-side-card"><span className="article-kicker">{title}</span>{items.map(([name, href]) => <Link href={href} key={name}>{name}<span>→</span></Link>)}</div>;
}
