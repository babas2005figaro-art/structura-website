export type Dispatch={slug:string;title:string;category:string;dek:string;sourceUrl:string;body:string[]};

// The legacy public site currently exposes one verifiable editorial title. Keep this
// collection deliberately small until further dispatches are formally published.
export const dispatches:Dispatch[]=[{
  slug:'the-art-of-long-standing-buildings',
  title:'The Art of Long-Standing Buildings',
  category:'Architecture',
  dek:'A public Structūra note on architecture designed for permanence, identity and long-term value.',
  sourceUrl:'https://www.xn--structra-vzb.com/corporate-environments',
  body:[
    'Structūra approaches architecture as a long-term strategic asset. Proportion, material, circulation and environmental performance are considered together so that a building can remain useful, legible and dignified beyond a single cycle.',
    'The public note places particular emphasis on institutional environments: headquarters, diplomatic buildings and executive interiors where space communicates identity while supporting practical performance.',
    'This archive entry preserves the subject of the original publication in the new editorial system. It does not add a publication date or project claim that is absent from the public source.'
  ]
}];

export type RoleStatus='Future Opportunity'|'Expression of Interest'|'Closed';
export type Role={slug:string;title:string;discipline:string;location:string;status:RoleStatus;summary:string};
export const roles:Role[]=[
 ['architect','Architect','Architecture'],['interior-designer','Interior Designer','Interiors'],['engineer','Engineer','Engineering'],['exterior-designer','Exterior Designer','Architecture'],['furniture-designer','Furniture Designer','Interiors'],['material-design-specialist','Material Design Specialist','Materials'],['landscape-architect','Landscape Architect','Landscape'],['urban-planning-specialist','Urban Planning Specialist','Planning'],['3d-visualization-specialist','3D Visualization Specialist','Visualization'],['infrastructure-consultant','Infrastructure Consultant','Engineering'],['facade-specialist','Façade Specialist','Architecture'],['graduate-designer','Graduate Designer','Early Career']
].map(([slug,title,discipline],i)=>({slug,title,discipline,location:'Montréal, Québec',status:i<6?'Expression of Interest':'Future Opportunity',summary:'A considered role for practitioners who connect disciplined craft, systems thinking and clear communication.'} as Role));
export const roleDisciplines=['All',...Array.from(new Set(roles.map(r=>r.discipline)))];
