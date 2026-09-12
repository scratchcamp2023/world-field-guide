
(async()=>{
 const data=await loadData(); const details=await loadClueDetails();
 const id=new URLSearchParams(location.search).get('id');
 const clue=findClue(data,id) || data.clues[0];
 const detail=details[clue.id] || {aliases:[],scope:'—',reliability:'—',howToUse:'—',exceptions:'—',falseFriends:'—',reviewNote:'—',visuals:[],sourceAttribution:{label:'',url:''}};
 const country=findCountry(data, clue.country);
 document.title=`${clue.name} — World Field Guide`;
 const visuals=detail.visuals?.length ? detail.visuals.map(v=>`<article class="visual-card"><img src="${v.image || 'assets/placeholders/empty-slot.svg'}" alt="${escapeHtml(v.label)}"><div class="visual-body"><h4>${v.label}</h4><p>${v.caption||''}</p><div class="source-meta">${v.credit?`Credit: ${escapeHtml(v.credit)}<br>`:''}${v.license?`Licence: ${escapeHtml(v.license)}<br>`:''}${v.sourceUrl?`Source: <a href="${v.sourceUrl}" target="_blank">Open ↗</a>`:'Reviewed image pending'}</div></div></article>`).join('') : `<div class="placeholder-note">No reviewed visual examples have been attached to this clue yet.</div>`;
 const sourceBlock=(detail.sourceAttribution?.url || clue.source)?`<div class="glass-card"><span class="kicker">SOURCE</span><h2>Evidence trail</h2><p>Current seed content is paraphrased from an external source. A production release should attach contributor-level review histories and example locations.</p><div class="source-meta">${detail.sourceAttribution?.label || 'Source'}: <a href="${detail.sourceAttribution?.url || clue.source}" target="_blank">Open source ↗</a></div></div>`:'';
 document.querySelector('#cluePage').innerHTML=`
 <section class="clue-page-hero"><span class="kicker">${country?.name || clue.country} · ${clue.family.toUpperCase()}</span><div class="clue-page-top"><div><h1>${clue.name}</h1><p>${clue.summary}</p><div class="clue-family">${statusPill(clue.status)}<span class="pill draft">${clue.confidence}</span><span class="pill draft">${detail.scope}</span></div></div><div class="completion-card"><strong>${country?.code || '—'}</strong><span>country module</span></div></div></section>
 <section class="clue-layout">
   <div>
     <div class="glass-card"><span class="kicker">VISUAL EXAMPLES</span><h2>Reviewed image slots</h2><p>These slots are ready for real images with attribution and source links.</p><div class="visual-grid">${visuals}</div></div>
     ${sourceBlock}
   </div>
   <div>
     <div class="glass-card"><span class="kicker">DETAILS</span><h2>How to use this clue</h2><div class="aliases-list">${(detail.aliases||[]).map(a=>`<span>${escapeHtml(a)}</span>`).join('')}</div><div class="detail-grid"><article><h3>Reliability</h3><p>${detail.reliability}</p></article><article><h3>Scope</h3><p>${detail.scope}</p></article><article><h3>How to use</h3><p>${detail.howToUse}</p></article><article><h3>Exceptions</h3><p>${detail.exceptions}</p></article><article><h3>False friends</h3><p>${detail.falseFriends}</p></article><article><h3>Review note</h3><p>${detail.reviewNote}</p></article></div></div>
     <div class="glass-card"><span class="kicker">NAVIGATION</span><h2>Keep learning</h2><p><a class="text-link" href="country.html?id=${clue.country}">Open the ${country?.name || clue.country} country guide →</a></p><p><a class="text-link" href="explore.html">Back to Verified Clues →</a></p><p><a class="text-link" href="contribute.html">Contribute a reviewed image →</a></p></div>
   </div>
 </section>`;
})();
