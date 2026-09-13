'use client'

import { useEffect } from 'react'

function syncTPM(){
  const panels=document.querySelectorAll<HTMLElement>('.tpm-panel')
  panels.forEach(panel=>{
    const inputs=panel.querySelectorAll<HTMLInputElement>('input')
    const select=panel.querySelector('select') as HTMLSelectElement|null
    const results=panel.querySelectorAll<HTMLElement>('.tpm-results .tool-result strong')
    if(inputs.length<2||!select||results.length<2)return
    const parse=(value:string)=>Number(value.trim().replace(/\s/g,'').replace(',','.'))
    const volume=parse(inputs[0].value)
    const hours=parse(inputs[1].value)
    const factor=parse(select.value)
    if(!Number.isFinite(volume)||volume<=0||!Number.isFinite(hours)||hours<=0||!Number.isFinite(factor)||factor<=0)return
    const gtt=Math.round((volume*factor)/(hours*60))
    const mlhr=volume/hours
    const next=[`${gtt} tetes/menit`,`${mlhr.toFixed(1)} mL/jam`]
    results.forEach((el,i)=>{if(el.textContent!==next[i])el.textContent=next[i]})
  })
}

export default function FluidGuide(){
  useEffect(()=>{
    const observer=new MutationObserver(()=>setTimeout(syncTPM,0))
    observer.observe(document.body,{subtree:true,childList:true,characterData:true})
    const timer=window.setTimeout(syncTPM,100)
    return()=>{observer.disconnect();window.clearTimeout(timer)}
  },[])

  return <section className="fluid-guide">
<div className="fluid-guide-head"><div><span className="meta">IV FLUID GUIDE</span><h2>Pemilihan Cairan Infus</h2><p>Mulai dari tujuan terapi: <strong>resusitasi, maintenance, replacement, atau redistribution</strong>. Jenis cairan tidak dipilih hanya berdasarkan diagnosis.</p></div><span className="tool-status">Adult + Pediatrics</span></div>
<div className="fluid-principle"><strong>5R</strong><span>Resuscitation</span><span>Routine maintenance</span><span>Replacement</span><span>Redistribution</span><span>Reassessment</span></div>
<div className="fluid-tabs">
<article><div className="fluid-label emergency">RESUSCITATION</div><h3>Hipoperfusi / shock?</h3><ul><li><b>Dewasa:</b> gunakan crystalloid dengan Na sekitar 130–154 mmol/L; balanced crystalloid merupakan pilihan penting pada banyak kondisi.</li><li><b>Sepsis:</b> balanced crystalloid disarankan dibanding 0.9% NaCl bila sesuai konteks.</li><li><b>Pediatri:</b> gunakan glucose-free isotonic crystalloid dan reassess setelah setiap bolus. Kondisi jantung/ginjal dapat memerlukan volume lebih kecil.</li><li><b>Perdarahan:</b> jangan mengandalkan crystalloid saja; pertimbangkan blood components dan protokol perdarahan masif sesuai kondisi.</li></ul></article>
<article><div className="fluid-label maintenance">MAINTENANCE</div><h3>Kebutuhan harian tanpa shock</h3><ul><li><b>Dewasa:</b> titik awal sekitar 25–30 mL/kg/hari, lalu sesuaikan usia, frailty, gagal jantung, gangguan ginjal, kehilangan ongoing, dan intake oral.</li><li><b>Pediatri:</b> gunakan isotonic crystalloid untuk maintenance. Dextrose dan KCl dipertimbangkan sesuai usia, intake, elektrolit, dan fungsi ginjal.</li><li>Jika kebutuhan dapat dipenuhi secara oral/enteral, IV fluid sebaiknya dihentikan.</li></ul></article>
<article><div className="fluid-label replacement">REPLACEMENT</div><h3>Ganti kehilangan ongoing</h3><ul><li>Identifikasi <b>apa yang hilang</b>: GI, drain, urine, perdarahan, atau third spacing.</li><li>Pilih cairan berdasarkan volume, elektrolit, dan komposisi kehilangan; jangan sekadar mengganti mL dengan mL.</li><li><b>Pediatri:</b> ongoing GI losses sering memerlukan isotonic crystalloid dan monitoring elektrolit serial.</li></ul></article>
</div>
<div className="fluid-decision"><h3>Quick selection: cairan mana?</h3><div className="fluid-table"><div className="fluid-row header"><span>Cairan</span><span>Paling berguna untuk</span><span>Perhatian</span></div><div className="fluid-row"><span><b>Balanced crystalloid</b><small>RL / Hartmann / Plasma-Lyte</small></span><span>Resusitasi dan replacement pada banyak kondisi</span><span>Perhatikan komposisi K/Ca/buffer dan konteks klinis</span></div><div className="fluid-row"><span><b>0.9% NaCl</b><small>Normal saline</small></span><span>Situasi yang membutuhkan Na/Cl relatif tinggi; alternatif balanced crystalloid</span><span>Cl tinggi → risiko hyperchloremia/acidaemia bila volume besar</span></div><div className="fluid-row"><span><b>Dextrose-containing</b><small>D5-containing fluid</small></span><span>Maintenance/dukungan glukosa pada indikasi tertentu</span><span>Bukan cairan resusitasi; pahami tonisitas dan konsentrasi</span></div><div className="fluid-row"><span><b>Albumin</b></span><span>Kasus terpilih setelah crystalloid, sesuai penyakit/guideline</span><span>Bukan pilihan rutin pertama untuk resusitasi</span></div><div className="fluid-row"><span><b>Blood products</b></span><span>Perdarahan signifikan / indikasi transfusi</span><span>Ikuti protokol transfusi dan target klinis</span></div></div></div>
<div className="fluid-redflags"><h3>⚠️ Perlu modifikasi / expert input</h3><div><span>♥ Heart failure / cardiogenic shock</span><span>🫘 AKI / CKD berat</span><span>🧠 Raised ICP / CNS disease</span><span>🔥 Major burns</span><span>🩸 Active haemorrhage</span><span>🧂 Severe Na abnormality</span><span>🧒 Neonates / NICU</span><span>🫁 Pulmonary oedema</span></div></div>
<div className="fluid-monitor"><h3>Reassess setelah cairan</h3><div className="monitor-grid"><span><b>Perfusion</b> CRT, ekstremitas, mental status</span><span><b>Haemodynamics</b> BP, HR, pulse, dynamic response</span><span><b>Respiratory</b> work of breathing, SpO₂, pulmonary oedema</span><span><b>Renal</b> urine output, creatinine, electrolytes</span><span><b>Balance</b> input/output dan cumulative balance</span><span><b>Labs</b> Na, K, Cl, HCO₃, glucose sesuai kasus</span></div></div>
<div className="fluid-reference"><strong>Guideline base:</strong> NICE CG174, NICE NG29, AAP maintenance IV fluids in children, dan Surviving Sepsis Campaign adult/pediatric guidance. Selalu cek versi terbaru dan protokol lokal.</div>
</section>
}
