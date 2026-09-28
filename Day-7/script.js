const EMB=JSON.parse(document.getElementById('emb').textContent);
const slides=[...document.querySelectorAll('.slide')];
const stage=document.getElementById('stage');
const EASE='cubic-bezier(.2,.8,.2,1)';
let cur=0,introDone=false,busy=false;
function fit(){const s=Math.min(innerWidth/1920,innerHeight/1080);stage.style.transform='translate(-50%,-50%) scale('+s+')';}
addEventListener('resize',fit);fit();

/* ---------- starfield + shooting stars ---------- */
const sc=document.getElementById('stars'),sx=sc.getContext('2d');sc.width=1920;sc.height=1080;
const stars=[...Array(170)].map(()=>({x:Math.random()*1920,y:Math.random()*1080,r:Math.random()*1.7+.3,p:Math.random()*6.28,s:.3+Math.random()*1.2,v:.03+Math.random()*.12}));
let shoot=null,nextShoot=performance.now()+4000;
function drawStars(t){sx.clearRect(0,0,1920,1080);
 for(const s of stars){s.x-=s.v;if(s.x<0)s.x=1920;const a=.16+.30*Math.sin(t/1000*s.s+s.p);
  sx.globalAlpha=a;sx.fillStyle='#dfe8ff';sx.beginPath();sx.arc(s.x,s.y,s.r,0,6.28);sx.fill();}
 if(!shoot&&t>nextShoot){shoot={x:300+Math.random()*1400,y:Math.random()*300,l:0};}
 if(shoot){shoot.l+=26;const x=shoot.x-shoot.l,y=shoot.y+shoot.l*.45;
  const g=sx.createLinearGradient(x,y,x+220,y-100);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(124,196,250,0)');
  sx.globalAlpha=1;sx.strokeStyle=g;sx.lineWidth=3;sx.beginPath();sx.moveTo(x,y);sx.lineTo(x+220,y-100);sx.stroke();
  if(shoot.l>900){shoot=null;nextShoot=t+10000+Math.random()*10000;}}
 sx.globalAlpha=1;requestAnimationFrame(drawStars);}
requestAnimationFrame(drawStars);

/* ---------- fx canvas: burst + confetti ---------- */
const fc=document.getElementById('fx'),fxc=fc.getContext('2d');fc.width=1920;fc.height=1080;
let parts=[],fxOn=false;
const COLS=['#7cc4fa','#a3a6f0','#e3a0b4','#e3bd7b','#79cdb5','#ffffff'];
function fxLoop(){fxc.clearRect(0,0,1920,1080);
 parts=parts.filter(p=>p.life>0);
 for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=p.d;p.vy*=p.d;p.life--;p.rot+=p.vr;
  fxc.globalAlpha=Math.min(1,p.life/40);fxc.fillStyle=p.c;fxc.save();fxc.translate(p.x,p.y);fxc.rotate(p.rot);
  if(p.shape){fxc.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);}else{fxc.beginPath();fxc.arc(0,0,p.s/2,0,6.28);fxc.fill();}
  fxc.restore();}
 fxc.globalAlpha=1;if(parts.length)requestAnimationFrame(fxLoop);else fxOn=false;}
function kick(){if(!fxOn){fxOn=true;requestAnimationFrame(fxLoop);}}
function burst(x,y,n){for(let i=0;i<n;i++){const a=Math.random()*6.28,v=6+Math.random()*22;
 parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:.12,d:.965,life:90+Math.random()*60,s:4+Math.random()*9,c:COLS[i%6],rot:0,vr:0,shape:0});}kick();}
function confetti(){for(let i=0;i<220;i++){const left=i%2==0;
 parts.push({x:left?-20:1940,y:700+Math.random()*300,vx:(left?1:-1)*(10+Math.random()*16),vy:-(16+Math.random()*16),g:.42,d:.985,
  life:200+Math.random()*80,s:14+Math.random()*12,c:COLS[i%6],rot:Math.random()*6,vr:(Math.random()-.5)*.4,shape:1});}kick();}

