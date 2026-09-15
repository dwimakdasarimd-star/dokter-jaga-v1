'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Calculator, ChevronRight, FileText, HeartPulse, Search, ShieldAlert, Syringe, GraduationCap, ScanLine } from 'lucide-react';

const platforms = [
  { title: 'Clinical Cases', desc: 'Case-based clinical reasoning untuk dokter Indonesia — dari anamnesis hingga keputusan awal.', href: '/cases', meta: '50 kasus', tone: 'cyan', icon: BookOpen },
  { title: 'Emergency', desc: 'Structured emergency approach, POMR, red flags, monitoring, dan keputusan klinis awal.', href: '/emergency', meta: '100 kasus', tone: 'amber', icon: ShieldAlert },
  { title: 'Clinical Tools', desc: 'Kalkulator, clinical scores, acid–base, fluid guide, dan tools praktis untuk bedside.', href: '/tools', meta: '32+ tools', tone: 'mint', icon: Calculator },
  { title: 'Drug Dose', desc: 'Perhitungan dosis dan bantuan penulisan resep untuk penggunaan klinis yang lebih terstruktur.', href: '/tools', meta: 'Dose support', tone: 'lime', icon: Syringe },
  { title: 'OSCE Practice', desc: 'Latihan station, clinical communication, focused examination, dan clinical checklist.', href: '/membership', meta: 'Practice mode', tone: 'sky', icon: GraduationCap },
  { title: 'Clinical Library', desc: 'Clinical notes, guideline reading, referensi pilihan, dan materi belajar terkurasi.', href: '/library', meta: 'Library', tone: 'cyan', icon: FileText },
  { title: 'Anatomi & Visual', desc: 'Visual learning untuk anatomi, pemeriksaan, imaging, dan konsep klinis yang sulit.', href: '/library', meta: 'Visual learning', tone: 'mint', icon: ScanLine },
  { title: 'Membership', desc: 'Track progress belajar, saved resources, dan akses ke fitur belajar premium.', href: '/membership', meta: 'Your workspace', tone: 'sky', icon: HeartPulse },
];

const quickTools = [
  ['01', 'eGFR · CKD-EPI 2021'],
  ['02', 'NEWS2'],
  ['03', 'CHA₂DS₂-VASc'],
  ['04', 'Shock Index'],
  ['05', 'Anion Gap'],
  ['06', 'Pediatric Maintenance'],
];

