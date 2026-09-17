import {state,EYES,MOUTHS,EXTRAS,PRESETS} from './config.js';

/* ---------- seed ---------- */
export function hash(s){let h1=0xdeadbeef^s.length,h2=0x41c6ce57^s.length;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677);}
 h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return (h2>>>0)^(h1>>>0);}
export function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export function applySeed(name,syncUI){
 const key=(name||'').trim().toLowerCase();
 if(PRESETS[key]){Object.assign(state,PRESETS[key],{seed:name});syncUI();return;}
 const r=mulberry(hash((name||'bu').trim().toLowerCase()));
 const pick=a=>a[Math.floor(r()*a.length)][0], rng=(a,b)=>+(a+(b-a)*r()).toFixed(2);
 Object.assign(state,{seed:name,width:rng(.44,.62),height:rng(.5,.66),tails:3+Math.floor(r()*5),wave:rng(.25,1),arms:r()<.55,
  eyes:pick(EYES),mouth:pick(MOUTHS),extra:pick(EXTRAS),eyeGap:rng(.075,.12),eyeY:rng(-.01,.05)});
 syncUI();
}


