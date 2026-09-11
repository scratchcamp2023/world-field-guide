
(async()=>{
 const d=await loadData(); const list=document.querySelector('#clueList'), q=document.querySelector('#clueSearch'), cs=document.querySelector('#clueCountry'), fs=document.querySelector('#clueFamily'), ss=document.querySelector('#clueStatus');
 d.countries.forEach(c=>cs.add(new Option(c.name,c.id))); [...new Set(d.clues.map(c=>c.family))].sort().forEach(v=>fs.add(new Option(v,v)));
 function render(){let arr=d.clues.filter(c=>(!q.value||(`${c.name} ${c.summary}`).toLowerCase().includes(q.value.toLowerCase()))&&(cs.value==='all'||c.country===cs.value)&&(fs.value==='all'||c.family===fs.value)&&(ss.value==='all'||c.status===ss.value));list.innerHTML=arr.length?arr.map(c=>{const cn=d.countries.find(x=>x.id===c.country);return `<a class="clue-row" href="clue.html?id=${c.id}"><span class="country-label">${cn?.name||c.country}</span><div><h3>${c.name}</h3><p>${c.summary}</p></div><span class="meta">${c.family}<br>${c.confidence} confidence</span>${statusPill(c.status)}</a>`}).join(''):`<div class="empty">No clues match those filters.</div>`;}
 q.addEventListener('input',render);[cs,fs,ss].forEach(x=>x.addEventListener('change',render));render();
})();
