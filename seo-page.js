const header=document.querySelector('#header'),toggle=document.querySelector('.menu-toggle');
function closeMenu(){header.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=header.classList.toggle('menu-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();const a=e.target.closest('a[href]');if(a&&typeof window.gtag==='function'){const href=a.getAttribute('href');let name=href.includes('wa.me/')?'click_whatsapp':href.includes('maps/dir/')?'click_como_chegar':href.includes('instagram.com/')?'click_instagram':href.includes('?curso=')?'click_agendar_aula':null;if(name)window.gtag('event',name);}});

// Course details appear once, only after 15 seconds on the course page.
const coursePopup=document.querySelector('#course-dialog');
if(coursePopup){
  const popupTimer=window.setTimeout(()=>{
    if(!coursePopup.open && !document.querySelector('dialog[open]')){
      coursePopup.showModal();
      document.body.classList.add('locked');
    }
  },15000);
  window.addEventListener('pagehide',()=>window.clearTimeout(popupTimer),{once:true});
  coursePopup.querySelector('.dialog-close').addEventListener('click',()=>coursePopup.close());
  coursePopup.addEventListener('close',()=>document.body.classList.remove('locked'));
  coursePopup.addEventListener('click',event=>{
    if(event.target!==coursePopup)return;
    const rect=coursePopup.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)coursePopup.close();
  });
}
