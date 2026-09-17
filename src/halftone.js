import {state,PALETTES,ACCENTS} from './config.js';
import {drawGhost} from './ghost.js';

/* ---------- halftone ---------- */
const SS=4;
const big=document.createElement('canvas'), bctx=big.getContext('2d',{willReadFrequently:true});
export const grid={N:0,A:null};
export function sample(t){
 const n=Math.round(state.cells);
 if(n!==grid.N){grid.N=n;big.width=big.height=grid.N*SS;grid.A=new Float32Array(grid.N*grid.N*2);}
 drawGhost(bctx,grid.N*SS,t);
 const d=bctx.getImageData(0,0,grid.N*SS,grid.N*SS).data, W=grid.N*SS, k=state.trail, inv=1/(SS*SS*255*255);
 for(let y=0;y<grid.N;y++)for(let x=0;x<grid.N;x++){
  let rs=0,gs=0;
  for(let j=0;j<SS;j++){let p=((y*SS+j)*W+x*SS)*4;for(let i=0;i<SS;i++,p+=4){const a=d[p+3];rs+=d[p]*a;gs+=d[p+1]*a;}}
  const idx=(y*grid.N+x)*2, rv=rs*inv, gv=gs*inv;
  grid.A[idx]=Math.max(rv,grid.A[idx]*k);grid.A[idx+1]=Math.max(gv,grid.A[idx+1]*k);
 }
}
export function eachDot(size,cb){
 const c=size/grid.N, maxR=c*.5*state.dot, br=Math.max(.5,c*.07);
 for(let y=0;y<grid.N;y++)for(let x=0;x<grid.N;x++){
  const i=(y*grid.N+x)*2, v=grid.A[i], a=grid.A[i+1], val=Math.max(v,a), px=(x+.5)*c, py=(y+.5)*c;
  if(val<.05)cb('bg',px,py,br);else cb(a>v*.9?'accent':'ink',px,py,Math.max(br,maxR*Math.sqrt(val)));
 }
}
function addShape(p,x,y,r){
 if(state.shape==='quadrado'){const s=r*.9;p.rect(x-s,y-s,s*2,s*2);}
 else if(state.shape==='losango'){const s=r*1.2;p.moveTo(x,y-s);p.lineTo(x+s,y);p.lineTo(x,y+s);p.lineTo(x-s,y);p.closePath();}
 else{p.moveTo(x+r,y);p.arc(x,y,r,0,Math.PI*2);}
}
export function render(ctx,size){
 const pal=PALETTES[state.palette];
 ctx.fillStyle=pal.paper;ctx.fillRect(0,0,size,size);
 const P={bg:new Path2D(),ink:new Path2D(),accent:new Path2D()};
 eachDot(size,(k,x,y,r)=>{if(k==='bg'){P.bg.moveTo(x+r,y);P.bg.arc(x,y,r,0,Math.PI*2);}else addShape(P[k],x,y,r);});
 ctx.fillStyle=pal.ink;ctx.globalAlpha=.2;ctx.fill(P.bg);ctx.globalAlpha=1;ctx.fill(P.ink);
 ctx.fillStyle=ACCENTS[state.accent];ctx.fill(P.accent);
}


