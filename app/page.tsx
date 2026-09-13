import Link from 'next/link';
import Image from 'next/image';

const modules = [
  { title: 'Clinical Cases', eyebrow: 'LEARN BY DOING', count: '50', desc: 'Kasus klinis lengkap dengan reasoning, investigasi, terapi, dan red flags.', href: '/cases', icon: '✦', tone: 'teal' },
  { title: 'Emergency', eyebrow: 'ACT FAST', count: '20', desc: 'Decision support untuk kondisi akut yang membutuhkan tindakan cepat.', href: '/emergency', icon: '⚡', tone: 'coral' },
  { title: 'Clinical Tools', eyebrow: 'CALCULATE', count: '12+', desc: 'Calculator klinis untuk membantu keputusan di titik pelayanan.', href: '/tools', icon: '⌁', tone: 'blue' },
  { title: 'Clinical Library', eyebrow: 'KNOWLEDGE', count: '85+', desc: 'Ringkasan guideline dan clinical notes yang praktis.', href: '/library', icon: '▤', tone: 'violet' },
];
const tools = ['GCS Calculator', 'Pediatric Dose', 'eGFR CKD-EPI', 'TPM Infus', 'Anion Gap', 'BMI'];
const topics = ['Emergency Medicine', 'Primary Care', 'Cardiovascular', 'Neurology', 'Respiratory', 'Endocrinology'];

export default function Home() {
  return (
    <div className="dj-home">
      <section className="dj-hero">
        <div className="dj-hero-copy">
          <div className="dj-eyebrow"><span className="pulse-dot" /> PRACTICAL CLINICAL EDUCATION</div>
          <h1>Medicine that makes<br /><em>clinical sense.</em></h1>
          <p>Teman digital dokter untuk menghadapi kasus sehari-hari — dari clinical reasoning sampai keputusan praktis di tempat praktik.</p>
          <div className="dj-hero-actions"><Link href="/cases" className="dj-btn dj-btn-light">Mulai Clinical Cases <span>→</span></Link><Link href="/tools" className="dj-btn dj-btn-ghost">Explore Clinical Tools</Link></div>
          <div className="dj-trust-row"><span>✓ Evidence-based</span><span>✓ Practical</span><span>✓ Indonesian doctors</span></div>
        </div>
        <div className="dj-hero-art mascot-hero-art" aria-label="Jaga, maskot Dokter Jaga">
          <div className="mascot-glow" />
          <div className="mascot-badge"><span>MEET</span><strong>Jaga</strong><small>Your clinical study buddy</small></div>
          <Image className="hero-mascot" src="/dokter-jaga-mascot.svg" alt="Jaga, maskot burung hantu Dokter Jaga" width={330} height={385} priority />
          <div className="float-card float-card-main"><div className="mini-label">TODAY'S CLINICAL CASE</div><strong>Acute Chest Pain</strong><span>Cardiology · Advanced</span><div className="mini-progress"><i /></div><small>Clinical reasoning · 8 min</small></div>
          <div className="float-card float-card-tool"><b>eGFR</b><strong>72</strong><span>mL/min/1.73m²</span></div>
          <div className="float-card float-card-alert"><span className="alert-icon">!</span><div><b>RED FLAG</b><small>Hypotension</small></div></div>
        </div>
      </section>
      <section className="dj-search-wrap"><div className="dj-search"><span className="search-glyph">⌕</span><div><strong>What are you looking for?</strong><span>Search cases, diagnosis, drugs, guidelines, or clinical tools...</span></div><kbd>⌘ K</kbd></div></section>
      <section className="dj-section"><div className="dj-section-head"><div><span className="dj-kicker">YOUR CLINICAL WORKSPACE</span><h2>Everything you need, in one place.</h2></div><span className="dj-section-note">Built for everyday practice</span></div><div className="dj-module-grid">{modules.map((m)=><Link href={m.href} className={`dj-module ${m.tone}`} key={m.title}><div className="module-icon">{m.icon}</div><div className="module-copy"><span>{m.eyebrow}</span><h3>{m.title}</h3><p>{m.desc}</p></div><strong className="module-count">{m.count}</strong><span className="module-arrow">↗</span></Link>)}</div></section>
      <section className="dj-mascot-banner"><div className="mascot-banner-copy"><span className="dj-kicker">MEET JAGA</span><h2>Belajar bareng. <em>Siap jaga.</em></h2><p>Jaga hadir sebagai teman belajar yang ringan, curious, dan selalu mengingatkan satu hal: pahami kasusnya sebelum mengambil keputusan.</p><div className="mascot-values"><span>◉ Curious</span><span>◉ Practical</span><span>◉ Supportive</span></div></div><div className="mascot-mini-wrap"><Image src="/dokter-jaga-mascot.svg" alt="Jaga membaca handbook klinis" width={205} height={240}/></div></section>
      <section className="dj-feature-grid"><Link href="/cases" className="dj-case-feature"><div className="feature-label">CASE OF THE DAY <span>5 MIN READ</span></div><div className="case-illustration"><div className="ecg-line">〰〰╱╲〰╱╲〰〰</div><div className="case-circle">♥</div></div><div className="case-feature-copy"><span>EMERGENCY · CARDIOLOGY</span><h2>Acute Chest Pain</h2><p>45-year-old man datang dengan nyeri dada akut. Prioritaskan assessment, ECG, differential diagnosis, dan keputusan reperfusi.</p><div className="case-tags"><b>STEMI</b><b>ECG</b><b>Shock</b></div><strong className="feature-cta">Open case <span>→</span></strong></div></Link><div className="dj-tools-feature"><div className="dj-section-head compact"><div><span className="dj-kicker">QUICK TOOLS</span><h2>Useful when you need them.</h2></div><Link href="/tools">View all →</Link></div><div className="tool-list-premium">{tools.map((tool,i)=><Link href="/tools" key={tool}><span>{String(i+1).padStart(2,'0')}</span><strong>{tool}</strong><i>→</i></Link>)}</div></div></section>
      <section className="dj-topics"><div className="dj-section-head"><div><span className="dj-kicker">EXPLORE BY TOPIC</span><h2>Build clinical confidence.</h2></div><Link href="/library">Open Library →</Link></div><div className="topic-pills">{topics.map((topic,i)=><Link href="/library" key={topic}><span>{String(i+1).padStart(2,'0')}</span><strong>{topic}</strong><b>↗</b></Link>)}</div></section>
      <section className="dj-bottom-cta"><div><span className="dj-kicker">DOKTER JAGA</span><h2>Belajar. Berpikir. <em>Siap Praktik.</em></h2><p>Clinical resources yang dirancang untuk dokter Indonesia.</p></div><Link href="/cases" className="dj-btn dj-btn-dark">Explore the platform <span>→</span></Link></section>
      <div className="dj-disclaimer"><strong>Clinical education disclaimer</strong><span>Materi untuk edukasi dan tidak menggantikan clinical judgment, guideline resmi terbaru, atau protokol fasilitas kesehatan.</span></div>
    </div>
  );
}
