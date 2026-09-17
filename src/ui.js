import {state,EYES,MOUTHS,EXTRAS,SHAPES,PALETTES,ACCENTS,NAMES} from './config.js';
import {applySeed} from './seed.js';

export const $=s=>document.querySelector(s);
const binders=[];
function el(t,c,txt){const e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function slider(sec,key,label,min,max,step,fmt=v=>v){
 const f=el('div','field'),l=el('label','label'),a=el('span',null,label),b=el('span'),i=el('input');
 i.type='range';i.min=min;i.max=max;i.step=step;i.id='r-'+key;l.htmlFor=i.id;l.append(a,b);f.append(l,i);sec.append(f);
 i.addEventListener('input',()=>{state[key]=+i.value;b.textContent=fmt(+i.value);});
 binders.push(()=>{i.value=state[key];b.textContent=fmt(state[key]);});
}
function seg(sec,key,label,opts){
 const f=el('div','field');if(label){f.append(el('div','label',label));}
 const g=el('div','seg');g.setAttribute('role','group');g.setAttribute('aria-label',label||key);
 const bs=opts.map(([v,t])=>{const b=el('button',null,t);b.type='button';b.onclick=()=>{state[key]=v;syncUI();};g.append(b);return [v,b];});
 f.append(g);sec.append(f);binders.push(()=>bs.forEach(([v,b])=>b.setAttribute('aria-pressed',state[key]===v)));
}
function toggle(parent,key,label){
 const b=el('button','switch');b.type='button';b.append(el('span',null,label),el('i'));
 b.onclick=()=>{state[key]=!state[key];syncUI();};parent.append(b);binders.push(()=>b.setAttribute('aria-pressed',!!state[key]));
}
function swatches(sec,key,label,items,paint){
 const f=el('div','field');f.append(el('div','label',label));const w=el('div','swatches');
 const bs=items.map((it,idx)=>{const b=el('button','sw');b.type='button';paint(b,it);b.setAttribute('aria-label',label+' '+(idx+1));b.onclick=()=>{state[key]=idx;syncUI();};w.append(b);return b;});
 f.append(w);sec.append(f);binders.push(()=>bs.forEach((b,i)=>b.setAttribute('aria-pressed',state[key]===i)));
}
let nameIn,caption,main;

export function initUI(){
const pct=v=>Math.round(v*100)+'%';
const sF=$('#sec-forma'),sR=$('#sec-rosto'),sH=$('#sec-halftone'),sC=$('#sec-cor');
slider(sF,'width','Largura',.4,.66,.01,pct);
slider(sF,'height','Altura',.46,.7,.01,pct);
slider(sF,'tails','Pontas da barra',2,8,1);
slider(sF,'wave','Ondulação',0,1,.01,pct);
{const r=el('div','row2');toggle(r,'arms','Bracinhos');toggle(r,'animate','Animação');sF.append(r);}
seg(sR,'eyes','Olhos',EYES);
seg(sR,'mouth','Boca',MOUTHS);
seg(sR,'extra','Detalhe',EXTRAS);
slider(sR,'eyeGap','Distância dos olhos',.06,.14,.005,pct);
slider(sR,'eyeY','Altura do rosto',-.04,.08,.005,v=>(v*100).toFixed(1));
slider(sH,'cells','Densidade da grade',32,120,1);
slider(sH,'dot','Tamanho do ponto',.5,1.4,.01,pct);
slider(sH,'trail','Rastro',0,.96,.01,pct);
seg(sH,'shape','Formato do ponto',SHAPES);
{const r=el('div','field');toggle(r,'shading','Sombreamento (volume)');sH.append(r);}
swatches(sC,'palette','Papel e tinta',PALETTES,(b,p)=>{b.style.background=p.paper;b.firstChild||b.append(el('b'));b.firstChild.style.background=p.ink;});
swatches(sC,'accent','Destaque',ACCENTS,(b,c)=>{b.style.background='var(--chip)';b.append(el('b'));b.firstChild.style.background=c;b.firstChild.style.width=b.firstChild.style.height='18px';});

nameIn=$('#name');caption=$('#caption');main=$('#main');
nameIn.addEventListener('input',()=>applySeed(nameIn.value,syncUI));
$('#shuffle').onclick=()=>applySeed(NAMES[Math.floor(Math.random()*NAMES.length)]+' '+Math.floor(Math.random()*900+100),syncUI);
}

export function syncUI(){binders.forEach(f=>f());nameIn.value=state.seed;caption.textContent=state.seed;
 const p=PALETTES[state.palette];main.style.background=p.paper;caption.style.color=p.ink;$('#status').style.color=p.ink;}
