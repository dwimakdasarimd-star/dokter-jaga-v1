const cases = [
  ["Emergency", "Nyeri dada akut", "ACS · focused assessment · initial management"],
  ["Primary Care", "Hipertensi tidak terkontrol", "Assessment · treatment · follow-up"],
  ["Pediatrics", "Demam pada anak", "Red flags · dehydration · referral"],
  ["Respiratory", "Sesak akut", "Asthma/COPD · severity · escalation"],
  ["Neurology", "Kelemahan satu sisi", "Stroke pathway · localization · referral"],
  ["GI", "Nyeri perut akut", "Red flags · differential · surgical referral"],
];
export default function CasesPage(){return <div className="section page"><div className="section-kicker">Clinical Cases</div><h1>Clinical Cases</h1><p className="section-intro">Latihan kasus berbasis alur berpikir klinis: kenali masalah, tentukan prioritas, ambil tindakan.</p><div className="cards">{cases.map(c=><article className="card" key={c[1]}><div className="meta">{c[0]}</div><h3>{c[1]}</h3><p>{c[2]}</p><a className="text-link" href="/cases">Mulai case →</a></article>)}</div></div>}
