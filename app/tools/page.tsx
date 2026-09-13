'use client'

import { useMemo, useState } from 'react'
import ToolStyles from './ToolStyles'
import FluidGuide from './FluidGuide'
import AcidBaseTool from './AcidBaseTool'
import AdvancedCalculators from './AdvancedCalculators'

type Tool = 'drugDosing' | 'bmi' | 'egfr' | 'crcl' | 'bsa' | 'gcs' | 'map' | 'shock' | 'anion' | 'correctedNa' | 'pedsFluid' | 'tpm' | 'acidBase'

const toolCards = [
  { id:'drugDosing' as Tool, icon:'💊', title:'Kalkulator Dosis Obat', category:'Medication', desc:'Hitung dosis obat berbasis indikasi, usia/populasi, berat badan, fungsi ginjal, rute, dan regimen.' },
  { id:'bmi' as Tool, icon:'⚖', title:'BMI', category:'General', desc:'Body mass index dari berat dan tinggi badan.' },
  { id:'bsa' as Tool, icon:'📐', title:'BSA', category:'General', desc:'Luas permukaan tubuh dengan Mosteller.' },
  { id:'egfr' as Tool, icon:'🫘', title:'eGFR CKD-EPI 2021', category:'Renal', desc:'Estimasi GFR berbasis kreatinin, usia, dan jenis kelamin.' },
  { id:'crcl' as Tool, icon:'🧪', title:'Creatinine Clearance', category:'Renal', desc:'Cockcroft–Gault untuk estimasi CrCl.' },
  { id:'gcs' as Tool, icon:'🧠', title:'GCS', category:'Emergency', desc:'Hitung Glasgow Coma Scale secara terstruktur.' },
  { id:'map' as Tool, icon:'♥', title:'MAP', category:'Emergency', desc:'Mean arterial pressure dari tekanan darah.' },
  { id:'shock' as Tool, icon:'↗', title:'Shock Index', category:'Emergency', desc:'HR dibagi SBP sebagai screening sederhana.' },
  { id:'tpm' as Tool, icon:'💧', title:'TPM Infus', category:'Fluid Therapy', desc:'Hitung tetes per menit dan mL/jam.' },
  { id:'anion' as Tool, icon:'＋', title:'Anion Gap', category:'Metabolic', desc:'AG dan AG terkoreksi albumin.' },
  { id:'correctedNa' as Tool, icon:'Na', title:'Corrected Sodium', category:'Metabolic', desc:'Estimasi Na terkoreksi pada hiperglikemia.' },
  { id:'acidBase' as Tool, icon:'pH', title:'Acid–Base Analyzer', category:'ABG / Metabolic', desc:'Interpretasi pH, PaCO₂, HCO₃⁻, kompensasi, AG, dan mixed disorder.' },
  { id:'pedsFluid' as Tool, icon:'◒', title:'Pediatric Maintenance Fluid', category:'Pediatrics', desc:'Rumus Holliday–Segar / 4-2-1.' },
]

function Field({label,value,onChange,unit='',type='number',placeholder=''}:{label:string;value:string;onChange:(v:string)=>void;unit?:string;type?:string;placeholder?:string}){
  return <label className="tool-field"><span>{label}</span><div className="input-wrap"><input type={type} inputMode={type==='number'?'decimal':undefined} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/><small>{unit}</small></div></label>
}
function Result({value,label,note}:{value:string;label:string;note?:string}){return <div className="tool-result"><span>{label}</span><strong>{value}</strong>{note&&<small>{note}</small>}</div>}

