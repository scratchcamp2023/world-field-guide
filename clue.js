(async()=>{
 const d=await loadData();
 const details=await fetch('clue-details.json').then(r=>r.json());
 const id=new URLSearchParams(location.search).get('id');
 const clue=d.clues.find(x=>x.id===id);
 const root=document.querySelector('#cluePage');
 if(!clue){root.innerHTML='<section class="page-hero compact"><h1>Clue not found.</h1><p><a class="text-link" href="explore.html">Back to Verified Clues →</a></p></section>';return;}
 const country=d.countries.find(x=>x.id===clue.country);
 const detail=details[clue.id]||{};
 document.title=`${clue.name} — World Field Guide`;
 const visuals=(detail.visuals||[]).map((v,i)=>`<article class="visual-card"><div class="visual-placeholder"><span>IMAGE SLOT ${String(i+1).padStart(2,'0')}</span><b>${v.label}</b><small>Reviewed visual example pending</small></div><p>${v.caption||''}</p></article>`).join('');
 root.innerHTML=`
 <section class="clue-page-hero"><a class="back-link" href="explore.html">← Verified Clues</a><span class="kicker">${country?.name||clue.country} · ${clue.family}</span><div class="clue-title-row"><div><h1>${clue.name}</h1><p>${clue.summary}</p></div><div class="clue-badges">${statusPill(clue.status)}<span class="pill draft">${clue.confidence} confidence</span></div></div></section>
 <section class="clue-detail-layout"><aside class="clue-sidebar"><div><span>SCOPE</span><b>${detail.scope||country?.name||''}</b></div><div><span>RELIABILITY</span><b>${detail.reliability||'Not yet documented.'}</b></div><div><span>SOURCE</span>${clue.source?`<a href="${clue.source}" target="_blank">Open seed source ↗</a>`:'<b>Community review pending</b>'}</div></aside><div>
 <section class="guide-section"><span class="kicker">HOW TO USE IT</span><h2>Read the clue in context.</h2><p class="lead-copy">${detail.howToUse||clue.summary}</p></section>
 <section class="guide-section"><div class="two-col-detail"><article><span class="kicker">EXCEPTIONS</span><h3>What can break this clue?</h3><p>${detail.exceptions||'No exception notes yet.'}</p></article><article><span class="kicker">FALSE FRIENDS</span><h3>What can fool you?</h3><p>${detail.falseFriends||'No false-friend notes yet.'}</p></article></div></section>
 <section class="guide-section"><div class="section-head"><div><span class="kicker">VISUAL EXAMPLES</span><h2>Learn it by sight.</h2></div><p>Production images should be reviewed, captioned, attributed, and tied to a specific location or source.</p></div><div class="visual-grid">${visuals||'<div class="empty">No visual examples have been queued yet.</div>'}</div></section>
 <section class="guide-section"><span class="kicker">REVIEW NOTE</span><h2>Evidence trail</h2><div class="source-box"><p>${detail.reviewNote||'Review history has not been added yet.'}</p></div></section>
 <div class="detail-actions"><a class="btn ghost" href="country.html?id=${clue.country}">Open ${country?.name||'country'} guide</a><a class="btn primary" href="contribute.html">Add an example</a></div>
 </div></section>`;
})();