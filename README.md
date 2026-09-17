# Gerador de fantasmas

Gerador de mascote fantasma com efeito halftone. Cada nome funciona como semente: o mesmo nome sempre gera o mesmo fantasma.

## Como rodar

Precisa do [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Para gerar a versão final (pasta `dist/`, pronta para subir em qualquer hospedagem estática):

```bash
npm run build
```

## Estrutura

```
gerador-fantasma/
├── index.html          marcação da página
├── package.json
└── src/
    ├── main.js         ponto de entrada: palco, loop de animação
    ├── config.js       opções, paletas, estado padrão, presets e nome inicial
    ├── seed.js         hash do nome e geração dos traços
    ├── ghost.js        desenho do fantasma no mapa de intensidade
    ├── halftone.js     amostragem da grade, rastro e desenho dos pontos
    ├── ui.js           painel de controles
    ├── export.js       exportação PNG e SVG
    └── style.css
```

## Onde mexer

- **Nome inicial:** `DEFAULT_NAME` em `src/config.js`.
- **Fantasmas fixos:** adicione entradas em `PRESETS` (`src/config.js`). A chave é o nome em minúsculas.
- **Padrões de halftone e cor:** objeto `state` em `src/config.js`.
- **Novos olhos, bocas ou detalhes:** adicione a opção nas listas de `config.js` e o desenho correspondente em `src/ghost.js`.

## Como o efeito funciona

1. O fantasma é desenhado num canvas oculto. O canal vermelho guarda o corpo (tinta) e o verde, os elementos de destaque. Olhos e boca são recortes.
2. O mapa é dividido na grade; cada célula faz a média de 4×4 pixels.
3. O raio de cada ponto é proporcional à raiz da intensidade, então a área acompanha o tom.
4. O rastro guarda o valor do quadro anterior multiplicado pelo controle "Rastro".