/* ---------- background colour blobs ---------- */
function setMood(sl){const cs=getComputedStyle(sl);
 document.getElementById('b1').style.backgroundColor=cs.getPropertyValue('--acc').trim();
 document.getElementById('b2').style.backgroundColor=cs.getPropertyValue('--acc2').trim();
 document.getElementById('b3').style.backgroundColor=cs.getPropertyValue('--acc').trim();}

/* ---------- reveal animations ---------- */
const K={
 fade:[{opacity:0},{opacity:1}],
 rise:[{opacity:0,transform:'translateY(50px)',filter:'blur(6px)'},{opacity:1,transform:'none',filter:'blur(0)'}],
 left:[{opacity:0,transform:'translateX(-90px)'},{opacity:1,transform:'none'}],
 right:[{opacity:0,transform:'translateX(90px)'},{opacity:1,transform:'none'}],
 pop:[{opacity:0,transform:'scale(.6) translateY(30px)'},{opacity:1,transform:'scale(1.05)',offset:.7},{opacity:1,transform:'none'}],
 zoom:[{opacity:0,transform:'scale(.82)',filter:'blur(14px)'},{opacity:1,transform:'none',filter:'blur(0)'}],
 spin:[{opacity:0,transform:'scale(.2) rotate(-200deg)'},{opacity:1,transform:'scale(1.08) rotate(10deg)',offset:.75},{opacity:1,transform:'none'}],
 grow:[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],
 word:[{opacity:0,transform:'translateY(60%) rotateX(-80deg)',filter:'blur(8px)'},{opacity:1,transform:'none',filter:'blur(0)'}]
};
const SP=2.1;
function A(el,k,t,d){return el.animate(K[k]||K.rise,{duration:(d||700)*SP,delay:t*1000*SP,easing:EASE,fill:'both'});}
function reset(sl){sl.querySelectorAll('*').forEach(e=>e.getAnimations&&e.getAnimations().forEach(a=>a.cancel()));
 sl.querySelectorAll('.pulse').forEach(p=>p.style.opacity=0);sl.querySelectorAll('.caret').forEach(c=>c.remove());
 sl.querySelectorAll('.flip.on').forEach(f=>f.classList.remove('on'));}

function reveal(sl,start){
 let t=start,tEnd=start,maxDia=0;const timers=[];
 const els=[...sl.querySelectorAll('.rv')];
 const dias=new Map();
 for(const el of els){
  const a=el.dataset.a||'rise';
  const dia=el.closest('.dia');
  let at;
  if(dia){if(!dias.has(dia)){dias.set(dia,Math.max(t,tEnd));}at=dias.get(dia)+parseFloat(el.dataset.t||0);tEnd=Math.max(tEnd,at+.7);}
  else{t=Math.max(t,tEnd);at=t;}
  if(a==='words'){const ws=el.querySelectorAll('.w');ws.forEach((w,i)=>A(w,'word',at+i*.08,750));if(!dia)t=at+.3+ws.length*.06;continue;}
  if(a==='type'){A(el,'zoom',at,550);const ls=[...el.querySelectorAll('.ln')];let d=at+.35;
   ls.forEach(l=>{l.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:Math.min(700,90+l.textContent.length*12)*SP,delay:d*1000*SP,easing:'steps(24,end)',fill:'both'});d+=.12;});
   const last=ls[ls.length-1];timers.push(setTimeout(()=>{if(sl.classList.contains('active')){const c=document.createElement('span');c.className='caret';last.appendChild(c);}},(d+.4)*1000*SP));
   t=d+.1;continue;}
  if(a==='draw'){const p=el.querySelector('path'),ah=el.querySelector('.ah'),L=+el.dataset.len;
   if(el.classList.contains('dash'))A(p,'fade',at,700);
   else p.animate([{strokeDasharray:L+' '+L,strokeDashoffset:L},{strokeDasharray:L+' '+L,strokeDashoffset:0}],{duration:650*SP,delay:at*1000*SP,easing:'ease-in-out',fill:'both'});
   if(ah)A(ah,'fade',at+.55,250);continue;}
  A(el,a,at,a==='pop'?780:a==='spin'?1400:750);
  if(!dia)t=at+(el.tagName==='TR'?.12:.17);
 }
 // pulses on after everything
 const allEnd=Math.max(t,tEnd)+.2;
 timers.push(setTimeout(()=>sl.querySelectorAll('.pulse').forEach(p=>p.style.opacity=1),allEnd*1000*SP));
 return allEnd;
}

