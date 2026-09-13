'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import FluidGuideStyles from './FluidGuideStyles'

const fluids = [
  {name:'Balanced crystalloid',examples:'RL / Hartmann / Plasma-Lyte',use:'First-line crystalloid for many resuscitation and replacement scenarios.',avoid:'Check product composition and disease-specific needs.'},
  {name:'0.9% NaCl',examples:'Normal saline',use:'Useful when chloride-rich fluid is specifically appropriate; in sepsis with traumatic brain injury, SSC 2026 suggests saline over balanced crystalloid.',avoid:'Large volumes can cause hyperchloremia/acidaemia; monitor chloride and acid-base status.'},
  {name:'Dextrose-containing fluid',examples:'D5-containing solutions',use:'Selected maintenance/free-water or glucose needs after tonicity and metabolic context are assessed.',avoid:'Not a resuscitation fluid for intravascular depletion.'},
  {name:'Hypertonic saline',examples:'3% NaCl',use:'Selected severe symptomatic hyponatremia and other specialist indications.',avoid:'Requires controlled correction and close sodium monitoring.'},
  {name:'Albumin',examples:'Human albumin 4–5%',use:'Not routine first-line resuscitation; SSC 2026 suggests crystalloids alone, with selected use after large crystalloid volumes or in cirrhosis.',avoid:'Avoid routine use and avoid supplemental albumin in TBI according to SSC 2026.'},
  {name:'Blood components',examples:'PRBC / plasma / platelets',use:'Hemorrhage and transfusion indications; follow local massive haemorrhage protocol.',avoid:'Do not substitute large crystalloid volumes for indicated blood replacement.'},
  {name:'Starch / HES',examples:'Tetrastarch',use:'Not recommended for routine resuscitation.',avoid:'Do not use tetrastarch for fluid resuscitation.'},
]

const scenarios = [
  ['Sepsis / septic shock','Balanced crystalloid','Initial resuscitation with crystalloid; reassess frequently and individualize further volume.'],
  ['Sepsis + traumatic brain injury','0.9% NaCl','SSC 2026 suggests saline rather than balanced crystalloid in this subgroup.'],
  ['Hypovolemia without active bleeding','Balanced crystalloid','Give a measured bolus and reassess perfusion/fluid responsiveness.'],
  ['Major hemorrhage','Blood components + hemorrhage protocol','Prioritize haemorrhage control and blood products rather than repeated crystalloid boluses.'],
  ['Routine adult maintenance','Isotonic strategy individualized','25–30 mL/kg/day is a NICE starting range for routine maintenance.'],
  ['Elderly / frail / HF / renal impairment','Lower-volume individualized plan','NICE suggests considering 20–25 mL/kg/day for maintenance in these high-risk groups.'],
  ['Severe symptomatic hyponatremia','Hypertonic saline','Specialist-guided controlled correction; avoid rapid overcorrection.'],
  ['Hypernatremia / free-water deficit','Free-water strategy','Treat the cause and correct sodium at a controlled rate with serial monitoring.'],
  ['DKA / HHS','Isotonic crystalloid initially','Integrate fluid choice/rate with glucose, sodium, potassium and osmolality.'],
  ['Pulmonary edema / fluid overload','Avoid automatic fluid bolus','Treat congestion and reassess; additional fluid can worsen respiratory failure.'],
  ['AKI / CKD','Individualized, avoid unnecessary positive balance','Assess perfusion, congestion, urine output and renal/electrolyte trajectory.'],
  ['Cirrhosis','Disease-specific strategy','Avoid indiscriminate crystalloid loading; albumin may have selected indications.'],
  ['Major burns','Burn-specific protocol','Use a validated burn resuscitation protocol rather than generic maintenance calculations.'],
  ['Pediatrics','Isotonic crystalloid for resuscitation/maintenance as indicated','Dose by weight, reassess after boluses, and account for glucose/electrolyte needs.'],
]

function Chip({children}:{children:ReactNode}){return <span className="iv-chip">{children}</span>}

