// Opções e padrões do gerador

export const EYES=[['ponto','Ponto'],['oval','Oval'],['brilho','Brilho'],['feliz','Feliz'],['sono','Sono'],['x','Nocaute']];
export const MOUTHS=[['nada','Nenhuma'],['o','Oh'],['sorriso','Sorriso'],['onda','Tremida'],['lingua','Língua']];
export const EXTRAS=[['nada','Nenhum'],['bochechas','Bochechas'],['aureola','Auréola'],['chifres','Chifres'],['antena','Antena']];
export const SHAPES=[['circulo','Círculo'],['quadrado','Quadrado'],['losango','Losango']];
export const PALETTES=[{paper:'#E9E9E9',ink:'#141414'},{paper:'#141414',ink:'#EDEDED'},{paper:'#DCE7C6',ink:'#1D2912'},{paper:'#F4EC86',ink:'#1A1A1A'},{paper:'#C8DCF1',ink:'#0F2139'},{paper:'#FFD6E8',ink:'#2A0A18'}];
export const ACCENTS=['#FF2E8A','#FF3B1F','#2F6BFF','#00A06A','#141414'];
export const NAMES=['Bu','Névoa','Bruma','Lençol','Fumaça','Pipoca','Sombra','Algodão','Nuvem','Suspiro','Eco','Vulto','Assombro','Cochilo','Farol'];


export const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
export const state={seed:'',width:.54,height:.58,tails:4,wave:.6,arms:true,eyes:'ponto',mouth:'nada',extra:'nada',eyeGap:.1,eyeY:.02,
 cells:72,dot:1,shape:'circulo',shading:true,trail:.82,animate:!reduce,palette:0,accent:0};


// Presets: nomes com configuração fixa (em vez de gerada pela semente)
export const PRESETS={bu:{width:.52,height:.55,tails:5,wave:.9,arms:true,eyes:'feliz',mouth:'nada',extra:'nada',eyeGap:.09,eyeY:.02}};

// Nome carregado ao abrir
export const DEFAULT_NAME='Bu';
