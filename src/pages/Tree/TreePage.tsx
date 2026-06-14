import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
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

        <div className="h-[60vh] border border-current/10 rounded">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, drawn.zoom]} />
            {drawn.nodes.map((n, i) => (
              <BoxNode key={`${n.position?.x}-${n.position?.y}-${i}`} node={n} fill={fill} text={text} />
            ))}
          </Canvas>
        </div>

        <section className="mt-20 pt-12 border-t border-current/10">
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-8">desarrollo</p>
          <ol className="relative border-l border-current/15 pl-8 space-y-7">
            {TIMELINE.map((t) => (
              <li key={t.date} className="relative">
                <span className="absolute -left-[35px] top-[7px] w-2 h-2 rounded-full bg-current opacity-50" />
                <time className="block text-[11px] tracking-[0.2em] uppercase opacity-50">{t.date}</time>
                <p className="font-serif text-base mt-1">{t.title}</p>
              </li>
            ))}
          </ol>
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
