const header=document.querySelector('#header'),toggle=document.querySelector('.menu-toggle');
function closeMenu(){header.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=header.classList.toggle('menu-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();const a=e.target.closest('a[href]');if(a&&typeof window.gtag==='function'){const href=a.getAttribute('href');let name=href.includes('wa.me/')?'click_whatsapp':href.includes('maps/dir/')?'click_como_chegar':href.includes('instagram.com/')?'click_instagram':href.includes('?curso=')?'click_agendar_aula':null;if(name)window.gtag('event',name);}});
