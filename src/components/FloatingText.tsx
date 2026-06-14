import { Center, Float, Text3D } from '@react-three/drei'
import { useTheme } from '../theme'

export default function FloatingText() {
  const { theme } = useTheme()
  const color = theme === 'dark' ? '#f5f5f4' : '#1c1917'

  return (
    <Center>
      <Float floatIntensity={1.5} speed={1.4} rotationIntensity={0.4}>
        <Text3D
          font="/fonts/futura.json"
          bevelEnabled
          curveSegments={32}
          bevelThickness={0.02}
          height={0.1}
          letterSpacing={0.06}
          size={1}
        >
          skdv
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </Text3D>
      </Float>
    </Center>
  )
}
