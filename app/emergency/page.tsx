'use client'

import { useState } from 'react'
import { cases } from './cases'
import { additionalCases } from './additional-cases'
import { discussions } from './discussions'

const allCases = [...cases, ...additionalCases]
const fallbackDiscussion = (item: typeof allCases[number]) => ({
  reasoning: [`Diagnosis kerja: ${item.diagnosis}.`, `Temuan utama dan konteks kasus mendukung diagnosis tersebut.`, `Diagnosis banding: ${item.ddx}.`],
  keyPoints: [`Pendekatan: ${item.approach}`, `Tatalaksana harus mengikuti kondisi pasien dan protokol setempat.`, `Disposition: ${item.disposition}.`],
  pitfalls: [`Jangan melewatkan kondisi yang time-critical.`, `Lakukan reassessment serial.`, `Red flags: ${item.redflags}.`],
  guideline: 'Untuk kasus tambahan, verifikasi guideline diagnosis-spesifik terbaru dan protokol lokal sebelum praktik.',
  guidelineUrl: 'https://www.who.int/publications',
  updated: '2026'
})

export default function EmergencyPage() {
  const [selected, setSelected] = useState(allCases[0])
  const discussion = discussions[selected.id] ?? fallbackDiscussion(selected)

  return (
    <div className="section page">
      <div className="section-kicker">Emergency Cases</div>
      <h1>100 Comprehensive Emergency Cases</h1>
      <p className="section-intro">100 kasus emergensi dengan vignette, primary survey, diagnosis banding, pemeriksaan penunjang, pendekatan klinis, tatalaksana, red flags, dan clinical reasoning.</p>
      <div className="emergency-layout">
        <aside className="case-list">
          {allCases.map((item) => <button key={item.id} className={`case-nav ${selected.id === item.id ? 'active' : ''}`} onClick={() => setSelected(item)}><span>{String(item.id).padStart(2, '0')}</span><div><strong>{item.title}</strong><small>{item.category}</small></div></button>)}
        </aside>
        <main className="case-detail">
          <div className="meta">CASE {String(selected.id).padStart(2, '0')} · {selected.category}</div>
          <h2>{selected.title}</h2>
          <section><h3>Vignette</h3><p>{selected.vignette}</p></section>
          <div className="info-grid"><div><h3>Primary Survey & Vitals</h3><p>{selected.vitals}</p></div><div><h3>Pemeriksaan Fisik</h3><p>{selected.exam}</p></div></div>
          <section><h3>Pemeriksaan Penunjang</h3><p>{selected.tests}</p></section>
          <section><h3>Diagnosis Kerja</h3><p><strong>{selected.diagnosis}</strong></p></section>
          <section><h3>Diagnosis Banding</h3><p>{selected.ddx}</p></section>
          <section><h3>Pendekatan Klinis</h3><p>{selected.approach}</p></section>
          <section className="treatment"><h3>Tatalaksana Spesifik</h3><p>{selected.treatment}</p></section>
          <section className="discussion-block"><div className="discussion-heading"><span className="meta">CLINICAL REASONING</span><h3>Pembahasan Komprehensif</h3></div><div className="bullet-section"><h4>🔎 Mengapa diagnosis ini paling mungkin?</h4><ul>{discussion.reasoning.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div className="bullet-section"><h4>📌 Key Clinical Points</h4><ul>{discussion.keyPoints.map((x,i)=><li key={i}>{x}</li>)}</ul></div><div className="bullet-section pitfalls"><h4>⚠️ Pitfall yang sering terjadi</h4><ul>{discussion.pitfalls.map((x,i)=><li key={i}>{x}</li>)}</ul></div></section>
          <section className="guideline-box"><div className="meta">GUIDELINE REFERENCE</div><h3>Guideline & Evidence Base</h3><p>{discussion.guideline}</p><a href={discussion.guidelineUrl} target="_blank" rel="noreferrer" className="guideline-link">Buka referensi ↗</a><small>Last guideline check: {discussion.updated}. Verifikasi versi terbaru sebelum praktik.</small></section>
          <div className="info-grid"><div><h3>Disposition</h3><p>{selected.disposition}</p></div><div><h3>Red Flags</h3><p>{selected.redflags}</p></div></div>
        </main>
      </div>
      <p className="trust" style={{marginTop:24}}>Materi edukasi klinis. Verifikasi dosis, kontraindikasi, timing tindakan, dan protokol terhadap guideline terbaru serta protokol lokal sebelum digunakan pada pasien nyata.</p>
    </div>
  )
}
