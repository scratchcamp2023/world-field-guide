
(async()=>{
 const d=await loadData(), wrap=document.querySelector('#allCountries'), q=document.querySelector('#countrySearch'), rs=document.querySelector('#regionSelect'), ss=document.querySelector('#statusSelect');
 [...new Set(d.countries.map(c=>c.region))].sort().forEach(v=>rs.add(new Option(v,v)));
 function render(){const term=q.value.toLowerCase().trim(), r=rs.value,s=ss.value;const arr=d.countries.filter(c=>(!term||(`${c.name} ${c.region} ${c.summary}`).toLowerCase().includes(term))&&(r==='all'||c.region===r)&&(s==='all'||c.status===s));wrap.innerHTML=arr.length?arr.map(countryCard).join(''):`<div class="empty">No guides match those filters.</div>`;}
 [q,rs,ss].forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',render));render();
})();
