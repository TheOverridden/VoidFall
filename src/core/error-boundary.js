/* Fail-safe: surface any script error on-screen (helps on devices without devtools). */
window.addEventListener('error',function(e){
  var b=document.getElementById('errbox');
  if(!b){ b=document.createElement('div'); b.id='errbox';
    b.style.cssText='position:fixed;left:12px;bottom:12px;z-index:99;max-width:76vw;background:rgba(40,4,8,.95);border:1px solid #ff5d6d;color:#ffd6da;font:12px/1.5 monospace;padding:10px 14px;border-radius:10px;white-space:pre-wrap';
    (document.body||document.documentElement).appendChild(b); }
  b.textContent='Error: '+(e.message||(e.error&&e.error.message)||'unknown')+(e.lineno?(' @ line '+e.lineno):'');
},true);