function playChapter(sl){
 sl.querySelector('.bignum').animate([{transform:'scale(2.6)',opacity:0,filter:'blur(30px)'},{transform:'none',opacity:.10,filter:'blur(0)'}],{duration:1400*SP,easing:EASE,fill:'both'});
 sl.querySelector('.sweep').animate([{transform:'translateX(-100%)'},{transform:'translateX(100%)'}],{duration:1600*SP,delay:500*SP,easing:'ease-in-out',fill:'both'});
 reveal(sl,.35);}

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function runIntro(){
 const intro=document.getElementById('intro'),press=document.getElementById('press'),cd=document.getElementById('cd');
 busy=true;press.animate([{opacity:1},{opacity:0,transform:'scale(1.3)'}],{duration:400,fill:'forwards'});await sleep(350);
 for(const x of ['Ready?','3','2','1']){cd.textContent=x;cd.style.fontSize=x==='Ready?'?'200px':'420px';
  const an=cd.animate([{opacity:0,transform:'scale(2.4)',filter:'blur(20px)'},{opacity:1,transform:'scale(1)',filter:'blur(0)',offset:.35},{opacity:1,transform:'scale(.9)',offset:.75},{opacity:0,transform:'scale(.4)',filter:'blur(10px)'}],{duration:1500,easing:'ease-out',fill:'both'});
  await sleep(1500);}
 intro.animate([{background:'#ffffff'},{background:'#070b16',opacity:0}],{duration:900,easing:'ease-out',fill:'forwards'});
 burst(960,540,420);burst(760,480,120);burst(1160,600,120);
 await sleep(250);intro.style.pointerEvents='none';introDone=true;busy=false;
 reveal(slides[0],.1);}

function play(sl){reset(sl);setMood(sl);
 if(sl.classList.contains('chapter')){playChapter(sl);return;}
 if(sl.id==='cover'){const intro=document.getElementById('intro');
  if(!introDone){intro.style.opacity=1;intro.style.pointerEvents='auto';intro.getAnimations().forEach(a=>a.cancel());
   document.getElementById('press').getAnimations().forEach(a=>a.cancel());return;}
  intro.style.pointerEvents='none';intro.style.opacity=0;}
 const end=reveal(sl,.25);
 if(sl.id==='end')setTimeout(()=>{if(slides[cur]===sl){confetti();setTimeout(confetti,1900);}},2000);
}

function loadEmbeds(sl,on){sl.querySelectorAll('iframe.embed').forEach(f=>{f.srcdoc=on?EMB[+f.dataset.embed]:'';});}

