import {state} from './config.js';

/* ---------- ghost (intensity map: R = tinta, G = destaque) ---------- */
export function drawGhost(g,S,t){
 const an=state.animate?1:0, u=S;
 g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-over';g.globalAlpha=1;
 g.clearRect(0,0,S,S);
 const fx=Math.sin(t*.7)*.035*an, fy=Math.sin(t*1.5)*.03*an;
 const w=state.width*u, h=state.height*u, r=w/2;
 const cx=(.5+fx)*u, top=(.5-state.height/2+fy+.02)*u, headCy=top+r, bottom=top+h;
 g.save();g.translate(cx,headCy);g.rotate(Math.sin(t*1.1)*.06*an);g.translate(-cx,-headCy);
 const RED='rgb(255,0,0)', GREEN='rgb(0,255,0)';
 let fill=RED;
 if(state.shading){const gr=g.createRadialGradient(cx-r*.35,headCy-r*.35,0,cx,headCy+h*.2,w*1.05);gr.addColorStop(0,'rgb(95,0,0)');gr.addColorStop(.55,'rgb(200,0,0)');gr.addColorStop(1,RED);fill=gr;}
 g.fillStyle=fill;g.strokeStyle=fill;g.lineCap='round';g.lineJoin='round';

 // chifres
 if(state.extra==='chifres'){[-1,1].forEach(s=>{const a=-Math.PI/2+s*.62,bx=cx+Math.cos(a)*r*.92,by=headCy+Math.sin(a)*r*.92;
  g.beginPath();g.moveTo(bx-s*r*.2*.3-r*.12,by+r*.1);g.lineTo(bx+s*r*.14,by-r*.36);g.lineTo(bx+r*.14,by+r*.08);g.closePath();g.fill();});}
 // bracinhos
 if(state.arms){[-1,1].forEach(s=>{g.save();g.translate(cx+s*r*.98,headCy+h*.32);g.rotate(s*(.5+Math.sin(t*2.4+s)*.25*an));
  g.beginPath();g.ellipse(0,0,r*.22,r*.12,0,0,Math.PI*2);g.fill();g.restore();});}
 // corpo
 const n=Math.round(state.tails), seg=w/n, d=(.012+state.wave*.05)*u;
 g.beginPath();g.moveTo(cx-r,headCy);g.arc(cx,headCy,r,Math.PI,0);g.lineTo(cx+r,bottom);
 for(let i=0;i<n;i++){const x0=cx+r-seg*i,x1=x0-seg,wob=Math.sin(t*3.2+i*1.4)*d*.5*an;g.quadraticCurveTo((x0+x1)/2,bottom+d*2+wob,x1,bottom);}
 g.closePath();g.fill();

 const ex=state.eyeGap*u, ey=headCy+state.eyeY*u, my=ey+.085*u;
 // bochechas (só sobre o corpo)
 if(state.extra==='bochechas'){g.globalCompositeOperation='source-atop';g.fillStyle=GREEN;
  [-1,1].forEach(s=>{g.beginPath();g.ellipse(cx+s*(ex+.045*u),ey+.055*u,.038*u,.024*u,0,0,Math.PI*2);g.fill();});}

 // olhos (recortes)
 const ph=t%3.8, blink=an&&ph<.13?Math.max(.08,Math.abs(ph-.065)/.065):1;
 g.globalCompositeOperation='destination-out';g.fillStyle='#000';g.strokeStyle='#000';
 [-1,1].forEach(s=>{const x=cx+s*ex;g.beginPath();
  switch(state.eyes){
   case 'ponto':g.ellipse(x,ey,.034*u,.034*u*blink,0,0,Math.PI*2);g.fill();break;
   case 'oval':g.ellipse(x,ey,.026*u,.052*u*blink,0,0,Math.PI*2);g.fill();break;
   case 'brilho':g.ellipse(x,ey,.046*u,.056*u*blink,0,0,Math.PI*2);g.fill();break;
   case 'feliz':g.lineWidth=.022*u;g.arc(x,ey+.018*u,.034*u,Math.PI*1.15,Math.PI*1.85);g.stroke();break;
   case 'sono':g.lineWidth=.02*u;g.arc(x,ey-.022*u,.034*u,Math.PI*.18,Math.PI*.82);g.stroke();break;
   case 'x':g.lineWidth=.02*u;const k=.026*u;g.moveTo(x-k,ey-k);g.lineTo(x+k,ey+k);g.moveTo(x+k,ey-k);g.lineTo(x-k,ey+k);g.stroke();break;
  }});
 // boca
 g.beginPath();
 switch(state.mouth){
  case 'o':g.ellipse(cx,my,.02*u,(.026+Math.sin(t*2)*.006*an)*u,0,0,Math.PI*2);g.fill();break;
  case 'sorriso':g.lineWidth=.02*u;g.arc(cx,my-.035*u,.045*u,Math.PI*.22,Math.PI*.78);g.stroke();break;
  case 'onda':g.lineWidth=.017*u;for(let i=0;i<=16;i++){const x=cx+(-.05+i*.00625)*u,y=my+Math.sin(i*1.2+t*6*an)*.009*u;i?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();break;
  case 'lingua':g.arc(cx,my-.018*u,.044*u,0,Math.PI);g.closePath();g.fill();break;
 }
 g.globalCompositeOperation='source-over';
 if(state.eyes==='brilho'){g.fillStyle=RED;[-1,1].forEach(s=>{g.beginPath();g.arc(cx+s*ex+.014*u,ey-.018*u*blink,.013*u,0,Math.PI*2);g.fill();});}
 if(state.mouth==='lingua'){g.fillStyle=GREEN;g.beginPath();g.ellipse(cx+.008*u,my+.012*u,.02*u,.024*u,0,0,Math.PI*2);g.fill();}
 if(state.extra==='aureola'){g.strokeStyle=GREEN;g.lineWidth=.02*u;g.beginPath();g.ellipse(cx,top-.07*u+Math.sin(t*2)*.008*u*an,r*.55,.032*u,0,0,Math.PI*2);g.stroke();}
 if(state.extra==='antena'){const sw=Math.sin(t*2.2)*.03*u*an,tx=cx+.05*u+sw,ty=top-.11*u;
  g.strokeStyle=RED;g.lineWidth=.014*u;g.beginPath();g.moveTo(cx,top+.01*u);g.quadraticCurveTo(cx-.01*u,top-.06*u,tx,ty);g.stroke();
  g.fillStyle=GREEN;g.beginPath();g.arc(tx,ty,.026*u,0,Math.PI*2);g.fill();}

 // acessórios (um por vez) — sempre ao lado/fora da silhueta, para não sumir sobre o corpo escuro
 const hx=cx+r*1.32, hy=headCy+h*.44;
 if(state.accessory==='fone'){
  g.strokeStyle=RED;g.lineWidth=r*.11;g.lineCap='round';
  g.beginPath();g.arc(cx,headCy-r*.1,r*1.16,Math.PI*1.1,Math.PI*1.9);g.stroke();
  g.fillStyle=RED;[-1,1].forEach(s=>{g.beginPath();g.ellipse(cx+s*r*1.07,ey+.015*u,r*.16,r*.24,0,0,Math.PI*2);g.fill();});
  g.fillStyle=GREEN;[-1,1].forEach(s=>{g.beginPath();g.ellipse(cx+s*r*1.07,ey+.015*u,r*.065,r*.1,0,0,Math.PI*2);g.fill();});
 } else if(state.accessory==='caneca'){
  const mx=hx, my=hy, mw=r*.44, mh=r*.38;
  g.fillStyle=RED;
  g.beginPath();g.rect(mx-mw*.5,my-mh*.5,mw,mh*.9);g.fill();
  g.beginPath();g.ellipse(mx,my-mh*.5,mw*.5,mw*.12,0,0,Math.PI*2);g.fill();
  g.lineWidth=mw*.16;g.strokeStyle=RED;
  g.beginPath();g.arc(mx+mw*.66,my-mh*.05,mh*.32,-Math.PI*.55,Math.PI*.55);g.stroke();
  g.strokeStyle=GREEN;g.lineWidth=mw*.1;g.lineCap='round';
  [-1,0,1].forEach((s,i)=>{const sx0=mx+s*mw*.22,baseY=my-mh*.58;g.beginPath();
   for(let k=0;k<=5;k++){const yy=baseY-k*mh*.17,xx=sx0+Math.sin(t*2.2+i*1.8+k*.85)*mw*.1*an;k?g.lineTo(xx,yy):g.moveTo(xx,yy);}
   g.stroke();});
 } else if(state.accessory==='energetico'){
  const ax=hx, ay=hy, cw=r*.32, ch=r*.6;
  g.fillStyle=RED;
  g.beginPath();g.rect(ax-cw*.5,ay-ch*.5,cw,ch);g.fill();
  g.beginPath();g.ellipse(ax,ay-ch*.5,cw*.5,cw*.16,0,0,Math.PI*2);g.fill();
  g.beginPath();g.ellipse(ax,ay+ch*.5,cw*.5,cw*.16,0,0,Math.PI*2);g.fill();
  g.fillStyle=GREEN;g.fillRect(ax-cw*.5,ay-ch*.1,cw,ch*.2);
 } else if(state.accessory==='notebook'){
  const lx=cx+r*1.12, ly=bottom-h*.03, lw=r*.82, lh=r*.44;
  g.fillStyle=RED;
  g.beginPath();g.moveTo(lx-lw*.55,ly);g.lineTo(lx+lw*.45,ly);g.lineTo(lx+lw*.32,ly+lh*.22);g.lineTo(lx-lw*.68,ly+lh*.22);g.closePath();g.fill();
  g.beginPath();g.moveTo(lx-lw*.5,ly);g.lineTo(lx+lw*.4,ly);g.lineTo(lx+lw*.32,ly-lh);g.lineTo(lx-lw*.42,ly-lh);g.closePath();g.fill();
  // tela: fundo em destaque + logo "iot" bem grosso (traços finos somem no halftone)
  const gw=lw*.66, gh=lh*.62, gx=lx-.05*lw, gy=ly-lh*.78;
  g.fillStyle=GREEN;g.fillRect(gx-gw/2,gy-gh/2,gw,gh);
  g.fillStyle=RED;
  const gs=gh*.62, sp=gw*.29, x1=gx-sp, x2=gx, x3=gx+sp;
  g.fillRect(x1-gs*.16,gy-gs*.5,gs*.32,gs);
  g.beginPath();g.arc(x2,gy,gs*.44,0,Math.PI*2);g.fill();
  g.fillRect(x3-gs*.44,gy-gs*.5,gs*.88,gs*.24);
  g.fillRect(x3-gs*.13,gy-gs*.5,gs*.26,gs);
 }
 g.restore();
}


