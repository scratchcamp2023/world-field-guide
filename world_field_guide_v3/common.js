
let WFG_DATA=null; let CLUE_DETAILS=null;
async function loadData(){ if(WFG_DATA) return WFG_DATA; const r=await fetch('data.json'); WFG_DATA=await r.json(); return WFG_DATA; }
async function loadClueDetails(){ if(CLUE_DETAILS) return CLUE_DETAILS; const r=await fetch('clue-details.json'); CLUE_DETAILS=await r.json(); return CLUE_DETAILS; }
document.querySelector('.nav-toggle')?.addEventListener('click',()=>document.querySelector('.site-header nav')?.classList.toggle('open'));
function statusPill(status){ const s=(status||'draft').toLowerCase(); const cls=s.includes('verified')?'verified':s.includes('review')?'review':s.includes('deprecated')?'deprecated':'draft'; const label=cls==='review'?'In review':cls[0].toUpperCase()+cls.slice(1); return `<span class="pill ${cls}">${label}</span>`; }
function countryCard(c){ return `<a class="country-card" href="country.html?id=${c.id}"><span class="country-code">${c.code} · ${c.region}</span><h3>${c.name}</h3><p>${c.summary}</p><div class="card-bottom"><div class="progress-mini"><i style="width:${c.completion}%"></i></div><small>${c.completion}% built</small></div></a>`; }
function findCountry(data,id){ return data.countries.find(x=>x.id===id); }
function findClue(data,id){ return data.clues.find(x=>x.id===id); }
function clueLink(clueId){ return `clue.html?id=${clueId}`; }
function escapeHtml(str=''){ return str.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
