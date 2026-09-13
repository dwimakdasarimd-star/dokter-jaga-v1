import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Dokter Jaga | Practical Clinical Education',
  description: 'Clinical education dan practical resources untuk dokter Indonesia.',
};

const nav = [
  { href: '/', label: 'Dashboard', icon: '⌂' },
  { href: '/cases', label: 'Clinical Cases', icon: '◈' },
  { href: '/emergency', label: 'Emergency', icon: '!' },
  { href: '/tools', label: 'Clinical Tools', icon: '⌁' },
  { href: '/library', label: 'Library', icon: '▤' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <Link href="/" className="brand">
              <span className="brand-mark">+</span>
              <span><strong>Dokter Jaga</strong><small>Clinical Platform</small></span>
            </Link>
            <div className="sidebar-label">WORKSPACE</div>
            <nav className="side-nav">
              {nav.map((item) => (
                <Link href={item.href} key={item.href} className="side-link">
                  <span className={`side-icon ${item.label === 'Emergency' ? 'danger-icon' : ''}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="sidebar-label sidebar-label-spaced">LEARNING</div>
            <nav className="side-nav">
              <Link href="/membership" className="side-link"><span className="side-icon">★</span><span>Membership</span></Link>
            </nav>
            <div className="sidebar-bottom">
              <div className="mini-card"><span className="mini-dot" /><div><strong>Clinical resources</strong><small>Updated regularly</small></div></div>
              <p>Untuk edukasi. Verifikasi guideline, dosis, dan protokol lokal sebelum praktik.</p>
            </div>
          </aside>
          <div className="main-shell">
            <header className="topbar">
              <div className="mobile-brand"><span className="brand-mark">+</span><strong>Dokter Jaga</strong></div>
              <div className="top-search">⌕ <span>Cari kasus, diagnosis, obat, guideline...</span></div>
              <div className="top-actions"><Link href="/membership" className="top-upgrade">Unlock more</Link><div className="avatar">DJ</div></div>
            </header>
            <main>{children}</main>
            <footer>Dokter Jaga · Practical clinical education · 2026</footer>
          </div>
        </div>
      </body>
    </html>
  );
}
