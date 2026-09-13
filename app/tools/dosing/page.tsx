'use client'

import { useMemo, useState } from 'react'
import { CATEGORIES, DRUG_DB, SOURCE_LIBRARY, type DrugRegimen, type DoseRule } from './data'
import './dosing.css'

const parse=(v:string)=>Number(v.replace(',','.'))

function calculate(rule:DoseRule, weight:number, bsa:number){
  if(rule.kind==='fixed') return {dose:rule.amount, unit:rule.unit, max:rule.maxDaily}
  if(rule.kind==='mgkg') return {dose:rule.amount*weight, unit:rule.unit, max:rule.maxDose ?? rule.maxDaily}
  if(rule.kind==='mgkgday') return {dose:rule.amount*weight, unit:rule.unit, max:rule.maxDaily}
  if(rule.kind==='bsa') return {dose:rule.amount*bsa, unit:rule.unit, max:rule.maxDose ?? rule.maxDaily}
  return {dose:undefined,unit:rule.unit}
}

function ruleText(rule:DoseRule){
  if(rule.kind==='fixed') return `${rule.amount} ${rule.unit} · ${rule.frequency}${rule.duration?` · ${rule.duration}`:''}`
  if(rule.kind==='mgkg') return `${rule.amount} ${rule.unit} · ${rule.frequency}${rule.duration?` · ${rule.duration}`:''}`
  if(rule.kind==='mgkgday') return `${rule.amount} ${rule.unit} · ${rule.frequency}${rule.duration?` · ${rule.duration}`:''}`
  if(rule.kind==='bsa') return `${rule.amount} ${rule.unit} · ${rule.frequency}${rule.duration?` · ${rule.duration}`:''}`
  return rule.frequency
}