function go(n){
 if(busy||n<0||n>=slides.length||n===cur)return;
 const old=slides[cur],nw=slides[n],fwd=n>cur;
 const chap=nw.classList.contains('chapter')||old.classList.contains('chapter');
 old.animate(chap?[{opacity:1,transform:'none'},{opacity:0,transform:'perspective(1800px) rotateY('+(fwd?50:-50)+'deg) translateX('+(fwd?-30:30)+'%)',filter:'blur(6px)'}]
                 :[{opacity:1,transform:'none',filter:'blur(0)'},{opacity:0,transform:'scale(.93)',filter:'blur(12px)'}],{duration:1100,easing:EASE,fill:'forwards'})
  .onfinish=()=>{if(slides[cur]!==old){old.classList.remove('active');reset(old);old.getAnimations().forEach(a=>a.cancel());loadEmbeds(old,false);}};
 nw.classList.add('active');
 nw.animate(chap?[{opacity:0,transform:'perspective(1800px) rotateY('+(fwd?-50:50)+'deg) translateX('+(fwd?30:-30)+'%)',filter:'blur(6px)'},{opacity:1,transform:'none',filter:'blur(0)'}]
                :[{opacity:0,transform:'scale(1.07)',filter:'blur(14px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:1400,easing:EASE,fill:'none'});
 cur=n;loadEmbeds(nw,true);play(nw);hud();
}
function hud(){const sl=slides[cur];
 document.getElementById('bar').style.width=((cur+1)/slides.length*100)+'%';
 document.getElementById('num').textContent=(cur+1)+' / '+slides.length;
 document.getElementById('chn').textContent=sl.dataset.chname;
 document.querySelectorAll('#dots i').forEach((d,i)=>d.classList.toggle('on',i==+sl.dataset.ch));
 const a=sl.querySelector('aside');document.getElementById('notes').textContent=a?a.textContent:'';
 try{history.replaceState(null,'','#'+(cur+1));}catch(e){}}

function key(k){
 if(busy)return;
 if(['ArrowRight','ArrowDown',' ','PageDown','Enter'].includes(k)){
  if(slides[cur].id==='cover'&&!introDone){runIntro();return;}go(cur+1);}
 else if(['ArrowLeft','ArrowUp','PageUp'].includes(k))go(cur-1);
 else if(k==='Home')go(0);else if(k==='End')go(slides.length-1);
 else if(k==='f'||k==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
 else if(k==='n'||k==='N'){const nt=document.getElementById('notes');nt.style.display=nt.style.display==='block'?'none':'block';}
 else if(k==='r'||k==='R'){const sl=slides[cur];if(sl.id==='cover'){introDone=false;play(sl);return;}loadEmbeds(sl,true);play(sl);}
 else if(k==='c'||k==='C'){confetti();}
 else if(k==='a'||k==='A'){const q=slides[cur].querySelectorAll('.flip');q.forEach((f,i)=>setTimeout(()=>f.classList.add('on'),i*150));if(q.length)setTimeout(checkQuiz,q.length*150+300);}
}
addEventListener('keydown',e=>{if([' ','ArrowDown','ArrowUp','PageDown','PageUp'].includes(e.key))e.preventDefault();key(e.key);});
addEventListener('message',e=>{if(e.data&&e.data.deckKey)key(e.data.deckKey);});
document.getElementById('prev').onclick=()=>go(cur-1);
document.getElementById('next').onclick=()=>{if(slides[cur].id==='cover'&&!introDone){runIntro();return;}go(cur+1);};
document.getElementById('intro').onclick=()=>{if(!introDone&&!busy)runIntro();};

/* quiz */
let quizParty=false;
function checkQuiz(){const q=document.querySelectorAll('#quiz .flip');if(!quizParty&&[...q].every(f=>f.classList.contains('on'))){quizParty=true;confetti();setTimeout(confetti,900);setTimeout(()=>quizParty=false,4000);}}
document.querySelectorAll('.flip').forEach(f=>f.addEventListener('click',()=>{f.classList.toggle('on');if(f.classList.contains('on')){const r=f.getBoundingClientRect(),s=stage.getBoundingClientRect(),k=1920/s.width;
 burst((r.left+r.width/2-s.left)*k,(r.top+r.height/2-s.top)*k,50);}checkQuiz();}));

/* print mode */
if(location.hash==='#print'){document.body.classList.add('print');
 slides.forEach(s=>s.querySelectorAll('iframe.embed').forEach(f=>f.srcdoc=EMB[+f.dataset.embed]));
 document.querySelectorAll('.flip').forEach(f=>f.classList.add('on'));}
/* hud dots */
document.getElementById('dots').innerHTML=[0,1,2,3,4,5,6,7].map(()=>'<i></i>').join('');
if(location.hash!=='#print'){const start=Math.max(0,Math.min(slides.length-1,(parseInt(location.hash.slice(1))||1)-1));
cur=start;slides[start].classList.add('active');if(start>0)introDone=true;play(slides[start]);hud();}