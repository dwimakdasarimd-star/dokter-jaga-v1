import type { Metadata } from "next";
import "./globals.css";
import { Activity, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Dokter Jaga | Clinical Education untuk Dokter Indonesia",
  description: "Clinical cases, emergency resources, primary care, dan practical tools untuk dokter Indonesia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <div className="site-bg" aria-hidden="true">
          <div className="grid-orb orb-1" />
          <div className="grid-orb orb-2" />
          <div className="pulse-line"><Activity size={18} /><span /></div>
        </div>
        <header className="site-header">
          <a className="brand" href="/">
            <span className="brand-mark"><Stethoscope size={21} /></span>
            <span><strong>Dokter Jaga</strong><small>Clinical Education</small></span>
          </a>
          <nav className="desktop-nav">
            <a href="/cases">Clinical Cases</a><a href="/emergency">Emergency</a><a href="/tools">Tools</a><a href="/library">Library</a>
          </nav>
          <a className="header-cta" href="/membership">Mulai Belajar</a>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div><strong>Dokter Jaga</strong><p>Practical clinical education untuk dokter Indonesia.</p></div>
          <div className="footer-links"><a href="/cases">Cases</a><a href="/tools">Tools</a><a href="/library">Library</a><a href="/membership">Membership</a></div>
          <div className="footer-note">Materi edukasi · Bukan pengganti clinical judgment</div>
        </footer>
      </body>
    </html>
  );
}