export default function FluidGuide(){
  const [tab,setTab]=useState<'decision'|'selector'|'fluids'|'monitor'>('decision')
  const [weight,setWeight]=useState('')
  const w=Number(weight.replace(',','.'))
  const maintenance=Number.isFinite(w)&&w>0?{hourly:w<=10?w*4:w<=20?40+(w-10)*2:60+(w-20),dailyLow:w*25,dailyHigh:w*30}:null
  return <section className="fluid-guide">
    <FluidGuideStyles />
    <div className="fluid-guide-head"><div><span className="meta">IV FLUID GUIDE · UPDATED 2026</span><h2>Pemilihan Cairan Infus</h2><p>Decision support berbasis <strong>5R + fluid responsiveness + safety reassessment</strong>. Pilih tujuan terapi terlebih dahulu, baru jenis cairan, volume, dan laju.</p></div><span className="tool-status">Adult + Pediatrics</span></div>
    <div className="fluid-principle"><strong>5R</strong><span>Resuscitation</span><span>Routine maintenance</span><span>Replacement</span><span>Redistribution</span><span>Reassessment</span></div>
    <div className="iv-tabs"><button className={tab==='decision'?'active':''} onClick={()=>setTab('decision')}>Decision pathway</button><button className={tab==='selector'?'active':''} onClick={()=>setTab('selector')}>Clinical selector</button><button className={tab==='fluids'?'active':''} onClick={()=>setTab('fluids')}>Fluid library</button><button className={tab==='monitor'?'active':''} onClick={()=>setTab('monitor')}>Reassessment</button></div>
    {tab==='decision'&&<div className="iv-content">
      <div className="iv-step-grid"><article><b>01 · NEED?</b><h3>Apakah IV fluid memang diperlukan?</h3><p>Gunakan IV fluid bila kebutuhan tidak dapat dipenuhi secara oral/enteral. Stop secepat mungkin ketika tidak lagi diperlukan.</p></article><article><b>02 · PURPOSE</b><h3>Tentukan tujuan</h3><p>Resuscitation · maintenance · replacement · redistribution. Jangan menggunakan maintenance fluid sebagai terapi shock.</p></article><article><b>03 · RESPONSE</b><h3>Apakah pasien masih fluid responsive?</h3><p>Nilai perfusi, dynamic response bila tersedia, dan tanda congestion sebelum mengulang bolus.</p></article><article><b>04 · REASSESS</b><h3>Stop / continue / escalate</h3><p>Jika perfusi membaik, reassess need. Jika tidak respons atau muncul overload, hentikan bolus otomatis dan cari penyebab lain.</p></article></div>
      <div className="iv-callout"><strong>🔴 Fluid safety rule</strong><span>Jangan mengejar angka volume secara otomatis. Cairan adalah obat: pilih indication, dose, rate, response, dan endpoint.</span></div>
      <div className="iv-two"><article><h3>Resuscitation</h3><ul><li><b>Dewasa:</b> crystalloid adalah first-line untuk resusitasi sepsis/septic shock.</li><li><b>Sepsis:</b> SSC 2026 menyarankan balanced crystalloid dibanding 0,9% NaCl pada resusitasi awal.</li><li><b>Sepsis + TBI:</b> SSC 2026 menyarankan 0,9% NaCl.</li><li><b>NICE:</b> crystalloid dengan Na 130–154 mmol/L; bolus dewasa 500 mL &lt;15 menit, lalu reassess.</li><li><b>Perdarahan aktif:</b> prioritaskan kontrol perdarahan dan blood components sesuai protokol.</li></ul></article><article><h3>Routine maintenance</h3><ul><li>NICE: 25–30 mL/kg/hari water sebagai starting range.</li><li>Pertimbangkan 20–25 mL/kg/hari pada pasien older/frail, renal impairment, atau cardiac failure.</li><li>Obesitas: gunakan ideal body weight dan lower range; kebutuhan total jarang &gt;3 L/hari.</li><li>Perhitungkan oral/enteral intake, obat, transfusi, nutrition, urine dan ongoing losses.</li></ul></article></div>
    </div>}
    {tab==='selector'&&<div className="iv-content"><div className="iv-selector-grid">{scenarios.map(([condition,choice,reason])=><article key={condition}><div><Chip>{condition}</Chip><h3>{choice}</h3></div><p>{reason}</p></article>)}</div><div className="iv-warning"><strong>High-risk / expert input</strong><div><Chip>Heart failure</Chip><Chip>AKI / CKD</Chip><Chip>Cirrhosis</Chip><Chip>Severe Na disorder</Chip><Chip>TBI</Chip><Chip>Major burns</Chip><Chip>Neonates</Chip><Chip>Pulmonary edema</Chip></div></div></div>}
    {tab==='fluids'&&<div className="iv-content"><div className="fluid-cards">{fluids.map(f=><article key={f.name}><Chip>{f.name}</Chip><small>{f.examples}</small><h3>Best use</h3><p>{f.use}</p><h3>⚠ Caution</h3><p>{f.avoid}</p></article>)}</div><div className="iv-note"><strong>Chloride:</strong> NICE recommends monitoring serum chloride in patients receiving fluids with chloride &gt;120 mmol/L, such as 0.9% saline; if hyperchloremia or acidaemia develops, reassess the prescription and acid–base status.</div></div>}
    {tab==='monitor'&&<div className="iv-content"><div className="iv-monitor-grid"><article><b>Perfusion</b><span>CRT, ekstremitas, mental status, pulse quality</span></article><article><b>Haemodynamics</b><span>BP/MAP, HR, response to intervention</span></article><article><b>Dynamic response</b><span>PLR / stroke-volume response where available</span></article><article><b>Respiratory</b><span>SpO₂, work of breathing, crackles, pulmonary edema</span></article><article><b>Renal</b><span>Urine output, creatinine, electrolytes</span></article><article><b>Balance</b><span>Input/output, daily weight, cumulative balance</span></article><article><b>Metabolic</b><span>Lactate, Na, K, Cl, HCO₃, glucose as indicated</span></article><article><b>Endpoint</b><span>Stop when the therapeutic goal is achieved or fluid intolerance develops.</span></article></div><div className="iv-stop"><strong>STOP & REASSESS</strong><span>New/worsening oxygen requirement, pulmonary edema, rising venous congestion, worsening fluid balance, or no haemodynamic benefit after a measured challenge → do not automatically repeat the bolus.</span></div><div className="iv-maint"><h3>Maintenance quick calculator</h3><label><span>Berat badan</span><div><input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="kg"/><small>kg</small></div></label>{maintenance&&<div><strong>{maintenance.dailyLow}–{maintenance.dailyHigh} mL/hari</strong><span>25–30 mL/kg/day · NICE starting range</span><strong>{maintenance.hourly.toFixed(1)} mL/jam</strong><span>Holliday–Segar 4-2-1 hourly maintenance reference</span></div>}<p>Angka adalah starting point, bukan prescription otomatis. Sesuaikan dengan usia, frailty, renal/cardiac status, electrolytes, intake, dan ongoing losses.</p></div></div>}
    <div className="fluid-reference"><strong>Guideline base:</strong> Surviving Sepsis Campaign 2026; NICE CG174; pediatric isotonic maintenance guidance; disease-specific protocols for hemorrhage, burns, DKA/HHS, dysnatremia, and TBI. Verify local formulary and hospital protocol before prescribing.</div>
    <div className="clinical-disclaimer"><strong>EDUCATIONAL CLINICAL TOOL</strong><span>Ini adalah decision-support edukasional, bukan pengganti clinical assessment. Komposisi cairan dapat berbeda menurut produk/formularium lokal. Verifikasi konsentrasi elektrolit, indication, contraindication, dose, rate, dan monitoring sebelum pemberian.</span></div>
  </section>
}