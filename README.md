# skdv

Sitio personal · `skdv` / `pipe oz` · <sub>[live ↗](https://sk-dv.github.io/sk-dv/)</sub>

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind v4 (con `@custom-variant dark`)
- React Three Fiber + drei + three.js
- React Router DOM

## Estructura

```
src/
├─ pages/
│  ├─ Landing.tsx       Texto 3D "skdv" flotante y rotable
│  ├─ About.tsx         Bio editorial (pipe oz, memento mori)
│  ├─ GalaxyPage.tsx    Experimento de partículas
│  └─ Tree/             Árbol de expresión (infijo → posfijo → 3D)
│     ├─ TreePage.tsx   Input, recorridos y canvas
│     ├─ BoxNode.tsx    Nodo R3F (caja + texto + aristas)
│     ├─ algorithms.ts  infixToPostfix, postfixToTree, recorridos
│     └─ tree-node.ts   Modelo TreeNode<T>
├─ components/
│  ├─ Navbar.tsx        Nav fijo con mix-blend-difference
│  ├─ FloatingText.tsx  Text3D + Float + OrbitControls
│  └─ Galaxy.tsx        Galaxia espiral generativa, theme-aware
├─ theme.tsx            Context light/dark con persistencia
├─ App.tsx
├─ main.tsx
└─ index.css            Tailwind + tipografía EB Garamond / Inter
```

## Experimentos

- **/galaxy** — galaxia espiral generativa (R3F + shaders simples).
- **/tree** — árbol de expresión. Parsea una expresión infija (`(a+b)-c`), la convierte a posfija con _shunting yard_, arma el árbol y lo dibuja en 3D. Muestra los tres recorridos (pre, in, post).

## Estética

Editorial minimalista — serif (EB Garamond) para títulos y cuerpo, sans (Inter) para nav y metadatos. Paleta `stone-50 ↔ stone-950` con acentos de la galaxia.

## Dev

```sh
npm install
npm run dev    # http://localhost:5173/sk-dv/
npm run build
```

## Deploy

GitHub Pages vía Actions. Disparado por tags `vN.N.N`:

```sh
git tag v0.1.2
git push origin v0.1.2
```

El workflow está en `.github/workflows/deploy.yml`.
