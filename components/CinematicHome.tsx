"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TowerScene = dynamic(() => import("./TowerScene"), { ssr: false });

class WebGLBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(error:unknown){if(process.env.NODE_ENV==='development')console.info('Structūra: WebGL scene unavailable; architectural still is active.',error)}render(){return this.state.failed?null:this.props.children}}

const Arrow = () => <span aria-hidden="true">↗</span>;

function DraftGrid() {
  return <div className="draft-grid" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>;
}

function IntelligenceInterface() {
  return <div className="intel-interface" aria-hidden="true">
    <div className="map-plane"><div className="plot p-a"/><div className="plot p-b"/><div className="plot p-c"/><span>40.7128° N<br/>74.0060° W</span></div>
    <div className="model-block"><i/><i/><i/><i/><i/></div>
    <div className="metric-panel"><small>LIVE UNDERWRITING / 06</small><div><span>NOI</span><strong>$4.28M</strong></div><div><span>IRR</span><strong>18.4%</strong></div><div><span>CAP</span><strong>5.72%</strong></div><svg viewBox="0 0 420 120"><polyline points="0,100 48,82 92,88 140,46 190,61 245,24 300,49 360,15 420,8"/></svg></div>
    <div className="scenario"><small>SCENARIO 03 / LEVERED</small><b>Risk adjusted</b><span>72</span></div>
  </div>;
}

function EnterpriseInterface() {
  return <div className="enterprise-interface" aria-hidden="true">
    <div className="core-node"><small>STRUCTŪRA</small><b>CORE</b><span>System active</span></div>
    {['S-RED','S-FIN','S-AGRO','S-TECH'].map((x,i)=><div className={`suite-node n${i}`} key={x}><small>TERMINAL 0{i+1}</small><b>{x}</b><span>{['Real estate development','Institutional finance','Land + production','Technology systems'][i]}</span></div>)}
    <div className="permission-plane"><small>ORGANIZATION / ACCESS GRAPH</small>{['Director','Asset lead','Analyst','Auditor'].map((x,i)=><span key={x} style={{'--i':i} as React.CSSProperties}>{x}<i/></span>)}</div>
  </div>;
}

function StudioInterface() {
  const steps=['SITE','PROGRAM','GEOMETRY','STRUCTURE','MATERIAL','ENVIRONMENT','BUILDING'];
  return <div className="studio-interface" aria-hidden="true">
    <div className="studio-final"/>
    <div className="studio-guides"><div className="hand-line"/><div className="site-boundary"/><div className="floor-plan"><i/><i/><i/><i/><i/><i/></div><div className="floor-plates"><i/><i/><i/><i/><i/></div><div className="columns">{Array.from({length:10}).map((_,i)=><i key={i}/>)}</div><div className="walls"><i/><i/><i/></div><div className="facade-system"/></div>
    <div className="material stone"><span>LIMESTONE<br/>LS-04</span></div><div className="material glass"><span>LOW-E GLASS<br/>GL-02</span></div>
    <div className="process-rail">{steps.map((s,i)=><span key={s}><i>{String(i+1).padStart(2,'0')}</i>{s}</span>)}</div>
  </div>;
}

