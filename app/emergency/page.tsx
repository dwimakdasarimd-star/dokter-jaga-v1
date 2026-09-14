'use client'

import { useState } from 'react'
import { cases } from './cases'
import { additionalCases } from './additional-cases'
import { discussions } from './discussions'
import POMRCaseView from './POMRCaseView'

const allCases = [...cases, ...additionalCases]
const fallbackDiscussion = (item: typeof allCases[number]) => ({
  reasoning: [`Diagnosis kerja: ${item.diagnosis}.`, `Temuan utama mendukung diagnosis tersebut.`, `Diagnosis banding: ${item.ddx}.`],
  keyPoints: [item.approach, item.treatment],
  pitfalls: ['Jangan melewatkan kondisi yang mendesak.', 'Lakukan reassessment serial.'],
  guideline: 'Verifikasi guideline diagnosis-spesifik terbaru dan protokol lokal.',
  guidelineUrl: 'https://www.who.int/publications', updated: '2026'
})

export default function EmergencyPage(){
 const [selected,setSelected]=useState(allCases[0])
 const discussion=discussions[selected.id]??fallbackDiscussion(selected)
 return <div className="section page">
  <div className="section-kicker">Emergency Cases · POMR</div>
  <h1>100 Comprehensive Emergency Cases</h1>
  <p className="section-intro">Semua kasus menggunakan struktur <b>Problem-Oriented Medical Record (POMR)</b>, mengikuti pola catatan klinis pada contoh: anamnesis, pemeriksaan fisik, pemeriksaan penunjang, daftar masalah, pengkajian, rencana, monitoring, kesimpulan, dan evidence base.</p>
  <div className="emergency-layout">
   <aside className="case-list">{allCases.map(item=><button key={item.id} className={`case-nav ${selected.id===item.id?'active':''}`} onClick={()=>setSelected(item)}><span>{String(item.id).padStart(2,'0')}</span><div><strong>{item.title}</strong><small>{item.category}</small></div></button>)}</aside>
   <main className="case-detail"><div className="meta">CASE {String(selected.id).padStart(3,'0')} · {selected.category}</div><h2>{selected.title}</h2><POMRCaseView item={selected} discussion={discussion}/></main>
  </div>
  <p className="trust" style={{marginTop:24}}>Materi edukasi klinis. Verifikasi diagnosis, dosis, kontraindikasi, timing tindakan, guideline terbaru, dan protokol lokal sebelum digunakan pada pasien nyata.</p>
 </div>
}
