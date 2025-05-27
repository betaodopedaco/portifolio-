// SKILLS: partículas e linhas de constelação
const skCanvas = document.getElementById('skillCanvas'), skCtx = skCanvas.getContext('2d');
let skParts = [];
function initSK(){
  skCanvas.width = window.innerWidth; skCanvas.height = window.innerHeight;
  skParts = Array.from({length:60},()=>({
    x:Math.random()*skCanvas.width,
    y:Math.random()*skCanvas.height,
    size:Math.random()*2+1,
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5
  }));
}
function animSK(){
  skCtx.clearRect(0,0,skCanvas.width,skCanvas.height);
  skParts.forEach((p,i)=>{
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>skCanvas.width) p.dx*=-1;
    if(p.y<0||p.y>skCanvas.height) p.dy*=-1;
    skCtx.beginPath(); skCtx.arc(p.x,p.y,p.size,0,2*Math.PI);
    skCtx.fillStyle = 'rgba(255,255,255,0.6)'; skCtx.fill();
    for(let j=i+1;j<skParts.length;j++){
      const q = skParts[j];
      const dist = (p.x-q.x)**2 + (p.y-q.y)**2;
      if(dist<10000){
        skCtx.strokeStyle = `rgba(255,255,255,${1 - dist/10000})`;
        skCtx.lineWidth = 0.8;
        skCtx.beginPath(); skCtx.moveTo(p.x,p.y); skCtx.lineTo(q.x,q.y); skCtx.stroke();
      }
    }
  });
  requestAnimationFrame(animSK);
}
initSK(); animSK(); window.addEventListener('resize',initSK);

// CONTACT: background partículas
const bgC = document.getElementById('bgCanvas'), bgCtx = bgC.getContext('2d');
let bgP = [];
function initBG(){
  bgC.width=window.innerWidth; bgC.height=window.innerHeight;
  bgP = Array.from({length:80},()=>({
    x:Math.random()*bgC.width,
    y:Math.random()*bgC.height,
    size:Math.random()*2+1,
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5,
    color:['#FFD700','#FF0000','#FFFFFF','#000000'][Math.floor(Math.random()*4)]
  }));
}
function animBG(){
  bgCtx.clearRect(0,0,bgC.width,bgC.height);
  bgP.forEach(p=>{
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0)p.x=bgC.width; if(p.x>bgC.width)p.x=0;
    if(p.y<0)p.y=bgC.height; if(p.y>bgC.height)p.y=0;
    bgCtx.beginPath(); bgCtx.arc(p.x,p.y,p.size,0,2*Math.PI);
    bgCtx.fillStyle=p.color; bgCtx.fill();
  });
  requestAnimationFrame(animBG);
}
initBG(); animBG(); window.addEventListener('resize',initBG);

// CONFETTI: ao clicar botões
const cfC = document.getElementById('confettiCanvas'), cfCtx = cfC.getContext('2d');
let confs = [];
function initCF(){ cfC.width=window.innerWidth; cfC.height=window.innerHeight; }
function startConfetti(){
  for(let i=0;i<150;i++){
    confs.push({
      x:Math.random()*cfC.width,
      y:Math.random()*-cfC.height,
      size:Math.random()*8+4,
      dx:(Math.random()-0.5)*5,
      dy:Math.random()*8+4,
      rot:Math.random()*360,
      spin:(Math.random()-0.5)*10,
      color:['#FFD700','#FF0000','#FFFFFF','#000000'][Math.floor(Math.random()*4)]
    });
  }
  // A ação de abrir o WhatsApp foi movida para dentro do setTimeout
  // para que o confete possa começar antes de a página ser redirecionada.
  setTimeout(()=>window.open('https://wa.me/5581984027098','_blank'),1000);
}
function animCF(){
  cfCtx.clearRect(0,0,cfC.width,cfC.height);
  confs.forEach((c,i)=>{
    c.x+=c.dx; c.y+=c.dy; c.rot+=c.spin;
    cfCtx.save(); cfCtx.translate(c.x,c.y);
    cfCtx.rotate(c.rot*Math.PI/180);
    cfCtx.fillStyle=c.color;
    cfCtx.fillRect(-c.size/2,-c.size/2,c.size,c.size);
    cfCtx.restore();
  });
  confs = confs.filter(c=>c.y<cfC.height+20);
  requestAnimationFrame(animCF);
}
initCF(); animCF(); window.addEventListener('resize',initCF);

// ADICIONAR EVENT LISTENER
document.querySelector('.contact-content .buttons .button').addEventListener('click', startConfetti);
