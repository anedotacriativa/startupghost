import './style.css';
import {state,DEFAULT_NAME} from './config.js';
import {applySeed} from './seed.js';
import {sample,render} from './halftone.js';
import {$,initUI,syncUI} from './ui.js';
import {initExport} from './export.js';

initUI();
initExport();

const main=$('#main'), stage=$('#stage'), ctx=stage.getContext('2d');

function resize(){
 const b=main.getBoundingClientRect();
 const size=Math.max(200,Math.floor(Math.min(b.width,b.height)-40));
 const dpr=Math.min(2,devicePixelRatio||1);
 stage.style.width=stage.style.height=size+'px';
 stage.width=stage.height=Math.round(size*dpr);
}
new ResizeObserver(resize).observe(main);
resize();

let clock=0,last=performance.now();
function loop(now){
 const dt=Math.min(.05,(now-last)/1000);last=now;
 if(state.animate)clock+=dt;
 sample(clock);
 render(ctx,stage.width);
 requestAnimationFrame(loop);
}

applySeed(DEFAULT_NAME,syncUI);
requestAnimationFrame(loop);
