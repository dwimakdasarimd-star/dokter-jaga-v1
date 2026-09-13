'use client'

import { useMemo, useState } from 'react'

const num=(v:string)=>Number(v.replace(',','.'))

export default function AcidBaseTool(){
  const [ph,setPh]=useState('')
  const [pco2,setPco2]=useState('')
  const [hco3,setHco3]=useState('')
  const [na,setNa]=useState('')
  const [cl,setCl]=useState('')
  const [albumin,setAlbumin]=useState('4')

  const result=useMemo(()=>{
    const p=num(ph), co2=num(pco2), b=num(hco3), n=num(na), c=num(cl), alb=num(albumin)
    if(!Number.isFinite(p)||!Number.isFinite(co2)||!Number.isFinite(b)||p<=0||co2<=0||b<=0) return null

    const acidemia=p<7.35, alkalemia=p>7.45
    let primary='Normal / near-normal pH'
    if(acidemia) primary=co2>40&&b>=22?'Primary respiratory acidosis':co2<=40&&b<24?'Primary metabolic acidosis':co2>40?'Acidemia with respiratory component':'Acidemia with metabolic component'
    if(alkalemia) primary=co2<40&&b<=26?'Primary respiratory alkalosis':co2>=40&&b>24?'Primary metabolic alkalosis':co2<40?'Alkalemia with respiratory component':'Alkalemia with metabolic component'

    let compensation='—'
    let expectedLow=NaN, expectedHigh=NaN, mixed=false
    if(acidemia && b<24){
      const expected=1.5*b+8; expectedLow=expected-2; expectedHigh=expected+2
      compensation=`Winter: expected PaCO₂ ${expectedLow.toFixed(0)}–${expectedHigh.toFixed(0)} mmHg`
      mixed=co2<expectedLow||co2>expectedHigh
    } else if(alkalemia && b>24){
      const expected=0.7*(b-24)+40; expectedLow=expected-5; expectedHigh=expected+5
      compensation=`Expected PaCO₂ ${expectedLow.toFixed(0)}–${expectedHigh.toFixed(0)} mmHg`
      mixed=co2<expectedLow||co2>expectedHigh
    } else if(acidemia && co2>40){
      const delta=co2-40
      compensation=`Expected HCO₃⁻: acute ≈ ${(24+delta/10).toFixed(1)}, chronic ≈ ${(24+delta*3.5/10).toFixed(1)} mmol/L`
      const acute=24+delta/10, chronic=24+delta*3.5/10
      mixed=b<acute-2||b>chronic+2
    } else if(alkalemia && co2<40){
      const delta=40-co2
      compensation=`Expected HCO₃⁻: acute ≈ ${(24-delta*2/10).toFixed(1)}, chronic ≈ ${(24-delta*4.5/10).toFixed(1)} mmol/L`
      const acute=24-delta*2/10, chronic=24-delta*4.5/10
      mixed=b>acute+2||b<chronic-2
    }

    const ag=Number.isFinite(n)&&Number.isFinite(c)?n-c-b:NaN
    const correctedAg=Number.isFinite(ag)&&Number.isFinite(alb)?ag+2.5*(4-alb):NaN
    const deltaRatio=Number.isFinite(correctedAg)&&correctedAg>12&&b<24?(correctedAg-12)/(24-b):NaN
    let deltaText='—'
    if(Number.isFinite(deltaRatio)) deltaText=deltaRatio<0.4?'<0.4: tambahan non-AG acidosis kemungkinan':deltaRatio<0.8?'0.4–0.8: mixed high-AG + non-AG acidosis kemungkinan':deltaRatio<=2?'0.8–2.0: konsisten dengan high-AG metabolic acidosis':' >2: pertimbangkan concurrent metabolic alkalosis / chronic respiratory acidosis'

    const overall=mixed?'Curiga mixed acid–base disorder':'Pola primer sesuai dengan kompensasi yang diharapkan'
    return {primary,compensation,mixed,overall,ag,correctedAg,deltaText,p,co2,b}
  },[ph,pco2,hco3,na,cl,albumin])

  const reset=()=>{setPh('');setPco2('');setHco3('');setNa('');setCl('');setAlbumin('4')}
  const field=(label:string,value:string,setter:(v:string)=>void,unit:string,placeholder:string)=><label className="tool-field"><span>{label}</span><div className="input-wrap"><input value={value} onChange={e=>setter(e.target.value)} inputMode="decimal" placeholder={placeholder}/><small>{unit}</small></div></label>

  return <div className="tool-panel acid-base-panel">
    <div className="acid-base-intro"><div><span className="meta">ABG / VBG INTERPRETATION</span><h3>Acid–Base Disorder Analyzer</h3><p>Masukkan pH, PaCO₂, HCO₃⁻, dan elektrolit untuk mengidentifikasi gangguan primer, menilai kompensasi, dan mencari mixed disorder.</p></div><span className="tool-status">Step-by-step</span></div>
    <div className="tool-fields">{field('pH',ph,setPh,'','7.25')}{field('PaCO₂',pco2,setPco2,'mmHg','40')}{field('HCO₃⁻',hco3,setHco3,'mmol/L','18')}{field('Na⁺',na,setNa,'mmol/L','140')}{field('Cl⁻',cl,setCl,'mmol/L','105')}{field('Albumin',albumin,setAlbumin,'g/dL','4.0')}</div>
    <div className="tpm-actions"><button type="button" className="primary-tool-btn" onClick={()=>{}}>Analyze</button><button type="button" className="secondary-tool-btn" onClick={reset}>Reset</button></div>
    {result&&<>
      <div className={`acid-alert ${result.mixed?'mixed':'ok'}`}><strong>{result.overall}</strong><span>{result.primary}</span></div>
      <div className="result-grid">
        <div className="tool-result"><span>Primary disorder</span><strong>{result.primary}</strong><small>pH {result.p.toFixed(2)} · PaCO₂ {result.co2.toFixed(0)} · HCO₃⁻ {result.b.toFixed(0)}</small></div>
        <div className="tool-result"><span>Compensation check</span><strong>{result.mixed?'Tidak sesuai':'Sesuai'}</strong><small>{result.compensation}</small></div>
        <ResultBox label="Anion gap" value={Number.isFinite(result.ag)?result.ag.toFixed(1):'—'} note="AG = Na − (Cl + HCO₃⁻)"/>
        <ResultBox label="AG corrected" value={Number.isFinite(result.correctedAg)?result.correctedAg.toFixed(1):'—'} note="Koreksi albumin 2.5 × (4 − albumin)"/>
      </div>
      {Number.isFinite(result.deltaRatio)&&<div className="acid-delta"><strong>Delta ratio</strong><span>{result.deltaRatio?.toFixed(2)}</span><small>{result.deltaText}</small></div>}
      <div className="acid-algorithm"><h4>Interpretation pathway</h4><ol><li><b>pH:</b> tentukan acidemia, alkalemia, atau pH relatif normal.</li><li><b>Primary process:</b> lihat arah PaCO₂ versus HCO₃⁻ terhadap perubahan pH.</li><li><b>Compensation:</b> gunakan Winter untuk metabolic acidosis dan expected PaCO₂/HCO₃⁻ untuk respiratory disorders.</li><li><b>Mixed disorder:</b> bila kompensasi berada di luar rentang expected, cari gangguan kedua.</li><li><b>Metabolic acidosis:</b> hitung anion gap dan pertimbangkan koreksi albumin serta delta ratio.</li></ol></div>
    </>}
    <p className="tool-note">⚠️ Educational interpretation only. Gunakan konteks klinis, kualitas sampel, timing, dan tren serial. ABG/VBG tidak boleh ditafsirkan hanya dari satu angka.</p>
  </div>
}

function ResultBox({label,value,note}:{label:string;value:string;note:string}){return <div className="tool-result"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>}
