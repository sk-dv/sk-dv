import { Text, Line, RoundedBox } from '@react-three/drei'
import { Vector3 } from 'three'
import type { TreeNode } from './tree-node'

interface BoxNodeProps {
  node: TreeNode<string>
  fill: string
  text: string
}

const SIZE = 3.2

export default function BoxNode({ node, fill, text }: BoxNodeProps) {
  const { x, y } = node.position!

  return (
    <group>
      {node.left && (
        <Line
          points={[new Vector3(x, y, 0), new Vector3(node.left.position!.x, node.left.position!.y, 0)]}
          color={fill}
          lineWidth={3}
        />
      )}
      {node.right && (
        <Line
          points={[new Vector3(x, y, 0), new Vector3(node.right.position!.x, node.right.position!.y, 0)]}
          color={fill}
          lineWidth={3}
        />
      )}
      <RoundedBox args={[SIZE, SIZE, 0]} radius={0.2} position={[x, y, 0]}>
        <meshBasicMaterial color={fill} />
        <Text color={text} fontSize={2} textAlign="center" anchorY="middle">
          {node.value}
        </Text>
      </RoundedBox>
    </group>
  )
}
