'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, Bell, BookOpen, Calculator, ChevronRight, FileText, Heart, Image as ImageIcon, Search, ShieldAlert, Sparkles, Stethoscope } from 'lucide-react';

const modules = [
  { title: 'Clinical Cases', desc: 'Kasus klinis dengan pembahasan lengkap', href: '/cases', icon: BookOpen, tone: 'blue', meta: '50 kasus' },
  { title: 'Emergency Cases', desc: 'Decision support untuk kondisi akut', href: '/emergency', icon: ShieldAlert, tone: 'red', meta: '100 kasus' },
  { title: 'Clinical Tools', desc: 'Kalkulator & skor untuk praktik sehari-hari', href: '/tools', icon: Calculator, tone: 'teal', meta: '32+ tools' },
  { title: 'Library', desc: 'Materi, artikel, dan referensi pilihan', href: '/library', icon: FileText, tone: 'green', meta: 'Clinical notes' },
  { title: 'Anatomi & Gambar', desc: 'Koleksi visual untuk pembelajaran klinis', href: '/library', icon: ImageIcon, tone: 'cyan', meta: 'Visual learning' },
];

const quickTools = ['eGFR (CKD-EPI 2021)', 'NEWS2', 'CHA₂DS₂-VASc', 'Shock Index', 'Anion Gap'];

export default function Home() {
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(false);
  const q = query.trim().toLowerCase();
  const filteredModules = useMemo(() => modules.filter((m) => !q || `${m.title} ${m.desc} ${m.meta}`.toLowerCase().includes(q)), [q]);
  const filteredTools = useMemo(() => quickTools.filter((tool) => !q || tool.toLowerCase().includes(q)), [q]);

  return (
    <div className="command-dashboard">
      <section className="command-hero">
        <div className="hero-copy">
          <span className="eyebrow">DOKTER JAGA · CLINICAL WORKSPACE</span>
          <h1>Selamat datang kembali,<br /><strong>dr. Dwi!</strong></h1>
          <p>Satu langkah kecil setiap hari, untuk dokter yang lebih siap menghadapi pasien berikutnya.</p>
          <div className="hero-actions">
            <Link href="/cases" className="primary-action">Lanjutkan Belajar <ArrowRight size={15} /></Link>
            <Link href="/tools" className="secondary-action">Buka Clinical Tools</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-glow" />
          <Image src="/dokter-jaga-mascot.svg" alt="" width={330} height={333} priority />
        </div>
        <div className="hero-note">
          <span>“</span>
          <p>Ilmu hari ini, untuk<br />keputusan yang lebih baik<br />esok nanti.</p>
          <small>— Dokter Jaga</small>
        </div>
      </section>

      <section className="command-search" aria-label="Pencarian klinis">
        <Search size={20} />
        <div className="search-field">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari kasus, diagnosis, obat, atau guideline..." aria-label="Cari sumber klinis" />
          <small>Search clinical resources</small>
        </div>
        <kbd>⌘ K</kbd>
        {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Hapus pencarian">×</button>}
      </section>

      <section className="workspace-section">
        <div className="workspace-heading">
          <div><span className="eyebrow">QUICK ACCESS</span><h2>Belajar sesuai kebutuhanmu.</h2></div>
          <span>Built for everyday practice</span>
        </div>
        <div className="module-grid">
          {filteredModules.map((m) => { const Icon = m.icon; return <Link href={m.href} className="module-card" key={m.title}><span className={`module-icon ${m.tone}`}><Icon size={20} /></span><span className="module-copy"><strong>{m.title}</strong><small>{m.desc}</small><em>{m.meta}</em></span><ChevronRight size={17} /></Link>; })}
          {!filteredModules.length && <div className="empty-search">Tidak ada modul yang cocok dengan “{query}”.</div>}
        </div>
      </section>

      <section className="command-grid">
        <article className="progress-panel panel">
          <div className="panel-head"><div><span className="eyebrow">PROGRESS BELAJAR</span><h2>Keep moving forward.</h2></div><span>Target bulan ini <b>75%</b></span></div>
          <div className="progress-content">
            <div className="progress-ring"><div><strong>62%</strong><small>Progress</small></div></div>
            <div className="progress-metrics"><div><b>240</b><span>Soal dikerjakan</span></div><div><b>18</b><span>Kasus dipelajari</span></div><div><b>12</b><span>Tools digunakan</span></div><div><b>5</b><span>Artikel dibaca</span></div></div>
          </div>
          <div className="progress-message"><Image src="/dokter-jaga-mascot.svg" alt="Jaga" width={75} height={76} /><span>Konsistensi kecil,<br /><b>memberikan perubahan besar.</b></span></div>
        </article>

        <article className="case-day-panel panel">
          <div className="panel-head"><div><span className="eyebrow">CASE OF THE DAY</span><h2>Acute STEMI</h2></div><Link href="/cases">Lihat semua <ArrowRight size={13} /></Link></div>
          <div className="case-day-body">
            <div className="case-tags"><span>Cardiology</span><span>Intermediate</span></div>
            <h3>Acute STEMI</h3>
            <p>Nyeri dada akut dengan elevasi ST. Uji kemampuanmu mengambil keputusan awal secara sistematis.</p>
            <div className="case-actions"><Link href="/cases" className="primary-action">Mulai Kasus <ArrowRight size={14} /></Link><button type="button" className={`save-button ${saved ? 'saved' : ''}`} onClick={() => setSaved(!saved)} aria-label="Simpan kasus"><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button></div>
            <div className="case-visual"><Stethoscope size={70} /></div>
          </div>
        </article>

        <article className="tools-panel panel">
          <div className="panel-head"><div><span className="eyebrow">QUICK TOOLS</span><h2>Useful when you need them.</h2></div><Link href="/tools">Lihat semua <ArrowRight size={13} /></Link></div>
          <div className="tool-list">
            {(filteredTools.length ? filteredTools : quickTools).map((tool, i) => <Link href="/tools" key={tool}><span className="tool-number">{String(i + 1).padStart(2, '0')}</span><span>{tool}</span><ChevronRight size={15} /></Link>)}
          </div>
          <Link href="/tools" className="tools-cta"><Calculator size={15} /> Buka semua Clinical Tools <ArrowRight size={14} /></Link>
        </article>
      </section>

      <section className="command-bottom">
        <div className="jaga-banner">
          <div><span className="eyebrow">JAGA SEMANGAT</span><h2>Belajar. Berpikir.<br /><em>Siap Praktik.</em></h2><p>Gunakan waktu singkat untuk membangun clinical reasoning yang konsisten.</p><span className="jaga-pill"><Sparkles size={12} /> Keep learning · Keep caring</span></div>
          <Image src="/dokter-jaga-mascot.svg" alt="Jaga" width={190} height={192} />
        </div>
        <div className="quote-banner"><span>“</span><div><strong>Pasien mengajarkan kita lebih banyak daripada buku, jika kita mau mendengarkan.</strong><small>— Dokter Jaga</small></div></div>
      </section>

      <div className="clinical-trust"><strong>CLINICAL EDUCATION</strong><span>Materi untuk edukasi dan tidak menggantikan clinical judgment, guideline resmi terbaru, atau protokol fasilitas kesehatan.</span></div>
    </div>
  );
}
