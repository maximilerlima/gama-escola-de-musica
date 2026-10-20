// Prepared hooks only: no GA4 library is loaded and no data is transmitted without an approved integration.
function gamaTrack(eventName,params={}){if(typeof window.gtag==='function')window.gtag('event',eventName,params);}
document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a)return;const href=a.getAttribute('href');if(href.includes('wa.me/'))gamaTrack('click_whatsapp');else if(href.includes('maps/dir/'))gamaTrack('click_como_chegar');else if(href.includes('instagram.com/'))gamaTrack('click_instagram');});
const highDefinitionWidths = {"piano": 1536, "violao": 1536, "guitarra": 1536, "canto": 1536, "bateria": 1536, "teclado": 1536, "musica-vida": 1448, "criancas": 1672, "jovens": 1672, "adultos": 1672, "professor-piano": 1536, "professor-canto": 1536, "professor-violao": 1536, "professor-bateria": 1536, "galeria-1": 1536, "galeria-2": 1536, "galeria-3": 1536, "galeria-4": 1536, "galeria-5": 1536, "galeria-6": 1536};
// Conteúdo da escola: substitua apresentações e depoimentos quando os dados reais estiverem disponíveis.
const courses=[
  {name:'Piano',image:'piano',short:'Técnica, repertório e muita música.',description:'Descubra as possibilidades do piano: melodia, harmonia e repertório. Do primeiro contato com as teclas à construção do seu próprio jeito de tocar.'},
  {name:'Violão',image:'violao',short:'Do zero às suas músicas favoritas.',description:'Acordes, ritmos e músicas que fazem parte da sua vida. Explore o violão no seu ritmo, com espaço para aprender e experimentar.'},
  {name:'Guitarra',image:'guitarra',short:'Liberdade para explorar seu som.',description:'Explore timbres, riffs, acordes e expressão. Descubra caminhos para tocar as músicas que você gosta e desenvolver sua identidade musical.'},
  {name:'Canto',image:'canto',short:'Desenvolva sua voz e sua expressão.',description:'Conheça sua voz e explore sua expressão musical. Converse com a equipe sobre seus objetivos e as possibilidades das aulas de canto.'},
  {name:'Bateria',image:'bateria',short:'Ritmo, coordenação e energia.',description:'Encontre seu ritmo. Explore a coordenação e o universo da bateria, do primeiro pulso às músicas que você quer tocar.'},
  {name:'Teclado',image:'teclado',short:'Versatilidade para tocar o que você ama.',description:'Melodias, acompanhamentos e diferentes sons. Descubra as possibilidades do teclado e construa uma relação com a música do seu jeito.'}
];
const teacherData=[['piano','Piano · Teclado'],['canto','Canto'],['violao','Violão · Guitarra'],['bateria','Bateria']];
teacherData.forEach(([image,instruments])=>{const card=document.createElement('article');card.className='teacher-card';card.tabIndex=0;card.innerHTML=`<div class="teacher-image"><img src="assets/professor-${image}-hd.webp" srcset="assets/professor-${image}-hd-480.webp 480w, assets/professor-${image}-hd-960.webp 960w, assets/professor-${image}-hd.webp ${highDefinitionWidths[`professor-${image}`]}w" sizes="(max-width:700px) 78vw, 25vw" alt="Retrato ilustrativo para a apresentação da equipe de ${instruments.toLowerCase()}" width="1536" height="1024" loading="lazy"><div class="teacher-overlay">Apresentação do professor em breve.</div></div><h3>${instruments}</h3><p>Conheça nossa equipe</p>`;document.querySelector('#teachers-track').append(card);});
// A galeria usa as fotos reais em HTML, inclusive sem JavaScript.
const header=document.querySelector('#header'),menuToggle=document.querySelector('.menu-toggle');
function closeMenu(){header.classList.remove('menu-open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');}
menuToggle.addEventListener('click',()=>{const open=header.classList.toggle('menu-open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let ticking=false;
function updateScroll(){header.classList.toggle('scrolled',scrollY>60);if(!reducedMotion.matches&&innerWidth>700&&scrollY<1100){document.querySelector('.hero-photo').style.transform=`translateY(${Math.min(scrollY*.13,120)}px) scale(1.015)`;}ticking=false;}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}}, {passive:true});updateScroll();
if('IntersectionObserver' in window&&!reducedMotion.matches){document.documentElement.classList.add('js');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{const track=document.getElementById(button.dataset.scroll);track.scrollBy({left:Number(button.dataset.direction)*track.clientWidth*.7,behavior:reducedMotion.matches?'instant':'smooth'});}));
const booking=document.querySelector('#booking');let audience='';
function showBooking(course='',forAudience=''){gamaTrack('open_agendamento',{curso:course||'não selecionado'});closeMenu();audience=forAudience;document.querySelector('#instrument').value=course||'Ainda estou descobrindo';booking.showModal();document.body.classList.add('locked');}
document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>showBooking('',button.dataset.audience||'')));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('locked');});dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});
document.querySelector('#booking-form').addEventListener('submit',event=>{event.preventDefault();gamaTrack('submit_agendamento',{etapa:'encaminhamento_whatsapp'});const form=new FormData(event.target);let message=`Olá, Gama! Meu nome é ${String(form.get('name')).trim()}. Quero conhecer a escola e agendar uma aula experimental gratuita. Podem confirmar a disponibilidade?\nInteresse: ${form.get('instrument')}.`;if(audience)message+=`\nAula para: ${audience}.`;const extra=String(form.get('message')).trim();if(extra)message+=`\n${extra}`;const link=document.createElement('a');link.href=`https://wa.me/5521997707609?text=${encodeURIComponent(message)}`;link.target='_blank';link.rel='noopener';document.body.append(link);link.click();link.remove();});
document.querySelector('#year').textContent=new Date().getFullYear();

document.querySelector('#instrument').addEventListener('change',event=>gamaTrack('select_curso',{curso:event.target.value}));
document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>gamaTrack('click_agendar_aula')));
const requestedCourse=new URLSearchParams(location.search).get('curso');
if(requestedCourse){const option=Array.from(document.querySelector('#instrument').options).find(o=>o.value===requestedCourse);if(option)showBooking(option.value);}
