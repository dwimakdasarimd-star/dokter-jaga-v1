'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import './article.css';

const articles = {
  'acute-chest-pain': {
    title: 'Acute Chest Pain: Practical Approach', type: 'Clinical Pearls', category: 'Cardiovascular', level: 'Intermediate', read: '8 min',
    summary: 'Kerangka berpikir untuk menghadapi pasien dengan nyeri dada akut sejak kontak pertama sampai keputusan disposition.',
    keyPoints: ['Prioritaskan kondisi time-critical sebelum diagnosis yang lebih lengkap.', 'Gunakan history, vital signs, pemeriksaan fisik, dan ECG secara paralel.', 'Reassess setelah intervensi awal dan jangan mengandalkan satu hasil pemeriksaan saja.'],
    assessment: ['Onset, location, character, radiation, duration, provoking/relieving factors.', 'Dyspnea, diaphoresis, syncope, palpitations, dan neurologic symptoms.', 'Risk factors for coronary disease, thromboembolism, dan aortic disease.', 'Vital signs, perfusion, cardiac and respiratory examination, pulse symmetry.'],
    investigation: ['12-lead ECG sedini mungkin bila acute coronary syndrome dicurigai.', 'Laboratory testing sesuai differential diagnosis dan protokol lokal.', 'Chest imaging atau advanced imaging bila dicurigai penyakit struktural atau vaskular.', 'Serial assessment bila proses evolving dicurigai.'],
    management: ['Stabilize airway, breathing, dan circulation bila diperlukan.', 'Treat suspected life-threatening diagnosis sesuai emergency pathway.', 'Avoid anchoring bila nyeri menetap atau temuan klinis berubah.', 'Dokumentasikan working diagnosis, risk assessment, response, dan disposition.'],
    redFlags: ['Hemodynamic instability or shock', 'New ischemic ECG changes', 'Syncope or malignant arrhythmia', 'Focal neurologic deficit or pulse asymmetry', 'Severe hypoxemia or respiratory distress', 'Sudden maximal-at-onset pain'],
    tools: [['HEART Score', '/tools'], ['NEWS2', '/tools'], ['A–a Gradient', '/tools']],
    cases: [['Suspected Acute Coronary Syndrome', '/cases'], ['Suspected Aortic Dissection', '/cases']],
  },
  'hypertension': {
    title: 'Hypertension: Primary Care Notes', type: 'Primary Care Notes', category: 'Primary Care', level: 'Core', read: '7 min',
    summary: 'Practical framework untuk memastikan diagnosis, menilai risiko, memilih terapi, dan membangun follow-up.',
    keyPoints: ['Konfirmasi tekanan darah dengan pengukuran yang benar.', 'Cari target-organ damage, faktor risiko, komorbiditas, dan kemungkinan secondary hypertension.', 'Lifestyle intervention dan pharmacotherapy berjalan bersama.'],
    assessment: ['Repeat blood pressure dengan cuff dan teknik yang sesuai.', 'Review cardiovascular risk factors, medication history, adherence, dan substances.', 'Cari tanda target-organ injury atau secondary causes bila klinis mengarah.', 'Assess kidney function dan baseline parameters sesuai konteks.'],
    investigation: ['Cardiovascular risk assessment.', 'Renal function dan urine assessment bila indicated.', 'ECG dan pemeriksaan tambahan berdasarkan komorbiditas.', 'Home atau ambulatory monitoring bila diperlukan.'],
    management: ['Tentukan target terapi secara individual.', 'Lifestyle: sodium reduction, healthy diet, physical activity, weight management, tobacco avoidance.', 'Pilih antihypertensive sesuai komorbiditas, contraindications, dan akses.', 'Follow-up untuk response, adverse effects, adherence, dan intensifikasi.'],
    redFlags: ['Severe hypertension with acute neurologic symptoms', 'Chest pain or acute dyspnea', 'Acute kidney injury', 'Visual disturbance with suspected end-organ injury', 'Pregnancy with severe hypertension symptoms'],
    tools: [['RCRI / Lee Index', '/tools'], ['NEWS2', '/tools']], cases: [['Hypertensive Emergency', '/cases']],
  },
  'type-2-diabetes': {
    title: 'Type 2 Diabetes: Guideline Digest', type: 'Guideline Digest', category: 'Endocrinology', level: 'Core', read: '9 min',
    summary: 'Decision-oriented overview untuk diagnosis, risk assessment, lifestyle, pharmacologic strategy, dan monitoring diabetes tipe 2.',
    keyPoints: ['Individualize glycemic goals.', 'Assess cardiovascular, kidney, weight, hypoglycemia, dan treatment-burden considerations.', 'Therapy selection harus mencerminkan komorbiditas, safety, preference, dan access.'],
    assessment: ['Confirm diagnosis menggunakan pathway diagnostik yang sesuai.', 'Review symptoms, duration, weight, medications, lifestyle, dan adherence.', 'Assess cardiovascular risk, kidney status, eye health, neuropathy, dan foot risk.', 'Identify hypoglycemia risk dan barriers to self-management.'],
    investigation: ['Appropriate glycemic marker.', 'Kidney function dan urine albumin assessment bila indicated.', 'Lipid dan cardiovascular risk assessment.', 'Complication screening sesuai patient profile.'],
    management: ['Structured lifestyle dan self-management support.', 'Choose pharmacotherapy according to glycemic needs, comorbidities, safety, weight goals, dan preference.', 'Escalate atau simplify therapy berdasarkan response dan burden.', 'Review adherence, adverse effects, dan monitoring secara berkala.'],
    redFlags: ['Marked hyperglycemia with dehydration', 'Altered mental status', 'Vomiting or inability to maintain oral intake', 'Suspected diabetic ketoacidosis or hyperosmolar state', 'Severe hypoglycemia'],
    tools: [['Corrected Calcium', '/tools'], ['Free Water Deficit', '/tools']], cases: [['DKA / Hyperglycemic Emergency', '/cases']],
  },
  'sepsis-and-shock': {
    title: 'Sepsis & Shock: First-Hour Framework', type: 'Emergency', category: 'Emergency Medicine', level: 'Advanced', read: '10 min',
    summary: 'Kerangka praktis untuk recognition, initial resuscitation, reassessment, antimicrobial principles, dan escalation.',
    keyPoints: ['Recognize infection plus organ dysfunction atau shock early.', 'Resuscitation bersifat iterative: treatment, reassessment, lalu stop bila tidak beneficial.', 'Source control dan timely antimicrobial therapy adalah komponen penting.'],
    assessment: ['Airway, breathing, circulation, mental status, temperature, perfusion, dan urine output.', 'Cari infectious source dan severity of organ dysfunction.', 'Assess fluid responsiveness dan signs of fluid intolerance bila memungkinkan.', 'Obtain relevant cultures tanpa membuat treatment tertunda secara tidak perlu.'],
    investigation: ['Lactate dan perfusion markers sesuai local protocol.', 'Blood cultures dan source-specific microbiology bila indicated.', 'CBC, renal function, electrolytes, glucose, dan pemeriksaan terarah.', 'Imaging untuk source identification bila clinically appropriate.'],
    management: ['Crystalloid resuscitation bila hypoperfusion, dengan frequent reassessment.', 'Empiric antimicrobial therapy sesuai source dan local resistance pattern.', 'Escalate to vasopressor support bila shock persisten.', 'Pursue source control dan narrow therapy ketika data tersedia.'],
    redFlags: ['Persistent hypotension', 'Altered mental status', 'Oliguria', 'Worsening perfusion', 'Increasing oxygen requirement', 'Fluid intolerance or pulmonary edema'],
    tools: [['NEWS2', '/tools'], ['qSOFA', '/tools'], ['A–a Gradient', '/tools']], cases: [['Septic Shock', '/cases']],
  },
  'acute-dyspnea': {
    title: 'Acute Dyspnea: Clinical Reasoning', type: 'Clinical Pearls', category: 'Respiratory', level: 'Intermediate', read: '8 min',
    summary: 'Pendekatan terstruktur untuk airway, pulmonary, cardiac, vascular, dan systemic causes of acute dyspnea.',
    keyPoints: ['Severity assessment comes before etiologic certainty.', 'Gunakan oxygenation, ventilation, work of breathing, dan hemodynamics untuk menentukan urgency.', 'Focused differential lebih berguna daripada daftar diagnosis yang tidak terarah.'],
    assessment: ['Onset dan time course.', 'Work of breathing, respiratory rate, oxygen saturation, mental status, dan hemodynamics.', 'Chest/cardiac examination, edema, dan signs of DVT or infection.', 'Asthma/COPD, cardiac history, medications, exposures, dan thromboembolic risk.'],
    investigation: ['ECG dan chest imaging sesuai differential.', 'Blood gas bila ventilatory failure dicurigai.', 'Targeted laboratory testing.', 'POCUS bila tersedia dan sesuai kompetensi.'],
    management: ['Support oxygenation dan ventilation sesuai severity.', 'Treat likely life-threatening cause promptly.', 'Reassess setelah setiap intervensi besar.', 'Escalate bila work of breathing, gas exchange, atau hemodynamics memburuk.'],
    redFlags: ['Severe respiratory distress', 'Silent chest or impending fatigue', 'Severe hypoxemia', 'Altered consciousness', 'Shock', 'Suspected PE, pneumothorax, or pulmonary edema'],
    tools: [['PESI', '/tools'], ['PERC Rule', '/tools'], ['Wells PE', '/tools'], ['A–a Gradient', '/tools']], cases: [['Acute Severe Asthma', '/cases'], ['Pulmonary Embolism', '/cases']],
  },
  'prescription-safety': {
    title: 'Drug & Prescription Safety', type: 'Drug & Prescription', category: 'Pharmacology', level: 'Core', read: '6 min',
    summary: 'Checklist praktis untuk membuat resep yang jelas, aman, dan dapat dieksekusi dengan benar.',
    keyPoints: ['Verify patient, indication, allergy status, dan relevant organ function.', 'Write drug, strength, dose, route, frequency, duration, dan quantity dengan jelas.', 'Communicate counseling points dan monitoring requirements.'],
    assessment: ['Confirm diagnosis atau therapeutic indication.', 'Review allergies, pregnancy when relevant, kidney/liver function, age, dan weight.', 'Check current medications untuk duplication, interactions, dan contraindications.', 'Clarify treatment goal dan expected duration.'],
    investigation: ['Baseline laboratory data bila required.', 'Confirm dose adjustments for renal/hepatic impairment when applicable.', 'Review monitoring parameters for high-risk medicines.'],
    management: ['Write complete prescription using standardized terminology.', 'Specify route dan duration; avoid ambiguous abbreviations.', 'Give patient-friendly instructions dan important adverse effects.', 'Document follow-up atau monitoring bila diperlukan.'],
    redFlags: ['Serious drug allergy', 'High-risk medication without monitoring', 'Potential major interaction', 'Dose not adjusted for organ dysfunction', 'Unclear medication reconciliation'],
    tools: [['Child-Pugh', '/tools'], ['MELD-Na', '/tools']], cases: [['Medication Adverse Reaction', '/cases']],
  },
  'acute-asthma': {
    title: 'Acute Asthma: Severity to Disposition', type: 'Guideline Digest', category: 'Respiratory', level: 'Core', read: '7 min',
    summary: 'Quick reference untuk severity assessment, bronchodilator therapy, corticosteroid use, reassessment, dan discharge planning.',
    keyPoints: ['Severity ditentukan secara klinis dan objective measures bila feasible.', 'Bronchodilator therapy perlu diikuti early reassessment.', 'Discharge merupakan keputusan klinis yang mencakup response, risk, dan follow-up.'],
    assessment: ['Symptoms, respiratory rate, pulse, oxygen saturation, speech, accessory muscle use, mental status.', 'Previous severe exacerbations, ICU admission, intubation, dan recent healthcare utilization.', 'Current controller/reliever use dan adherence.', 'Triggers dan relevant comorbidities.'],
    investigation: ['Peak expiratory flow atau spirometry bila feasible.', 'Blood gas bila severe disease atau ventilatory failure dicurigai.', 'Additional investigations bila alternative diagnosis plausible.'],
    management: ['Rapid-acting inhaled bronchodilator sesuai severity dan local protocol.', 'Systemic corticosteroid bila indicated.', 'Oxygen therapy ke target yang sesuai bila hypoxemic.', 'Repeat assessment sebelum disposition.'],
    redFlags: ['Silent chest', 'Exhaustion or altered mental status', 'Severe hypoxemia', 'Poor response to initial treatment', 'Suspected ventilatory failure'],
    tools: [['NEWS2', '/tools'], ['A–a Gradient', '/tools']], cases: [['Acute Severe Asthma', '/cases']],
  },
  'headache-red-flags': {
    title: 'Headache: Primary vs Secondary', type: 'Primary Care Notes', category: 'Neurology', level: 'Intermediate', read: '7 min',
    summary: 'Framework untuk mengenali primary headache sekaligus tidak melewatkan secondary headache yang membutuhkan evaluasi segera.',
    keyPoints: ['History sering memberikan diagnostic signal terkuat.', 'Red flags mengubah threshold untuk investigation atau referral.', 'Normal neurological examination tidak otomatis menyingkirkan semua secondary causes.'],
    assessment: ['Onset: thunderclap, acute, subacute, atau chronic.', 'Pattern, frequency, duration, triggers, associated symptoms, prior headache history.', 'Medication/substance use dan relevant pregnancy/postpartum context.', 'Complete neurological examination dan fundoscopic assessment bila appropriate.'],
    investigation: ['Urgent investigation bila red flags atau abnormal examination mengarah ke secondary headache.', 'Pilih imaging/testing berdasarkan suspected pathology dan local pathway.', 'Hindari indiscriminate testing bila pola primary headache jelas tanpa red flags.'],
    management: ['Treat likely primary headache sesuai diagnosis dan patient factors.', 'Address medication overuse dan modifiable triggers bila relevant.', 'Provide explicit safety-netting dan return precautions.', 'Arrange follow-up bila diagnosis uncertain atau symptoms persist.'],
    redFlags: ['Thunderclap onset', 'New neurological deficit', 'Altered consciousness', 'Fever with meningism', 'New headache with cancer/immunosuppression', 'New or changing headache in pregnancy/postpartum', 'Visual symptoms or papilledema'],
    tools: [['NEWS2', '/tools']], cases: [['Subarachnoid Hemorrhage', '/cases'], ['Meningitis', '/cases']],
  },
} as const;

