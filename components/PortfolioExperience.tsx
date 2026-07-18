"use client";
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {motion,AnimatePresence} from 'motion/react';
import type {Project} from '../content/site';

export function ProjectScene({type,compact=false}:{type:Project['visualSceneType'];compact?:boolean}){return <div className={`project-scene scene-${type} ${compact?'compact':''}`} aria-hidden="true"><div className="scene-sky"/><div className="scene-ground"/><div className="scene-water"/><div className="scene-roads"><i/><i/><i/></div><div className="scene-buildings">{Array.from({length:9}).map((_,i)=><i key={i}/>)}</div><div className="scene-structure">{Array.from({length:8}).map((_,i)=><i key={i}/>)}</div><div className="scene-landscape">{Array.from({length:12}).map((_,i)=><i key={i}/>)}</div><div className="scene-light"/></div>}

export function PortfolioExperience({projects,filters}:{projects:Project[];filters:string[]}){const [active,setActive]=useState('All');const visible=useMemo(()=>active==='All'?projects:projects.filter(p=>p.categories.includes(active)),[active,projects]);return <>
 <div className="portfolio-filters" role="toolbar" aria-label="Filter portfolio">{['All',...filters].map(f=><button key={f} className={active===f?'active':''} onClick={()=>setActive(f)} aria-pressed={active===f}>{f}</button>)}</div>
 <div className="portfolio-scenes" aria-live="polite"><AnimatePresence mode="popLayout">{visible.map((p,i)=><motion.article layout initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.45}} className="portfolio-study" key={p.slug}><ProjectScene type={p.visualSceneType} compact/><div className="study-index">{String(i+1).padStart(2,'0')} / {String(visible.length).padStart(2,'0')}</div><div className="study-copy"><p>{p.categories.join(' · ')}</p><h2>{p.title}</h2><p>{p.location} · {p.status}</p><p>{p.summary}</p><div><Link href={`/studio/portfolio/${p.slug}`}>Examine project ↗</Link><Link href={`/booking?type=${p.inquiryType}&project=${p.slug}`}>Request consultation ↗</Link></div></div></motion.article>)}</AnimatePresence>{visible.length===0&&<div className="portfolio-empty"><p>No study currently occupies this category.</p><button onClick={()=>setActive('All')}>Return to all work</button></div>}</div>
 </>}
