import {state,PALETTES,ACCENTS} from './config.js';
import {eachDot,render} from './halftone.js';
import {$} from './ui.js';

function slug(){return (state.seed||'fantasma').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'fantasma';}

export function svgString(size=1024){
 const pal=PALETTES[state.palette],f=n=>+n.toFixed(2),parts={bg:[],ink:[],accent:[]};
 eachDot(size,(k,x,y,r)=>{
  if(k==='bg'||state.shape==='circulo')parts[k].push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/>`);
  else if(state.shape==='quadrado'){const s=r*.9;parts[k].push(`<rect x="${f(x-s)}" y="${f(y-s)}" width="${f(s*2)}" height="${f(s*2)}"/>`);}
  else{const s=r*1.2;parts[k].push(`<polygon points="${f(x)},${f(y-s)} ${f(x+s)},${f(y)} ${f(x)},${f(y+s)} ${f(x-s)},${f(y)}"/>`);}
 });
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="100%" height="100%" fill="${pal.paper}"/><g fill="${pal.ink}" opacity=".2">${parts.bg.join('')}</g><g fill="${pal.ink}">${parts.ink.join('')}</g><g fill="${ACCENTS[state.accent]}">${parts.accent.join('')}</g></svg>`;
}

function download(blob,filename){
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export function initExport(){
 const bp=$('#dlpng'),bs=$('#dlsvg');
 bp.onclick=()=>{const c=document.createElement('canvas');c.width=c.height=2048;render(c.getContext('2d'),2048);c.toBlob(b=>b&&download(b,slug()+'.png'),'image/png');};
 bs.onclick=()=>download(new Blob([svgString()],{type:'image/svg+xml'}),slug()+'.svg');
}
