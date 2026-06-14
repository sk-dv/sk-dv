import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { MOUSE, TOUCH } from 'three'
import { useTheme } from '../../theme'
import { buildTree, type Traversal } from './algorithms'
import type { TreeNode } from './tree-node'
import BoxNode from './BoxNode'

type Drawn = { zoom: number; nodes: TreeNode<string>[]; traversal: Traversal | null }

const EMPTY: Drawn = { zoom: 75, nodes: [], traversal: null }

const TIMELINE: { date: string; title: string }[] = [
  { date: '2023-03-10', title: 'Primer commit · página inicial' },
  { date: '2023-03-13', title: 'Algoritmos de transformación · shunting yard' },
  { date: '2023-03-14', title: 'Recorrido en orden integrado' },
  { date: '2023-03-19', title: 'Generación visual del árbol' },
  { date: '2023-03-21', title: 'Grid generator · posicionamiento' },
  { date: '2023-03-25', title: 'Input de expresión' },
  { date: '2023-03-27', title: 'Estilo visual definitivo' },
  { date: '2023-04-08', title: 'Recorridos pre y postorden' },
  { date: '2026-06-14', title: 'Portado a sk-dv · React 19 · Tailwind 4' },
]

export default function TreePage() {
  const { theme } = useTheme()
  const [expression, setExpression] = useState('')
  const [drawn, setDrawn] = useState<Drawn>(EMPTY)

  const draw = () => setDrawn(buildTree(expression))

  const fill = theme === 'dark' ? '#fafaf9' : '#1c1917'
  const text = theme === 'dark' ? '#1c1917' : '#fafaf9'

  return (
    <div className="min-h-full w-full pt-32 pb-20 px-6">
      <div className="max-w-5xl w-full mx-auto">
        <header className="mb-10">
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-3">experimento</p>
          <h1 className="font-serif text-4xl">árbol de expresión</h1>
          <p className="font-serif italic text-sm opacity-50 mt-2">infijo → posfijo → árbol</p>
        </header>

        <hr className="border-current opacity-10 mb-10" />

        <div className="flex flex-col md:flex-row gap-10 mb-12">
          <div className="md:w-1/3 flex flex-col gap-3">
            <label className="text-[11px] tracking-[0.2em] uppercase opacity-50">expresión</label>
            <input
              type="text"
              value={expression}
              placeholder="(a+b)-c"
              onChange={(e) => setExpression(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && draw()}
              className="bg-transparent border-b border-current/30 focus:border-current/70 focus:outline-none py-2 font-serif text-lg transition"
            />
            <button
              onClick={draw}
              className="self-start mt-4 text-[12px] tracking-widest uppercase opacity-60 hover:opacity-100 transition border-b border-current/40 pb-1"
            >
              dibujar
            </button>
          </div>

          <div className="md:w-2/3 space-y-3">
            <Row label="preorden" values={drawn.traversal?.preOrder} />
            <Row label="en orden" values={drawn.traversal?.inOrder} />
            <Row label="postorden" values={drawn.traversal?.postOrder} />
          </div>
        </div>

        <div className="h-[60vh] border border-current/20 rounded relative overflow-hidden">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, drawn.zoom]} />
            <OrbitControls
              enableRotate={false}
              enablePan
              enableZoom
              screenSpacePanning
              enableDamping
              mouseButtons={{ LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }}
              touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_PAN }}
            />
            {drawn.nodes.map((n, i) => (
              <BoxNode key={`${n.position?.x}-${n.position?.y}-${i}`} node={n} fill={fill} text={text} />
            ))}
          </Canvas>
          <p className="absolute bottom-3 right-4 text-[10px] tracking-widest uppercase opacity-40 pointer-events-none">
            arrastrar · rueda para zoom
          </p>
        </div>

        <section className="mt-20 pt-12 border-t border-stone-300 dark:border-stone-700">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-8 text-stone-900 dark:text-stone-100">desarrollo</p>
          <div className="relative ml-2">
            <span
              aria-hidden
              className="absolute left-0 top-2 bottom-2 w-[2px] rounded bg-stone-400 dark:bg-stone-500"
            />
            <ol className="space-y-7">
              {TIMELINE.map((t) => (
                <li key={t.date} className="relative pl-8">
                  <span className="absolute left-[-5px] top-[6px] w-3 h-3 rounded-full bg-stone-900 dark:bg-stone-100 ring-4 ring-stone-50 dark:ring-stone-950" />
                  <time className="block text-[11px] tracking-[0.2em] uppercase text-stone-600 dark:text-stone-400">
                    {t.date}
                  </time>
                  <p className="font-serif text-lg mt-1 text-stone-900 dark:text-stone-100">{t.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}

function Row({ label, values }: { label: string; values?: string[] }) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="text-[11px] tracking-[0.2em] uppercase opacity-50 w-24 shrink-0">{label}</span>
      <span className="font-serif text-base">{values?.join(' · ') || '—'}</span>
    </div>
  )
}