export function CinematicHome(){
  const root=useRef<HTMLDivElement>(null);
  const [webglReady,setWebglReady]=useState(false);
  const [useWebgl,setUseWebgl]=useState(false);
  useEffect(()=>{
    const mobile=window.matchMedia('(max-width: 900px)').matches;
    setUseWebgl(!mobile);
  },[]);
  useEffect(()=>{
    if(webglReady) return;
    if(process.env.NODE_ENV==='development' && useWebgl) console.info('Structūra: architectural still retained until WebGL is ready.');
  },[webglReady,useWebgl]);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile=window.matchMedia('(max-width: 900px)').matches;
    if(reduced || mobile) return;
    const ctx=gsap.context(()=>{
      const hero=gsap.timeline({scrollTrigger:{trigger:'.cinematic-hero',start:'top top',end:'+=380%',scrub:1,pin:true}});
      hero.from('.coordinate',{opacity:0,duration:.4}).from('.draft-grid i',{scaleX:0,scaleY:0,stagger:.04,duration:1},0)
        .from('.tower-canvas',{opacity:0,scale:.8,duration:1},.4).to('.tower-canvas',{scale:1.08,y:'-3%',duration:2},1)
        .from('.hero-copy',{opacity:0,y:70,duration:1},2.1).to('.hero-copy',{y:-25,duration:1},3);
      gsap.utils.toArray<HTMLElement>('.world:not(.studio-world)').forEach((section)=>{
        const objects=section.querySelectorAll('.depth');
        gsap.fromTo(objects,{y:(i)=>50+i*35,opacity:.55,rotateX:5},{y:(i)=>-30-i*35,opacity:1,rotateX:0,stagger:.08,ease:'none',immediateRender:false,scrollTrigger:{trigger:section,start:'top 92%',end:'bottom 15%',scrub:1}});
        gsap.fromTo(section.querySelector('.world-copy'),{y:90},{y:-60,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1}});
      });
      const studio=gsap.timeline({scrollTrigger:{trigger:'.studio-world',start:'top top',end:'+=420%',scrub:1,pin:true}});
      studio.from('.hand-line',{scaleX:0,duration:.45}).from('.site-boundary',{clipPath:'inset(0 100% 100% 0)',duration:.55},.25)
        .from('.floor-plan i',{scaleX:0,scaleY:0,stagger:.05,duration:.5},.55).from('.floor-plates i',{scaleX:0,stagger:.08,duration:.55},.9)
        .from('.columns i',{scaleY:0,stagger:.04,duration:.55},1.15).from('.walls i',{scaleY:0,stagger:.1,duration:.5},1.45)
        .from('.facade-system',{opacity:0,backgroundSize:'120px 100%',duration:.6},1.7).from('.material',{opacity:0,y:40,stagger:.15,duration:.45},1.9)
        .fromTo('.studio-final',{clipPath:'inset(100% 0 0)',filter:'brightness(.7) blur(8px)'},{clipPath:'inset(0% 0 0)',filter:'brightness(1.02) blur(0px)',duration:1},2.25)
        .to('.studio-guides, .studio-world .material',{opacity:0,filter:'blur(8px)',duration:.5},2.95).to('.studio-interface .process-rail',{opacity:0,duration:.35},3.05)
        .from('.studio-world .world-copy',{opacity:0,y:65,duration:.65},3.15);
      const portfolio=gsap.timeline({scrollTrigger:{trigger:'.case-study',start:'top top',end:'+=500%',pin:true,scrub:1}});
      portfolio.from('.case-map',{opacity:0,scale:1.25}).to('.case-map',{opacity:.25,scale:1},.8)
        .from('.case-lines i',{scaleX:0,stagger:.08},.3).from('.case-massing span',{opacity:0,y:100,stagger:.12},.8)
        .to('.case-wire',{opacity:.2},1.4).fromTo('.case-render',{clipPath:'inset(100% 0 0 0)',scale:1.14,filter:'brightness(.78) blur(4px)'},{clipPath:'inset(0% 0 0 0)',scale:1,filter:'brightness(1.04) blur(0px)',duration:1.4},2.2)
        .to('.case-map, .case-lines, .case-massing, .case-wire, .case-intro',{opacity:0,filter:'blur(9px)',duration:.55},3.05).from('.case-caption',{opacity:0,y:40},3.2);
    },root);
    return ()=>ctx.revert();
  },[]);
  return <div ref={root} className="cinematic-home">
    <section className="cinematic-hero">
      <DraftGrid/><span className="coordinate c1">X 04.218 / Y 16.802</span><span className="coordinate c2">DATUM +00.000</span>
      <div className="hero-fallback" aria-hidden="true"/><div className={`tower-canvas ${webglReady?'is-ready':''}`}>{useWebgl&&<WebGLBoundary><TowerScene onReady={()=>setWebglReady(true)}/></WebGLBoundary>}</div>
      <div className="hero-index"><span>STRUCTŪRA / 2026</span><span>ARCHITECTURE · INTELLIGENCE · SYSTEMS</span></div>
      <motion.div className="hero-copy" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6,duration:1}}><p>AN INTEGRATED PRACTICE FOR THE BUILT WORLD</p><h1>From intelligence<br/>to <em>structure.</em></h1><div className="hero-bottom"><p>Architecture, real-estate intelligence and enterprise systems built for consequential decisions.</p><a href="#intelligence">Enter the structure <span>↓</span></a></div></motion.div>
    </section>

    <section id="intelligence" className="world intelligence-world"><span className="chapter-no">01 / 03</span><div className="orb depth"/><IntelligenceInterface/><div className="world-copy depth"><p>STRUCTŪRA INTELLIGENCE</p><h2>See the decision<br/><em>before it exists.</em></h2><p>Property geometry, market context and capital structure—resolved into one legible field.</p><a href={process.env.NEXT_PUBLIC_INTELLIGENCE_URL||'/intelligence'}>Explore Intelligence <Arrow/></a></div></section>

    <section className="world enterprise-world"><span className="chapter-no">02 / 03</span><EnterpriseInterface/><div className="world-copy depth"><p>STRUCTŪRA ENTERPRISE SUITE</p><h2>One system.<br/><em>Institutional scale.</em></h2><p>Governed workflows connect real estate, finance, land and technology across the organization.</p><a href={process.env.NEXT_PUBLIC_ENTERPRISE_SUITE_URL||'/enterprise'}>Enter the Suite <Arrow/></a></div><div className="system-status depth"><i/> SYSTEM / OPERATIONAL <span>128.04.6</span></div></section>

    <section className="world studio-world"><span className="chapter-no">03 / 03</span><StudioInterface/><div className="world-copy"><p>THE HOUSE OF THE ARCHITECT</p><h2>Ideas become<br/><em>physical consequence.</em></h2><p>Site, program, structure, material and environment developed as one continuous act.</p><Link href="/studio">Enter the House <Arrow/></Link></div></section>

    <section className="practice-statement"><p>MONTRÉAL / INTERNATIONAL PRACTICE</p><h2>Architecture where <em>design, capital and identity</em> intersect.</h2><div className="practice-grid"><p>Structūra is an international architectural and spatial advisory firm specializing in high-value environments. Headquartered in Old Montréal, the practice works across North America, the Caribbean, Europe and emerging markets.</p><p>The House of the Architect is Structūra’s strategic design core—integrating architectural design, spatial intelligence, material strategy, 3D modelling and execution advisory.</p><ul><li>Residential + private estates</li><li>Commercial + hospitality</li><li>Institutional + civic</li><li>Development advisory</li><li>Interiors + façades</li><li>3D modelling + material strategy</li></ul></div><div className="practice-actions"><Link href="/about">About the practice <Arrow/></Link><Link href="/contact?type=commission">Commission a project <Arrow/></Link></div></section>

    <section className="case-study">
      <div className="case-render"/><div className="case-map"><DraftGrid/></div>
      <div className="case-lines"><i/><i/><i/><i/><i/><i/></div><div className="case-massing"><span/><span/><span/><span/></div><div className="case-wire"/>
      <div className="case-intro"><p>SELECTED STUDY / 01</p><h2>Skyline<br/><em>Sovereignty</em></h2><span>45.5019° N / 73.5674° W</span></div>
      <div className="case-caption"><p>URBAN DEVELOPMENT STUDY · MONTRÉAL</p><h3>Refined geometry and curated outdoor space<br/>for a lasting urban presence.</h3><Link href="/studio/portfolio/arcadian-courtyard">Examine the study <Arrow/></Link></div>
      <div className="case-progress"><span>01 SITE</span><span>02 MASS</span><span>03 GRID</span><span>04 FAÇADE</span><span>05 LANDSCAPE</span><span>06 BUILDING</span></div>
    </section>

    <section className="closing"><p>STRUCTŪRA / OLD MONTRÉAL · INTERNATIONAL</p><h2>Every consequential<br/>decision leaves a <em>structure.</em></h2><div><Link href="/contact">Begin a conversation <Arrow/></Link><Link href="/studio/portfolio">View all studies <Arrow/></Link></div><address>204 Rue du St-Sacrement<br/>Old Montréal, Québec H2Y 1W8<br/><a href="tel:+15144308865">+1 514 430 8865</a></address></section>
  </div>
}
