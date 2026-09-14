'use client';
import {useMemo,useState} from 'react';
import {useRouter} from 'next/navigation';
import cases from './cases/data';

const quick=[
 {label:'Clinical Cases',meta:'50 kasus POMR',href:'/cases'},
 {label:'Emergency',meta:'100 emergency cases',href:'/emergency'},
 {label:'Clinical Tools',meta:'32 kalkulator klinis',href:'/tools'},
 {label:'Library',meta:'Guideline & referensi',href:'/library'}
];

export default function GlobalSearch(){
 const router=useRouter();
 const [value,setValue]=useState('');
 const [open,setOpen]=useState(false);
 const q=value.trim().toLowerCase();
 const caseResults=useMemo(()=>q?cases.filter(c=>`${c.title} ${c.department} ${c.diagnosis} ${c.difficulty}`.toLowerCase().includes(q)).slice(0,6):[],[q]);
 const quickResults=useMemo(()=>quick.filter(x=>!q||`${x.label} ${x.meta}`.toLowerCase().includes(q)),[q]);
 const go=(href:string)=>{setOpen(false);router.push(href)};
 return <div className="global-search-wrap">
  <div className={`global-search ${open?'is-open':''}`}>
   <span className="global-search-icon" aria-hidden="true">⌕</span>
   <input aria-label="Cari di Dokter Jaga" value={value} onChange={e=>{setValue(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)} onKeyDown={e=>{if(e.key==='Enter'&&value.trim())go('/cases?search='+encodeURIComponent(value.trim()));if(e.key==='Escape')setOpen(false)}} placeholder="Cari kasus, diagnosis, obat, atau guideline..." />
   {value&&<button className="global-search-clear" onClick={()=>setValue('')} aria-label="Hapus pencarian">×</button>}
   <kbd>⌘ K</kbd>
  </div>
  {open&&<div className="global-search-results">
   {q&&caseResults.length>0&&<><small>CLINICAL CASES</small>{caseResults.map(c=><button key={c.id} onClick={()=>go('/cases?search='+encodeURIComponent(c.title))}><span className="search-result-number">{String(c.id).padStart(2,'0')}</span><span className="search-result-copy"><b>{c.title}</b><em>{c.department} · {c.difficulty}</em></span><i>→</i></button>)}</>}
   {quickResults.length>0&&<><small>MODULES</small>{quickResults.map(x=><button key={x.label} onClick={()=>go(x.href)}><span className="search-result-dot"/><span className="search-result-copy"><b>{x.label}</b><em>{x.meta}</em></span><i>→</i></button>)}</>}
   {q&&!caseResults.length&&!quickResults.length&&<div className="search-empty">Tidak ada hasil untuk <strong>“{value}”</strong>.</div>}
  </div>}
 </div>
}
