let WFG_DATA=null; let CLUE_DETAILS=null;
async function loadData(){ if(WFG_DATA) return WFG_DATA; const r=await fetch('data.json'); if(!r.ok) throw new Error('Could not load data.json'); WFG_DATA=await r.json(); return WFG_DATA; }
async function loadClueDetails(){ if(CLUE_DETAILS) return CLUE_DETAILS; const r=await fetch('clue-details.json'); if(!r.ok) throw new Error('Could not load clue-details.json'); CLUE_DETAILS=await r.json(); return CLUE_DETAILS; }
const menuButton=document.querySelector('.nav-toggle');
const siteNav=document.querySelector('.site-header nav');
if(menuButton&&siteNav){
 menuButton.setAttribute('aria-expanded','false');
 menuButton.setAttribute('aria-controls','site-navigation');
 siteNav.id='site-navigation';
 menuButton.addEventListener('click',()=>{
  const isOpen=siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(isOpen));
  menuButton.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
 });
 siteNav.addEventListener('click',event=>{
  if(event.target.closest('a')&&window.matchMedia('(max-width: 920px)').matches){
   siteNav.classList.remove('open');
   menuButton.setAttribute('aria-expanded','false');
   menuButton.setAttribute('aria-label','Open menu');
  }
 });
}
if(!document.querySelector('.skip-link')){
 const skip=document.createElement('a');
 skip.className='skip-link';
 skip.href='#main-content';
 skip.textContent='Skip to content';
 document.body.prepend(skip);
 const main=document.querySelector('main');
 if(main){main.id='main-content';main.tabIndex=-1;}
}
function statusPill(status){ const s=(status||'draft').toLowerCase(); const cls=s.includes('verified')?'verified':s.includes('review')?'review':s.includes('deprecated')?'deprecated':'draft'; const label=cls==='review'?'In review':cls[0].toUpperCase()+cls.slice(1); return `<span class="pill ${cls}">${label}</span>`; }
function countryCard(c){ return `<a class="country-card" href="country.html?id=${c.id}"><span class="country-code">${c.code} · ${c.region}</span><h3>${c.name}</h3><p>${c.summary}</p><div class="card-bottom"><div class="progress-mini"><i style="width:${c.completion}%"></i></div><small>${c.completion}% built</small></div></a>`; }
function findCountry(data,id){ return data.countries.find(x=>x.id===id); }
function findClue(data,id){ return data.clues.find(x=>x.id===id); }
function clueLink(clueId){ return `clue.html?id=${clueId}`; }
function escapeHtml(str=''){ return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
