
document.querySelector('#submissionForm')?.addEventListener('submit',e=>{
 e.preventDefault(); const obj=Object.fromEntries(new FormData(e.currentTarget).entries());obj.createdAt=new Date().toISOString();
 const saved=JSON.parse(localStorage.getItem('wfg_submissions')||'[]');saved.push(obj);localStorage.setItem('wfg_submissions',JSON.stringify(saved));
 document.querySelector('#submitStatus').textContent=`Saved locally as prototype submission #${saved.length}. No data was sent anywhere.`;
 e.currentTarget.reset();
});
