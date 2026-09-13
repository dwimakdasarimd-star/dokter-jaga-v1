import './globals.css';
import './home.css';
import './mascot.css';
import './cases/cases.css';
import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Dokter Jaga | Practical Clinical Education',
  description: 'Clinical education dan practical resources untuk dokter Indonesia.',
  icons: { icon: '/dokter-jaga-app-icon.svg' },
};

const nav = [
  { href: '/', label: 'Dashboard', icon: '⌂' },
  { href: '/cases', label: 'Clinical Cases', icon: '◈' },
  { href: '/emergency', label: 'Emergency', icon: '!' },
  { href: '/tools', label: 'Clinical Tools', icon: '⌁' },
  { href: '/library', label: 'Library', icon: '▤' },
];

function Brand({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link href="/" className={mobile ? 'brand brand-mobile brand-mascot-lockup' : 'brand brand-mascot-lockup'} aria-label="Dokter Jaga">
      <span className="brand-mascot-wrap">
        <Image
          src="/dokter-jaga-mascot.svg"
          alt=""
          width={mobile ? 38 : 48}
          height={mobile ? 44 : 54}
          priority
        />
      </span>
      <span className="brand-wordmark">
        <strong><span>Dokter</span><em>Jaga</em></strong>
        <small>Belajar. Berpikir. Siap Praktik.</small>
      </span>
    </Link>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <Brand />
            <div className="sidebar-label">WORKSPACE</div>
            <nav className="side-nav">{nav.map((item) => <Link href={item.href} key={item.href} className="side-link"><span className={`side-icon ${item.label === 'Emergency' ? 'danger-icon' : ''}`}>{item.icon}</span><span>{item.label}</span></Link>)}</nav>
            <div className="sidebar-label sidebar-label-spaced">LEARNING</div>
            <nav className="side-nav"><Link href="/membership" className="side-link"><span className="side-icon">★</span><span>Membership</span></Link></nav>
            <div className="sidebar-bottom"><div className="mini-card"><span className="mini-dot" /><div><strong>Clinical resources</strong><small>Updated regularly</small></div></div><p>Untuk edukasi. Verifikasi guideline, dosis, dan protokol lokal sebelum praktik.</p></div>
          </aside>
          <div className="main-shell">
            <header className="topbar"><Brand mobile /><div className="top-search">⌕ <span>Cari kasus, diagnosis, obat, guideline...</span></div><div className="top-actions"><Link href="/membership" className="top-upgrade">Unlock more</Link><div className="avatar avatar-brand"><Image src="/dokter-jaga-app-icon.svg" alt="Dokter Jaga" width={34} height={34} /></div></div></header>
            <main>{children}</main>
            <footer>Dokter Jaga · Practical clinical education · 2026</footer>
          </div>
        </div>
      </body>
    </html>
  );
}
