export type Project = { slug:string; title:string; location:string; year:string; category:string[]; services:string[]; description:string; status:string; clientType:string };

export const products = [
  {number:"01",title:"Intelligence",eyebrow:"Decision platform",text:"Property analysis, scenario modeling and professional reporting for individuals and focused teams.",href:"/intelligence",cta:"Launch Intelligence"},
  {number:"02",title:"Enterprise Suite",eyebrow:"Institutional operating system",text:"Controlled workflows, governance and decision intelligence across real-estate, finance, agriculture and technology.",href:"/enterprise",cta:"Enter Enterprise Suite"},
  {number:"03",title:"Studio",eyebrow:"Architecture + advisory",text:"Architecture, interiors, façades, master planning and development strategy shaped as one discipline.",href:"/studio",cta:"Explore the Studio"},
];

export const projects: Project[] = [
  {slug:"arcadian-courtyard",title:"Arcadian Courtyard",location:"Mediterranean Coast",year:"2026",category:["Architecture","Hospitality"],services:["Architecture","Interiors","Development consulting"],description:"A climate-responsive hospitality study organized around shade, water and a sequence of protected courtyards.",status:"Concept",clientType:"Private developer"},
  {slug:"meridian-house",title:"Meridian House",location:"North America",year:"2025",category:["Residential","Interior"],services:["Architecture","Interior architecture"],description:"A residential prototype where structure, daylight and material restraint define the rooms.",status:"Design development",clientType:"Private client"},
  {slug:"agora-institute",title:"Agora Institute",location:"West Africa",year:"2026",category:["Institutional","Master Planning"],services:["Master planning","Architecture","Strategic advisory"],description:"A phased academic district designed for civic life, adaptable teaching and long-term institutional growth.",status:"Feasibility",clientType:"Academic institution"},
];

export const faqs = [
  ["Structūra","What is Structūra?","An integrated architecture, real-estate intelligence and enterprise technology company."],
  ["Intelligence","Who is Intelligence for?","Investors, brokers, developers, students, analysts and small teams evaluating real-estate decisions."],
  ["Enterprise Suite","How is Enterprise different?","Enterprise adds institutional operations, permissions, collaboration, governance and auditability."],
  ["Studio","What work does the Studio undertake?","Architecture, interiors, façades, master planning, renovation, visualization and strategic advisory."],
  ["Security","Does Structūra claim certifications?","No. Deployment and security requirements are assessed for each controlled institutional engagement."],
  ["Partnerships","Can institutions partner with Structūra?","Yes. We welcome aligned technology, academic, government, financial and research inquiries."],
];

export const genericPages: Record<string,{eyebrow:string;title:string;intro:string;sections:{title:string;text:string}[]}> = {
  about:{eyebrow:"About Structūra",title:"One institution. Three connected disciplines.",intro:"Structūra exists because consequential places are never only design problems, financial models or software workflows.",sections:[{title:"Manifesto",text:"We connect architecture, economics and execution from the first question to the long-term consequence."},{title:"What we build",text:"Intelligence makes rigorous analysis accessible. Enterprise coordinates institutional work. Studio turns strategy into physical environments."},{title:"Principles",text:"Clarity over spectacle. Evidence over assumption. Stewardship over short-term novelty."},{title:"Global outlook",text:"Structūra is being built for work across markets, climates and institutional contexts—with local knowledge treated as essential."}]},
  partnerships:{eyebrow:"Partnerships",title:"Build the connective tissue.",intro:"We collaborate where architecture, capital, research and institutional technology meet.",sections:[{title:"Technology + research",text:"Integrations, applied research and tools that improve how decisions are understood."},{title:"Institutions + governments",text:"Structured collaboration with academic institutions, public bodies and mission-aligned organizations."},{title:"Developers + finance",text:"Pilot programs and strategic relationships with developers, advisors and financial institutions."}]},
  investors:{eyebrow:"Investor relations",title:"An integrated platform for the built world.",intro:"Structūra is developing a connected product ecosystem spanning decision software, institutional operations and professional services.",sections:[{title:"Market opportunity",text:"The built environment remains fragmented across design, finance, delivery and operations."},{title:"Business model",text:"A developing mix of software access, institutional deployments and professional Studio engagements."},{title:"Development stage",text:"Products and pilots are being developed in deliberate phases. Confidential information is shared only through appropriate channels."},{title:"Long-term vision",text:"A durable intelligence and execution layer for consequential real-estate and infrastructure decisions."}]},
  careers:{eyebrow:"Careers",title:"Work across boundaries.",intro:"We are interested in people who combine depth in one field with genuine curiosity about the others.",sections:[{title:"Disciplines",text:"Architecture, real estate, finance, engineering, product design, software and institutional strategy."},{title:"Open inquiry",text:"Current openings will be published here. Exceptional general applications may be submitted through Contact."}]},
};
