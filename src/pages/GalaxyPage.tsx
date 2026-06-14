import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Galaxy from '../components/Galaxy'

export default function GalaxyPage() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [3, 3, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <Galaxy />
        </Suspense>
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>
  )
}
