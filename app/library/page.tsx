'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import './library.css';
import { categories, resourceTypes, resources } from './data';

export default function LibraryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [level, setLevel] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((item) => {
      const haystack = [item.title, item.type, item.category, item.level, item.desc, ...item.tags].join(' ').toLowerCase();
      return (category === 'All' || item.category === category) && (type === 'All' || item.type === type) && (level === 'All' || item.level === level) && (!q || haystack.includes(q));
    });
  }, [query, category, type, level]);

  const featured = resources.find((item) => item.slug === 'acute-chest-pain')!;
  const typeCounts = resourceTypes.slice(1).map((name) => ({ name, count: resources.filter((item) => item.type === name).length }));

  return (
    <main className="section page library-page">
      <header className="library-hero">
        <div className="library-hero-copy">
          <span className="section-kicker">Clinical Library</span>
          <h1>Knowledge that makes <em>clinical sense.</em></h1>
          <p>Perpustakaan belajar Dokter Jaga untuk clinical pearls, guideline digest, primary care notes, emergency references, dan long-form resources yang dibuat agar pengetahuan bisa langsung dipakai saat praktik.</p>
          <div className="library-hero-actions">
            <a className="library-primary" href="#resources">Explore library ↓</a>
            <Link className="library-secondary" href="/tools">Open clinical tools →</Link>
          </div>
        </div>
        <div className="library-stat" aria-label="Library statistics">
          <span><strong>{resources.length}</strong>Resources</span>
          <span><strong>{new Set(resources.map((r) => r.category)).size}</strong>Topics</span>
          <span><strong>{typeCounts.filter((x) => x.count).length}</strong>Formats</span>
        </div>
      </header>

      <section className="library-format-row" aria-label="Resource formats">
        {typeCounts.map((item) => (
          <button key={item.name} className={`library-format ${type === item.name ? 'active' : ''}`} onClick={() => setType(type === item.name ? 'All' : item.name)}>
            <span>{item.name}</span><strong>{item.count}</strong>
          </button>
        ))}
      </section>

      <section className="library-feature">
        <article className="library-feature-main">
          <span className="library-kicker">FEATURED · {featured.type.toUpperCase()}</span>
          <h2>{featured.title}</h2>
          <p>{featured.desc}</p>
          <div className="library-feature-meta"><span>{featured.category}</span><span>{featured.level}</span><span>{featured.read}</span></div>
          <Link className="library-feature-btn" href={`/library/${featured.slug}`}>Open resource <span>→</span></Link>
        </article>
        <aside className="library-feature-side">
          <span className="library-kicker">LEARNING PATH</span>
          <h3>Choose how you want to learn.</h3>
          <ul>
            <li><button onClick={() => setType('Clinical Pearls')}><strong>Clinical Pearls</strong><span>Quick reads</span></button></li>
            <li><button onClick={() => setType('Guideline Digest')}><strong>Guideline Digest</strong><span>Decision points</span></button></li>
            <li><button onClick={() => setType('Primary Care Notes')}><strong>Primary Care Notes</strong><span>Daily practice</span></button></li>
            <li><button onClick={() => setType('E-book')}><strong>E-books</strong><span>Deep dives</span></button></li>
          </ul>
        </aside>
      </section>

      <section className="library-controls" aria-label="Library filters">
        <div className="library-search">
          <span className="library-search-icon" aria-hidden="true">⌕</span>
          <input aria-label="Cari library" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari diagnosis, guideline, obat, clinical pearl..." />
          <kbd>⌘ K</kbd>
        </div>
        <div className="library-filter-group">
          <div className="library-select-wrap"><label htmlFor="library-category">Topic</label><select id="library-category" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="library-select-wrap"><label htmlFor="library-level">Level</label><select id="library-level" value={level} onChange={(e) => setLevel(e.target.value)}><option>All</option><option>Core</option><option>Intermediate</option><option>Advanced</option></select></div>
          {(query || category !== 'All' || type !== 'All' || level !== 'All') && <button className="library-clear" onClick={() => { setQuery(''); setCategory('All'); setType('All'); setLevel('All'); }}>Reset filters</button>}
        </div>
      </section>

      <section id="resources">
        <div className="library-section-head">
          <div><span className="library-kicker">EXPLORE RESOURCES</span><h2>{filtered.length} resources available</h2></div>
          <p>Search, filter, and open any resource for the full clinical note.</p>
        </div>
        <div className="library-grid">
          {filtered.length ? filtered.map((item) => (
            <article className="library-card" key={item.slug}>
              <div className="library-card-top"><span className="library-type">{item.type}</span><span className="library-level">{item.level}</span></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="library-card-bottom">
                <div className="library-tags">{item.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link className="library-open" href={`/library/${item.slug}`}>Read →</Link>
              </div>
            </article>
          )) : <div className="library-empty">Tidak ada resource yang cocok. Coba keyword, topic, atau level lain.</div>}
        </div>
      </section>

      <section className="library-bottom-grid">
        <div className="library-bottom-card"><span className="library-kicker">FROM LIBRARY TO PRACTICE</span><h3>Read → calculate → practice.</h3><p>Setiap resource dirancang untuk terhubung dengan clinical tools dan clinical cases agar belajar tidak berhenti di teori.</p><div><Link href="/tools">Clinical Tools →</Link><Link href="/cases">Clinical Cases →</Link></div></div>
        <div className="library-note"><strong>Clinical education disclaimer</strong><p>Library ditujukan untuk edukasi. Selalu verifikasi guideline terbaru, dosis, contraindication, dan protokol fasilitas sebelum digunakan dalam praktik klinis.</p></div>
      </section>
    </main>
  );
}
