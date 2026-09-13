import Link from 'next/link';

const quick = [
  { title: 'Clinical Cases', count: '120+', desc: 'Latihan clinical reasoning', href: '/cases', icon: '◈', tone: 'teal' },
  { title: 'Emergency', count: '20', desc: 'Kasus kondisi akut', href: '/emergency', icon: '!', tone: 'red' },
  { title: 'Clinical Tools', count: '12+', desc: 'Calculator & quick tools', href: '/tools', icon: '⌁', tone: 'blue' },
  { title: 'Clinical Library', count: '85+', desc: 'Notes & guideline digest', href: '/library', icon: '▤', tone: 'purple' },
];

const tools = ['GCS Calculator', 'Pediatric Dose', 'eGFR', 'Insulin', 'Wells Score', 'BMI'];

export default function Home() {
  return (
    <div className="dashboard page">
      <section className="dashboard-hero">
        <div>
          <div className="section-kicker">CLINICAL WORKSPACE</div>
          <h1>Siap untuk <span>kasus berikutnya.</span></h1>
          <p className="section-intro">Clinical resources yang membantu dokter belajar, berpikir, dan mengambil keputusan dengan lebih terstruktur.</p>
        </div>
        <div className="hero-status"><span className="status-dot" /> Resources aktif &amp; terus diperbarui</div>
      </section>

      <section className="search-panel">
        <div className="search-icon">⌕</div>
        <div><strong>Cari clinical knowledge</strong><span>Kasus, diagnosis, obat, guideline, atau clinical tool...</span></div>
        <kbd>⌘ K</kbd>
      </section>

      <section className="dashboard-section">
        <div className="section-head"><div><div className="kicker">QUICK ACCESS</div><h2>Mulai dari sini</h2></div><span className="muted">Clinical resources</span></div>
        <div className="quick-grid">
          {quick.map((item) => <Link className="quick-card" href={item.href} key={item.title}>
            <div className={`quick-icon ${item.tone}`}>{item.icon}</div>
            <div className="quick-main"><h3>{item.title}</h3><p>{item.desc}</p></div>
            <div className="quick-count">{item.count}</div>
            <span className="arrow">→</span>
          </Link>)}
        </div>
      </section>

      <section className="dashboard-columns">
        <div className="feature-case">
          <div className="feature-top"><span className="case-pill">CASE OF THE DAY</span><span className="muted">5 min read</span></div>
          <div className="feature-icon">+</div>
          <h2>Acute Chest Pain</h2>
          <p>45-year-old man datang dengan nyeri dada akut. Bagaimana prioritas assessment, pemeriksaan awal, dan keputusan reperfusi?</p>
          <div className="feature-tags"><span>Cardiovascular</span><span>Clinical reasoning</span><span>Emergency</span></div>
          <Link href="/emergency" className="primary">Mulai Case →</Link>
        </div>

        <div className="tool-panel">
          <div className="section-head compact"><div><div className="kicker">QUICK TOOLS</div><h2>Praktis saat dibutuhkan</h2></div><Link href="/tools" className="text-link">View all →</Link></div>
          <div className="tool-list">{tools.map((tool, i) => <Link href="/tools" className="tool-item" key={tool}><span className="tool-number">0{i + 1}</span><strong>{tool}</strong><span>→</span></Link>)}</div>
        </div>
      </section>

      <section className="latest-section">
        <div className="section-head"><div><div className="kicker">EXPLORE</div><h2>Clinical topics</h2></div><Link href="/library" className="text-link">Open Library →</Link></div>
        <div className="topic-grid">
          {['Emergency Medicine', 'Primary Care', 'Cardiovascular', 'Neurology', 'Respiratory', 'Endocrinology'].map((topic, i) => <Link href="/library" className="topic-card" key={topic}><span>{String(i + 1).padStart(2, '0')}</span><strong>{topic}</strong><b>→</b></Link>)}
        </div>
      </section>

      <section className="notice"><strong>Clinical education disclaimer</strong><p>Materi ditujukan untuk edukasi dan tidak menggantikan clinical judgment, protokol fasilitas kesehatan, atau guideline resmi terbaru.</p></section>
    </div>
  );
}