export default function LibraryArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = articles[params.slug as keyof typeof articles];
  if (!article) notFound();

  return (
    <main className="section page library-article-page">
      <Link href="/library" className="article-back">← Back to Clinical Library</Link>
      <header className="article-hero">
        <div><div className="article-badges"><span>{article.type}</span><span>{article.category}</span><span>{article.level}</span><span>{article.read}</span></div><h1>{article.title}</h1><p>{article.summary}</p></div>
      </header>
      <div className="article-layout">
        <article className="article-content">
          <section className="article-callout"><strong>Clinical summary</strong><p>{article.summary}</p></section>
          <ArticleSection title="Key points" items={article.keyPoints} />
          <ArticleSection title="Assessment" items={article.assessment} />
          <ArticleSection title="Investigation" items={article.investigation} />
          <ArticleSection title="Management" items={article.management} />
          <ArticleSection title="Red flags" items={article.redFlags} danger />
          <section className="article-reference"><h2>Guideline & reference check</h2><p>Gunakan guideline nasional dan internasional terbaru yang relevan dengan kondisi pasien serta protokol fasilitas. Resource ini adalah ringkasan edukasi dan bukan pengganti clinical judgment.</p></section>
        </article>
        <aside className="article-sidebar">
          <Related title="Related tools" items={article.tools} />
          <Related title="Related cases" items={article.cases} />
          <div className="article-side-card article-note-card"><span className="article-kicker">NEXT STEP</span><h3>Turn knowledge into action.</h3><p>Lanjutkan ke clinical case atau gunakan clinical tool terkait untuk melatih decision-making.</p><Link href="/cases" className="article-primary">Open Clinical Cases →</Link></div>
        </aside>
      </div>
    </main>
  );
}

function ArticleSection({ title, items, danger = false }: { title: string; items: readonly string[]; danger?: boolean }) {
  return <section className={danger ? 'article-section article-redflags' : 'article-section'}><h2>{title}</h2><ul>{items.map((x) => <li key={x}>{x}</li>)}</ul></section>;
}

function Related({ title, items }: { title: string; items: readonly (readonly [string, string])[] }) {
  return <div className="article-side-card"><span className="article-kicker">{title}</span>{items.map(([name, href]) => <Link href={href} key={name}>{name}<span>→</span></Link>)}</div>;
}