export default function DrugDosingPage(){
  const [query,setQuery]=useState('')
  const [category,setCategory]=useState<(typeof CATEGORIES)[number]>('All')
  const [population,setPopulation]=useState('All')
  const [selected,setSelected]=useState<DrugRegimen|null>(null)
  const [weight,setWeight]=useState('')
  const [height,setHeight]=useState('')
  const [renal,setRenal]=useState('')
  const [pregnant,setPregnant]=useState(false)
  const [copied,setCopied]=useState(false)

  const results=useMemo(()=>DRUG_DB.filter(d=>{
    const hay=`${d.drug} ${d.aliases?.join(' ')??''} ${d.indication} ${d.category} ${d.population}`.toLowerCase()
    const q=query.trim().toLowerCase()
    return (!q||hay.includes(q)) && (category==='All'||d.category===category) && (population==='All'||d.population===population||d.population==='Adult + Pediatric')
  }),[query,category,population])

  const kg=parse(weight)
  const bsa=kg>0&&parse(height)>0?Math.sqrt((kg*parse(height))/3600):0
  const calc=selected?calculate(selected.rule,kg,bsa):null
  const renalNum=parse(renal)
  const renalWarning=selected?.renal?.find(x=>Number.isFinite(renalNum)&&((x.min===undefined||renalNum>=x.min)&&(x.max===undefined||renalNum<=x.max)))
  const prescription=selected&&calc?.dose!==undefined
    ? `R/ ${selected.drug}\nS ${Number.isFinite(calc.dose)?calc.dose.toFixed(calc.dose%1?1:0):'—'} ${calc.unit}, ${selected.rule.frequency}${selected.rule.duration?`, ${selected.rule.duration}`:''}`
    : selected?`R/ ${selected.drug}\nS ${selected.rule.frequency}`:''

  const copyRx=async()=>{if(!prescription)return;await navigator.clipboard?.writeText(prescription);setCopied(true);setTimeout(()=>setCopied(false),1500)}

  return <main className="dosing-page">
    <section className="dosing-hero">
      <div>
        <div className="dosing-kicker">CLINICAL TOOLS · V3</div>
        <h1>Drug Dose Calculator</h1>
        <p>Drug → indication → patient → dose → safety check. Dibangun untuk dokter layanan primer dengan sumber guideline yang dapat ditelusuri.</p>
      </div>
      <div className="dosing-hero-stats"><strong>{DRUG_DB.length}+</strong><span>regimens</span><strong>{SOURCE_LIBRARY.length}</strong><span>reference layers</span></div>
    </section>

    <section className="dosing-layout">
      <aside className="dosing-browser">
        <div className="dosing-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari obat, penyakit, indikasi..."/></div>
        <div className="dosing-filters"><select value={category} onChange={e=>setCategory(e.target.value as typeof category)}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select><select value={population} onChange={e=>setPopulation(e.target.value)}><option>All</option><option>Adult</option><option>Pediatric</option><option>Neonate</option><option>Pregnancy</option></select></div>
        <div className="dosing-result-count">{results.length} regimen ditemukan</div>
        <div className="dosing-list">{results.map(d=><button key={d.id} className={`dosing-card ${selected?.id===d.id?'selected':''}`} onClick={()=>{setSelected(d);setCopied(false)}}><div className="dosing-card-top"><strong>{d.drug}</strong><span className={d.status.startsWith('Guideline')?'verified':'verify'}>{d.status.startsWith('Guideline')?'✓ verified':'! verify'}</span></div><span>{d.indication}</span><small>{d.route} · {ruleText(d.rule)}</small></button>)}</div>
      </aside>

      <section className="dosing-workspace">
        {!selected ? <div className="dosing-empty"><div className="empty-icon">Rx</div><h2>Pilih regimen</h2><p>Mulai dengan mencari nama obat atau diagnosis. Engine akan menampilkan aturan dosis, populasi, route, warning, renal adjustment, dan sumber.</p><div className="quick-grid"><button onClick={()=>setQuery('amoxicillin')}>Amoxicillin</button><button onClick={()=>setQuery('paracetamol')}>Paracetamol</button><button onClick={()=>setQuery('epinephrine')}>Anaphylaxis</button><button onClick={()=>setQuery('malaria')}>Malaria</button><button onClick={()=>setQuery('metformin')}>Diabetes</button><button onClick={()=>setQuery('ceftriaxone')}>Ceftriaxone</button></div></div> : <>
          <div className="regimen-header"><div><div className="dosing-kicker">{selected.category} · {selected.population}</div><h2>{selected.drug}</h2><p>{selected.indication}</p></div><span className={selected.status.startsWith('Guideline')?'status-good':'status-warn'}>{selected.status}</span></div>

          <div className="patient-panel"><div className="panel-title">PATIENT INPUT</div><div className="patient-grid"><label>Berat badan<input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="kg" inputMode="decimal"/></label><label>Tinggi badan <span className="optional">optional</span><input value={height} onChange={e=>setHeight(e.target.value)} placeholder="cm" inputMode="decimal"/></label><label>eGFR / CrCl <span className="optional">optional</span><input value={renal} onChange={e=>setRenal(e.target.value)} placeholder="mL/min" inputMode="decimal"/></label><label className="check-row"><input type="checkbox" checked={pregnant} onChange={e=>setPregnant(e.target.checked)}/> Pregnancy</label></div>{pregnant&&<div className="pregnancy-alert">Kehamilan aktif — jangan gunakan regimen ini tanpa memeriksa status pregnancy pada guideline/label obat. {selected.pregnancy??'Tidak ada catatan pregnancy-specific di database ini.'}</div>}</div>

          <div className="dose-output"><div className="output-main"><span>CALCULATED DOSE</span>{calc?.dose!==undefined&&kg>0?<><strong>{calc.dose.toFixed(calc.dose%1?1:0)}</strong><em>{calc.unit}</em></>:<><strong>—</strong><em>{selected.rule.kind==='fixed'?'masukkan pasien bila perlu':'masukkan berat badan'}</em></>}</div><div className="output-side"><div><span>ROUTE</span><strong>{selected.route}</strong></div><div><span>FREQUENCY</span><strong>{selected.rule.frequency}</strong></div><div><span>DURATION</span><strong>{selected.rule.duration??'—'}</strong></div></div></div>

          <div className="dose-grid">
            <article><h3>Regimen</h3><p className="big-rule">{ruleText(selected.rule)}</p>{selected.formulation&&<p>{selected.formulation}</p>}{selected.notes&&<div className="info-box">{selected.notes}</div>}</article>
            <article><h3>Safety checks</h3>{selected.warnings?.length?<ul>{selected.warnings.map(w=><li key={w}>{w}</li>)}</ul>:<p>Tidak ada warning khusus yang tercatat pada entry ini.</p>}{renalWarning&&<div className="renal-box"><strong>Renal adjustment</strong><p>{renalWarning.adjustment}</p></div>}{selected.hepatic&&<div className="renal-box"><strong>Hepatic</strong><p>{selected.hepatic}</p></div>}</article>
          </div>

          <article className="rx-card"><div><span>RX DRAFT</span><pre>{prescription}</pre><small>Draft edukasi — verifikasi diagnosis, indikasi, alergi, interaksi, formulasi, renal/hepatic function, dan guideline lokal sebelum prescribing.</small></div><button onClick={copyRx}>{copied?'Copied':'Copy Rx'}</button></article>
          <article className="source-card"><div><span>SOURCE & VERSION</span><strong>{selected.source}</strong><small>Reviewed: {selected.reviewed} · Status: {selected.status}</small></div><div className="source-badge">Traceable</div></article>
        </>}
      </section>
    </section>

    <section className="dosing-safety"><strong>Clinical safety notice</strong><p>Ini adalah clinical decision-support dan educational calculator, bukan pengganti penilaian klinis. Dosis dapat berubah menurut diagnosis, berat badan, usia, organ function, formulasi, resistensi lokal, dan guideline terbaru. FORNAS digunakan sebagai cross-check ketersediaan/status JKN, bukan sebagai satu-satunya sumber dosis.</p></section>
    <section className="dosing-sources"><div><div className="dosing-kicker">REFERENCE STACK</div><h2>Guideline-first, Indonesia-aware</h2></div><ul>{SOURCE_LIBRARY.map(s=><li key={s}>{s}</li>)}</ul></section>
  </main>
}
