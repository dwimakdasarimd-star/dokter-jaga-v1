import { ArrowRight, Activity, BookOpen, Calculator, HeartPulse, Hospital, Pill, ShieldCheck, Stethoscope, Syringe } from "lucide-react";

const cases = [
  { tag: "Emergency", title: "Nyeri dada akut", desc: "ACS · differential diagnosis · initial management", icon: HeartPulse },
  { tag: "Primary Care", title: "Hipertensi tidak terkontrol", desc: "Assessment · treatment · follow-up", icon: Activity },
  { tag: "Pediatrics", title: "Demam pada anak", desc: "Red flags · dehydration · referral", icon: Syringe },
];

const tools = [
  { title: "Clinical Tools", desc: "Decision aids praktis untuk encounter sehari-hari.", icon: Calculator },
  { title: "Drug & Rx", desc: "Referensi obat dan dukungan penulisan resep.", icon: Pill },
  { title: "Emergency", desc: "Quick-reference untuk kondisi akut dan triage.", icon: ShieldCheck },
  { title: "Clinical Library", desc: "Materi ringkas, guideline, dan clinical pearls.", icon: BookOpen },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">Clinical education untuk dokter Indonesia</span>
          <h1>Lebih siap menghadapi <span>kasus klinis.</span></h1>
          <p className="lead">Belajar dari clinical cases, emergency resources, primary care, dan practical tools yang dirancang untuk membantu dokter berpikir lebih terstruktur dan bertindak lebih percaya diri.</p>
          <div className="actions">
            <a href="/cases" className="btn btn-primary">Mulai Clinical Cases <ArrowRight size={16} /></a>
            <a href="/library" className="btn btn-secondary">Jelajahi Library</a>
          </div>
          <div className="trust">Dibuat untuk pembelajaran klinis · Berbasis referensi · Bahasa Indonesia</div>
        </div>
        <div className="hero-card">
          <div className="topline"><span>Daily clinical drill</span><span>Case 01</span></div>
          <div className="case-preview">
            <div className="tag">Emergency · Clinical reasoning</div>
            <h3>Nyeri dada akut</h3>
            <p>Pasien 58 tahun datang dengan nyeri dada 45 menit. Mulai dari ABC, focused history, ECG, sampai prioritas tata laksana.</p>
            <div className="mini-row"><span>01 · Triage</span><span>02 · Red flags</span><span>03 · Action</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head"><div><div className="section-kicker">Built for real clinical life</div><h2>Belajar dengan konteks.</h2></div><a className="text-link" href="/cases">Lihat semua cases →</a></div>
        <div className="audience"><div><b>Mahasiswa & Koas</b><span>Clinical reasoning dari dasar hingga aplikasi.</span></div><div><b>Dokter Umum & Primary Care</b><span>Practical resources untuk encounter sehari-hari.</span></div><div><b>Persiapan Ujian</b><span>Drill terstruktur untuk memperkuat keputusan klinis.</span></div></div>
      </section>

      <section className="section" id="cases">
        <div className="section-head"><div><div className="section-kicker">Clinical Cases</div><h2>Kasus yang terasa nyata.</h2><p className="section-intro">Bukan sekadar hafalan. Setiap kasus diarahkan dari assessment → reasoning → action → follow-up.</p></div></div>
        <div className="cards">{cases.map(({ icon: Icon, ...item }) => <a className="card" href="/cases" key={item.title}><div className="card-icon"><Icon size={19} /></div><div className="meta">{item.tag}</div><h3>{item.title}</h3><p>{item.desc}</p></a>)}</div>
      </section>

      <section className="section">
        <div className="section-head"><div><div className="section-kicker">Practical Resources</div><h2>Tools yang membantu saat jaga.</h2></div><a className="text-link" href="/tools">Eksplor tools →</a></div>
        <div className="cards">{tools.map(({ icon: Icon, ...item }) => <a className="card" href="/tools" key={item.title}><div className="card-icon"><Icon size={19} /></div><h3>{item.title}</h3><p>{item.desc}</p></a>)}</div>
      </section>

      <section className="cta"><div><h3>Mulai dari satu kasus hari ini.</h3><p>Bangun kebiasaan belajar yang langsung terhubung dengan clinical decision making.</p></div><a href="/membership" className="btn btn-primary">Mulai Belajar <ArrowRight size={16} /></a></section>
    </>
  );
}
