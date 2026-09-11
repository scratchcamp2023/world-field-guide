
(async()=>{
 const d=await loadData();
 document.querySelector('#featuredCountries').innerHTML=d.countries.slice(0,4).map(countryCard).join('');
 const featured=d.clues.filter(x=>x.status==='verified').slice(0,4);
 document.querySelector('#featuredClues').innerHTML=featured.map(c=>`<a class="mini-clue" href="clue.html?id=${c.id}">
 <div class="mini-clue-top">${statusPill(c.status)}<span class="kicker">${c.confidence}</span></div><h3>${c.name}</h3><p>${c.summary}</p></a>`).join('');
})();
