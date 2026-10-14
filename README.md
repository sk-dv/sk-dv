# [skdv](https://sk-dv.github.io/sk-dv/)

Mi sitio personal. Soy desarrollador de software y programo con lo que me mueve: la música,
lo visual, los videojuegos y la literatura.

## Proyectos

- **[Oído Armónico](https://entrenador-auditivo.web.app)** — entrenador auditivo: acordes, grados, intervalos y dictado. ([código](https://github.com/sk-dv/entrenador-auditivo))
- **[Portafolio · Arte & Cultura](https://sk-dv.github.io/portafolio-arte/)** — notas de EIA 4 (INBAL) sobre cultura, estética, percepción e interpretación. ([código](https://github.com/sk-dv/portafolio-arte))
- **veintiuno** — blackjack que desarrollo para ganar experiencia diseñando videojuegos; lo trabajo con una especificación y pruebas de sus reglas.
- **Sudoku 8bit** — juego en Flutter con backend en Flask y PostgreSQL.
- **[Consultorio digital](https://github.com/sk-dv/consultorio-digital)** — SaaS para consultorios médicos.

## Experimentos

- **/tree** — árbol de expresión: convierte una expresión infija (`(a+b)-c`) a posfija con *shunting yard*, arma el árbol y lo dibuja en 3D con sus tres recorridos.
- **/galaxy** — galaxia espiral generativa.

## Contexto

Vite + React + TypeScript, Tailwind, React Three Fiber y React Router. Estética editorial:
EB Garamond para el texto, Inter para la navegación, y una paleta de `stone-50` a `stone-950`
con modo claro y oscuro. Las páginas viven en `src/pages/` y los componentes en `src/components/`.

## Ejecución

```sh
npm install
npm run dev    # http://localhost:5173/sk-dv/
npm run build
```

## Publicación

GitHub Pages con Actions, disparado por etiquetas `vN.N.N` (`.github/workflows/deploy.yml`):

```sh
git tag v0.1.2
git push origin v0.1.2
```
