(async()=>{
 const root=document.querySelector('#countryPage');
 try{
  const d=await loadData();
  const id=new URLSearchParams(location.search).get('id')||'japan';
  const c=findCountry(d,id)||d.countries[0];
  if(!c) throw new Error('No country records were found in data.json');
  document.title=`${c.name} — World Field Guide`;
  const countrySections=Array.isArray(c.sections)?c.sections:[];
  const sections=countrySections.map((s,i)=>`<section class="guide-section" id="sec-${i}"><h2>${escapeHtml(s.title||'Clues')}</h2>${(Array.isArray(s.items)?s.items:[]).map(item=>`<article class="clue-module"><div class="clue-module-head"><h3>${escapeHtml(item.name||'Untitled clue')}</h3><div>${statusPill(item.status)} <span class="pill draft">${escapeHtml(item.confidence||'Unrated')}</span></div></div><p>${escapeHtml(item.text||'')}</p>${item.clueId?`<a class="clue-module-link" href="${clueLink(item.clueId)}"><span>Open clue detail</span><span>→</span></a>`:''}</article>`).join('')}</section>`).join('');
  const confusions=Array.isArray(c.confusions)?c.confusions:[];
  const conf=confusions.length?`<section class="guide-section" id="confusions"><h2>Common confusions</h2><div class="compare-cards">${confusions.map(x=>`<article class="compare-card"><h3>${escapeHtml(c.name)} vs ${escapeHtml(x.with||'Unknown')}</h3><b>SHARED VISUAL TEXTURE</b><p>${escapeHtml(x.shared||'')}</p><b>WHAT TO CHECK</b><p>${escapeHtml(x.distinguish||'')}</p></article>`).join('')}</div></section>`:'';
  const source=c.source?`<section class="guide-section" id="source"><h2>Seed source</h2><div class="source-box"><p>This prototype entry is a paraphrased seed module. A production release should track evidence per clue and contributor.</p><a href="${escapeHtml(c.source)}" target="_blank" rel="noopener noreferrer">Open current source guide ↗</a></div></section>`:'';
  root.innerHTML=`<section class="country-page-hero"><span class="kicker">${escapeHtml(c.code||'')} · ${escapeHtml(c.region||'')} · ${escapeHtml(String(c.status||'').toUpperCase())}</span><div class="country-page-top"><div><h1>${escapeHtml(c.name)}</h1><p>${escapeHtml(c.summary||'')}</p></div><div class="completion-card"><strong>${Number(c.completion)||0}%</strong><span>guide build progress</span></div></div></section><section class="quickfacts">${(Array.isArray(c.quick)?c.quick:[]).map(x=>`<div>${escapeHtml(x)}</div>`).join('')}</section><section class="country-layout"><aside class="toc"><b>ON THIS PAGE</b>${countrySections.map((s,i)=>`<a href="#sec-${i}">${escapeHtml(s.title||'Clues')}</a>`).join('')}${confusions.length?'<a href="#confusions">Common confusions</a>':''}${c.source?'<a href="#source">Source</a>':''}</aside><div>${sections}${conf}${source}</div></section>`;
 }catch(error){
  console.error('World Field Guide country page failed:',error);
  if(root) root.innerHTML=`<section class="page-hero compact"><span class="kicker">LOAD ERROR</span><h1>Guide could not be loaded.</h1><p>The country data could not be read. Please reload the page. If the problem continues, send the error below to the site maintainer.</p><pre class="error-detail">${escapeHtml(error&&error.message?error.message:String(error))}</pre><button class="btn primary" onclick="location.reload()">Reload guide</button></section>`;
 }
})();