export default function Home() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filteredPlatforms = useMemo(
    () => platforms.filter((item) => !q || `${item.title} ${item.desc} ${item.meta}`.toLowerCase().includes(q)),
    [q]
  );

  return (
    <div className="dj-landing">
      <style jsx global>{`
        .app-shell:has(.dj-landing) .sidebar,
        .app-shell:has(.dj-landing) .topbar,
        .app-shell:has(.dj-landing) footer,
        .app-shell:has(.dj-landing) .mobile-bottom-nav { display:none!important; }
        .app-shell:has(.dj-landing) .main-shell{margin-left:0!important;width:100%!important}
        .app-shell:has(.dj-landing) main{min-height:100vh}
        .dj-landing{--deep:#04131b;--bg:#071d27;--bg2:#0a2430;--panel:#0b222c;--panel2:#0e2b35;--mint:#24d3bb;--cyan:#63d9f5;--lime:#b7df72;--amber:#f2c66d;--ivory:#f5f7f2;--muted:#89a6ab;--dim:#628087;min-height:100vh;color:var(--ivory);background:radial-gradient(900px 600px at 82% -10%,rgba(99,217,245,.13),transparent 62%),radial-gradient(800px 600px at 12% 16%,rgba(36,211,187,.11),transparent 62%),linear-gradient(180deg,var(--deep) 0%,var(--bg) 55%,#061922 100%);font-family:Arial,Helvetica,sans-serif;overflow:hidden;position:relative}
        .dj-landing:before{content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(99,217,245,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,217,245,.035) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.5),transparent 76%)}
        .dj-nav{height:84px;padding:0 42px;border-bottom:1px solid rgba(176,231,230,.10);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:20;background:rgba(4,19,27,.78);backdrop-filter:blur(18px)}
        .dj-brand{display:flex;align-items:center;gap:11px;color:var(--ivory);text-decoration:none}.dj-brand img{width:38px;height:38px;object-fit:contain}.dj-brand-word{font-size:20px;font-weight:900;letter-spacing:-.04em}.dj-brand-word em{font-style:italic;color:var(--mint)}
        .dj-links{display:flex;gap:30px}.dj-links a{color:#7e9ca2;text-decoration:none;font-size:13px;font-weight:800;transition:.18s}.dj-links a:hover{color:var(--ivory)}
        .dj-shell{width:min(1320px,calc(100% - 64px));margin:0 auto;padding:78px 0 62px;position:relative;z-index:1}
        .dj-hero{text-align:center;max-width:940px;margin:0 auto 56px;position:relative}.dj-orb{position:absolute;width:560px;height:560px;left:50%;top:-270px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(36,211,187,.13),rgba(99,217,245,.045) 44%,transparent 72%);pointer-events:none}
        .dj-eyebrow{position:relative;display:inline-flex;align-items:center;gap:9px;padding:10px 18px;border:1px solid rgba(36,211,187,.28);border-radius:999px;color:var(--mint);background:rgba(36,211,187,.055);font-size:10px;font-weight:900;letter-spacing:.27em;text-transform:uppercase}.dj-eyebrow:before{content:'';width:7px;height:7px;border-radius:50%;background:var(--lime);box-shadow:0 0 16px rgba(183,223,114,.45)}
        .dj-hero h1{position:relative;margin:28px 0 7px;font-size:78px;line-height:.9;letter-spacing:-.075em}.dj-hero h1 em{font-style:italic;color:var(--cyan)}.dj-sub{color:#5d7c84;font-size:13px;letter-spacing:.33em;text-transform:uppercase;font-weight:900}.dj-hero-copy{max-width:800px;margin:26px auto 0;color:#91aeb2;font-size:18px;line-height:1.8}.dj-disclaimer{display:inline-flex;align-items:center;gap:8px;margin-top:25px;padding:11px 16px;border:1px solid rgba(183,223,114,.24);border-radius:10px;background:rgba(183,223,114,.055);color:var(--lime);font-size:12px}
        .dj-search{position:relative;width:min(780px,100%);height:62px;margin:0 auto 54px;display:flex;align-items:center;gap:12px;padding:0 16px;background:rgba(8,30,39,.92);border:1px solid rgba(99,217,245,.16);border-radius:15px;box-shadow:0 20px 50px rgba(0,0,0,.22)}.dj-search:focus-within{border-color:rgba(36,211,187,.48);box-shadow:0 18px 44px rgba(36,211,187,.08)}.dj-search svg{color:var(--mint);flex:none}.dj-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--ivory);font-size:14px}.dj-search input::placeholder{color:#64838a}.dj-search kbd{padding:6px 8px;border:1px solid rgba(99,217,245,.14);border-bottom-width:2px;border-radius:7px;color:#5d7c84;background:rgba(255,255,255,.025);font-size:10px}
        .dj-kicker{text-align:center;margin-bottom:16px;color:var(--mint);letter-spacing:.28em;font-size:10px;font-weight:900;text-transform:uppercase}.dj-title{text-align:center;margin:0 0 30px;color:#e7efeb;font-size:23px;letter-spacing:-.035em}
        .dj-platforms{display:flex;flex-direction:column;gap:16px;margin-bottom:72px}.dj-platform{position:relative;min-height:178px;display:grid;grid-template-columns:1.12fr 1.2fr .76fr;gap:28px;align-items:center;padding:26px 30px;border:1px solid rgba(125,216,222,.14);border-radius:22px;background:linear-gradient(125deg,rgba(9,34,44,.98),rgba(8,27,36,.98));text-decoration:none;color:var(--ivory);overflow:hidden;transition:.22s}.dj-platform:after{content:'';position:absolute;width:280px;height:220px;right:-100px;bottom:-130px;border-radius:50%;background:radial-gradient(circle,rgba(99,217,245,.075),transparent 68%);pointer-events:none}.dj-platform:hover{transform:translateY(-3px);border-color:rgba(36,211,187,.42);box-shadow:0 20px 48px rgba(0,0,0,.24)}
        .dj-platform.cyan{border-color:rgba(99,217,245,.44)}.dj-platform.mint{border-color:rgba(36,211,187,.38)}.dj-platform.lime{border-color:rgba(183,223,114,.34)}.dj-platform.amber{border-color:rgba(242,198,109,.38)}.dj-platform.sky{border-color:rgba(114,185,226,.34)}
        .dj-platform-left{display:flex;align-items:center;gap:19px;min-width:0}.dj-platform-icon{width:64px;height:64px;border-radius:16px;display:grid;place-items:center;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.055);flex:none}.dj-platform-icon.cyan{color:var(--cyan)}.dj-platform-icon.mint{color:var(--mint)}.dj-platform-icon.lime{color:var(--lime)}.dj-platform-icon.amber{color:var(--amber)}.dj-platform-icon.sky{color:#72b9e2}.dj-platform-left h3{margin:0;font-size:24px;line-height:1.1;letter-spacing:-.035em}.dj-meta{display:block;margin-top:8px;color:#5d7e85;font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
        .dj-platform-desc{color:#8fa9ad;font-size:15px;line-height:1.7;max-width:520px}.dj-platform-action{display:flex;align-items:center;justify-content:flex-end;gap:12px;position:relative;z-index:1}.dj-available{padding:7px 10px;border:1px solid rgba(36,211,187,.26);border-radius:999px;background:rgba(36,211,187,.05);color:var(--mint);font-size:10px;font-weight:900}.dj-open{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-width:156px;height:48px;border-radius:10px;background:linear-gradient(135deg,var(--mint),var(--cyan));color:#05202a;font-size:13px;font-weight:900;box-shadow:0 12px 24px rgba(36,211,187,.13)}
        .dj-tools{margin-bottom:68px}.dj-tool-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.dj-tool-card{min-height:188px;padding:23px;border-radius:19px;border:1px solid rgba(99,217,245,.12);background:linear-gradient(145deg,#0b2731,#0b212a);text-decoration:none;color:var(--ivory);display:flex;flex-direction:column;transition:.22s}.dj-tool-card:hover{transform:translateY(-4px);border-color:rgba(36,211,187,.35);box-shadow:0 18px 40px rgba(0,0,0,.22)}.dj-tool-icon{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;margin-bottom:21px;color:var(--mint);background:rgba(36,211,187,.08);border:1px solid rgba(36,211,187,.13);font-weight:900;font-size:17px}.dj-tool-card h3{margin:0;font-size:16px;letter-spacing:-.02em}.dj-tool-card p{margin:10px 0 18px;color:#78979d;font-size:11px;line-height:1.65}.dj-tool-cta{margin-top:auto;color:var(--cyan);font-size:10px;font-weight:900;display:flex;align-items:center;gap:4px}
        .dj-bottom{display:grid;grid-template-columns:1.05fr .95fr;gap:15px}.dj-cta,.dj-note{min-height:210px;border-radius:20px}.dj-cta{padding:28px 30px;background:linear-gradient(135deg,#0b3032,#0a252d);border:1px solid rgba(36,211,187,.2)}.dj-cta .dj-kicker{text-align:left;margin-bottom:6px}.dj-cta h2{margin:8px 0 10px;font-size:32px;line-height:1.02;letter-spacing:-.055em}.dj-cta h2 em{font-style:italic;color:var(--lime)}.dj-cta p{max-width:480px;color:#83a0a4;font-size:12px;line-height:1.7}.dj-cta-link{display:inline-flex;align-items:center;gap:7px;margin-top:10px;padding:11px 15px;border-radius:9px;background:linear-gradient(135deg,var(--mint),var(--cyan));color:#05202a;text-decoration:none;font-size:11px;font-weight:900}.dj-note{padding:24px;background:linear-gradient(135deg,#09242e,#0a2029);border:1px solid rgba(99,217,245,.14);display:flex;align-items:center;gap:18px}.dj-note img{width:110px;height:112px;object-fit:contain;align-self:flex-end}.dj-note strong{display:block;color:#dce8e5;font-size:14px;line-height:1.55}.dj-note small{display:block;margin-top:9px;color:#658187;font-size:9px}
        .dj-trust{display:flex;gap:12px;margin-top:30px;padding-top:18px;border-top:1px solid rgba(99,217,245,.09);color:#58757c;font-size:9px;line-height:1.6}.dj-trust strong{color:#76969b;letter-spacing:.12em;white-space:nowrap;font-size:8px}
        @media(max-width:1050px){.dj-platform{grid-template-columns:1fr 1fr}.dj-platform-action{grid-column:2;justify-content:flex-start}.dj-tool-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:720px){.dj-nav{height:68px;padding:0 16px}.dj-links{gap:15px}.dj-links a{font-size:11px}.dj-shell{width:calc(100% - 28px);padding-top:50px}.dj-hero h1{font-size:48px}.dj-hero-copy{font-size:14px;line-height:1.7}.dj-eyebrow{font-size:8px;letter-spacing:.19em}.dj-sub{font-size:8px;letter-spacing:.2em}.dj-disclaimer{font-size:10px}.dj-search{height:56px;margin-bottom:42px}.dj-search kbd{display:none}.dj-kicker{font-size:8px}.dj-title{font-size:19px;margin-bottom:20px}.dj-platforms{gap:13px;margin-bottom:56px}.dj-platform{grid-template-columns:1fr;gap:16px;padding:20px;min-height:auto;border-radius:18px}.dj-platform-left{gap:14px}.dj-platform-icon{width:52px;height:52px;border-radius:13px}.dj-platform-left h3{font-size:19px}.dj-platform-desc{font-size:12px;line-height:1.6}.dj-platform-action{grid-column:auto;justify-content:space-between}.dj-open{min-width:145px;height:44px;font-size:11px}.dj-tool-grid{grid-template-columns:1fr}.dj-tool-card{min-height:165px}.dj-bottom{grid-template-columns:1fr}.dj-note{min-height:175px}.dj-note img{width:88px;height:90px}.dj-trust{display:block}.dj-trust strong{display:block;margin-bottom:6px}}
      `}</style>

      <header className="dj-nav">
        <Link href="/" className="dj-brand">
          <Image src="/dokter-jaga-app-icon-v2.svg" alt="Dokter Jaga" width={38} height={38} priority />
          <span className="dj-brand-word">Dokter <em>Jaga</em></span>
        </Link>
        <nav className="dj-links" aria-label="Main navigation">
          <Link href="/">Dashboard</Link>
          <Link href="/library">About</Link>
        </nav>
      </header>

      <main className="dj-shell">
        <section className="dj-hero">
          <div className="dj-orb" />
          <span className="dj-eyebrow">PRACTICAL CLINICAL EDUCATION</span>
          <h1>Dokter <em>Jaga</em></h1>
          <div className="dj-sub">Clinical Learning &amp; Practical Decision Support</div>
          <p className="dj-hero-copy">Clinical cases, emergency approach, practical tools, drug dosing, OSCE practice, dan clinical resources — dirancang untuk membantu dokter belajar, berpikir, dan siap praktik.</p>
          <div className="dj-disclaimer">⚕ Clinical reference only · Always apply professional judgment</div>
        </section>

        <div className="dj-search">
          <Search size={20} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari clinical case, diagnosis, obat, tool, atau materi..." aria-label="Cari clinical resources" />
          <kbd>⌘ K</kbd>
        </div>

        <section aria-labelledby="platform-title">
          <div className="dj-kicker">DOKTER JAGA ECOSYSTEM</div>
          <h2 id="platform-title" className="dj-title">Everything you need for everyday practice.</h2>
          <div className="dj-platforms">
            {filteredPlatforms.map((item) => { const Icon = item.icon; return (
              <Link href={item.href} className={`dj-platform ${item.tone}`} key={item.title}>
                <div className="dj-platform-left">
                  <span className={`dj-platform-icon ${item.tone}`}><Icon size={28} /></span>
                  <div><h3>{item.title}</h3><span className="dj-meta">{item.meta}</span></div>
                </div>
                <div className="dj-platform-desc">{item.desc}</div>
                <div className="dj-platform-action"><span className="dj-available">Ready</span><span className="dj-open">Buka Platform <ArrowRight size={15} /></span></div>
              </Link>
            ); })}
            {!filteredPlatforms.length && <div className="dj-title">Tidak ada platform yang cocok dengan “{query}”.</div>}
          </div>
        </section>

        <section className="dj-tools" aria-labelledby="tools-title">
          <div className="dj-kicker">QUICK CLINICAL TOOLS</div>
          <h2 id="tools-title" className="dj-title">Fast tools for the moment you need them.</h2>
          <div className="dj-tool-grid">
            {quickTools.map(([n, label]) => <Link href="/tools" className="dj-tool-card" key={label}><div className="dj-tool-icon">{n}</div><h3>{label}</h3><p>Practical clinical calculation untuk membantu assessment secara cepat dan terstruktur.</p><span className="dj-tool-cta">Open tool <ChevronRight size={14} /></span></Link>)}
          </div>
        </section>

        <section className="dj-bottom">
          <article className="dj-cta"><div className="dj-kicker">READY FOR PRACTICE</div><h2>Belajar. Berpikir.<br /><em>Siap Praktik.</em></h2><p>Bangun clinical reasoning sedikit demi sedikit, lalu gunakan kembali saat menghadapi pasien berikutnya.</p><Link href="/cases" className="dj-cta-link">Mulai Clinical Cases <ArrowRight size={14} /></Link></article>
          <article className="dj-note"><Image src="/dokter-jaga-mascot.svg" alt="Jaga mascot" width={110} height={112} /><div><strong>“Ilmu hari ini, untuk keputusan yang lebih baik esok nanti.”</strong><small>— Dokter Jaga</small></div></article>
        </section>

        <div className="dj-trust"><strong>CLINICAL EDUCATION</strong><span>Materi untuk edukasi dan clinical reference. Selalu verifikasi guideline terbaru, dosis, contraindication, dan protokol lokal sebelum digunakan dalam praktik.</span></div>
      </main>
    </div>
  );
}
