import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import FloatingText from '../components/FloatingText'

export default function Landing() {
  return (
    <div className="h-full w-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} />
        <Suspense fallback={null}>
          <FloatingText />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableDamping />
      </Canvas>

      <div className="absolute left-0 right-0 bottom-36 flex justify-center pointer-events-none">
        <p className="font-serif italic text-base md:text-lg opacity-60">pipe oz</p>
      </div>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-6 text-[12px] tracking-widest uppercase opacity-60">
        <Link to="/galaxy" className="hover:opacity-100 transition">galaxy</Link>
        <span className="opacity-50">·</span>
        <Link to="/tree" className="hover:opacity-100 transition">tree</Link>
        <span className="opacity-50">·</span>
        <Link to="/about" className="hover:opacity-100 transition">about</Link>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 text-[11px] tracking-widest uppercase opacity-40">
        <a href="https://github.com/sk-dv" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">github</a>
        <span>·</span>
        <a href="https://www.linkedin.com/in/felipeosornio/" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">linkedin</a>
      </div>
    </div>
  )
}
