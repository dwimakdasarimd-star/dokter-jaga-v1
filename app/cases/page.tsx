'use client';
import {useEffect,useMemo,useState} from 'react';
import cases from './data';
import vignettes from './vignettes';
import POMRClinicalCaseView from './POMRClinicalCaseView';

type IconKind='heart'|'lungs'|'alert'|'bug'|'brain'|'pill'|'activity'|'stethoscope';
function CaseIcon({title,department}:{title:string;department:string}){
 const t=title.toLowerCase();
 let kind:IconKind='stethoscope';
 if(t.includes('stemi')||t.includes('pulmonary edema')) kind='heart';
 else if(t.includes('asma')||t.includes('copd')) kind='lungs';
 else if(t.includes('anafilaksis')) kind='alert';
 else if(t.includes('septic')||department==='Infectious Disease') kind='bug';
 else if(t.includes('stroke')||t.includes('intracerebral')||t.includes('epileptic')) kind='brain';
 else if(t.includes('drug')||t.includes('overdose')||t.includes('poison')) kind='pill';
 else if(t.includes('shock')||t.includes('dka')||department==='Emergency') kind='activity';
 const paths:Record<IconKind,string>={
  heart:'M12 21s-7-4.35-9.5-9A5.4 5.4 0 0 1 12 5.1 5.4 5.4 0 0 1 21.5 12C19 16.65 12 21 12 21Z M3 12h4l1.5-3 2.2 6 2-4 1.3 2H21',
  lungs:'M12 3v7 M12 10c-1.8-2.8-4-4.1-5.6-3.2C4.4 8 4 13 4.4 17c.3 2.6 2 4 4.2 3.4 2.1-.6 3.1-3.1 3.4-6.4 M12 10c1.8-2.8 4-4.1 5.6-3.2 2 .9 2.4 6 1.9 10.2-.3 2.6-2 4-4.2 3.4-2.1-.6-3.1-3.1-3.4-6.4',
  alert:'M12 3 22 20H2L12 3Z M12 9v5 M12 17h.01',
  bug:'M9 8V5h6v3 M8 12H4m16 0h-4M8 16l-3 3m11-3 3 3 M9 8h6a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4Z',
  brain:'M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V4H9Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V4h1Z M9 8h2m-2 4h2m4-4h-2m2 4h-2',
  pill:'M7 4a3 3 0 0 1 4.2 0l8.8 8.8a3 3 0 0 1 0 4.2l-1 1a3 3 0 0 1-4.2 0L6 9.2A3 3 0 0 1 6 5l1-1Z M8 9l6-6',
  activity:'M3 12h4l2-5 3 10 2-5h7',
  stethoscope:'M6 4v5a6 6 0 0 0 12 0V4 M6 4H4m2 0h2m6 0h2m-2 0v5 M18 15v2a4 4 0 0 1-8 0v-2'
 };
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true"><path d={paths[kind]}/></svg>;
}

export default function CasesPage(){
 const [q,setQ]=useState('');const [dept,setDept]=useState('All');const [level,setLevel]=useState('All');const [sort,setSort]=useState('Default');const [id,setId]=useState(1);
 useEffect(()=>{const s=new URLSearchParams(window.location.search).get('search');if(s)setQ(s)},[]);
 const depts=useMemo(()=>['All',...Array.from(new Set(cases.map(c=>c.department)))],[]);
 const filtered=useMemo(()=>{let list=cases.filter(c=>(dept==='All'||c.department===dept)&&(level==='All'||c.difficulty===level)&&`${c.title} ${c.department} ${c.diagnosis} ${c.vignette}`.toLowerCase().includes(q.trim().toLowerCase()));if(sort==='A–Z')list=[...list].sort((a,b)=>a.title.localeCompare(b.title));if(sort==='Difficulty'){const rank={Basic:0,Intermediate:1,Advanced:2};list=[...list].sort((a,b)=>rank[a.difficulty]-rank[b.difficulty])}return list},[q,dept,level,sort]);
 useEffect(()=>{if(filtered.length&&!filtered.some(c=>c.id===id))setId(filtered[0].id)},[filtered,id]);
 const active=filtered.find(c=>c.id===id)||filtered[0]||cases[0];
 return <div className="section page cases-page"><div className="cases-breadcrumb"><span>Clinical Cases</span><b>›</b><span>50 Cases</span><b>›</b><span>POMR</span></div><div className="cases-hero"><div><div className="section-kicker">PRACTICAL CLINICAL REASONING</div><h1>Clinical Cases</h1><p className="section-intro">Semua kasus menggunakan struktur <b>Problem-Oriented Medical Record (POMR)</b> untuk melatih clinical reasoning dari anamnesis sampai evidence base.</p></div><div className="case-count"><strong>50</strong><span>cases</span><small>Dari berbagai departemen<br/>dengan pembahasan lengkap.</small></div></div><div className="case-toolbar"><label className="case-search"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari diagnosis, kasus, departemen…"/><kbd>⌘ K</kbd>{q&&<button type="button" onClick={()=>setQ('')} aria-label="Hapus pencarian">×</button>}</label><select value={dept} onChange={e=>setDept(e.target.value)} aria-label="Filter departemen"><option value="All">Semua Departemen</option>{depts.slice(1).map(d=><option key={d} value={d}>{d}</option>)}</select><select value={level} onChange={e=>setLevel(e.target.value)} aria-label="Filter tingkat"><option value="All">Semua Tingkat</option><option>Basic</option><option>Intermediate</option><option>Advanced</option></select><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Urutkan"><option>Default</option><option>A–Z</option><option>Difficulty</option></select></div><div className="case-result-note">Menampilkan <b>{filtered.length}</b> dari 50 kasus{q&&<span> · pencarian “{q}”</span>}</div><div className="case-workspace"><aside className="case-list" aria-label="Daftar clinical cases">{filtered.map(c=><button key={c.id} className={`case-list-item ${active.id===c.id?'active':''}`} onClick={()=>setId(c.id)}><span className="case-num">{String(c.id).padStart(2,'0')}</span><span className="case-item-copy"><small>{c.department} · {c.difficulty}</small><b>{c.title}</b></span><span className="case-item-icon" aria-hidden="true"><CaseIcon title={c.title} department={c.department}/></span></button>)}{!filtered.length&&<div className="case-empty"><strong>Tidak ada kasus yang cocok.</strong><span>Coba kata kunci atau filter lain.</span><button onClick={()=>{setQ('');setDept('All');setLevel('All');setSort('Default')}}>Reset filter</button></div>}</aside><main className="case-detail"><div className="case-detail-top"><div><span className="meta">CASE {String(active.id).padStart(2,'0')} · {active.department}</span><h2>{active.title}</h2></div><div className="case-detail-actions"><button type="button">♡ <span>Simpan</span></button><button type="button">↗ <span>Bagikan</span></button><span className={`difficulty ${active.difficulty.toLowerCase()}`}>{active.difficulty}</span></div></div><div className="case-tabs"><button className="active">POMR</button><button>Pembahasan</button><button>Guideline</button><button>Referensi</button><button>Diskusi</button></div><POMRClinicalCaseView item={active} vignette={vignettes[active.id]||active.vignette}/></main></div><div className="clinical-disclaimer"><b>Educational use only.</b> Materi dirancang untuk pembelajaran clinical reasoning. Verifikasi guideline, dosis, kontraindikasi, dan protokol lokal sebelum praktik.</div></div>}
