import Link from 'next/link';
import Image from 'next/image';

const modules = [
  { title: 'Clinical Cases', desc: 'Kasus klinis dengan pembahasan lengkap', href: '/cases', icon: '◈', tone: 'blue', meta: '50 kasus' },
  { title: 'Emergency', desc: 'Decision support untuk kondisi akut', href: '/emergency', icon: '⚡', tone: 'orange', meta: '20 kasus' },
  { title: 'Clinical Tools', desc: 'Kalkulator & skor untuk praktik sehari-hari', href: '/tools', icon: '⌁', tone: 'teal', meta: '32+ tools' },
  { title: 'Library', desc: 'Materi, artikel, dan referensi pilihan', href: '/library', icon: '▤', tone: 'green', meta: 'Clinical notes' },
  { title: 'Guidelines', desc: 'Ringkasan panduan klinis terbaru', href: '/library', icon: '▥', tone: 'purple', meta: 'Evidence base' },
  { title: 'Anatomi & Gambar', desc: 'Koleksi visual untuk pembelajaran klinis', href: '/library', icon: '◇', tone: 'cyan', meta: 'Visual learning' },
];
const continueLearning = [
  ['Sepsis pada Dewasa', 'Clinical Case', '60%'],
  ['Gagal Jantung Akut', 'Emergency', '30%'],
  ['Interpretasi Analisis Gas Darah', 'Clinical Tools', '0%'],
];
const quickTools = ['GCS Calculator', 'Pediatric Dose', 'eGFR CKD-EPI', 'TPM Infus', 'Anion Gap', 'NEWS2'];

export default function Home() {
  return <div className="dj-dashboard">
    <section className="dashboard-welcome">
      <div className="welcome-copy">
        <span className="dashboard-kicker">DOKTER JAGA · CLINICAL WORKSPACE</span>
        <h1>Selamat datang kembali,<br /><strong>Dokter.</strong> 👋</h1>
        <p>Satu langkah kecil setiap hari, untuk dokter yang lebih siap menghadapi pasien berikutnya.</p>
        <div className="welcome-actions"><Link href="/cases" className="dashboard-primary">Lanjutkan Belajar <span>→</span></Link><Link href="/tools" className="dashboard-secondary">Buka Clinical Tools</Link></div>
      </div>
      <div className="welcome-mascot"><div className="welcome-orb" /><Image src="/dokter-jaga-mascot.svg" alt="Jaga, maskot Dokter Jaga" width={330} height={333} priority /></div>
      <div className="welcome-quote"><span>“</span><p>Ilmu yang baik hari ini,<br />praktik yang lebih baik<br />esok nanti.</p><small>— Dokter Jaga</small></div>
    </section>

    <section className="dashboard-search"><span>⌕</span><div><strong>Cari topik, kasus, soal, atau guideline...</strong><small>Search clinical resources</small></div><kbd>⌘ K</kbd></section>

    <section className="dashboard-section">
      <div className="dashboard-section-head"><div><span className="dashboard-kicker">YOUR CLINICAL WORKSPACE</span><h2>Belajar sesuai kebutuhanmu.</h2></div><span>Built for everyday practice</span></div>
      <div className="dashboard-module-grid">{modules.map((m)=><Link href={m.href} className="dashboard-module" key={m.title}><div className={`dashboard-module-icon ${m.tone}`}>{m.icon}</div><div><h3>{m.title}</h3><p>{m.desc}</p><small>{m.meta}</small></div><b>→</b></Link>)}</div>
    </section>

    <section className="dashboard-lower-grid">
      <article className="progress-card"><div className="card-head"><div><span className="dashboard-kicker">PROGRESS BELAJAR</span><h2>Keep moving forward.</h2></div><span>Target bulan ini <strong>75%</strong></span></div><div className="progress-body"><div className="progress-ring"><div><strong>62%</strong><span>Progress</span></div></div><div className="progress-stats"><div><strong>240</strong><span>Soal dikerjakan</span></div><div><strong>18</strong><span>Kasus dipelajari</span></div><div><strong>7</strong><span>Guideline dibaca</span></div><div><strong>12</strong><span>Tools digunakan</span></div></div></div><div className="progress-motivation"><Image src="/dokter-jaga-mascot.svg" alt="Jaga" width={85} height={86}/><span>“Konsistensi kecil,<br /><strong>memberikan perubahan besar.</strong>”</span></div></article>
      <article className="continue-card"><div className="card-head"><div><span className="dashboard-kicker">LANJUTKAN BELAJAR</span><h2>Pick up where you left off.</h2></div><Link href="/cases">Lihat semua →</Link></div><div className="continue-list">{continueLearning.map(([title,type,progress])=><Link href="/cases" key={title}><span className="continue-icon">✦</span><div><strong>{title}</strong><small>{type}</small><div className="continue-bar"><i style={{width:progress}} /></div></div><b>{progress}</b></Link>)}</div></article>
    </section>

    <section className="dashboard-bottom-grid">
      <article className="quick-tools-card"><div className="card-head"><div><span className="dashboard-kicker">QUICK TOOLS</span><h2>Useful when you need them.</h2></div><Link href="/tools">View all →</Link></div><div className="quick-tools-list">{quickTools.map((tool,i)=><Link href="/tools" key={tool}><span>{String(i+1).padStart(2,'0')}</span><strong>{tool}</strong><b>→</b></Link>)}</div></article>
      <article className="jaga-card"><div><span className="dashboard-kicker">JAGA SEMANGAT</span><h2>Take care,<br /><em>so you can care.</em></h2><p>Istirahat yang cukup juga bagian dari praktik yang baik.</p><span className="jaga-pill">Keep learning · Keep caring</span></div><Image src="/dokter-jaga-mascot.svg" alt="Jaga menyemangati" width={190} height={192}/></article>
    </section>

    <section className="dashboard-quote"><span>“</span><div><strong>Pasien mengajarkan kita lebih banyak daripada buku, jika kita mau mendengarkan.</strong><small>— Dokter Jaga</small></div></section>
    <div className="dashboard-disclaimer"><strong>CLINICAL EDUCATION</strong><span>Materi untuk edukasi dan tidak menggantikan clinical judgment, guideline resmi terbaru, atau protokol fasilitas kesehatan.</span></div>
  </div>;
}
