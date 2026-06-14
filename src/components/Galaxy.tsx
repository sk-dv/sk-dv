import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color, MultiplyBlending, Points } from 'three'
import { useTheme } from '../theme'

type GalaxyProps = {
  count?: number
  size?: number
  radius?: number
  branches?: number
  spin?: number
  randomness?: number
  randomnessPower?: number
}

export default function Galaxy({
  count = 100_000,
  size = 0.02,
  radius = 5,
  branches = 5,
  spin = 1,
  randomness = 0.2,
  randomnessPower = 3,
}: GalaxyProps) {
  const { theme } = useTheme()
  const ref = useRef<Points>(null)

  const insideColor = theme === 'dark' ? '#ff6030' : '#7c7099'
  const outsideColor = theme === 'dark' ? '#1b3984' : '#2d2b45'
  const blending = theme === 'dark' ? AdditiveBlending : MultiplyBlending

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const colorInside = new Color(insideColor)
    const colorOutside = new Color(outsideColor)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = Math.random() * radius
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = r * spin

      const rx = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r
      const ry = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r
      const rz = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + rx
      positions[i3 + 1] = ry
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz

      const mixed = colorInside.clone().lerp(colorOutside, r / radius)
      colors[i3] = mixed.r
      colors[i3 + 1] = mixed.g
      colors[i3 + 2] = mixed.b
    }

    return { positions, colors }
  }, [count, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={blending}
        vertexColors
      />
    </points>
  )
}
