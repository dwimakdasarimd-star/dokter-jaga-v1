import './globals.css';
import './home.css';
import './mascot.css';
import './cases/cases.css';
import './mobile.css';
import './emergency/pomr.css';
import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Dokter Jaga | Practical Clinical Education',
  description: 'Clinical education dan practical resources untuk dokter Indonesia.',
  manifest: '/manifest.json',
  icons: { icon: '/dokter-jaga-app-icon-v2.svg', shortcut: '/dokter-jaga-app-icon-v2.svg', apple: '/dokter-jaga-app-icon-v2.svg' },
};

const workspaceNav = [
  { href: '/', label: 'Dashboard', icon: '⌂' },
  { href: '/cases', label: 'Clinical Cases', icon: '▣' },
  { href: '/emergency', label: 'Emergency', icon: '!' },
  { href: '/tools', label: 'Clinical Tools', icon: '▦' },
  { href: '/library', label: 'Library', icon: '▤' },
  { href: '/library', label: 'Anatomi & Gambar', icon: '◇' },
];

const learningNav = [
  { href: '/membership', label: 'My Progress', icon: '▥' },
  { href: '/membership', label: 'Saved', icon: '♡' },
  { href: '/membership', label: 'Membership', icon: '★' },
];

function Brand({ mobile = false }: { mobile?: boolean }) {
  return <Link href="/" className={mobile ? 'brand brand-mobile brand-logo-lockup' : 'brand brand-logo-lockup'} aria-label="Dokter Jaga"><span className="brand-mark-wrap"><Image src="/dokter-jaga-mark.svg" alt="Dokter Jaga" width={mobile ? 36 : 42} height={mobile ? 36 : 42} priority /></span><span className="brand-wordmark"><strong><span>Dokter</span><em>Jaga</em></strong><small>Belajar. Berpikir. Siap Praktik.</small></span></Link>;
}

function MobileNav(){
  return <nav className="mobile-bottom-nav" aria-label="Navigasi utama mobile">{workspaceNav.slice(0,5).map(item=><Link href={item.href} key={item.label} className={`mobile-nav-item ${item.label==='Emergency'?'mobile-nav-emergency':''}`}><span>{item.icon}</span><small>{item.label==='Clinical Tools'?'Tools':item.label==='Clinical Cases'?'Cases':item.label}</small></Link>)}<Link href="/membership" className="mobile-nav-item"><span>•••</span><small>More</small></Link></nav>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="id"><body><div className="app-shell">
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="side-nav">{workspaceNav.map(item=><Link href={item.href} key={item.label} className="side-link"><span className={`side-icon ${item.label==='Emergency'?'danger-icon':''}`}>{item.icon}</span><span>{item.label}</span></Link>)}</nav>
      <div className="sidebar-label sidebar-label-spaced">LEARNING</div>
      <nav className="side-nav">{learningNav.map(item=><Link href={item.href} key={item.label} className="side-link"><span className="side-icon">{item.icon}</span><span>{item.label}</span></Link>)}</nav>
      <div className="sidebar-bottom"><div className="mini-card"><span className="mini-dot" /><div><strong>Clinical resources</strong><small>Updated regularly</small></div></div><p>Untuk edukasi. Verifikasi guideline, dosis, dan protokol lokal sebelum praktik.</p></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><Brand mobile /><Link href="/cases" className="top-search"><span>⌕</span><span>Cari kasus, diagnosis, obat, atau guideline...</span><kbd>⌘ K</kbd></Link><div className="top-actions"><button className="top-notification" aria-label="Notifikasi">♧</button><Link href="/membership" className="top-upgrade">Unlock more</Link><div className="avatar avatar-brand"><Image src="/dokter-jaga-app-icon-v2.svg" alt="Dokter Jaga" width={34} height={34} /></div></div></header>
      <main>{children}</main><footer>Dokter Jaga · Practical clinical education · 2026</footer>
    </div><MobileNav />
  </div></body></html>;
}