export default function ToolsPage(){
  const [active,setActive]=useState<Tool>('bmi')
  const [query,setQuery]=useState('')
  const [weight,setWeight]=useState(''), [height,setHeight]=useState(''), [age,setAge]=useState('')
  const [sex,setSex]=useState<'male'|'female'>('male'), [scr,setScr]=useState(''), [crclWeight,setCrclWeight]=useState('')
  const [gcsE,setGcsE]=useState('4'), [gcsV,setGcsV]=useState('5'), [gcsM,setGcsM]=useState('6')
  const [sbp,setSbp]=useState(''), [dbp,setDbp]=useState(''), [hr,setHr]=useState('')
  const [na,setNa]=useState(''), [cl,setCl]=useState(''), [hco3,setHco3]=useState(''), [albumin,setAlbumin]=useState('4'), [glucose,setGlucose]=useState('')
  const [fluidWeight,setFluidWeight]=useState('')
  const [tpmVolume,setTpmVolume]=useState(''), [tpmTime,setTpmTime]=useState(''), [dropFactor,setDropFactor]=useState('20')
  const [tpmCalculated,setTpmCalculated]=useState(false)

  const filtered=useMemo(()=>toolCards.filter(t=>`${t.title} ${t.category} ${t.desc}`.toLowerCase().includes(query.toLowerCase())),[query])
  const n=(v:string)=>Number(v.replace(',','.'))
  const bmi=weight&&height?n(weight)/Math.pow(n(height)/100,2):NaN
  const bsa=weight&&height?Math.sqrt((n(weight)*n(height))/3600):NaN
  const egfr=(()=>{const s=n(scr),a=n(age);if(!Number.isFinite(s)||s<=0||!Number.isFinite(a)||a<=0)return NaN;const k=sex==='female'?0.7:0.9;const alpha=sex==='female'?-0.241:-0.302;return 142*Math.pow(Math.min(s/k,1),alpha)*Math.pow(Math.max(s/k,1),-1.2)*Math.pow(0.9938,a)*(sex==='female'?1.012:1)})()
  const crcl=(()=>{const s=n(scr),a=n(age),w=n(crclWeight);if(!s||!a||!w)return NaN;const base=((140-a)*w)/(72*s);return sex==='female'?base*0.85:base})()
  const map=sbp&&dbp?(n(sbp)+2*n(dbp))/3:NaN
  const shock=hr&&sbp?n(hr)/n(sbp):NaN
  const ag=na&&cl&&hco3?n(na)-n(cl)-n(hco3):NaN
  const correctedAg=Number.isFinite(ag)&&albumin?ag+2.5*(4-n(albumin)):NaN
  const correctedNa=na&&glucose?n(na)+1.6*((n(glucose)-100)/100):NaN
  const maintenance=(()=>{const w=n(fluidWeight);if(!w||w<0)return NaN;return w<=10?w*4:w<=20?40+(w-10)*2:60+(w-20)})()
  const tpm=(()=>{const v=n(tpmVolume),h=n(tpmTime),f=n(dropFactor);if(!v||v<=0||!h||h<=0||!f)return {gtt:NaN,mlhr:NaN};return {gtt:(v*f)/(h*60),mlhr:v/h}})()
  const activeTitle=toolCards.find(t=>t.id===active)?.title
  const selectTool=(id:Tool)=>{if(id==='drugDosing'){window.location.href='/tools/dosing';return}setActive(id);if(id!=='tpm')setTpmCalculated(false)}
  const clearTPM=()=>{setTpmVolume('');setTpmTime('');setDropFactor('20');setTpmCalculated(false)}

  return <>
    <ToolStyles/>
    <div className="section tools-page">
      <div className="section-kicker">Clinical Tools</div>
      <div className="tools-header"><div><h1>Clinical Tools</h1><p className="section-intro">Kalkulator klinis yang cepat, sederhana, dan transparan. Masukkan parameter pasien, lihat hasilnya, lalu verifikasi konteks klinis dan guideline.</p></div><div className="tools-count"><strong>{toolCards.length}</strong><span>tools aktif</span></div></div>
      <div className="tool-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari kalkulator dosis obat, BMI, eGFR, TPM, GCS, acid–base..."/></div>
      <div className="tool-layout">
        <aside className="tool-sidebar"><div className="tool-side-label">ALL TOOLS</div>{filtered.map(t=><button key={t.id} onClick={()=>selectTool(t.id)} className={`tool-nav ${active===t.id?'active':''}`}><span>{t.icon}</span><div><strong>{t.title}</strong><small>{t.category}</small></div></button>)}</aside>
        <main className="tool-workspace">
          <div className="tool-workspace-top"><div><span className="meta">CALCULATOR</span><h2>{activeTitle}</h2></div><span className="tool-status">Educational tool</span></div>
          {active==='bmi'&&<div className="tool-panel"><div className="tool-fields"><Field label="Berat badan" value={weight} onChange={setWeight} unit="kg"/><Field label="Tinggi badan" value={height} onChange={setHeight} unit="cm"/></div><div className="result-grid"><Result label="BMI" value={Number.isFinite(bmi)?bmi.toFixed(1):'—'} note={Number.isFinite(bmi)?bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':'Obesity':undefined}/><Result label="BSA" value={Number.isFinite(bsa)?`${bsa.toFixed(2)} m²`:'—'}/></div><p className="tool-note">Kategori BMI dapat berbeda menurut populasi dan konteks klinis.</p></div>}
          {active==='bsa'&&<div className="tool-panel"><div className="tool-fields"><Field label="Berat badan" value={weight} onChange={setWeight} unit="kg"/><Field label="Tinggi badan" value={height} onChange={setHeight} unit="cm"/></div><Result label="Mosteller BSA" value={Number.isFinite(bsa)?`${bsa.toFixed(2)} m²`:'—'}/><p className="tool-note">Pastikan obat atau intervensi memang direkomendasikan menggunakan BSA.</p></div>}
          {active==='egfr'&&<div className="tool-panel"><div className="tool-fields"><Field label="Serum creatinine" value={scr} onChange={setScr} unit="mg/dL"/><Field label="Usia" value={age} onChange={setAge} unit="tahun"/><label className="tool-field"><span>Jenis kelamin</span><select value={sex} onChange={e=>setSex(e.target.value as 'male'|'female')}><option value="male">Laki-laki</option><option value="female">Perempuan</option></select></label></div><Result label="eGFR CKD-EPI 2021" value={Number.isFinite(egfr)?`${egfr.toFixed(1)} mL/min/1.73 m²`:'—'}/><p className="tool-note">Estimasi berbasis creatinine, bukan pengukuran GFR langsung.</p></div>}
          {active==='crcl'&&<div className="tool-panel"><div className="tool-fields"><Field label="Serum creatinine" value={scr} onChange={setScr} unit="mg/dL"/><Field label="Usia" value={age} onChange={setAge} unit="tahun"/><Field label="Berat badan" value={crclWeight} onChange={setCrclWeight} unit="kg"/><label className="tool-field"><span>Jenis kelamin</span><select value={sex} onChange={e=>setSex(e.target.value as 'male'|'female')}><option value="male">Laki-laki</option><option value="female">Perempuan</option></select></label></div><Result label="Cockcroft–Gault CrCl" value={Number.isFinite(crcl)?`${crcl.toFixed(1)} mL/min`:'—'}/><p className="tool-note">Pada obesitas atau ekstrem berat badan, pilih weight descriptor sesuai referensi/protokol.</p></div>}
          {active==='gcs'&&<div className="tool-panel"><div className="tool-fields"><label className="tool-field"><span>Eye opening</span><select value={gcsE} onChange={e=>setGcsE(e.target.value)}><option value="4">4 — Spontaneous</option><option value="3">3 — To voice</option><option value="2">2 — To pressure</option><option value="1">1 — None</option></select></label><label className="tool-field"><span>Verbal</span><select value={gcsV} onChange={e=>setGcsV(e.target.value)}><option value="5">5 — Oriented</option><option value="4">4 — Confused</option><option value="3">3 — Inappropriate words</option><option value="2">2 — Incomprehensible sounds</option><option value="1">1 — None</option></select></label><label className="tool-field"><span>Motor</span><select value={gcsM} onChange={e=>setGcsM(e.target.value)}><option value="6">6 — Obeys commands</option><option value="5">5 — Localizes</option><option value="4">4 — Normal flexion</option><option value="3">3 — Abnormal flexion</option><option value="2">2 — Extension</option><option value="1">1 — None</option></select></label></div><Result label="Total GCS" value={`${n(gcsE)+n(gcsV)+n(gcsM)} / 15`}/><p className="tool-note">Dokumentasikan E/V/M, bukan hanya total. Sedasi, paralisis, atau intubasi dapat memengaruhi penilaian.</p></div>}
          {active==='map'&&<div className="tool-panel"><div className="tool-fields"><Field label="Systolic BP" value={sbp} onChange={setSbp} unit="mmHg"/><Field label="Diastolic BP" value={dbp} onChange={setDbp} unit="mmHg"/></div><Result label="MAP" value={Number.isFinite(map)?`${map.toFixed(0)} mmHg`:'—'}/><p className="tool-note">MAP adalah estimasi sederhana dan tidak menggantikan penilaian perfusi organ.</p></div>}
          {active==='shock'&&<div className="tool-panel"><div className="tool-fields"><Field label="Heart rate" value={hr} onChange={setHr} unit="/min"/><Field label="Systolic BP" value={sbp} onChange={setSbp} unit="mmHg"/></div><Result label="Shock Index" value={Number.isFinite(shock)?shock.toFixed(2):'—'}/><p className="tool-note">Shock Index adalah alat bantu screening, bukan diagnosis tunggal.</p></div>}
          {active==='tpm'&&<div className="tool-panel tpm-panel"><div className="tpm-intro"><div><span className="meta">IV FLOW RATE</span><h3>TPM Infus Calculator</h3><p>Masukkan volume cairan, durasi pemberian, dan drop factor sesuai kemasan infus set.</p></div><span className="tool-status">Real-time calculator</span></div><div className="tool-fields"><Field label="Volume cairan" value={tpmVolume} onChange={v=>{setTpmVolume(v);setTpmCalculated(false)}} unit="mL" placeholder="500"/><Field label="Waktu pemberian" value={tpmTime} onChange={v=>{setTpmTime(v);setTpmCalculated(false)}} unit="jam" placeholder="4"/><label className="tool-field"><span>Drop factor infus</span><select value={dropFactor} onChange={e=>{setDropFactor(e.target.value);setTpmCalculated(false)}}><option value="10">Macrodrip — 10 gtt/mL</option><option value="15">Macrodrip — 15 gtt/mL</option><option value="20">Macrodrip — 20 gtt/mL</option><option value="60">Microdrip — 60 gtt/mL</option></select></label></div><div className="tpm-actions"><button type="button" className="primary-tool-btn" onClick={()=>setTpmCalculated(true)}>Hitung TPM</button><button type="button" className="secondary-tool-btn" onClick={clearTPM}>Reset</button></div>{tpmCalculated&&<div className="result-grid tpm-results"><Result label="TPM / tetes per menit" value={Number.isFinite(tpm.gtt)?`${Math.round(tpm.gtt)} tetes/menit`:'Input belum lengkap'} note={Number.isFinite(tpm.gtt)?'Dibulatkan ke tetes/menit terdekat.':undefined}/><Result label="Kecepatan cairan" value={Number.isFinite(tpm.mlhr)?`${tpm.mlhr.toFixed(1)} mL/jam`:'—'}/></div>}<div className="tpm-formula"><strong>Rumus</strong><code>TPM = volume (mL) × drop factor (gtt/mL) ÷ waktu (menit)</code><span>Waktu dalam kalkulator dimasukkan dalam jam → otomatis × 60 untuk mendapatkan menit.</span></div><div className="tpm-example"><strong>Contoh:</strong> NaCl 0,9% 500 mL selama 4 jam dengan macrodrip 20 gtt/mL → <b>42 tetes/menit</b> dan <b>125 mL/jam</b>.</div><p className="tool-note">⚠️ Selalu cek drop factor yang tercetak pada infus set. Verifikasi hasil dan konteks klinis sebelum terapi diberikan.</p></div>}
          {active==='anion'&&<div className="tool-panel"><div className="tool-fields"><Field label="Na⁺" value={na} onChange={setNa} unit="mmol/L"/><Field label="Cl⁻" value={cl} onChange={setCl} unit="mmol/L"/><Field label="HCO₃⁻" value={hco3} onChange={setHco3} unit="mmol/L"/><Field label="Albumin" value={albumin} onChange={setAlbumin} unit="g/dL"/></div><div className="result-grid"><Result label="Anion Gap" value={Number.isFinite(ag)?`${ag.toFixed(1)} mmol/L`:'—'}/><Result label="AG corrected for albumin" value={Number.isFinite(correctedAg)?`${correctedAg.toFixed(1)} mmol/L`:'—'}/></div><p className="tool-note">AG = Na − (Cl + HCO₃). Koreksi albumin menggunakan 2.5 × (4 − albumin).</p></div>}
          {active==='correctedNa'&&<div className="tool-panel"><div className="tool-fields"><Field label="Serum sodium" value={na} onChange={setNa} unit="mmol/L"/><Field label="Glucose" value={glucose} onChange={setGlucose} unit="mg/dL"/></div><Result label="Corrected sodium" value={Number.isFinite(correctedNa)?`${correctedNa.toFixed(1)} mmol/L`:'—'}/><p className="tool-note">Formula yang digunakan: Na corrected = Na measured + 1.6 × ((glucose − 100) / 100).</p></div>}
          {active==='acidBase'&&<AcidBaseTool/>}
          {active==='pedsFluid'&&<div className="tool-panel"><Field label="Berat badan anak" value={fluidWeight} onChange={setFluidWeight} unit="kg" placeholder="25"/><div className="result-grid"><Result label="Maintenance / jam" value={Number.isFinite(maintenance)?`${maintenance.toFixed(1)} mL/jam`:'—'}/><Result label="Maintenance / 24 jam" value={Number.isFinite(maintenance)?`${(maintenance*24).toFixed(0)} mL/hari`:'—'}/></div><p className="tool-note">Holliday–Segar: 4 mL/kg/jam untuk 10 kg pertama, 2 mL/kg/jam untuk 10 kg berikutnya, lalu 1 mL/kg/jam.</p></div>}
        </main>
      </div>
      <AdvancedCalculators/>
      <FluidGuide/>
    </div>
  </>
}
