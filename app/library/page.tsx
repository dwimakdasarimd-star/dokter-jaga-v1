'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import './library.css';

const resources = [
  { slug: 'acute-chest-pain', title: 'Acute Chest Pain: Practical Approach', type: 'Clinical Pearls', category: 'Cardiovascular', level: 'Intermediate', desc: 'Kerangka praktis untuk assessment awal, red flags, ECG, differential diagnosis, dan disposition.', tags: ['Chest Pain', 'ECG', 'Emergency'] },
  { slug: 'hypertension', title: 'Hypertension: Primary Care Notes', type: 'Primary Care Notes', category: 'Primary Care', level: 'Core', desc: 'Ringkasan assessment, target tekanan darah, pilihan terapi, monitoring, dan follow-up pasien hipertensi.', tags: ['Hypertension', 'Follow-up'] },
  { slug: 'type-2-diabetes', title: 'Type 2 Diabetes: Guideline Digest', type: 'Guideline Digest', category: 'Endocrinology', level: 'Core', desc: 'Poin keputusan klinis utama dari diagnosis hingga pemilihan terapi dan evaluasi kontrol glikemik.', tags: ['Diabetes', 'Guideline'] },
  { slug: 'sepsis-and-shock', title: 'Sepsis & Shock: First-Hour Framework', type: 'Emergency', category: 'Emergency Medicine', level: 'Advanced', desc: 'Recognition, initial resuscitation, reassessment, vasopressor strategy, dan antimicrobial principles.', tags: ['Sepsis', 'Shock'] },
  { slug: 'acute-dyspnea', title: 'Acute Dyspnea: Clinical Reasoning', type: 'Clinical Pearls', category: 'Respiratory', level: 'Intermediate', desc: 'Pendekatan terstruktur terhadap sesak akut dengan fokus pada red flags dan diagnosis time-critical.', tags: ['Dyspnea', 'Respiratory'] },
  { slug: 'prescription-safety', title: 'Drug & Prescription Safety', type: 'Drug & Prescription', category: 'Pharmacology', level: 'Core', desc: 'Prinsip penulisan resep, dosing, contraindication, monitoring, dan safety checks untuk praktik sehari-hari.', tags: ['Prescription', 'Safety'] },
  { slug: 'acute-asthma', title: 'Acute Asthma: Severity to Disposition', type: 'Guideline Digest', category: 'Respiratory', level: 'Core', desc: 'Quick reference untuk severity assessment, bronchodilator, steroid, reassessment, dan discharge planning.', tags: ['Asthma', 'Emergency'] },
  { slug: 'headache-red-flags', title: 'Headache: Primary vs Secondary', type: 'Primary Care Notes', category: 'Neurology', level: 'Intermediate', desc: 'Membedakan primary headache dari secondary headache melalui pola gejala dan red flags.', tags: ['Headache', 'Red Flags'] },
];

const categories = ['All', 'Primary Care', 'Emergency Medicine', 'Cardiovascular', 'Respiratory', 'Neurology', 'Endocrinology', 'Pharmacology'];

export default function LibraryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const haystack = [item.title, item.type, item.category, item.level, item.desc, ...item.tags].join(' ').toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [query, category]);

  return (
    <div className="section page library-page">
      <header className="library-hero">
        <div className="library-hero-copy">
          <span className="section-kicker">Clinical Library</span>
          <h1>Knowledge that makes <em>clinical sense.</em></h1>
          <p>Tempat menemukan clinical pearls, guideline digest, primary care notes, emergency references, dan digital learning resources yang dibuat untuk kebutuhan praktik dokter Indonesia.</p>
        </div>
        <div className="library-stat" aria-label="Library statistics">
          <span><strong>8</strong>Core resources</span>
          <span><strong>8</strong>Clinical topics</span>
          <span><strong>Practical</strong>Format</span>
        </div>
      </header>

      <div className="library-search">
        <span className="library-search-icon" aria-hidden="true">⌕</span>
        <input aria-label="Cari library" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari diagnosis, guideline, clinical pearl, obat..." />
        <kbd>⌘ K</kbd>
      </div>

      <div className="library-filters" aria-label="Filter topik">
        {categories.map((item) => (
          <button key={item} className={`library-filter ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>

      <section className="library-feature">
        <article className="library-feature-main">
          <span className="library-kicker">FEATURED RESOURCE · CLINICAL REASONING</span>
          <h2>Acute Chest Pain: a practical approach for the first 10 minutes.</h2>
          <p>Mulai dari stabilisasi, red flags, ECG, differential diagnosis, sampai keputusan berikutnya. Dirancang sebagai quick-read sebelum atau saat menghadapi kasus.</p>
          <div className="library-feature-meta"><span>Cardiovascular</span><span>Intermediate</span><span>8 min read</span></div>
          <Link className="library-feature-btn" href="/library/acute-chest-pain">Open resource <span>→</span></Link>
        </article>
        <aside className="library-feature-side">
          <span className="library-kicker">LIBRARY PATH</span>
          <h3>Choose how you want to learn.</h3>
          <ul>
            <li><strong>Clinical Pearls</strong><span>Quick reads</span></li>
            <li><strong>Guideline Digest</strong><span>Decision points</span></li>
            <li><strong>Primary Care Notes</strong><span>Daily practice</span></li>
            <li><strong>E-books</strong><span>Deep dives</span></li>
          </ul>
        </aside>
      </section>

      <section id="resources">
        <div className="library-section-head">
          <div><span className="library-kicker">EXPLORE RESOURCES</span><h2>{filtered.length} resources available</h2></div>
          <p>Filter by specialty or search by keyword.</p>
        </div>
        <div className="library-grid">
          {filtered.length ? filtered.map((item) => (
            <article className="library-card" key={item.slug}>
              <div className="library-card-top"><span className="library-type">{item.type}</span><span className="library-level">{item.level}</span></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="library-card-bottom">
                <div className="library-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link className="library-open" href={`/library/${item.slug}`}>Read →</Link>
              </div>
            </article>
          )) : <div className="library-empty">Tidak ada resource yang cocok. Coba kata kunci atau specialty lain.</div>}
        </div>
      </section>

      <div className="library-note">
        <strong>Clinical education disclaimer</strong>
        <p>Library ditujukan untuk edukasi. Selalu verifikasi guideline terbaru, dosis, contraindication, dan protokol fasilitas sebelum digunakan dalam praktik klinis.</p>
      </div>
    </div>
  );
}
