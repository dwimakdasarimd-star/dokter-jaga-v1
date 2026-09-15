'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Calculator, ChevronRight, FileText, HeartPulse, Search, ShieldAlert, Sparkles, Syringe, GraduationCap, ScanLine } from 'lucide-react';

const platforms = [
  { title: 'Clinical Cases', desc: 'Case-based clinical reasoning untuk dokter Indonesia — dari anamnesis hingga keputusan awal.', href: '/cases', meta: '50 kasus', tone: 'blue', icon: BookOpen },
  { title: 'Emergency', desc: 'Structured emergency approach, POMR, red flags, monitoring, dan keputusan klinis awal.', href: '/emergency', meta: '100 kasus', tone: 'red', icon: ShieldAlert },
  { title: 'Clinical Tools', desc: 'Kalkulator, clinical scores, acid–base, fluid guide, dan tools praktis untuk bedside.', href: '/tools', meta: '32+ tools', tone: 'green', icon: Calculator },
  { title: 'Drug Dose', desc: 'Perhitungan dosis dan bantuan penulisan resep untuk penggunaan klinis yang lebih terstruktur.', href: '/tools', meta: 'Dose support', tone: 'purple', icon: Syringe },
  { title: 'OSCE Practice', desc: 'Latihan station, clinical communication, focused examination, dan clinical checklist.', href: '/membership', meta: 'Practice mode', tone: 'orange', icon: GraduationCap },
  { title: 'Clinical Library', desc: 'Clinical notes, guideline reading, referensi pilihan, dan materi belajar terkurasi.', href: '/library', meta: 'Library', tone: 'cyan', icon: FileText },
  { title: 'Anatomi & Visual', desc: 'Visual learning untuk anatomi, pemeriksaan, imaging, dan konsep klinis yang sulit.', href: '/library', meta: 'Visual learning', tone: 'blue', icon: ScanLine },
  { title: 'Membership', desc: 'Track progress belajar, saved resources, dan akses ke fitur belajar premium.', href: '/membership', meta: 'Your workspace', tone: 'red', icon: HeartPulse },
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
        .app-shell:has(.dj-landing) .main-shell { margin-left:0!important; width:100%!important; }
        .app-shell:has(.dj-landing) main { min-height:100vh; }
        .dj-landing{--ink:#f5eef0;--muted:#9a98a7;--dim:#6f7081;--bg:#0a0d1f;--panel:#11162c;--panel2:#14182e;--line:rgba(255,255,255,.10);--coral:#d56d74;--coral2:#8f4057;--blue:#2b83bd;--teal:#349e8b;--green:#3d8c67;--purple:#785684;min-height:100vh;color:var(--ink);background:radial-gradient(circle at 72% 6%,rgba(176,80,91,.14),transparent 30%),radial-gradient(circle at 12% 28%,rgba(30,91,142,.10),transparent 26%),linear-gradient(180deg,#090c1b 0%,#0b0e21 50%,#0a0d1f 100%);font-family:Arial,Helvetica,sans-serif;overflow:hidden;}
        .dj-nav{height:88px;padding:0 38px;border-bottom:1px solid rgba(255,255,255,.10);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:20;background:rgba(10,13,31,.84);backdrop-filter:blur(16px)}
        .dj-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink)}
        .dj-brand img{width:36px;height:36px;object-fit:contain}
        .dj-brand-word{font-size:18px;font-weight:900;letter-spacing:-.03em}.dj-brand-word em{font-style:italic;color:var(--coral)}
        .dj-links{display:flex;gap:34px}.dj-links a{color:#9b98a6;text-decoration:none;font-size:14px;font-weight:700;transition:.18s}.dj-links a:hover{color:#fff}
        .dj-shell{width:min(1320px,calc(100% - 64px));margin:0 auto;padding:76px 0 64px}
        .dj-hero{text-align:center;max-width:980px;margin:0 auto 74px;position:relative}
        .dj-orb{position:absolute;width:540px;height:540px;left:50%;top:-250px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(216,111,119,.11),rgba(33,62,125,.035) 43%,transparent 70%);pointer-events:none}
        .dj-eyebrow{position:relative;z-index:1;display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border:1px solid rgba(213,109,116,.34);border-radius:999px;color:#cc777c;font-size:11px;font-weight:900;letter-spacing:.27em;text-transform:uppercase;background:rgba(117,45,60,.13)}
        .dj-eyebrow:before{content:'';width:7px;height:7px;border-radius:50%;background:#8b4c5a;box-shadow:0 0 14px rgba(213,109,116,.5)}
        .dj-hero h1{position:relative;z-index:1;margin:35px 0 8px;font-size:76px;line-height:.92;letter-spacing:-.07em}.dj-hero h1 em{font-style:italic;color:var(--coral)}
        .dj-sub{position:relative;z-index:1;color:#616172;font-size:14px;letter-spacing:.34em;text-transform:uppercase;font-weight:800}.dj-hero-copy{position:relative;z-index:1;max-width:820px;margin:28px auto 0;color:#92919f;font-size:20px;line-height:1.85;font-weight:400}
        .dj-disclaimer{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;margin-top:30px;padding:12px 18px;border:1px solid rgba(205,165,69,.35);border-radius:12px;background:rgba(120,91,34,.10);color:#d6ab42;font-size:13px}
        .dj-search{position:relative;z-index:3;width:min(780px,100%);height:64px;margin:0 auto 58px;display:flex;align-items:center;gap:12px;padding:0 17px;background:rgba(17,22,44,.92);border:1px solid rgba(255,255,255,.10);border-radius:14px;box-shadow:0 22px 50px rgba(0,0,0,.22)}
        .dj-search svg{color:#8f90a0;flex:none}.dj-search input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:#e9e7eb;font-size:15px}.dj-search input::placeholder{color:#6f7180}.dj-search kbd{font-size:11px;color:#777986;border:1px solid rgba(255,255,255,.10);border-bottom-width:2px;border-radius:7px;padding:6px 9px;background:rgba(255,255,255,.03)}
        .dj-section-kicker{margin-bottom:20px;text-align:center;color:#9d5b64;letter-spacing:.3em;font-size:11px;font-weight:900;text-transform:uppercase}.dj-section-title{text-align:center;margin:0 0 34px;font-size:24px;letter-spacing:-.03em;color:#ddd8db}
        .dj-platforms{display:flex;flex-direction:column;gap:22px;margin-bottom:82px}
        .dj-platform{position:relative;min-height:214px;display:grid;grid-template-columns:1.1fr 1.2fr .65fr;align-items:center;gap:32px;padding:30px 38px;border-radius:26px;background:linear-gradient(120deg,rgba(15,22,45,.97),rgba(18,20,42,.98));border:1px solid var(--line);overflow:hidden;text-decoration:none;color:var(--ink);transition:transform .22s,border-color .22s,box-shadow .22s}
        .dj-platform:after{content:'';position:absolute;width:240px;height:240px;right:-60px;bottom:-150px;border-radius:50%;background:radial-gradient(circle,rgba(218,105,114,.11),transparent 70%);pointer-events:none}
        .dj-platform:hover{transform:translateY(-3px);border-color:rgba(213,109,116,.34);box-shadow:0 22px 55px rgba(0,0,0,.22)}
        .dj-platform.blue{border-color:rgba(43,131,189,.75)}.dj-platform.red{border-color:rgba(197,59,62,.65)}.dj-platform.green{border-color:rgba(61,140,103,.58)}.dj-platform.purple{border-color:rgba(120,86,132,.58)}.dj-platform.cyan{border-color:rgba(65,133,173,.52)}.dj-platform.orange{border-color:rgba(157,104,64,.52)}
        .dj-platform-left{display:flex;align-items:center;gap:24px;min-width:0}.dj-platform-icon{width:74px;height:74px;border-radius:18px;display:grid;place-items:center;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);flex:none}.dj-platform-icon.blue{color:#70b4dc}.dj-platform-icon.red{color:#e07379}.dj-platform-icon.green{color:#69bb92}.dj-platform-icon.purple{color:#b186bf}.dj-platform-icon.cyan{color:#75b9d6}.dj-platform-icon.orange{color:#d7a27a}.dj-platform-left h3{margin:0;font-size:27px;line-height:1.1;letter-spacing:-.035em}.dj-meta{display:block;margin-top:10px;color:#656878;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:800}
        .dj-platform-desc{color:#8b8997;font-size:17px;line-height:1.8;max-width:530px}.dj-platform-action{display:flex;align-items:center;justify-content:flex-end;gap:14px;position:relative;z-index:1}.dj-demo{padding:8px 13px;border:1px solid rgba(213,109,116,.38);border-radius:999px;color:#c96d73;background:rgba(139,61,76,.10);font-size:11px;font-weight:900}.dj-open{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:182px;height:52px;border-radius:10px;background:linear-gradient(135deg,#d67b7f,#843a55);color:#fff;font-size:14px;font-weight:900;box-shadow:0 12px 25px rgba(112,45,61,.24)}
        .dj-tool-section{margin-bottom:76px}.dj-tool-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.dj-tool-card{min-height:220px;padding:28px;border-radius:24px;background:linear-gradient(145deg,#12172d,#161a30);border:1px solid rgba(255,255,255,.11);text-decoration:none;color:#fff;display:flex;flex-direction:column;transition:.22s}.dj-tool-card:hover{transform:translateY(-4px);border-color:rgba(213,109,116,.32);box-shadow:0 20px 50px rgba(0,0,0,.2)}.dj-tool-icon{font-size:34px;margin-bottom:25px}.dj-tool-card h3{margin:0;font-size:20px}.dj-tool-card p{margin:12px 0 20px;color:#888796;font-size:13px;line-height:1.7}.dj-tool-cta{margin-top:auto;color:#cf7278;font-size:12px;font-weight:900;display:flex;align-items:center;gap:5px}
        .dj-bottom{display:grid;grid-template-columns:1.05fr .95fr;gap:18px;margin-top:20px}.dj-cta,.dj-note{border-radius:24px;padding:34px}.dj-cta{background:linear-gradient(135deg,#17142b,#241825);border:1px solid rgba(213,109,116,.22)}.dj-cta h2{margin:8px 0 10px;font-size:35px;line-height:1.05;letter-spacing:-.05em}.dj-cta h2 em{font-style:italic;color:#dc7c82}.dj-cta p{max-width:480px;color:#92919f;line-height:1.7;font-size:13px}.dj-cta-link{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:12px 17px;border-radius:9px;background:#d06d74;color:white;text-decoration:none;font-size:12px;font-weight:900}.dj-note{background:#11152a;border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:18px}.dj-note img{width:115px;height:116px;object-fit:contain;align-self:flex-end}.dj-note strong{display:block;font-size:15px;line-height:1.55}.dj-note small{display:block;margin-top:10px;color:#777787;font-size:10px}
        .dj-trust{margin-top:42px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:14px;align-items:flex-start;color:#646676;font-size:10px;line-height:1.6}.dj-trust strong{color:#8c8d9c;font-size:9px;letter-spacing:.13em;white-space:nowrap}
        @media(max-width:1050px){.dj-platform{grid-template-columns:1fr 1fr}.dj-platform-action{justify-content:flex-start;grid-column:2}.dj-tool-grid{grid-template-columns:repeat(2,1fr)}.dj-hero h1{font-size:62px}.dj-hero-copy{font-size:17px}}
        @media(max-width:760px){.dj-nav{height:70px;padding:0 18px}.dj-links{gap:18px}.dj-links a{font-size:12px}.dj-shell{width:min(100% - 28px,620px);padding-top:48px}.dj-hero{margin-bottom:52px}.dj-eyebrow{font-size:8px;letter-spacing:.2em;padding:9px 12px}.dj-hero h1{font-size:48px;margin-top:25px}.dj-sub{font-size:9px;letter-spacing:.22em}.dj-hero-copy{font-size:14px;line-height:1.7}.dj-disclaimer{font-size:11px;text-align:left}.dj-search{height:58px;margin-bottom:44px}.dj-search kbd{display:none}.dj-section-kicker{font-size:9px}.dj-section-title{font-size:21px;margin-bottom:22px}.dj-platforms{gap:14px;margin-bottom:60px}.dj-platform{grid-template-columns:1fr;padding:24px;gap:20px;min-height:auto;border-radius:20px}.dj-platform-left{gap:14px}.dj-platform-icon{width:56px;height:56px;border-radius:14px}.dj-platform-left h3{font-size:21px}.dj-platform-desc{font-size:13px;line-height:1.65;margin-left:70px;margin-top:-6px}.dj-platform-action{grid-column:auto;justify-content:space-between}.dj-open{min-width:150px;height:46px;font-size:12px}.dj-tool-grid{grid-template-columns:1fr}.dj-tool-card{min-height:180px;padding:24px}.dj-bottom{grid-template-columns:1fr}.dj-cta h2{font-size:29px}.dj-note{min-height:180px}.dj-note img{width:90px;height:92px}.dj-trust{display:block}.dj-trust strong{display:block;margin-bottom:6px}
        }
      `}</style>

      <header className="dj-nav">
        <Link href="/" className="dj-brand">
          <Image src="/dokter-jaga-app-icon-v2.svg" alt="Dokter Jaga" width={36} height={36} priority />
          <span className="dj-brand-word"><span>Dokter</span> <em>Jaga</em></span>
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
          <div className="dj-sub">Clinical Learning &amp; Decision Support</div>
          <p className="dj-hero-copy">Clinical cases, emergency approach, practical tools, drug dosing, OSCE practice, dan clinical resources — dirancang untuk membantu dokter belajar, berpikir, dan siap praktik.</p>
          <div className="dj-disclaimer">⚠ Clinical reference only. Always apply professional judgment.</div>
        </section>

        <div className="dj-search">
          <Search size={21} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari clinical case, tool, diagnosis, obat, atau materi..." aria-label="Cari clinical resources" />
          <kbd>⌘ K</kbd>
        </div>

        <section aria-labelledby="platform-title">
          <div className="dj-section-kicker">EXPLORE THE PLATFORM</div>
          <h2 id="platform-title" className="dj-section-title">Clinical resources for everyday practice.</h2>
          <div className="dj-platforms">
            {filteredPlatforms.map((item) => { const Icon = item.icon; return (
              <Link href={item.href} className={`dj-platform ${item.tone}`} key={item.title}>
                <div className="dj-platform-left">
                  <span className={`dj-platform-icon ${item.tone}`}><Icon size={31} /></span>
                  <div><h3>{item.title}</h3><span className="dj-meta">{item.meta}</span></div>
                </div>
                <div className="dj-platform-desc">{item.desc}</div>
                <div className="dj-platform-action"><span className="dj-demo">Available</span><span className="dj-open">Buka Platform <ArrowRight size={16} /></span></div>
              </Link>
            ); })}
            {!filteredPlatforms.length && <div className="dj-section-title">Tidak ada platform yang cocok dengan “{query}”.</div>}
          </div>
        </section>

        <section className="dj-tool-section" aria-labelledby="tools-title">
          <div className="dj-section-kicker">QUICK CLINICAL TOOLS</div>
          <h2 id="tools-title" className="dj-section-title">Useful when you need them.</h2>
          <div className="dj-tool-grid">
            {quickTools.map(([n, label]) => <Link href="/tools" className="dj-tool-card" key={label}><div className="dj-tool-icon">⌁</div><h3>{label}</h3><p>Practical calculator untuk membantu clinical assessment secara cepat dan terstruktur.</p><span className="dj-tool-cta">Launch tool <ChevronRight size={15} /></span></Link>)}
          </div>
        </section>

        <section className="dj-bottom">
          <article className="dj-cta"><div className="dj-section-kicker" style={{textAlign:'left',marginBottom:6}}>READY FOR PRACTICE</div><h2>Belajar. Berpikir.<br /><em>Siap Praktik.</em></h2><p>Bangun clinical reasoning sedikit demi sedikit, lalu gunakan kembali saat menghadapi pasien berikutnya.</p><Link href="/cases" className="dj-cta-link">Mulai Clinical Cases <ArrowRight size={15} /></Link></article>
          <article className="dj-note"><Image src="/dokter-jaga-mascot.svg" alt="Jaga mascot" width={115} height={116} /><div><strong>“Ilmu hari ini, untuk keputusan yang lebih baik esok nanti.”</strong><small>— Dokter Jaga</small></div></article>
        </section>

        <div className="dj-trust"><strong>CLINICAL EDUCATION</strong><span>Materi untuk edukasi dan clinical reference. Selalu verifikasi guideline terbaru, dosis, contraindication, dan protokol lokal sebelum digunakan dalam praktik.</span></div>
      </main>
    </div>
  );
}
